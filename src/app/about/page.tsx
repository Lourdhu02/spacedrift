"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Clock,
  Zap,
  Code2,
  Brain,
  Globe,
  BarChart2,
  Layers,
  Database,
  ArrowUpRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

const skills = [
  { cat: "Languages", items: ["Python", "TypeScript", "SQL", "Bash"] },
  {
    cat: "ML/AI",
    items: [
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "Hugging Face",
      "spaCy",
      "LangChain",
      "OpenCV",
    ],
  },
  {
    cat: "Infra",
    items: ["FastAPI", "Docker", "PostgreSQL", "Redis", "Nginx", "Git"],
  },
  {
    cat: "Frontend",
    items: ["Next.js", "React", "Tailwind CSS", "GSAP", "HTML/CSS"],
  },
  {
    cat: "MLOps",
    items: ["MLflow", "Weights & Biases", "Streamlit", "Gradio", "Netlify"],
  },
];

const services = [
  { icon: Brain, label: "ML Engineering", href: "/services/ml-projects" },
  { icon: Globe, label: "Websites", href: "/services/websites" },
  { icon: BarChart2, label: "AI Audit", href: "/services/ai-audit" },
  { icon: Layers, label: "Streamlit Apps", href: "/services/streamlit-apps" },
  {
    icon: Database,
    label: "Data Annotation",
    href: "/services/data-annotation",
  },
];

const values = [
  {
    num: "01",
    title: "Production-First",
    desc: "I don't build demos. Every system I deliver is meant for real-world use and scale.",
  },
  {
    num: "02",
    title: "Direct & Transparent",
    desc: "You talk to me, not a team. Clear scope, honest pricing, no surprises ever.",
  },
  {
    num: "03",
    title: "Speed Without Fluff",
    desc: "Most projects delivered in days, not weeks. Speed without compromising on quality.",
  },
  {
    num: "04",
    title: "Full Ownership",
    desc: "You get all source files, documentation, and post-delivery support included.",
  },
];

