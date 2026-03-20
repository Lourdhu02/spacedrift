"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // ── 1. Cursor + follower tracking via quickTo
    gsap.set([cursor, follower], { xPercent: -50, yPercent: -50 });

    const cxTo = gsap.quickTo(cursor, "x", {
      duration: 0.15,
      ease: "power3.out",
    });
    const cyTo = gsap.quickTo(cursor, "y", {
      duration: 0.15,
      ease: "power3.out",
    });
    const fxTo = gsap.quickTo(follower, "x", {
      duration: 0.5,
      ease: "power3.out",
    });
    const fyTo = gsap.quickTo(follower, "y", {
      duration: 0.5,
      ease: "power3.out",
    });

    let mouseX = 0,
      mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cxTo(mouseX);
      cyTo(mouseY);
      fxTo(mouseX);
      fyTo(mouseY);
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // ── 2. Hover on links/cards — follower expands
    const HOVER_ELS =
      "a, button, input, textarea, .proj-card, .work-card, .svc-card, .faq-item";

    const onMouseOver = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(HOVER_ELS)) return;
      gsap.to(follower, {
        width: 56,
        height: 56,
        opacity: 0.5,
        duration: 0.35,
        ease: "expo.out",
      });
    };
    const onMouseOut = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(HOVER_ELS)) return;
      gsap.to(follower, {
        width: 32,
        height: 32,
        opacity: 1,
        duration: 0.35,
        ease: "expo.out",
      });
    };
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mouseout", onMouseOut, { passive: true });

    // ── 3. Click burst on cursor
    const onClick = () => {
      gsap.fromTo(
        cursor,
        { scale: 1 },
        {
          scale: 2.2,
          opacity: 0,
          duration: 0.4,
          ease: "expo.out",
          onComplete: () => gsap.set(cursor, { scale: 1, opacity: 1 }),
        },
      );
    };
    window.addEventListener("click", onClick, { passive: true });

    // ── 4. Hide when leaving browser window
    const hide = () =>
      gsap.to([cursor, follower], { opacity: 0, duration: 0.3 });
    const show = () =>
      gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    // ── 5. Magnetic effect — attach to [data-magnetic] elements
    const magnetEls = document.querySelectorAll<HTMLElement>("[data-magnetic]");

    const magnetHandlers: Array<{
      el: HTMLElement;
      enter: () => void;
      move: (e: MouseEvent) => void;
      leave: () => void;
    }> = [];

    magnetEls.forEach((el) => {
      const enter = () => {
        gsap.to(follower, {
          scale: 2.5,
          opacity: 0.15,
          duration: 0.4,
          ease: "expo.out",
        });
        gsap.to(cursor, { scale: 0.4, duration: 0.3, ease: "expo.out" });
      };

      const move = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        // Move element
        gsap.to(el, {
          x: relX * 0.38,
          y: relY * 0.38,
          duration: 0.4,
          ease: "power2.out",
        });
        // Move cursor too — snap to element center + offset
        const cx = rect.left + rect.width / 2 + relX * 0.38;
        const cy = rect.top + rect.height / 2 + relY * 0.38;
        cxTo(cx);
        cyTo(cy);
        fxTo(cx);
        fyTo(cy);
      };

      const leave = () => {
        // Snap element back with elastic
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1.1, 0.4)",
        });
        // Restore cursor
        gsap.to(follower, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "expo.out",
        });
        gsap.to(cursor, { scale: 1, duration: 0.4, ease: "expo.out" });
        // Resume normal tracking
        cxTo(mouseX);
        cyTo(mouseY);
        fxTo(mouseX);
        fyTo(mouseY);
      };

      el.addEventListener("mouseenter", enter);
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      magnetHandlers.push({ el, enter, move, leave });
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("click", onClick);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      magnetHandlers.forEach(({ el, enter, move, leave }) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <>
      <style>{`
        @media (min-width: 769px) {
          *, *::before, *::after { cursor: none !important; }
        }

        /* Sharp dot — exact position */
        .mc-cursor {
          position: fixed; top: 0; left: 0;
          width: 8px; height: 8px;
          background: var(--ink);
          border-radius: 50%;
          pointer-events: none;
          z-index: 100000;
          will-change: transform;
        }

        /* Follower ring — lags behind */
        .mc-follower {
          position: fixed; top: 0; left: 0;
          width: 32px; height: 32px;
          border: 1.5px solid var(--ink);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          will-change: transform;
          opacity: 0.7;
        }
      `}</style>

      <div ref={cursorRef} className="mc-cursor" />
      <div ref={followerRef} className="mc-follower" />
    </>
  );
}
