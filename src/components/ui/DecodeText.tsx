"use client";

import { useEffect, useRef } from "react";

/**
 * DecodeText — reveals children by scrambling each character with a
 * random glyph, then landing on the real letter. Runs once when the
 * element enters the viewport. Renders as a <span> so it can be nested
 * inside any heading or paragraph.
 *
 * If JS is disabled or reduced motion is on, children render normally.
 * (The `as` prop was removed to keep ref typing sound — wrap in whatever
 * tag you need at the call site.)
 */

const GLYPHS = "▓▒░#@%&*+=-<>[]{}|/\\ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function DecodeText({
  children,
  delay = 0,
  className,
}: {
  children: string;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const original = children;
    let started = false;
    let raf = 0;

    const run = () => {
      const start = performance.now() + delay;
      const totalDuration = Math.min(1400, 220 + original.length * 30);
      const charDuration = 320;

      const step = (now: number) => {
        const elapsed = Math.max(0, now - start);
        let out = "";
        for (let i = 0; i < original.length; i++) {
          const charStart = (i / Math.max(1, original.length - 1)) * (totalDuration - charDuration);
          const charElapsed = elapsed - charStart;
          if (charElapsed >= charDuration) {
            out += original[i];
          } else if (original[i] === " ") {
            out += " ";
          } else {
            out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }
        el.textContent = out;
        if (elapsed < totalDuration) {
          raf = requestAnimationFrame(step);
        } else {
          el.textContent = original;
        }
      };
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started) {
            started = true;
            run();
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [children, delay]);

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}
