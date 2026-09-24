"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Infinite marquee whose speed and direction follow scroll velocity. */
export default function Marquee({
  items,
  duration = 40,
  reverse = false,
  variant = "display",
}: {
  items: string[];
  duration?: number;
  reverse?: boolean;
  variant?: "display" | "chips";
}) {
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = track.current;
      if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const loop = reverse
        ? gsap.fromTo(el, { xPercent: -50 }, { xPercent: 0, ease: "none", duration, repeat: -1 })
        : gsap.to(el, { xPercent: -50, ease: "none", duration, repeat: -1 });

      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          const boost = Math.min(Math.abs(v) / 250, 5);
          const dir = v < 0 ? -1 : 1;
          gsap.to(loop, {
            timeScale: dir * (1 + boost),
            duration: 0.25,
            overwrite: true,
            onComplete: () => {
              gsap.to(loop, { timeScale: dir, duration: 1.4, ease: "power2.out" });
            },
          });
        },
      });
    },
    { scope: track }
  );

  const run = [...items, ...items, ...items, ...items];

  return (
    <div className={`mq mq-${variant}`} aria-hidden>
      <div ref={track} className="mq-track">
        {run.map((t, i) => (
          <span key={i} className="mq-item">
            {t}
            <span className="mq-sep">{variant === "display" ? "✳" : "·"}</span>
          </span>
        ))}
      </div>
      <style>{`
        .mq {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
                  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
        }
        .mq-track { display: flex; width: max-content; will-change: transform; }
        .mq-item { display: inline-flex; align-items: center; white-space: nowrap; }
        .mq-display .mq-item {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(44px, 7vw, 108px); letter-spacing: -0.03em; line-height: 1.1;
          color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,.26);
          padding-right: 0.35em;
        }
        .mq-display .mq-item:nth-child(3n+1) { color: var(--text); -webkit-text-stroke: 0; }
        .mq-display .mq-sep {
          font-size: 0.42em; margin-left: 0.35em; color: var(--accent-2);
          -webkit-text-stroke: 0;
        }
        .mq-chips .mq-item {
          font-family: var(--font-mono); font-size: 14px; letter-spacing: 0.02em;
          color: var(--text-2); padding: 0 10px;
        }
        .mq-chips .mq-sep { margin-left: 20px; color: var(--text-3); }
      `}</style>
    </div>
  );
}
