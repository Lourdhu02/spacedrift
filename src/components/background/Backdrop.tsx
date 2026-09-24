"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed layer behind everything:
 *   1. a faint six-column Swiss grid aligned to the content container
 *   2. an ASCII flow-field in ink that turns red around the pointer;
 *      its charset shifts as you scroll through the four stations
 * The frosted panels blur this, which is what gives them texture on white.
 */

const CHARSETS = [
  " ..:·∙",        // noise
  " .:-=+░",       // parse
  " ./\\|<>╱╲",    // model
  " .·:*+#▒▓",     // ship
];
const CW = 11;
const CH = 18;
const INK = [0.035, 0.055, 0.08, 0.12];
const RED = [0.55, 0.9];

export default function Backdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const frameMs = 1000 / (fine ? 24 : 12);

    let w = 0, h = 0, cols = 0, rows = 0;
    let px = -9999, py = -9999, tx = -9999, ty = -9999;
    let scroll = 0;
    let raf = 0, last = 0, visible = true;

    const font = getComputedStyle(document.body).getPropertyValue("--font-geist-mono").trim() || "ui-monospace";

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / CW);
      rows = Math.ceil(h / CH);
    };

    const onMove = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; };
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scroll = Math.min(1, Math.max(0, window.scrollY / max));
    };
    const onVis = () => {
      visible = !document.hidden;
      if (visible) raf = requestAnimationFrame(loop);
    };

    const ink: number[][] = INK.map(() => []);
    const red: number[][] = RED.map(() => []);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      px += (tx - px) * 0.12;
      py += (ty - py) * 0.12;

      const set = CHARSETS[Math.round(scroll * (CHARSETS.length - 1))];
      const time = t * 0.00018;
      const r2 = 200 * 200;

      for (const b of ink) b.length = 0;
      for (const b of red) b.length = 0;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const v =
            Math.sin(x * 0.11 + time * 3) +
            Math.cos(y * 0.13 - time * 2) +
            Math.sin((x + y) * 0.05 + time * 4) * 0.8;
          const n = (v + 2.8) / 5.6;
          if (n < 0.44) continue;

          const dx = x * CW - px, dy = y * CH - py;
          const d2 = dx * dx + dy * dy;
          const light = d2 < r2 ? 1 - d2 / r2 : 0;
          const ch = Math.min(set.length - 1, Math.floor(n * set.length));

          if (light > 0.35) red[light > 0.7 ? 1 : 0].push(x, y, ch);
          else ink[Math.min(INK.length - 1, Math.floor((n - 0.44) * 7))].push(x, y, ch);
        }
      }

      ctx.font = `12px ${font}, ui-monospace, monospace`;
      ctx.textBaseline = "top";
      const paint = (list: number[], style: string) => {
        if (!list.length) return;
        ctx.fillStyle = style;
        for (let i = 0; i < list.length; i += 3) {
          const c = set[list[i + 2]];
          if (c !== " ") ctx.fillText(c, list[i] * CW, list[i + 1] * CH);
        }
      };
      ink.forEach((l, i) => paint(l, `rgba(10, 10, 10, ${INK[i]})`));
      red.forEach((l, i) => paint(l, `rgba(225, 6, 0, ${RED[i]})`));
    };

    const loop = (t: number) => {
      if (!visible) return;
      if (t - last >= frameMs) {
        last = t;
        draw(t);
      }
      raf = requestAnimationFrame(loop);
    };

    resize();
    onScroll();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div className="bd" aria-hidden>
      <div className="bd-grid container">
        <div className="bd-cols" />
      </div>
      <canvas ref={canvasRef} className="bd-ascii" />
      <style>{`
        .bd { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; background: #fff; }
        .bd-grid { position: absolute; inset: 0; height: 100%; }
        .bd-cols {
          height: 100%;
          background-image: linear-gradient(to right, rgba(10,10,10,.055) 1px, transparent 1px);
          background-size: calc(100% / 6) 100%;
          box-shadow: 1px 0 0 rgba(10,10,10,.055);
        }
        .bd-ascii { position: absolute; inset: 0; }
      `}</style>
    </div>
  );
}
