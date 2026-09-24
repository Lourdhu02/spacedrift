"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed layer behind everything. This is what the glass refracts:
 *   1. aurora — three soft colour fields drifting slowly (CSS only)
 *   2. ASCII field — a character flow-field that brightens around the
 *      pointer like a flashlight; its charset shifts as you scroll
 *      through the four stations
 *   3. grain + vignette for depth
 */

const CHARSETS = [
  " ..:·∙",          // noise
  " .:-=+░",         // parse
  " ./\\|<>╱╲",      // model
  " .·:*+#▒▓",       // ship
];
const CW = 11;
const CH = 18;

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

    const buckets: number[][] = Array.from({ length: 6 }, () => []);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      px += (tx - px) * 0.12;
      py += (ty - py) * 0.12;

      const pos = scroll * (CHARSETS.length - 1);
      const set = CHARSETS[Math.round(pos)];
      const time = t * 0.00018;
      const r2 = 240 * 240;

      for (const b of buckets) b.length = 0;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const v =
            Math.sin(x * 0.11 + time * 3) +
            Math.cos(y * 0.13 - time * 2) +
            Math.sin((x + y) * 0.05 + time * 4) * 0.8;
          const n = (v + 2.8) / 5.6;
          if (n < 0.42) continue;

          const cx = x * CW, cy = y * CH;
          const dx = cx - px, dy = cy - py;
          const d2 = dx * dx + dy * dy;
          const light = d2 < r2 ? 1 - d2 / r2 : 0;

          const level = Math.min(5, Math.floor((n - 0.42) * 6) + Math.floor(light * light * 5));
          buckets[level].push(x, y, Math.min(set.length - 1, Math.floor(n * set.length)));
        }
      }

      ctx.font = `12px ${font}, ui-monospace, monospace`;
      ctx.textBaseline = "top";
      const alphas = [0.05, 0.075, 0.1, 0.2, 0.34, 0.5];
      for (let b = 0; b < buckets.length; b++) {
        const list = buckets[b];
        if (!list.length) continue;
        ctx.fillStyle = `rgba(200, 210, 255, ${alphas[b]})`;
        for (let i = 0; i < list.length; i += 3) {
          const ch = set[list[i + 2]];
          if (ch !== " ") ctx.fillText(ch, list[i] * CW, list[i + 1] * CH);
        }
      }
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
      <div className="bd-aurora bd-a1" />
      <div className="bd-aurora bd-a2" />
      <div className="bd-aurora bd-a3" />
      <canvas ref={canvasRef} className="bd-ascii" />
      <div className="bd-grain" />
      <div className="bd-vignette" />
      <style>{`
        .bd { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; background: var(--bg); }
        .bd-aurora { position: absolute; width: 75vmax; height: 75vmax; border-radius: 50%; will-change: transform; }
        .bd-a1 {
          left: -18vmax; top: -24vmax;
          background: radial-gradient(closest-side, rgba(92, 120, 255, 0.34), rgba(92, 120, 255, 0) 72%);
          animation: bd-drift-1 34s var(--ease-io) infinite alternate;
        }
        .bd-a2 {
          right: -26vmax; top: 8vmax;
          background: radial-gradient(closest-side, rgba(170, 120, 255, 0.28), rgba(170, 120, 255, 0) 72%);
          animation: bd-drift-2 42s var(--ease-io) infinite alternate;
        }
        .bd-a3 {
          left: 12vmax; bottom: -42vmax;
          background: radial-gradient(closest-side, rgba(255, 150, 115, 0.2), rgba(255, 150, 115, 0) 72%);
          animation: bd-drift-3 38s var(--ease-io) infinite alternate;
        }
        @keyframes bd-drift-1 { to { transform: translate3d(22vmax, 16vmax, 0) scale(1.15); } }
        @keyframes bd-drift-2 { to { transform: translate3d(-24vmax, 20vmax, 0) scale(0.9); } }
        @keyframes bd-drift-3 { to { transform: translate3d(18vmax, -22vmax, 0) scale(1.2); } }
        .bd-ascii { position: absolute; inset: 0; }
        .bd-grain {
          position: absolute; inset: -50%;
          opacity: 0.07; mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
        }
        .bd-vignette {
          position: absolute; inset: 0;
          background:
            radial-gradient(120% 90% at 50% 0%, transparent 40%, rgba(6, 6, 10, 0.75) 100%),
            linear-gradient(180deg, transparent 60%, rgba(6, 6, 10, 0.6));
        }
      `}</style>
    </div>
  );
}
