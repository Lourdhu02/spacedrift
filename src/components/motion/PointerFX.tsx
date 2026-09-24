"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+=<>/\\";

/**
 * One delegated listener set for the whole site:
 *   [data-glow]      → updates --mx/--my so the glass specular follows the pointer
 *   [data-magnetic]  → element leans toward the pointer
 *   [data-scramble]  → text scrambles briefly on hover
 * Fine pointers only.
 */
export default function PointerFX() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    type Movers = { x: gsap.QuickToFunc; y: gsap.QuickToFunc };
    const movers = new WeakMap<HTMLElement, Movers>();
    let magnet: HTMLElement | null = null;

    const moversFor = (el: HTMLElement) => {
      let m = movers.get(el);
      if (!m) {
        m = {
          x: gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" }),
        };
        movers.set(el, m);
      }
      return m;
    };

    const release = (el: HTMLElement) => {
      const m = moversFor(el);
      m.x(0);
      m.y(0);
    };

    const onMove = (e: PointerEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      if (!target) return;

      const glow = target.closest<HTMLElement>("[data-glow]");
      if (glow) {
        const r = glow.getBoundingClientRect();
        glow.style.setProperty("--mx", `${e.clientX - r.left}px`);
        glow.style.setProperty("--my", `${e.clientY - r.top}px`);
      }

      if (reduce) return;
      const m = target.closest<HTMLElement>("[data-magnetic]");
      if (magnet && magnet !== m) release(magnet);
      magnet = m;
      if (m) {
        const r = m.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const mv = moversFor(m);
        mv.x(dx * 0.22);
        mv.y(dy * 0.32);
      }
    };

    const onLeaveWindow = () => {
      if (magnet) release(magnet);
      magnet = null;
    };

    const onOver = (e: PointerEvent) => {
      if (reduce) return;
      const target = e.target instanceof Element ? e.target : null;
      const el = target?.closest<HTMLElement>("[data-scramble]");
      if (!el || el.dataset.busy === "1") return;
      const related = e.relatedTarget instanceof Node ? e.relatedTarget : null;
      if (related && el.contains(related)) return;

      const original = el.dataset.text ?? el.textContent ?? "";
      el.dataset.text = original;
      el.dataset.busy = "1";
      const start = performance.now();
      const dur = 420;
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        const locked = Math.floor(p * original.length);
        let out = "";
        for (let i = 0; i < original.length; i++) {
          const c = original[i];
          out += i < locked || c === " " ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        el.textContent = out;
        if (p < 1) requestAnimationFrame(step);
        else {
          el.textContent = original;
          el.dataset.busy = "0";
        }
      };
      requestAnimationFrame(step);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
    };
  }, []);

  return null;
}
