"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Globe,
  BarChart2,
  Layers,
  Database,
  Zap,
  CheckCircle2,
  Clock,
  Users,
  Award,
  Phone,
  FileText,
  Hammer,
  PackageCheck,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const services = [
  {
    icon: Brain,
    num: "01",
    title: "ML Engineering",
    desc: "End-to-end production AI/ML — NLP, CV, time series, chatbots. From raw data to deployed API.",
    href: "/services/ml-projects",
  },
  {
    icon: Globe,
    num: "02",
    title: "Websites",
    desc: "Fast, mobile-first, SEO-optimized websites. 90+ Lighthouse score. Delivered in 3–7 days.",
    href: "/services/websites",
  },
  {
    icon: BarChart2,
    num: "03",
    title: "AI Audit",
    desc: "Deep review of your ML pipeline. Identify gaps, reduce cost, get a clear written action plan.",
    href: "/services/ai-audit",
  },
  {
    icon: Layers,
    num: "04",
    title: "Streamlit Apps",
    desc: "Shareable ML web apps for researchers, students, and early-stage startups. Ship fast.",
    href: "/services/streamlit-apps",
  },
  {
    icon: Database,
    num: "05",
    title: "Data Annotation",
    desc: "High-quality labeled datasets for NLP, CV, and classification. Production-ready.",
    href: "/services/data-annotation",
  },
];

const stats = [
  { value: "3+", label: "Years in ML", icon: Award },
  { value: "40+", label: "Projects Delivered", icon: CheckCircle2 },
  { value: "≤2h", label: "Avg. Response Time", icon: Clock },
  { value: "100%", label: "Client Satisfaction", icon: Users },
];

const stack = [
  "Python",
  "PyTorch",
  "TensorFlow",
  "Hugging Face",
  "FastAPI",
  "Docker",
  "spaCy",
  "scikit-learn",
  "Streamlit",
  "Gradio",
  "PostgreSQL",
  "Next.js",
  "MLOps",
  "LLM Integration",
  "Computer Vision",
  "Langchain",
  "Pandas",
  "NumPy",
];

// const works = [
//   {
//     title: "Resume Screener AI",
//     tag: "NLP · Python",
//     year: "2025",
//     desc: "Automated screening for 500+ resumes/day for a Bengaluru staffing firm.",
//   },
//   {
//     title: "D2C Analytics Dashboard",
//     tag: "ML · FastAPI",
//     year: "2025",
//     desc: "Real-time sales forecasting and customer segmentation for a D2C brand.",
//   },
//   {
//     title: "Chatbot for Staffing",
//     tag: "LLM · Streamlit",
//     year: "2024",
//     desc: "GPT-powered FAQ and candidate intake bot reducing HR workload by 60%.",
//   },
//   {
//     title: "CV Defect Detector",
//     tag: "Computer Vision",
//     year: "2024",
//     desc: "Manufacturing defect detection model with 96.4% accuracy on edge devices.",
//   },
// ];

