"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AsciiBar — a terminal-style progress readout used for numeric stats.
 *
 *   ███████████████░░░░░  75%   Response within 24h
 *
 * On view, the filled cells stream in left-to-right. Character choice is
 * paper-terminal appropriate (block + light shade).
 */
export default function AsciiBar({
  value,
  label,
  suffix = "%",
  width = 22,
}: {
  value: number; // 0..100
  label: string;
  suffix?: string;
  width?: number;
}) {
  const [phase, setPhase] = useState(0); // 0..1
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      // setState is deferred to a rAF callback so it doesn't run in
      // the effect body directly (react-hooks/set-state-in-effect).
      const id = requestAnimationFrame(() => setPhase(1));
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    let start = 0;
    const dur = 900;

    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      setPhase(p);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            raf = requestAnimationFrame(step);
            io.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const target = Math.max(0, Math.min(100, value));
  const shown = Math.round(target * phase);
  const filled = Math.round((shown / 100) * width);
  const empty = width - filled;

  return (
    <div ref={ref} className="ascii-bar">
      <div className="ascii-bar-row">
        <span className="ascii-bar-glyphs" aria-hidden>
          <span className="on">{"█".repeat(filled)}</span>
          <span className="off">{"░".repeat(empty)}</span>
        </span>
        <span className="ascii-bar-num">
          {shown}
          {suffix}
        </span>
      </div>
      <p className="ascii-bar-label">{label}</p>
      <style>{`
        .ascii-bar { padding: 22px 0; border-top: 1px solid var(--rule); }
        .ascii-bar-row {
          display: flex; align-items: baseline; gap: 16px;
          font-family: var(--font-mono); font-size: 13px;
        }
        .ascii-bar-glyphs { letter-spacing: 0; white-space: nowrap; }
        .ascii-bar-glyphs .on { color: var(--ink); }
        .ascii-bar-glyphs .off { color: var(--rule-strong); }
        .ascii-bar-num {
          font-family: var(--font-mono); font-weight: 700;
          font-size: 15px; color: var(--signal); margin-left: auto;
        }
        .ascii-bar-label {
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--ink-3); margin-top: 6px;
        }
        @media (max-width: 720px) {
          .ascii-bar-glyphs { font-size: 12px; }
        }
      `}</style>
    </div>
  );
}
