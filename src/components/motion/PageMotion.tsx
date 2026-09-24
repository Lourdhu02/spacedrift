"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * Wires every scroll/entrance animation for one page. Mounted from
 * template.tsx, so it re-runs (and cleans up) on each navigation.
 *
 * Attribute API:
 *   data-split           headline line-mask reveal (data-split="now" = on load)
 *   data-reveal          fade + rise on enter (="glass" → transform only)
 *   data-scrub           words brighten as you scroll through
 *   data-count="24"      number counts up on enter
 *   data-speed="0.2"     parallax drift
 *   data-stack-card      sticky cards that recede as the next one covers them
 */
export default function PageMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const html = document.documentElement;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      resetScroll();

      if (reduce) {
        html.classList.add("motion-ready");
        return;
      }

      const q = gsap.utils.selector(root);

      q("[data-split]").forEach((el: HTMLElement) => {
        const onLoad = el.dataset.split === "now";
        const delay = parseFloat(el.dataset.delay ?? (onLoad ? "0.55" : "0"));
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 118,
              duration: 1.25,
              ease: "expo.out",
              stagger: 0.085,
              delay,
              scrollTrigger: onLoad ? undefined : { trigger: el, start: "top 88%", once: true },
            }),
        });
      });

      const plain = q("[data-reveal]:not([data-reveal='glass'])");
      const glass = q("[data-reveal='glass']");
      if (plain.length) gsap.set(plain, { opacity: 0, y: 40 });
      // Glass can't fade: opacity < 1 on it or an ancestor disables backdrop-filter.
      if (glass.length) gsap.set(glass, { y: 90, scale: 0.94, transformOrigin: "50% 100%" });

      ScrollTrigger.batch(plain, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.08, overwrite: true }),
      });
      ScrollTrigger.batch(glass, {
        start: "top 96%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { y: 0, scale: 1, duration: 1.3, ease: "expo.out", stagger: 0.09, overwrite: true }),
      });

      q("[data-scrub]").forEach((el: HTMLElement) => {
        SplitText.create(el, {
          type: "words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.words,
              { opacity: 0.16 },
              {
                opacity: 1,
                ease: "none",
                stagger: 0.1,
                scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 50%", scrub: 0.6 },
              }
            ),
        });
      });

      q("[data-count]").forEach((el: HTMLElement) => {
        const end = parseFloat(el.dataset.count ?? "0");
        const state = { v: 0 };
        el.textContent = "0";
        gsap.to(state, {
          v: end,
          duration: 2,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(state.v));
          },
        });
      });

      q("[data-speed]").forEach((el: HTMLElement) => {
        const speed = parseFloat(el.dataset.speed ?? "0.15");
        gsap.to(el, {
          yPercent: -speed * 100,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      // Stacking only makes sense where a card fits in the viewport (matches the CSS breakpoint).
      gsap.matchMedia().add("(min-width: 1081px)", () => {
        const cards = q("[data-stack-card]");
        cards.forEach((card: HTMLElement, i: number) => {
          const next = cards[i + 1];
          if (!next) return;
          const shade = card.querySelector<HTMLElement>("[data-stack-shade]");
          const tl = gsap.timeline({
            scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: true },
          });
          tl.to(card, { scale: 0.9, ease: "none" }, 0);
          if (shade) tl.to(shade, { opacity: 0.55, ease: "none" }, 0);
        });
      });

      html.classList.add("motion-ready");

      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    },
    { scope: root }
  );

  return (
    <div ref={root} className="page">
      {children}
    </div>
  );
}

function resetScroll() {
  const hash = window.location.hash;
  const lenis = window.__lenis;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      requestAnimationFrame(() => {
        if (lenis) lenis.scrollTo(target as HTMLElement, { offset: -96, duration: 1.2 });
        else target.scrollIntoView();
      });
      return;
    }
  }
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
}
