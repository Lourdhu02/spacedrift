"use client";

/**
 * AsciiField — the persistent 2D background.
 *
 * Story mechanic: a value-noise flow field is sampled per cell. As the
 * viewer scrolls through the four stations (Noise → Parse → Model → Ship)
 * the charset morphs and the density curve shifts. The field also
 * responds subtly to mouse position.
 *
 * Runs at ~28fps with a hard time-gate. Fully skipped on
 * prefers-reduced-motion, Save-Data, or narrow viewports on
 * low-DPR devices.
 */

import { useEffect, useRef } from "react";

const STATIONS: readonly { chars: string; ink: number }[] = [
  { chars: " ..··:∴∵",          ink: 0.18 }, // 0 Noise — sparse dust
  { chars: " ·:─│┌┐└┘├┤",       ink: 0.28 }, // 1 Parse — resolving
  { chars: " ╱╲╳┼╬═║╔╗╚╝",     ink: 0.34 }, // 2 Model — structured mesh
  { chars: " ·░▒▓█",             ink: 0.30 }, // 3 Ship  — solid block
];

const CELL_W = 10;
const CELL_H = 16;
const FRAME_MS = 1000 / 28;

export default function AsciiField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Bail early on reduced motion or explicit save-data.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData =
      typeof navigator !== "undefined" &&
      "connection" in navigator &&
      // @ts-expect-error non-standard
      Boolean(navigator.connection?.saveData);
    if (reduced || saveData) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let lastFrame = 0;

    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let cols = 0;
    let rows = 0;
    let mouseX = 0.5;
    let mouseY = 0.5;
    let scrollFrac = 0;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / CELL_W);
      rows = Math.ceil(h / CELL_H);
    };

    resize();

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth;
      mouseY = e.clientY / window.innerHeight;
    };
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollFrac = Math.min(1, Math.max(0, window.scrollY / max));
    };
    const onVis = () => {
      running = !document.hidden;
      if (running) {
        lastFrame = 0;
        raf = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(raf);
      }
    };

    // Cheap 2D value noise — layered sines. Doesn't need to be "correct"
    // perlin, only needs to look like drift.
    const field = (x: number, y: number, t: number) => {
      const a = Math.sin(x * 0.18 + t * 0.6) + Math.cos(y * 0.13 - t * 0.4);
      const b = Math.sin((x + y) * 0.07 + t * 0.9) * 0.9;
      const c = Math.cos(x * 0.03 - y * 0.05 + t * 0.2);
      return (a + b + c) / 4; // roughly [-1, 1]
    };

    const draw = (t: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // Interpolate between stations based on scroll.
      const stationIndex = Math.min(STATIONS.length - 1, scrollFrac * (STATIONS.length - 0.5));
      const idx = Math.floor(stationIndex);
      const blend = stationIndex - idx;
      const cur = STATIONS[idx];
      const next = STATIONS[Math.min(STATIONS.length - 1, idx + 1)];

      // Ink intensity slowly climbs then relaxes at Ship.
      const inkStrength = cur.ink * (1 - blend) + next.ink * blend;

      ctx.font = `500 12px ${getComputedStyle(document.documentElement)
        .getPropertyValue("--font-jetbrains")
        .trim() || "ui-monospace"}, ui-monospace, monospace`;
      ctx.textBaseline = "top";
      ctx.fillStyle = `rgba(10, 10, 10, ${inkStrength})`;

      const time = t * 0.00025;
      const mxCells = mouseX * cols;
      const myCells = mouseY * rows;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          // Mouse influence — a soft radial push into the field.
          const dx = x - mxCells;
          const dy = y - myCells;
          const distSq = dx * dx + dy * dy;
          const push = Math.exp(-distSq / 400) * 0.6;

          const v = field(x, y, time) + push;
          const norm = (v + 1) * 0.5; // [0, 1]
          if (norm < 0.32) continue; // let paper breathe

          // Pick charset — either from current station or blend from next.
          const charset = blend > 0.5 ? next.chars : cur.chars;
          const ch = charset[Math.min(charset.length - 1, Math.floor(norm * charset.length))];
          if (!ch || ch === " ") continue;

          ctx.fillText(ch, x * CELL_W, y * CELL_H);
        }
      }
    };

    const loop = (t: number) => {
      if (!running) return;
      if (t - lastFrame >= FRAME_MS) {
        lastFrame = t;
        draw(t);
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    onScroll();

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="ascii-field ascii-field-canvas"
        aria-hidden="true"
      />
      {/* Static fallback tile shown when the canvas is disabled via reduced-motion. */}
      <div
        aria-hidden="true"
        className="ascii-field ascii-field-static"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(10,10,10,0.14) 1px, transparent 1px)",
          backgroundSize: "10px 16px",
        }}
      />
    </>
  );
}