const process = [
  {
    num: "01",
    icon: Phone,
    title: "Discovery Call",
    desc: "30-min scoping session to understand your problem, data, and expected outcomes.",
  },
  {
    num: "02",
    icon: FileText,
    title: "Proposal & Scope",
    desc: "Clear written scope with timeline, deliverables, and fixed pricing. No surprises.",
  },
  {
    num: "03",
    icon: Hammer,
    title: "Build & Iterate",
    desc: "Regular check-ins, demos, and fast iterations. You see progress every few days.",
  },
  {
    num: "04",
    icon: PackageCheck,
    title: "Deliver & Support",
    desc: "Full source code, documentation, and 2 weeks of post-delivery support included.",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // ── Hero
  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (!h1Ref.current || !tagRef.current) return;

      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(tagRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      document.fonts.ready.then(() => {
        if (!h1Ref.current) return;

        const split = SplitText.create(h1Ref.current, {
          type: "lines,words",
          mask: "lines",
        });

        tl.from(split.words, {
          yPercent: 110,
          opacity: 0,
          duration: 1,
          stagger: 0.04,
          ease: "expo.out",
        });

        if (subRef.current) {
          tl.from(subRef.current, {
            y: 28,
            opacity: 0,
            duration: 0.8,
          }, "-=0.6");
        }

        if (metaRef.current) {
          tl.from([...metaRef.current.children], {
            y: 16,
            opacity: 0,
            stagger: 0.08,
          }, "-=0.5");
        }

        if (ctaRef.current) {
          tl.from([...ctaRef.current.children], {
            y: 16,
            opacity: 0,
            stagger: 0.1,
          }, "-=0.4");
        }

        if (lineRef.current) {
          tl.from(lineRef.current, {
            opacity: 0,
            duration: 0.5,
          }, "-=0.2");
        }
      });

      if (heroRef.current) {
        gsap.to(heroRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // ── Stats
  useGSAP(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".stat-item");
      if (!items.length) return;

      gsap.from(items, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: items[0],
          start: "top 90%",
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // ── Services
  useGSAP(() => {
    const ctx = gsap.context(() => {
     const cards = gsap.utils.toArray<HTMLElement>(".svc-card");
      if (!cards.length) return;

      gsap.from(cards, {
        y: 48,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cards[0],
          start: "top 85%",
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // // ── Work
  // useGSAP(() => {
  //   gsap.fromTo(
  //     ".work-card",
  //     { y: 56, opacity: 0 },
  //     {
  //       y: 0,
  //       opacity: 1,
  //       duration: 0.85,
  //       stagger: 0.1,
  //       ease: "power3.out",
  //       scrollTrigger: { trigger: ".work-grid", start: "top 84%" },
  //     },
  //   );
  // }, []);

  // ── Process — scrub-driven flowchart
  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: progressRef.current.parentElement,
              start: "top 70%",
              end: "bottom 80%",
              scrub: 0.6,
            },
          }
        );
      }

      const steps = gsap.utils.toArray<HTMLElement>(".process-step");

      steps.forEach((step, i) => {
        const icon = step.querySelector(".process-icon-wrap");
        const content = step.querySelector(".process-content");

        if (!icon || !content) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 82%",
          },
        });

        tl.fromTo(
          icon,
          { scale: 0.4, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
        ).fromTo(
          content,
          { x: i % 2 === 0 ? -32 : 32, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.25"
        );
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // ── CTA
  useGSAP(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".cta-inner > *");
      if (!items.length) return;

      gsap.from(items, {
        y: 36,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: items[0],
          start: "top 85%",
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        /* ── BASE WIDTH ── */
        .w95 { width: 95%; max-width: 1800px; margin: 0 auto; }

        /* ══════════════════════════════════
           HERO
        ══════════════════════════════════ */
        .hero {
          min-height: 100svh;
          display: flex; align-items: center;
          position: relative; overflow: hidden;
          background: var(--bg);
          padding-top: var(--nav-h);
        }
        .hero-wrap {
          width: 95%; max-width: 1800px;
          margin: 0 auto;
          position: relative; z-index: 1;
          padding: 60px 0;
        }
        .hero-tag {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--ink-3); border: 1px solid var(--line);
          padding: 6px 13px; margin-bottom: 32px;
        }
        .hero-tag-dot {
          width: 6px; height: 6px; background: var(--ink);
          border-radius: 50%;
          animation: blink 2s ease-in-out infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }

        .hero h1 {
          font-family: var(--font-display);
          font-size: clamp(44px, 9vw, 130px);
          font-weight: 800; letter-spacing: -0.045em;
          line-height: 0.92; color: var(--ink); margin-bottom: 32px;
        }
        .hero h1 .outline-text {
          -webkit-text-stroke: 1.5px var(--ink); color: transparent;
        }
        .hero-sub {
          font-size: clamp(14px, 1.4vw, 18px); color: var(--ink-2);
          max-width: 540px; line-height: 1.8; margin-bottom: 40px;
        }
        .hero-meta {
          display: flex; gap: 36px; margin-bottom: 40px; flex-wrap: wrap;
        }
        .hero-meta-item { display: flex; flex-direction: column; gap: 3px; }
        .hero-meta-val {
          font-family: var(--font-display); font-size: clamp(20px, 2.5vw, 28px);
          font-weight: 800; letter-spacing: -0.04em; color: var(--ink); line-height: 1;
        }
        .hero-meta-label {
          font-family: var(--font-mono); font-size: 9.5px;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3);
        }
        .hero-meta-divider { width: 1px; background: var(--line); align-self: stretch; }
        .hero-cta { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }

        /* Buttons */
        .btn-primary {
          display: inline-flex; align-items: center; gap: 9px;
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 13px 26px; background: var(--ink); color: var(--bg);
          transition: opacity var(--t-fast);
        }
        .btn-primary:hover { opacity: 0.82; }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 9px;
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 13px 26px; border: 1.5px solid var(--line-dark);
          color: var(--ink-2);
          transition: border-color var(--t-fast), color var(--t-fast);
        }
        .btn-ghost:hover { border-color: var(--ink); color: var(--ink); }

        /* Hero BG */
        .hero-bg { position: absolute; inset: 0; pointer-events: none; }
        .hero-bg-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(var(--line) 1px, transparent 1px),
            linear-gradient(90deg, var(--line) 1px, transparent 1px);
          background-size: 72px 72px; opacity: 0.55;
        }
        .hero-number {
          position: absolute; right: 2%; bottom: 6%;
          font-family: var(--font-display);
          font-size: clamp(120px, 18vw, 260px);
          font-weight: 800; letter-spacing: -0.06em;
          color: transparent; -webkit-text-stroke: 1px var(--line);
          line-height: 1; user-select: none; pointer-events: none; z-index: 0;
        }
        .scroll-ind {
          position: absolute; bottom: 28px; right: 5%;
          display: flex; align-items: center; gap: 10px; z-index: 2;
        }
        .scroll-ind span {
          font-family: var(--font-mono); font-size: 9px;
          letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-3);
        }
        .scroll-line {
          width: 44px; height: 1px;
          background: linear-gradient(to right, var(--ink-3), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse { 0%,100%{transform:scaleX(1);opacity:1} 50%{transform:scaleX(0.4);opacity:0.3} }

        /* ══════════════════════════════════
           STATS
        ══════════════════════════════════ */
        .stats-bar {
          border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
          background: var(--bg-2);
        }
        .stats-inner {
          width: 95%; max-width: 1800px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(4, 1fr);
        }
        .stat-item {
          padding: 40px 36px; border-right: 1px solid var(--line);
          display: flex; flex-direction: column; gap: 10px;
        }
        .stat-item:last-child { border-right: none; }
        .stat-icon { color: var(--ink-3); }
        .stat-val {
          font-family: var(--font-display);
          font-size: clamp(32px, 3.5vw, 52px);
          font-weight: 800; letter-spacing: -0.04em; color: var(--ink); line-height: 1;
        }
        .stat-label {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3);
        }

        /* ══════════════════════════════════
           SECTION COMMON
        ══════════════════════════════════ */
        .section-wrap { width: 95%; max-width: 1800px; margin: 0 auto; }
        .section-header {
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 24px; margin-bottom: 48px;
        }
        .section-eyebrow {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--ink-3); margin-bottom: 10px;
        }
        .section-title {
          font-family: var(--font-display); font-size: clamp(28px, 4vw, 56px);
          font-weight: 800; letter-spacing: -0.04em; color: var(--ink); line-height: 1;
        }

        /* ══════════════════════════════════
           SERVICES
        ══════════════════════════════════ */
        .services-section { padding: 100px 0; background: var(--bg); }
        .svc-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          border: 1px solid var(--line); overflow: hidden;
        }
        .svc-card {
          background: var(--bg); padding: 36px 32px;
          display: flex; flex-direction: column; gap: 18px;
          position: relative; overflow: hidden; transition: background var(--t);
          border-right: 1px solid var(--line); border-bottom: 1px solid var(--line);
        }
        .svc-card:nth-child(3n)        { border-right: none; }
        .svc-card:nth-last-child(-n+3) { border-bottom: none; }
        .svc-card::after {
          content: ''; position: absolute;
          bottom: 0; left: 0; right: 0; height: 2px;
          background: var(--ink); transform: scaleX(0); transform-origin: left;
          transition: transform var(--t);
        }
        .svc-card:hover { background: var(--bg-2); }
        .svc-card:hover::after { transform: scaleX(1); }
        .svc-icon {
          width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--line); color: var(--ink-3);
          transition: border-color var(--t), color var(--t), background var(--t);
        }
        .svc-card:hover .svc-icon { border-color: var(--ink); color: var(--ink); background: var(--bg-3); }
        .svc-num { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); }
        .svc-card h3 { font-family: var(--font-display); font-size: 19px; font-weight: 700; letter-spacing: -0.03em; color: var(--ink); }
        .svc-card p  { font-size: 13.5px; color: var(--ink-2); line-height: 1.72; flex: 1; }
        .svc-arrow {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-3);
          transition: color var(--t-fast), gap var(--t-fast); margin-top: auto;
        }
        .svc-card:hover .svc-arrow { color: var(--ink); gap: 12px; }

        /* ══════════════════════════════════
           MARQUEE
        ══════════════════════════════════ */
        .marquee-section {
          padding: 20px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
          background: var(--bg); overflow: hidden;
        }
        .marquee-track { display: flex; width: max-content; animation: marquee 32s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        .marquee-item {
          display: flex; align-items: center; gap: 12px; padding: 0 28px;
          font-family: var(--font-mono); font-size: 10.5px;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-3); white-space: nowrap;
        }
        .marquee-sep { width: 3px; height: 3px; background: var(--ink-3); flex-shrink: 0; }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        /* ══════════════════════════════════
           WORK
        ══════════════════════════════════ */
        .work-section { padding: 100px 0; background: var(--bg-2); }
        .work-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          border: 1px solid var(--line); overflow: hidden;
        }
        .work-card {
          background: var(--bg-2); padding: 44px 40px;
          display: flex; flex-direction: column; gap: 28px;
          transition: background var(--t);
          border-right: 1px solid var(--line); border-bottom: 1px solid var(--line);
          min-height: 240px; position: relative; overflow: hidden;
        }
        .work-card:nth-child(2n)        { border-right: none; }
        .work-card:nth-last-child(-n+2) { border-bottom: none; }
        .work-card:hover { background: var(--bg); }
        .work-card-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .work-card-year {
          font-family: var(--font-mono); font-size: 10px;
          color: var(--ink-3); letter-spacing: 0.1em;
          border: 1px solid var(--line); padding: 4px 10px;
        }
        .work-card h3 {
          font-family: var(--font-display); font-size: clamp(18px, 2.2vw, 28px);
          font-weight: 700; letter-spacing: -0.035em; color: var(--ink); line-height: 1.1;
        }
        .work-card-desc { font-size: 13.5px; color: var(--ink-2); line-height: 1.7; }
        .work-card-bottom { display: flex; align-items: center; justify-content: space-between; margin-top: auto; }
        .work-card-tag {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--ink-3); border: 1px solid var(--line); padding: 5px 11px;
        }
        .work-card-arrow {
          width: 36px; height: 36px; border: 1px solid var(--line);
          display: flex; align-items: center; justify-content: center;
          color: var(--ink-3); transition: all var(--t-fast); flex-shrink: 0;
        }
        .work-card:hover .work-card-arrow { background: var(--ink); border-color: var(--ink); color: var(--bg); }

        /* ══════════════════════════════════
           PROCESS — FLOWCHART
        ══════════════════════════════════ */
        .process-section { padding: 100px 0; background: var(--bg); }
        .process-list {
          position: relative;
          display: flex; flex-direction: column; gap: 0;
        }
        /* Vertical spine */
        .process-spine {
          position: absolute;
          left: 50%; top: 40px; bottom: 40px;
          width: 1px; background: var(--line);
          transform: translateX(-50%);
        }
        /* Scrub-driven progress line */
        .process-progress {
          position: absolute;
          left: 50%; top: 40px; bottom: 40px;
          width: 1px; background: var(--ink);
          transform: translateX(-50%) scaleY(0);
          transform-origin: top center;
          z-index: 1;
        }
        .process-step {
          display: grid;
          grid-template-columns: 1fr 60px 1fr;
          align-items: center;
          gap: 0;
          padding: 40px 0;
          position: relative;
        }
        /* Icon in center column */
        .process-icon-wrap {
          width: 60px; height: 60px;
          background: var(--bg);
          border: 1px solid var(--line);
          display: flex; align-items: center; justify-content: center;
          color: var(--ink-3);
          position: relative; z-index: 2;
          transition: border-color var(--t), color var(--t), background var(--t);
          justify-self: center;
        }
        .process-step:hover .process-icon-wrap {
          border-color: var(--ink); color: var(--ink); background: var(--bg-2);
        }
        /* Content alternates left / right */
        .process-content-left {
          text-align: right; padding-right: 40px;
        }
        .process-content-right {
          text-align: left; padding-left: 40px;
        }
        .process-empty { /* placeholder for opposing side */ }
        .process-num {
          font-family: var(--font-mono); font-size: 9.5px;
          letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-3);
          margin-bottom: 8px; display: block;
        }
        .process-step h3 {
          font-family: var(--font-display); font-size: clamp(16px, 1.8vw, 20px);
          font-weight: 700; letter-spacing: -0.025em; color: var(--ink); margin-bottom: 8px;
        }
        .process-step p {
          font-size: 13.5px; color: var(--ink-2); line-height: 1.7; max-width: 320px;
        }
        .process-content-left p { margin-left: auto; }

        /* ══════════════════════════════════
           CTA
        ══════════════════════════════════ */
        .cta-section {
          padding: 120px 0; background: var(--ink);
          position: relative; overflow: hidden;
        }
        .cta-section::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 72px 72px;
        }
        .cta-inner {
          width: 95%; max-width: 1800px; margin: 0 auto;
          position: relative; z-index: 1;
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 48px; flex-wrap: wrap;
        }
        .cta-inner h2 {
          font-family: var(--font-display);
          font-size: clamp(36px, 7vw, 96px);
          font-weight: 800; letter-spacing: -0.045em; color: #fff; line-height: 0.94;
        }
        .cta-inner h2 em {
          font-style: normal;
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.5); color: transparent;
        }
        .cta-right { display: flex; flex-direction: column; gap: 20px; align-items: flex-start; }
        .cta-sub { font-size: 15px; color: rgba(255,255,255,0.5); line-height: 1.7; max-width: 380px; }
        .cta-btns { display: flex; gap: 12px; flex-wrap: wrap; }
        .btn-white {
          display: inline-flex; align-items: center; gap: 9px;
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 13px 26px; background: #fff; color: var(--ink);
          transition: opacity var(--t-fast);
        }
        .btn-white:hover { opacity: 0.88; }
        .btn-outline-white {
          display: inline-flex; align-items: center; gap: 9px;
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 13px 26px; border: 1.5px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.7);
          transition: border-color var(--t-fast), color var(--t-fast);
        }
        .btn-outline-white:hover { border-color: rgba(255,255,255,0.6); color: #fff; }

        /* ══════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════ */
        @media (max-width: 1024px) {
          .svc-grid { grid-template-columns: 1fr 1fr; }
          .svc-card:nth-child(3n)        { border-right: 1px solid var(--line); }
          .svc-card:nth-child(2n)        { border-right: none; }
          .svc-card:nth-last-child(-n+3) { border-bottom: 1px solid var(--line); }
          .svc-card:nth-last-child(-n+2) { border-bottom: none; }
          .stats-inner { grid-template-columns: repeat(2, 1fr); }
          .stat-item:nth-child(2) { border-right: none; }
          .stat-item:nth-child(3) { border-right: 1px solid var(--line); border-top: 1px solid var(--line); }
          .stat-item:nth-child(4) { border-top: 1px solid var(--line); }
        }

        @media (max-width: 768px) {
          /* Services */
          .svc-grid { grid-template-columns: 1fr; }
          .svc-card { border-right: none; }
          .svc-card:nth-child(3n)        { border-right: none; }
          .svc-card:nth-child(2n)        { border-right: none; }
          .svc-card:nth-last-child(-n+3) { border-bottom: 1px solid var(--line); }
          .svc-card:last-child           { border-bottom: none; }

          /* Work */
          .work-grid { grid-template-columns: 1fr; }
          .work-card { border-right: none; }
          .work-card:nth-last-child(-n+2) { border-bottom: 1px solid var(--line); }
          .work-card:last-child { border-bottom: none; }

          /* Stats */
          .stats-inner { grid-template-columns: 1fr 1fr; }

          /* Section header */
          .section-header { flex-direction: column; align-items: flex-start; }

          /* Hero */
          .hero-meta { gap: 20px; }
          .hero-meta-divider { display: none; }
          .hero-number { display: none; }

          /* CTA */
          .cta-inner { flex-direction: column; align-items: flex-start; }

          /* Process — collapse to single column on mobile */
          .process-spine,
          .process-progress { left: 24px; transform: none; }
          .process-step {
            grid-template-columns: 48px 1fr;
            grid-template-rows: auto auto;
            gap: 16px;
            padding: 28px 0 28px 0;
          }
          .process-icon-wrap {
            width: 48px; height: 48px;
            grid-column: 1; grid-row: 1;
            justify-self: start;
          }
          .process-content-left,
          .process-content-right {
            grid-column: 2; grid-row: 1;
            text-align: left;
            padding: 0 0 0 16px;
          }
          .process-empty { display: none; }
          .process-content-left p { margin-left: 0; }
        }

        @media (max-width: 480px) {
          .stats-inner { grid-template-columns: 1fr; }
          .stat-item { border-right: none; border-bottom: 1px solid var(--line); }
          .stat-item:last-child { border-bottom: none; }
          .hero-cta { flex-direction: column; align-items: flex-start; }
          .hero-cta a { width: 100%; justify-content: center; }
        }
      `}</style>

      {/* ═══════════ HERO ═══════════ */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg">
          <div className="hero-bg-grid" />
          <div className="hero-number">AI</div>
        </div>
        <div className="hero-wrap">
          <div className="hero-tag" ref={tagRef}>
            <span className="hero-tag-dot" />
            <Zap size={10} strokeWidth={2} />
            Available for freelance · Bengaluru
          </div>
          <h1 ref={h1Ref} style={{ opacity: 0 }}>
            Building AI
            <br />
            that <span className="outline-text">actually</span>
            <br />
            works.
          </h1>
          <p className="hero-sub" ref={subRef} style={{ opacity: 0 }}>
            ML Engineer & AI Freelancer from Bengaluru. I design and build
            production-grade AI systems — NLP pipelines, computer vision models,
            intelligent web tools — that solve real business problems and ship
            on time.
          </p>
          <div className="hero-meta" ref={metaRef} style={{ opacity: 0 }}>
            <div className="hero-meta-item">
              <span className="hero-meta-val">3+</span>
              <span className="hero-meta-label">Years in ML</span>
            </div>
            <div className="hero-meta-divider" />
            <div className="hero-meta-item">
              <span className="hero-meta-val">40+</span>
              <span className="hero-meta-label">Projects Delivered</span>
            </div>
            <div className="hero-meta-divider" />
            <div className="hero-meta-item">
              <span className="hero-meta-val">≤2h</span>
              <span className="hero-meta-label">Response Time</span>
            </div>
            <div className="hero-meta-divider" />
            <div className="hero-meta-item">
              <span className="hero-meta-val">5</span>
              <span className="hero-meta-label">Services</span>
            </div>
          </div>
          <div className="hero-cta" ref={ctaRef} style={{ opacity: 0 }}>
            <Link href="/contact" className="btn-primary">
              Start a Project <ArrowRight size={14} strokeWidth={2} />
            </Link>
            <Link href="/work" className="btn-ghost">
              View My Work <ArrowRight size={14} strokeWidth={2} />
            </Link>
            <Link href="/services" className="btn-ghost">
              Services <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </div>
        </div>
        <div className="scroll-ind" ref={lineRef} style={{ opacity: 0 }}>
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <div className="stats-bar">
        <div className="stats-inner">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="stat-item">
              <Icon size={16} strokeWidth={1.5} className="stat-icon" />
              <div className="stat-val">{value}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════ SERVICES ═══════════ */}
      <section className="services-section">
        <div className="section-wrap">
          <div className="section-header">
            <div>
              <div className="section-eyebrow">What I do</div>
              <h2 className="section-title">Services</h2>
            </div>
            <Link
              href="/services"
              className="btn-ghost"
              style={{ flexShrink: 0 }}
            >
              All Services <ArrowRight size={13} strokeWidth={2} />
            </Link>
          </div>
          <div className="svc-grid">
            {services.map(({ icon: Icon, num, title, desc, href }) => (
              <Link key={num} href={href} className="svc-card">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="svc-icon">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <span className="svc-num">{num}</span>
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <div className="svc-arrow">
                  View Service <ArrowRight size={12} strokeWidth={2} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ MARQUEE ═══════════ */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...stack, ...stack].map((item, i) => (
            <div key={i} className="marquee-item">
              <span className="marquee-sep" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════ WORK ═══════════
      <section className="work-section">
        <div className="section-wrap">
          <div className="section-header">
            <div>
              <div className="section-eyebrow">Selected projects</div>
              <h2 className="section-title">Work</h2>
            </div>
            <Link href="/work" className="btn-ghost" style={{ flexShrink: 0 }}>
              All Work <ArrowRight size={13} strokeWidth={2} />
            </Link>
          </div>
          <div className="work-grid">
            {works.map(({ title, tag, year, desc }) => (
              <Link key={title} href="/work" className="work-card">
                <div className="work-card-top">
                  <span className="work-card-year">{year}</span>
                  <div className="work-card-arrow">
                    <ArrowRight size={14} strokeWidth={2} />
                  </div>
                </div>
                <h3>{title}</h3>
                <p className="work-card-desc">{desc}</p>
                <div className="work-card-bottom">
                  <span className="work-card-tag">{tag}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section> */}

      {/* ═══════════ PROCESS FLOWCHART ═══════════ */}
      <section className="process-section">
        <div className="section-wrap">
          <div className="section-header">
            <div>
              <div className="section-eyebrow">How I work</div>
              <h2 className="section-title">Process</h2>
            </div>
          </div>

          <div className="process-list">
            {/* Static spine */}
            <div className="process-spine" />
            {/* Animated ink progress */}
            <div className="process-progress" ref={progressRef} />

            {process.map(({ num, icon: Icon, title, desc }, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={num} className="process-step">
                  {/* Left side */}
                  {isLeft ? (
                    <div className={`process-content process-content-left`}>
                      <span className="process-num">{num}</span>
                      <h3>{title}</h3>
                      <p>{desc}</p>
                    </div>
                  ) : (
                    <div className="process-empty" />
                  )}

                  {/* Center icon */}
                  <div className="process-icon-wrap">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>

                  {/* Right side */}
                  {!isLeft ? (
                    <div className={`process-content process-content-right`}>
                      <span className="process-num">{num}</span>
                      <h3>{title}</h3>
                      <p>{desc}</p>
                    </div>
                  ) : (
                    <div className="process-empty" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2>
            Ready to build
            <br />
            <em>something real?</em>
          </h2>
          <div className="cta-right">
            <p className="cta-sub">
              Tell me about your project. I respond within 2 hours and can start
              most projects within a week.
            </p>
            <div className="cta-btns">
              <Link href="/contact" className="btn-white">
                Start a Project <ArrowRight size={14} strokeWidth={2} />
              </Link>
              <Link href="/services" className="btn-outline-white">
                View Services <ArrowRight size={14} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
