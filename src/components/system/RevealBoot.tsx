"use client";

import { useEffect } from "react";

/**
 * RevealBoot — turns on the CSS reveal system by adding `js-anim` to <html>.
 * Wires an IntersectionObserver that flips [data-reveal] elements into
 * `.is-in` once they scroll into view.
 *
 * Kept trivially small: no GSAP, no timeline, no dependency graph. If JS
 * fails to load, content is already visible (see globals.css).
 */
export default function RevealBoot() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    document.documentElement.classList.add("js-anim");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    nodes.forEach((n) => io.observe(n));

    // Also observe nodes added later (e.g. route change).
    const mo = new MutationObserver((muts) => {
      for (const m of muts) {
        m.addedNodes.forEach((n) => {
          if (!(n instanceof HTMLElement)) return;
          if (n.hasAttribute?.("data-reveal")) io.observe(n);
          n.querySelectorAll?.("[data-reveal]").forEach((el) => io.observe(el));
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