export default function About() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const scrambleRef = useRef<HTMLSpanElement>(null);

  // ── Headline SplitText reveal
  useGSAP(() => {
    if (!headlineRef.current) return;
    document.fonts.ready.then(() => {
      const split = SplitText.create(headlineRef.current!, {
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

  // ── ScrambleText on sub-label
  useGSAP(() => {
    if (!scrambleRef.current) return;
    gsap.to(scrambleRef.current, {
      duration: 1.8,
      delay: 0.4,
      scrambleText: {
        text: "ML Engineer · AI Freelancer · Bengaluru",
        chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        speed: 0.4,
      },
    });
  }, []);

  // ── Info grid items fade up
  useGSAP(() => {
    gsap.fromTo(
      ".info-cell",
      { y: 32, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".info-grid", start: "top 85%" },
      },
    );
  }, []);

  // ── Bio paragraphs clip reveal
  useGSAP(() => {
    gsap.fromTo(
      ".bio-para",
      { clipPath: "inset(0% 0% 100% 0%)", opacity: 0 },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
        duration: 0.85,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: { trigger: ".bio-block", start: "top 82%" },
      },
    );
  }, []);

  // ── Skill rows slide in
  useGSAP(() => {
    gsap.fromTo(
      ".skill-row",
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".skills-section", start: "top 82%" },
      },
    );
  }, []);

  // ── Skill chips stagger
  useGSAP(() => {
    gsap.fromTo(
      ".chip",
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        stagger: 0.04,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: ".skills-section", start: "top 75%" },
      },
    );
  }, []);

  // ── Values stagger reveal
  useGSAP(() => {
    gsap.fromTo(
      ".value-item",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".values-grid", start: "top 84%" },
      },
    );
  }, []);

  // ── Services list
  useGSAP(() => {
    gsap.fromTo(
      ".svc-row",
      { x: 32, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: ".svc-list", start: "top 85%" },
      },
    );
  }, []);

  // ── CTA section
  useGSAP(() => {
    gsap.fromTo(
      ".about-cta > *",
      { y: 32, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-cta", start: "top 85%" },
      },
    );
  }, []);

  return (
    <>
      <style>{`
        /* ══════════════════════════════════
           HERO — Asymmetric split
        ══════════════════════════════════ */
        .about-hero {
          min-height: 100svh;
          display: grid;
          grid-template-columns: 1fr 420px;
          align-items: end;
          padding-top: var(--nav-h);
          border-bottom: 1px solid var(--line);
          background: var(--bg);
          position: relative;
          overflow: hidden;
        }
        .about-hero-bg-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(var(--line) 1px, transparent 1px),
            linear-gradient(90deg, var(--line) 1px, transparent 1px);
          background-size: 72px 72px; opacity: 0.5;
          pointer-events: none;
        }
        .about-hero-left {
          padding: 80px 0 80px 0;
          width: 95%; margin: 0 auto;
          position: relative; z-index: 1;
          display: flex; flex-direction: column; justify-content: flex-end;
          height: 100%;
        }
        .about-eyebrow {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--ink-3); margin-bottom: 28px;
          display: flex; align-items: center; gap: 10px;
        }
        .about-eyebrow::before {
          content: ''; display: inline-block;
          width: 28px; height: 1px; background: var(--ink-3);
        }
        .about-hero-left h1 {
          font-family: var(--font-display);
          font-size: clamp(52px, 8vw, 110px);
          font-weight: 800; letter-spacing: -0.045em; line-height: 0.92;
          color: var(--ink); margin-bottom: 40px;
        }
        .about-hero-left h1 em {
          font-style: normal;
          -webkit-text-stroke: 1.5px var(--ink); color: transparent;
        }
        .about-scramble {
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--ink-3); min-height: 20px;
        }

        /* Right panel */
        .about-hero-right {
          border-left: 1px solid var(--line);
          height: 100%; padding: 80px 40px;
          display: flex; flex-direction: column;
          justify-content: flex-end; gap: 0;
          background: var(--bg-2);
          position: relative; z-index: 1;
        }
        .about-stat-row {
          padding: 24px 0;
          border-bottom: 1px solid var(--line);
          display: flex; flex-direction: column; gap: 4px;
        }
        .about-stat-row:first-child { border-top: 1px solid var(--line); }
        .about-stat-val {
          font-family: var(--font-display);
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 800; letter-spacing: -0.04em; color: var(--ink); line-height: 1;
        }
        .about-stat-label {
          font-family: var(--font-mono); font-size: 9.5px;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3);
        }

        /* ══════════════════════════════════
           INFO GRID — 4 cells asymmetric
        ══════════════════════════════════ */
        .info-section { padding: 0; border-bottom: 1px solid var(--line); }
        .info-grid {
          width: 95%; max-width: 1800px; margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .info-cell {
          padding: 36px 32px;
          border-right: 1px solid var(--line);
          display: flex; flex-direction: column; gap: 8px;
        }
        .info-cell:last-child { border-right: none; }
        .info-cell-label {
          font-family: var(--font-mono); font-size: 9px;
          letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-3);
        }
        .info-cell-val {
          font-family: var(--font-body); font-size: 14px;
          font-weight: 600; color: var(--ink);
        }
        .info-cell-val a { color: var(--ink); transition: opacity var(--t-fast); }
        .info-cell-val a:hover { opacity: 0.6; }

        /* ══════════════════════════════════
           BIO — Asymmetric 2-col
        ══════════════════════════════════ */
        .bio-section {
          padding: 100px 0; border-bottom: 1px solid var(--line);
          background: var(--bg);
        }
        .bio-inner {
          width: 95%; max-width: 1800px; margin: 0 auto;
          display: grid; grid-template-columns: 2fr 3fr; gap: 80px;
          align-items: start;
        }
        .bio-left { position: sticky; top: calc(var(--nav-h) + 32px); }
        .bio-section-label {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--ink-3); margin-bottom: 20px;
        }
        .bio-section-title {
          font-family: var(--font-display);
          font-size: clamp(36px, 4vw, 56px);
          font-weight: 800; letter-spacing: -0.04em;
          color: var(--ink); line-height: 1; margin-bottom: 32px;
        }
        .bio-section-title em {
          font-style: normal;
          -webkit-text-stroke: 1px var(--ink); color: transparent;
        }
        .bio-block { display: flex; flex-direction: column; gap: 0; }
        .bio-para {
          font-size: 16px; color: var(--ink-2); line-height: 1.85;
          padding: 28px 0; border-bottom: 1px solid var(--line);
        }
        .bio-para:first-child { border-top: 1px solid var(--line); }
        .bio-para strong { color: var(--ink); font-weight: 600; }

        /* ══════════════════════════════════
           SKILLS — Full width rows
        ══════════════════════════════════ */
        .skills-section {
          padding: 100px 0; border-bottom: 1px solid var(--line);
          background: var(--bg-2);
        }
        .skills-wrap { width: 95%; max-width: 1800px; margin: 0 auto; }
        .skills-header {
          display: flex; align-items: flex-end;
          justify-content: space-between; margin-bottom: 48px;
        }
        .skills-table { border: 1px solid var(--line); overflow: hidden; }
        .skill-row {
          display: grid; grid-template-columns: 180px 1fr;
          border-bottom: 1px solid var(--line);
          align-items: center;
        }
        .skill-row:last-child { border-bottom: none; }
        .skill-cat {
          padding: 24px 28px; border-right: 1px solid var(--line);
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3);
        }
        .skill-chips {
          padding: 20px 28px;
          display: flex; flex-wrap: wrap; gap: 8px;
        }
        .chip {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 6px 14px; border: 1px solid var(--line);
          color: var(--ink-2); background: var(--bg);
          transition: border-color var(--t-fast), color var(--t-fast), background var(--t-fast);
          cursor: default;
        }
        .chip:hover { border-color: var(--ink); color: var(--ink); background: var(--bg-3); }

        /* ══════════════════════════════════
           VALUES — 2x2 grid
        ══════════════════════════════════ */
        .values-section {
          padding: 100px 0; border-bottom: 1px solid var(--line);
          background: var(--bg);
        }
        .values-wrap { width: 95%; max-width: 1800px; margin: 0 auto; }
        .values-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          border: 1px solid var(--line); overflow: hidden; margin-top: 48px;
        }
        .value-item {
          padding: 44px 40px;
          border-right: 1px solid var(--line); border-bottom: 1px solid var(--line);
          transition: background var(--t);
          position: relative; overflow: hidden;
        }
        .value-item:nth-child(2n) { border-right: none; }
        .value-item:nth-last-child(-n+2) { border-bottom: none; }
        .value-item:hover { background: var(--bg-2); }
        .value-item::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: var(--ink); transform: scaleX(0); transform-origin: left;
          transition: transform var(--t);
        }
        .value-item:hover::before { transform: scaleX(1); }
        .value-num {
          font-family: var(--font-mono); font-size: 9.5px;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--ink-3); margin-bottom: 16px; display: block;
        }
        .value-item h3 {
          font-family: var(--font-display); font-size: 20px;
          font-weight: 700; letter-spacing: -0.03em;
          color: var(--ink); margin-bottom: 12px;
        }
        .value-item p {
          font-size: 13.5px; color: var(--ink-2); line-height: 1.75;
        }

        /* ══════════════════════════════════
           SERVICES LIST
        ══════════════════════════════════ */
        .about-svc-section {
          padding: 100px 0; border-bottom: 1px solid var(--line);
          background: var(--bg-2);
        }
        .about-svc-wrap { width: 95%; max-width: 1800px; margin: 0 auto; }
        .svc-list { border: 1px solid var(--line); overflow: hidden; margin-top: 48px; }
        .svc-row {
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 28px 36px; border-bottom: 1px solid var(--line);
          transition: background var(--t), padding-left var(--t);
          position: relative; overflow: hidden;
        }
        .svc-row:last-child { border-bottom: none; }
        .svc-row::before {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
          background: var(--ink); transform: scaleY(0); transform-origin: bottom;
          transition: transform var(--t);
        }
        .svc-row:hover { background: var(--bg); padding-left: 44px; }
        .svc-row:hover::before { transform: scaleY(1); }
        .svc-row-left { display: flex; align-items: center; gap: 20px; }
        .svc-row-icon {
          width: 40px; height: 40px; border: 1px solid var(--line);
          display: flex; align-items: center; justify-content: center;
          color: var(--ink-3); transition: all var(--t);
          flex-shrink: 0;
        }
        .svc-row:hover .svc-row-icon { border-color: var(--ink); color: var(--ink); }
        .svc-row-label {
          font-family: var(--font-display); font-size: 18px;
          font-weight: 600; letter-spacing: -0.02em; color: var(--ink);
        }
        .svc-row-arrow { color: var(--ink-3); transition: color var(--t-fast), transform var(--t-fast); }
        .svc-row:hover .svc-row-arrow { color: var(--ink); transform: translate(4px,-4px); }

        /* ══════════════════════════════════
           CTA
        ══════════════════════════════════ */
        .about-cta-section {
          padding: 120px 0; background: var(--ink); position: relative; overflow: hidden;
        }
        .about-cta-section::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 72px 72px;
        }
        .about-cta {
          width: 95%; max-width: 1800px; margin: 0 auto;
          position: relative; z-index: 1;
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 48px; flex-wrap: wrap;
        }
        .about-cta h2 {
          font-family: var(--font-display);
          font-size: clamp(36px, 6vw, 86px);
          font-weight: 800; letter-spacing: -0.045em;
          color: #fff; line-height: 0.94;
        }
        .about-cta h2 em {
          font-style: normal;
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.45); color: transparent;
        }
        .cta-actions { display: flex; flex-direction: column; gap: 20px; align-items: flex-start; }
        .cta-note { font-size: 14px; color: rgba(255,255,255,0.45); line-height: 1.7; max-width: 340px; }
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
          .about-hero { grid-template-columns: 1fr; min-height: auto; padding-bottom: 0; }
          .about-hero-right { border-left: none; border-top: 1px solid var(--line); flex-direction: row; flex-wrap: wrap; padding: 32px 0; width: 95%; margin: 0 auto; background: transparent; }
          .about-stat-row { flex: 1; min-width: 120px; border-bottom: none; border-right: 1px solid var(--line); padding: 16px 24px; }
          .about-stat-row:last-child { border-right: none; }
          .about-stat-row:first-child { border-top: none; }
          .info-grid { grid-template-columns: repeat(2, 1fr); }
          .info-cell:nth-child(2n) { border-right: none; }
          .info-cell { border-bottom: 1px solid var(--line); }
          .info-cell:nth-last-child(-n+2) { border-bottom: none; }
          .bio-inner { grid-template-columns: 1fr; gap: 40px; }
          .bio-left { position: static; }
          .skill-row { grid-template-columns: 140px 1fr; }
          .values-grid { grid-template-columns: 1fr; }
          .value-item { border-right: none; }
          .value-item:nth-last-child(-n+2) { border-bottom: 1px solid var(--line); }
          .value-item:last-child { border-bottom: none; }
        }

        @media (max-width: 768px) {
          .about-hero-left h1 { font-size: clamp(40px, 12vw, 72px); }
          .about-hero-right { flex-direction: column; }
          .about-stat-row { border-right: none; border-bottom: 1px solid var(--line); }
          .info-grid { grid-template-columns: 1fr 1fr; }
          .skill-row { grid-template-columns: 1fr; }
          .skill-cat { border-right: none; border-bottom: 1px solid var(--line); }
          .about-cta { flex-direction: column; align-items: flex-start; }
          .svc-row { padding: 22px 20px; }
          .svc-row:hover { padding-left: 28px; }
        }

        @media (max-width: 480px) {
          .info-grid { grid-template-columns: 1fr; }
          .info-cell { border-right: none; border-bottom: 1px solid var(--line); }
          .info-cell:last-child { border-bottom: none; }
          .values-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ═══════════ HERO ═══════════ */}
      <section className="about-hero">
        <div className="about-hero-bg-grid" />

        <div className="about-hero-left">
          <div className="about-eyebrow">The person behind the work</div>
          <h1 ref={headlineRef}>
            ML Engineer.
            <br />
            <em>Problem</em>
            <br />
            Solver.
          </h1>
          <span className="about-scramble" ref={scrambleRef}>
            ................................
          </span>
        </div>

        <div className="about-hero-right">
          {[
            { val: "3+", label: "Years in ML" },
            { val: "40+", label: "Projects Delivered" },
            { val: "5", label: "Services Offered" },
            { val: "≤2h", label: "Response Time" },
            { val: "100%", label: "Client Satisfaction" },
          ].map(({ val, label }) => (
            <div key={label} className="about-stat-row">
              <div className="about-stat-val">{val}</div>
              <div className="about-stat-label">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ INFO GRID ═══════════ */}
      <div className="info-section">
        <div className="info-grid">
          {[
            { label: "Location", val: "Bengaluru, Karnataka" },
            { label: "Focus", val: "AI / ML Engineering" },
            { label: "Experience", val: "3+ Years" },
            {
              label: "Contact",
              val: <Link href="https://wa.me/919959594460">WhatsApp ↗</Link>,
            },
          ].map(({ label, val }) => (
            <div key={label} className="info-cell">
              <span className="info-cell-label">{label}</span>
              <span className="info-cell-val">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════ BIO ═══════════ */}
      <section className="bio-section">
        <div className="bio-inner">
          <div className="bio-left">
            <p className="bio-section-label">Who I am</p>
            <h2 className="bio-section-title">
              Building
              <br />
              <em>real</em> AI
              <br />
              systems.
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
              Work With Me <ArrowRight size={13} strokeWidth={2} />
            </Link>
          </div>

          <div className="bio-block">
            {[
              <>
                I'm <strong>Lourdu</strong> — a Machine Learning Engineer and AI
                freelancer based in Bengaluru, Karnataka. I specialize in
                building <strong>production-grade AI systems</strong> that solve
                real business problems, not just research demos.
              </>,
              <>
                With <strong>3+ years</strong> in the ML space, I've worked
                across NLP, computer vision, time-series forecasting, and
                intelligent web tools — helping staffing agencies automate
                hiring, startups ship AI features fast, and businesses
                understand their data.
              </>,
              <>
                My clients are South India's{" "}
                <strong>
                  HR teams, early-stage startups, D2C brands, and founders
                </strong>{" "}
                who need AI done right — affordable, fast, and without the fluff
                of big agencies.
              </>,
              <>
                I believe the best AI work is the kind you don't have to explain
                — <strong>it just works, saves time, and earns money.</strong>
              </>,
            ].map((text, i) => (
              <p key={i} className="bio-para">
                {text}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SKILLS ═══════════ */}
      <section className="skills-section">
        <div className="skills-wrap">
          <div className="skills-header">
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
                Full Stack
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px,4vw,52px)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  color: "var(--ink)",
                  lineHeight: 1,
                }}
              >
                Core Stack
              </h2>
            </div>
          </div>
          <div className="skills-table">
            {skills.map(({ cat, items }) => (
              <div key={cat} className="skill-row">
                <div className="skill-cat">{cat}</div>
                <div className="skill-chips">
                  {items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ VALUES ═══════════ */}
      <section className="values-section">
        <div className="values-wrap">
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
            How I operate
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px,4vw,52px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "var(--ink)",
              lineHeight: 1,
            }}
          >
            Values
          </h2>
          <div className="values-grid">
            {values.map(({ num, title, desc }) => (
              <div key={num} className="value-item">
                <span className="value-num">{num}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICES ═══════════ */}
      <section className="about-svc-section">
        <div className="about-svc-wrap">
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
            What I offer
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px,4vw,52px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "var(--ink)",
              lineHeight: 1,
            }}
          >
            Services
          </h2>
          <div className="svc-list">
            {services.map(({ icon: Icon, label, href }) => (
              <Link key={label} href={href} className="svc-row">
                <div className="svc-row-left">
                  <div className="svc-row-icon">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <span className="svc-row-label">{label}</span>
                </div>
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.5}
                  className="svc-row-arrow"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="about-cta-section">
        <div className="about-cta">
          <h2>
            Let's work
            <br />
            <em>together.</em>
          </h2>
          <div className="cta-actions">
            <p className="cta-note">
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
