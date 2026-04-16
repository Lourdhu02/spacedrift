"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Globe,
  BarChart2,
  Layers,
  Database,
} from "lucide-react";
import { ServiceData, servicesData } from "@/lib/services-data";

gsap.registerPlugin(ScrollTrigger, SplitText);

// ── Icon map — resolves string → component inside Client component
const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; strokeWidth?: number }>
> = {
  Brain,
  Globe,
  BarChart2,
  Layers,
  Database,
};

export default function ServicePage({ data }: { data: ServiceData }) {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const Icon = iconMap[data.iconName] ?? Brain;
  const related = servicesData.filter((s) => data.related.includes(s.slug));

  // ── Hero SplitText
  useGSAP(() => {
    if (!h1Ref.current) return;
    document.fonts.ready.then(() => {
      const split = SplitText.create(h1Ref.current!, {
        type: "lines,words",
        mask: "lines",
      });
      gsap.from(split.words, {
        yPercent: 110,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.04,
        delay: 0.2,
      });
    });
  }, []);

  // ── Hero sub stagger
  useGSAP(() => {
    gsap.fromTo(
      ".sp-hero-sub",
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.8,
      },
    );
  }, []);

  // ── Overview paragraphs clip reveal
  useGSAP(() => {
    gsap.fromTo(
      ".ov-para",
      { clipPath: "inset(0% 0% 100% 0%)", opacity: 0 },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
        duration: 0.8,
        stagger: 0.14,
        ease: "expo.out",
        scrollTrigger: { trigger: ".ov-block", start: "top 82%" },
      },
    );
  }, []);

  // ── Deliverables
  useGSAP(() => {
    gsap.fromTo(
      ".del-card",
      { y: 44, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: ".del-grid", start: "top 82%" },
      },
    );
  }, []);

  // ── Process scrub line + steps
  useGSAP(() => {
    gsap.fromTo(
      progressRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        transformOrigin: "top center",
        scrollTrigger: {
          trigger: ".sp-process-list",
          start: "top 70%",
          end: "bottom 80%",
          scrub: 0.6,
        },
      },
    );
    gsap.utils.toArray<HTMLElement>(".sp-proc-item").forEach((el) => {
      gsap.fromTo(
        el,
        { x: -32, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    });
  }, []);

  // ── Results
  useGSAP(() => {
    gsap.fromTo(
      ".result-item",
      { scale: 0.88, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.65,
        stagger: 0.1,
        ease: "back.out(1.5)",
        scrollTrigger: { trigger: ".results-grid", start: "top 84%" },
      },
    );
  }, []);

  // ── Suited for
  useGSAP(() => {
    gsap.fromTo(
      ".suited-item",
      { x: 28, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: ".suited-list", start: "top 86%" },
      },
    );
  }, []);

  // ── Related cards
  useGSAP(() => {
    gsap.fromTo(
      ".rel-card",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".rel-grid", start: "top 85%" },
      },
    );
  }, []);

  return (
    <>
      <style>{`
        /* ══ HERO ══ */
        .sp-hero {
          min-height: 100svh; display: grid; grid-template-columns: 1fr 400px;
          align-items: end; padding-top: var(--nav-h);
          background: var(--bg); border-bottom: 1px solid var(--line);
          position: relative; overflow: hidden;
        }
        .sp-hero-bg {
          position: absolute; inset: 0;
          background-image: linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);
          background-size: 72px 72px; opacity: 0.5; pointer-events: none;
        }
        .sp-hero-num {
          position: absolute; right: -0.02em; bottom: -0.1em;
          font-family: var(--font-display); font-size: clamp(180px,28vw,380px);
          font-weight: 800; letter-spacing: -0.06em;
          color: transparent; -webkit-text-stroke: 1px var(--line);
          line-height: 1; pointer-events: none; user-select: none; z-index: 0;
        }
        .sp-hero-left {
          padding: 80px 0; width: 95%; margin: 0 auto;
          position: relative; z-index: 1;
          display: flex; flex-direction: column; justify-content: flex-end; height: 100%;
        }
        .sp-breadcrumb {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-3);
          display: flex; align-items: center; gap: 8px; margin-bottom: 28px;
        }
        .sp-breadcrumb a { color: var(--ink-3); transition: color var(--t-fast); }
        .sp-breadcrumb a:hover { color: var(--ink); }
        .sp-breadcrumb-sep { opacity: 0.4; }
        .sp-hero-icon {
          width: 52px; height: 52px; border: 1px solid var(--line);
          display: flex; align-items: center; justify-content: center;
          color: var(--ink-3); margin-bottom: 28px;
        }
        .sp-hero h1 {
          font-family: var(--font-display); font-size: clamp(52px,9vw,120px);
          font-weight: 800; letter-spacing: -0.045em; line-height: 0.90;
          color: var(--ink); margin-bottom: 36px;
        }
        .sp-hero h1 em { font-style: normal; -webkit-text-stroke: 1.5px var(--ink); color: transparent; }
        .sp-hero-tagline {
          font-family: var(--font-mono); font-size: 12px;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-2); margin-bottom: 20px;
        }
        .sp-hero-desc {
          font-size: clamp(14px,1.4vw,17px); color: var(--ink-2);
          max-width: 600px; line-height: 1.8; margin-bottom: 40px;
        }
        .sp-hero-meta {
          display: flex; gap: 0; border: 1px solid var(--line); align-self: flex-start;
        }
        .sp-meta-item {
          padding: 14px 24px; border-right: 1px solid var(--line);
          display: flex; flex-direction: column; gap: 3px;
        }
        .sp-meta-item:last-child { border-right: none; }
        .sp-meta-label {
          font-family: var(--font-mono); font-size: 8.5px;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3);
        }
        .sp-meta-val {
          font-family: var(--font-display); font-size: 18px;
          font-weight: 700; letter-spacing: -0.03em; color: var(--ink);
        }
        .sp-hero-right {
          border-left: 1px solid var(--line); background: var(--bg-2);
          height: 100%; padding: 80px 40px;
          display: flex; flex-direction: column; justify-content: flex-end;
          gap: 8px; position: relative; z-index: 1;
        }
        .sp-tag-label {
          font-family: var(--font-mono); font-size: 9.5px;
          letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 12px;
        }
        .sp-tags { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 32px; }
        .sp-tag {
          font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.1em;
          text-transform: uppercase; padding: 6px 14px;
          border: 1px solid var(--line); color: var(--ink-2); background: var(--bg);
        }
        .sp-cta-primary {
          display: inline-flex; align-items: center; gap: 9px;
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.12em;
          text-transform: uppercase; padding: 14px 24px;
          background: var(--ink); color: var(--bg);
          transition: opacity var(--t-fast); margin-bottom: 10px;
        }
        .sp-cta-primary:hover { opacity: 0.82; }
        .sp-cta-secondary {
          display: inline-flex; align-items: center; gap: 9px;
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.12em;
          text-transform: uppercase; padding: 14px 24px;
          border: 1.5px solid var(--line-dark); color: var(--ink-2); transition: all var(--t-fast);
        }
        .sp-cta-secondary:hover { border-color: var(--ink); color: var(--ink); }

        /* ══ TICKER ══ */
        .sp-ticker { border-bottom: 1px solid var(--line); background: var(--ink); padding: 13px 0; overflow: hidden; }
        .sp-ticker-track { display: flex; width: max-content; animation: spTicker 22s linear infinite; }
        .sp-ticker-item {
          display: flex; align-items: center; gap: 14px; padding: 0 28px;
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(255,255,255,0.5); white-space: nowrap;
        }
        .sp-ticker-dot { width: 3px; height: 3px; background: rgba(255,255,255,0.3); flex-shrink: 0; }
        @keyframes spTicker { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        /* ══ OVERVIEW ══ */
        .sp-overview { padding: 100px 0; border-bottom: 1px solid var(--line); background: var(--bg); }
        .sp-overview-inner {
          width: 95%; max-width: 1800px; margin: 0 auto;
          display: grid; grid-template-columns: 2fr 3fr; gap: 80px; align-items: start;
        }
        .sp-ov-left { position: sticky; top: calc(var(--nav-h) + 32px); }
        .sp-ov-eyebrow {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 16px;
        }
        .sp-ov-title {
          font-family: var(--font-display); font-size: clamp(32px,3.5vw,52px);
          font-weight: 800; letter-spacing: -0.04em; color: var(--ink); line-height: 1; margin-bottom: 28px;
        }
        .sp-ov-title em { font-style: normal; -webkit-text-stroke: 1px var(--ink); color: transparent; }
        .ov-block { display: flex; flex-direction: column; gap: 0; }
        .ov-para {
          font-size: 16px; color: var(--ink-2); line-height: 1.85;
          padding: 28px 0; border-bottom: 1px solid var(--line);
        }
        .ov-para:first-child { border-top: 1px solid var(--line); }
        .ov-para strong { color: var(--ink); font-weight: 600; }

        /* ══ DELIVERABLES ══ */
        .sp-del { padding: 100px 0; border-bottom: 1px solid var(--line); background: var(--bg-2); }
        .sp-del-wrap { width: 95%; max-width: 1800px; margin: 0 auto; }
        .sp-del-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 56px; }
        .sp-del-header h2 {
          font-family: var(--font-display); font-size: clamp(32px,4vw,56px);
          font-weight: 800; letter-spacing: -0.04em; color: var(--ink); line-height: 1;
        }
        .sp-del-header h2 em { font-style: normal; -webkit-text-stroke: 1px var(--ink); color: transparent; }
        .del-grid { display: grid; grid-template-columns: repeat(3,1fr); border: 1px solid var(--line); overflow: hidden; }
        .del-card {
          background: var(--bg-2); padding: 36px 32px;
          border-right: 1px solid var(--line); border-bottom: 1px solid var(--line);
          display: flex; flex-direction: column; gap: 14px;
          transition: background var(--t); position: relative; overflow: hidden;
        }
        .del-card:nth-child(3n)        { border-right: none; }
        .del-card:nth-last-child(-n+3) { border-bottom: none; }
        .del-card:hover { background: var(--bg); }
        .del-card::before {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: var(--ink); transform: scaleX(0); transform-origin: left; transition: transform var(--t);
        }
        .del-card:hover::before { transform: scaleX(1); }
        .del-num { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); }
        .del-card h3 { font-family: var(--font-display); font-size: 17px; font-weight: 700; letter-spacing: -0.025em; color: var(--ink); }
        .del-card p  { font-size: 13.5px; color: var(--ink-2); line-height: 1.72; flex: 1; }

        /* ══ PROCESS ══ */
        .sp-process { padding: 100px 0; border-bottom: 1px solid var(--line); background: var(--bg); }
        .sp-process-wrap { width: 95%; max-width: 1800px; margin: 0 auto; }
        .sp-process-header { margin-bottom: 56px; }
        .sp-process-header h2 {
          font-family: var(--font-display); font-size: clamp(32px,4vw,56px);
          font-weight: 800; letter-spacing: -0.04em; color: var(--ink); line-height: 1;
        }
        .sp-process-header h2 em { font-style: normal; -webkit-text-stroke: 1px var(--ink); color: transparent; }
        .sp-process-list { position: relative; border: 1px solid var(--line); overflow: hidden; }
        .sp-process-spine  { position: absolute; left: 80px; top: 0; bottom: 0; width: 1px; background: var(--line); }
        .sp-process-progress { position: absolute; left: 80px; top: 0; bottom: 0; width: 1px; background: var(--ink); transform: scaleY(0); transform-origin: top; z-index: 1; }
        .sp-proc-item {
          display: grid; grid-template-columns: 80px 1fr;
          padding: 36px 40px; border-bottom: 1px solid var(--line);
          transition: background var(--t); gap: 40px; align-items: center;
        }
        .sp-proc-item:last-child { border-bottom: none; }
        .sp-proc-item:hover { background: var(--bg-2); }
        .sp-proc-num {
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--ink-3); position: relative; z-index: 2;
        }
        .sp-proc-right { display: grid; grid-template-columns: 1fr 2fr; gap: 32px; align-items: center; }
        .sp-proc-item h3 { font-family: var(--font-display); font-size: 18px; font-weight: 700; letter-spacing: -0.025em; color: var(--ink); }
        .sp-proc-item p  { font-size: 13.5px; color: var(--ink-2); line-height: 1.7; }

        /* ══ RESULTS ══ */
        .sp-results { padding: 100px 0; border-bottom: 1px solid var(--line); background: var(--ink); position: relative; overflow: hidden; }
        .sp-results::before {
          content: ''; position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px);
          background-size: 72px 72px;
        }
        .sp-results-wrap { width: 95%; max-width: 1800px; margin: 0 auto; position: relative; z-index: 1; }
        .sp-results-header { margin-bottom: 56px; }
        .sp-results-header p {
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.2em;
          text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 12px;
        }
        .sp-results-header h2 {
          font-family: var(--font-display); font-size: clamp(32px,4vw,56px);
          font-weight: 800; letter-spacing: -0.04em; color: #fff; line-height: 1;
        }
        .sp-results-header h2 em { font-style: normal; -webkit-text-stroke: 1.5px rgba(255,255,255,0.4); color: transparent; }
        .results-grid { display: grid; grid-template-columns: repeat(4,1fr); border: 1px solid rgba(255,255,255,0.08); overflow: hidden; }
        .result-item { padding: 44px 36px; border-right: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; gap: 10px; }
        .result-item:last-child { border-right: none; }
        .result-val {
          font-family: var(--font-display); font-size: clamp(36px,4vw,56px);
          font-weight: 800; letter-spacing: -0.04em; color: #fff; line-height: 1;
        }
        .result-label {
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em;
          text-transform: uppercase; color: rgba(255,255,255,0.4); line-height: 1.6;
        }

        /* ══ SUITED FOR ══ */
        .sp-suited { padding: 100px 0; border-bottom: 1px solid var(--line); background: var(--bg-2); }
        .sp-suited-wrap { width: 95%; max-width: 1800px; margin: 0 auto; }
        .sp-suited-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        .sp-suited-left h2 {
          font-family: var(--font-display); font-size: clamp(32px,4vw,56px);
          font-weight: 800; letter-spacing: -0.04em; color: var(--ink); line-height: 1; margin-bottom: 16px;
        }
        .sp-suited-left h2 em { font-style: normal; -webkit-text-stroke: 1px var(--ink); color: transparent; }
        .sp-suited-left p { font-size: 14px; color: var(--ink-2); line-height: 1.8; margin-bottom: 32px; }
        .suited-list { display: flex; flex-direction: column; gap: 0; }
        .suited-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 0; border-bottom: 1px solid var(--line);
          font-size: 15px; color: var(--ink); font-weight: 500; transition: padding-left var(--t);
        }
        .suited-item:first-child { border-top: 1px solid var(--line); }
        .suited-item:hover { padding-left: 12px; }
        .suited-arrow { color: var(--ink-3); transition: transform var(--t-fast); }
        .suited-item:hover .suited-arrow { transform: translate(4px,-4px); color: var(--ink); }

        /* ══ RELATED ══ */
        .sp-related { padding: 100px 0; border-bottom: 1px solid var(--line); background: var(--bg); }
        .sp-related-wrap { width: 95%; max-width: 1800px; margin: 0 auto; }
        .sp-related-header { margin-bottom: 48px; }
        .sp-related-header p {
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--ink-3); margin-bottom: 10px;
        }
        .sp-related-header h2 {
          font-family: var(--font-display); font-size: clamp(28px,3.5vw,48px);
          font-weight: 800; letter-spacing: -0.04em; color: var(--ink); line-height: 1;
        }
        .rel-grid { display: grid; grid-template-columns: repeat(3,1fr); border: 1px solid var(--line); overflow: hidden; }
        .rel-card {
          background: var(--bg); padding: 36px 32px; border-right: 1px solid var(--line);
          display: flex; flex-direction: column; gap: 16px;
          transition: background var(--t); position: relative; overflow: hidden;
        }
        .rel-card:last-child { border-right: none; }
        .rel-card:hover { background: var(--bg-2); }
        .rel-card::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: var(--ink); transform: scaleX(0); transform-origin: left; transition: transform var(--t);
        }
        .rel-card:hover::after { transform: scaleX(1); }
        .rel-icon {
          width: 40px; height: 40px; border: 1px solid var(--line);
          display: flex; align-items: center; justify-content: center;
          color: var(--ink-3); transition: all var(--t);
        }
        .rel-card:hover .rel-icon { border-color: var(--ink); color: var(--ink); }
        .rel-num { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); }
        .rel-card h3 { font-family: var(--font-display); font-size: 20px; font-weight: 700; letter-spacing: -0.03em; color: var(--ink); }
        .rel-card p  { font-size: 13.5px; color: var(--ink-2); line-height: 1.7; flex: 1; }
        .rel-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--ink-3);
          transition: color var(--t-fast), gap var(--t-fast); margin-top: auto;
        }
        .rel-card:hover .rel-link { color: var(--ink); gap: 12px; }

        /* ══ CTA ══ */
        .sp-cta-section { padding: 120px 0; background: var(--bg-2); border-bottom: 1px solid var(--line); }
        .sp-cta-wrap {
          width: 95%; max-width: 1800px; margin: 0 auto;
          display: flex; align-items: flex-end; justify-content: space-between; gap: 48px; flex-wrap: wrap;
        }
        .sp-cta-wrap h2 {
          font-family: var(--font-display); font-size: clamp(36px,6vw,86px);
          font-weight: 800; letter-spacing: -0.045em; color: var(--ink); line-height: 0.94;
        }
        .sp-cta-wrap h2 em { font-style: normal; -webkit-text-stroke: 1.5px var(--ink); color: transparent; }
        .sp-cta-right { display: flex; flex-direction: column; gap: 20px; align-items: flex-start; }
        .sp-cta-note { font-size: 14px; color: var(--ink-2); line-height: 1.8; max-width: 360px; }
        .sp-cta-btns { display: flex; gap: 12px; flex-wrap: wrap; }
        .btn-ink {
          display: inline-flex; align-items: center; gap: 9px;
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.12em;
          text-transform: uppercase; padding: 13px 26px;
          background: var(--ink); color: var(--bg); transition: opacity var(--t-fast);
        }
        .btn-ink:hover { opacity: 0.82; }
        .btn-ghost-dark {
          display: inline-flex; align-items: center; gap: 9px;
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.12em;
          text-transform: uppercase; padding: 13px 26px;
          border: 1.5px solid var(--line-dark); color: var(--ink-2); transition: all var(--t-fast);
        }
        .btn-ghost-dark:hover { border-color: var(--ink); color: var(--ink); }

        /* ══ RESPONSIVE ══ */
        @media (max-width: 1024px) {
          .sp-hero           { grid-template-columns: 1fr; }
          .sp-hero-right     { border-left: none; border-top: 1px solid var(--line); padding: 40px 0; width: 95%; margin: 0 auto; background: transparent; }
          .sp-overview-inner { grid-template-columns: 1fr; gap: 40px; }
          .sp-ov-left        { position: static; }
          .del-grid          { grid-template-columns: 1fr 1fr; }
          .del-card:nth-child(3n)        { border-right: 1px solid var(--line); }
          .del-card:nth-child(2n)        { border-right: none; }
          .del-card:nth-last-child(-n+3) { border-bottom: 1px solid var(--line); }
          .del-card:nth-last-child(-n+2) { border-bottom: none; }
          .sp-proc-right     { grid-template-columns: 1fr; gap: 8px; }
          .results-grid      { grid-template-columns: repeat(2,1fr); }
          .result-item:nth-child(2) { border-right: none; }
          .result-item:nth-child(3) { border-right: 1px solid rgba(255,255,255,0.08); border-top: 1px solid rgba(255,255,255,0.08); }
          .result-item:nth-child(4) { border-top: 1px solid rgba(255,255,255,0.08); }
          .sp-suited-inner   { grid-template-columns: 1fr; gap: 40px; }
          .rel-grid          { grid-template-columns: 1fr 1fr; }
          .rel-card:last-child { border-right: none; border-top: 1px solid var(--line); grid-column: span 2; }
          .sp-cta-wrap       { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 768px) {
          .sp-hero h1     { font-size: clamp(44px,12vw,80px); }
          .sp-hero-num    { display: none; }
          .del-grid       { grid-template-columns: 1fr; }
          .del-card       { border-right: none; }
          .sp-proc-item   { grid-template-columns: 48px 1fr; padding: 24px 20px; gap: 16px; }
          .results-grid   { grid-template-columns: 1fr; }
          .result-item    { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); }
          .result-item:last-child { border-bottom: none; }
          .rel-grid       { grid-template-columns: 1fr; }
          .rel-card       { border-right: none; border-bottom: 1px solid var(--line); }
          .rel-card:last-child { border-bottom: none; grid-column: span 1; }
          .sp-meta-item   { padding: 10px 16px; }
        }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section className="sp-hero">
        <div className="sp-hero-bg" />
        <div className="sp-hero-num">{data.num}</div>

        <div className="sp-hero-left">
          <div className="sp-breadcrumb sp-hero-sub">
            <Link href="/services">Services</Link>
            <span className="sp-breadcrumb-sep">/</span>
            <span>{data.title}</span>
          </div>
          <div className="sp-hero-icon sp-hero-sub">
            <Icon size={22} strokeWidth={1.5} />
          </div>
          <h1 ref={h1Ref}>
            {data.title.split(" ").map((word, i, arr) => (
              <span key={i}>
                {i === arr.length - 1 ? <em>{word}</em> : <>{word} </>}
              </span>
            ))}
          </h1>
          <p className="sp-hero-tagline sp-hero-sub">{data.tagline}</p>
          <p className="sp-hero-desc sp-hero-sub">{data.heroDesc}</p>
          <div className="sp-hero-meta sp-hero-sub">
            <div className="sp-meta-item">
              <span className="sp-meta-label">Starting At</span>
              <span className="sp-meta-val">{data.price}</span>
            </div>
            <div className="sp-meta-item">
              <span className="sp-meta-label">Timeline</span>
              <span className="sp-meta-val">{data.duration}</span>
            </div>
            <div className="sp-meta-item">
              <span className="sp-meta-label">Deliverables</span>
              <span className="sp-meta-val">
                {data.deliverables.length} Items
              </span>
            </div>
          </div>
        </div>

        <div className="sp-hero-right">
          <p className="sp-tag-label">Tech Stack</p>
          <div className="sp-tags">
            {data.tags.map((t) => (
              <span key={t} className="sp-tag">
                {t}
              </span>
            ))}
          </div>
          <Link
            href={`https://wa.me/916360812808?text=Hi! I'm interested in your ${data.title} service.`}
            target="_blank"
            rel="noopener noreferrer"
            className="sp-cta-primary"
          >
            Get a Quote <ArrowUpRight size={14} strokeWidth={2} />
          </Link>
          <Link href="/contact" className="sp-cta-secondary">
            Contact Me <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </section>

      {/* ═══ TICKER ═══ */}
      <div className="sp-ticker">
        <div className="sp-ticker-track">
          {[...data.tags, ...data.tags, ...data.tags, ...data.tags].map(
            (t, i) => (
              <div key={i} className="sp-ticker-item">
                <span className="sp-ticker-dot" />
                {t}
              </div>
            ),
          )}
        </div>
      </div>

      {/* ═══ OVERVIEW ═══ */}
      <section className="sp-overview">
        <div className="sp-overview-inner">
          <div className="sp-ov-left">
            <p className="sp-ov-eyebrow">What this is</p>
            <h2 className="sp-ov-title">
              The full
              <br />
              <em>picture.</em>
            </h2>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "var(--font-mono)",
                fontSize: "10.5px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "11px 22px",
                background: "var(--ink)",
                color: "var(--bg)",
                transition: "opacity var(--t-fast)",
              }}
            >
              Start a Project <ArrowRight size={13} strokeWidth={2} />
            </Link>
          </div>
          <div className="ov-block">
            {data.overview.map((para, i) => (
              <p
                key={i}
                className="ov-para"
                dangerouslySetInnerHTML={{
                  __html: para.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DELIVERABLES ═══ */}
      <section className="sp-del">
        <div className="sp-del-wrap">
          <div className="sp-del-header">
            <div>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                  marginBottom: "10px",
                }}
              >
                What you receive
              </p>
              <h2>
                Every
                <br />
                <em>deliverable.</em>
              </h2>
            </div>
          </div>
          <div className="del-grid">
            {data.deliverables.map(({ title, desc }, i) => (
              <div key={title} className="del-card">
                <span className="del-num">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="sp-process">
        <div className="sp-process-wrap">
          <div className="sp-process-header">
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--ink-3)",
                marginBottom: "10px",
              }}
            >
              Step by step
            </p>
            <h2>
              How it
              <br />
              <em>works.</em>
            </h2>
          </div>
          <div className="sp-process-list">
            <div className="sp-process-spine" />
            <div className="sp-process-progress" ref={progressRef} />
            {data.process.map(({ num, title, desc }) => (
              <div key={num} className="sp-proc-item">
                <span className="sp-proc-num">{num}</span>
                <div className="sp-proc-right">
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RESULTS ═══ */}
      <section className="sp-results">
        <div className="sp-results-wrap">
          <div className="sp-results-header">
            <p>Real numbers</p>
            <h2>
              Results that
              <br />
              <em>matter.</em>
            </h2>
          </div>
          <div className="results-grid">
            {data.results.map(({ val, label }) => (
              <div key={label} className="result-item">
                <div className="result-val">{val}</div>
                <div className="result-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SUITED FOR ═══ */}
      <section className="sp-suited">
        <div className="sp-suited-wrap">
          <div className="sp-suited-inner">
            <div className="sp-suited-left">
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                  marginBottom: "10px",
                }}
              >
                Is this for you?
              </p>
              <h2>
                Best
                <br />
                <em>suited for.</em>
              </h2>
              <p>
                This service is designed for a specific type of client. If you
                see yourself in this list, we`re a good fit.
              </p>
              <Link
                href={`https://wa.me/916360812808?text=Hi! I want to know more about your ${data.title} service.`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "10.5px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "11px 22px",
                  background: "var(--ink)",
                  color: "var(--bg)",
                  transition: "opacity var(--t-fast)",
                }}
              >
                Ask Me Anything <ArrowUpRight size={13} strokeWidth={2} />
              </Link>
            </div>
            <div>
              <div className="suited-list">
                {data.suited.map((item) => (
                  <div key={item} className="suited-item">
                    {item}
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.5}
                      className="suited-arrow"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ RELATED ═══ */}
      <section className="sp-related">
        <div className="sp-related-wrap">
          <div className="sp-related-header">
            <p>Explore more</p>
            <h2>Related Services</h2>
          </div>
          <div className="rel-grid">
            {related.map((svc) => {
              const RelIcon = iconMap[svc.iconName] ?? Brain;
              return (
                <Link
                  key={svc.slug}
                  href={`/services/${svc.slug}`}
                  className="rel-card"
                >
                  <div className="rel-icon">
                    <RelIcon size={18} strokeWidth={1.5} />
                  </div>
                  <span className="rel-num">{svc.num}</span>
                  <h3>{svc.title}</h3>
                  <p>{svc.tagline}</p>
                  <div className="rel-link">
                    View Service <ArrowRight size={12} strokeWidth={2} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="sp-cta-section">
        <div className="sp-cta-wrap">
          <h2>
            Ready to start
            <br />
            <em>this project?</em>
          </h2>
          <div className="sp-cta-right">
            <p className="sp-cta-note">
              Tell me your project details and I`ll respond with a clear scope
              and fixed quote within 2 hours. No commitment required.
            </p>
            <div className="sp-cta-btns">
              <Link href="/contact" className="btn-ink">
                Start a Project <ArrowRight size={14} strokeWidth={2} />
              </Link>
              <Link
                href={`https://wa.me/916360812808?text=Hi! I want to discuss your ${data.title} service.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-dark"
              >
                WhatsApp Me <ArrowUpRight size={14} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
