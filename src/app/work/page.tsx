"use client";

import { useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText);

type Category = "All" | "ML Engineering" | "Websites" | "Streamlit / Gradio";

const projects = [
  // ── ML Engineering
  {
    id: "resume-screener",
    num: "01",
    category: "ML Engineering" as Category,
    title: "Resume Screener AI",
    subtitle: "Automated hiring pipeline for staffing agencies",
    year: "2025",
    tags: ["NLP", "Python", "spaCy", "FastAPI"],
    desc: "Built an end-to-end NLP pipeline that screens 500+ resumes per day for a Bengaluru-based staffing firm. Reduced manual review time by 80%. Custom entity extraction, skill matching, and candidate scoring — deployed as a REST API.",
    result: "80% reduction in manual review time",
    size: "large",
    color: "#0A0A0A",
  },
  {
    id: "defect-detector",
    num: "02",
    category: "ML Engineering" as Category,
    title: "CV Defect Detector",
    subtitle: "Manufacturing quality control on edge devices",
    year: "2024",
    tags: ["Computer Vision", "PyTorch", "OpenCV", "Docker"],
    desc: "Real-time defect detection model deployed on edge hardware for a manufacturing client. Achieved 96.4% accuracy with a lightweight MobileNet architecture optimized for low-latency inference.",
    result: "96.4% detection accuracy",
    size: "small",
    color: "#1A1A1A",
  },
  {
    id: "analytics-dashboard",
    num: "03",
    category: "ML Engineering" as Category,
    title: "D2C Analytics Dashboard",
    subtitle: "Sales forecasting & customer segmentation",
    year: "2025",
    tags: ["ML", "FastAPI", "PostgreSQL", "Next.js"],
    desc: "Production ML system for a D2C brand — real-time sales forecasting, customer lifetime value prediction, and RFM-based segmentation. Full-stack with a Next.js dashboard and FastAPI backend.",
    result: "23% uplift in repeat purchases",
    size: "small",
    color: "#111111",
  },
  {
    id: "chatbot-staffing",
    num: "04",
    category: "ML Engineering" as Category,
    title: "Staffing Chatbot",
    subtitle: "GPT-powered candidate intake & FAQ bot",
    year: "2024",
    tags: ["LLM", "LangChain", "FastAPI", "PostgreSQL"],
    desc: "Custom LLM-powered chatbot handling candidate intake, FAQ responses, and interview scheduling for a staffing agency. Reduced HR team workload by 60% in the first month post-deployment.",
    result: "60% reduction in HR workload",
    size: "small",
    color: "#0D0D0D",
  },
  // ── Websites
  {
    id: "portfolio-site",
    num: "05",
    category: "Websites" as Category,
    title: "LOURDU.AI",
    subtitle: "This site — ML portfolio & freelance hub",
    year: "2025",
    tags: ["Next.js", "GSAP", "TypeScript", "Vercel"],
    desc: "You're looking at it. Built with Next.js 15, GSAP ScrollTrigger, SplitText, and Lenis smooth scroll. Scored 97/100 on Lighthouse. Fully custom — no templates, no component libraries.",
    result: "97 Lighthouse score",
    size: "large",
    color: "#080808",
  },
  {
    id: "startup-landing",
    num: "06",
    category: "Websites" as Category,
    title: "SaaS Landing Page",
    subtitle: "High-converting product page for a B2B SaaS",
    year: "2025",
    tags: ["Next.js", "SEO", "Animations", "Netlify"],
    desc: "Landing page for a B2B SaaS startup. Custom scroll animations, optimized Core Web Vitals, structured data for SEO, and A/B tested CTA placement. Ranked page 1 for target keywords within 6 weeks.",
    result: "Page 1 ranking in 6 weeks",
    size: "small",
    color: "#131313",
  },
  {
    id: "clinic-website",
    num: "07",
    category: "Websites" as Category,
    title: "Healthcare Clinic Site",
    subtitle: "Local SEO-optimized medical practice website",
    year: "2024",
    tags: ["HTML/CSS", "JS", "Local SEO", "Google Maps"],
    desc: "Full website for a Bengaluru clinic — local SEO optimization, Google Business integration, appointment booking widget, and mobile-first design. 3× increase in organic traffic within 90 days.",
    result: "3× organic traffic growth",
    size: "small",
    color: "#0F0F0F",
  },
  // ── Streamlit / Gradio
  {
    id: "sentiment-app",
    num: "08",
    category: "Streamlit / Gradio" as Category,
    title: "Sentiment Analyser",
    subtitle: "Multi-model NLP demo with live comparison",
    year: "2024",
    tags: ["Streamlit", "Hugging Face", "Python", "BERT"],
    desc: "Interactive Streamlit app comparing 4 sentiment models side-by-side — BERT, RoBERTa, DistilBERT, and a fine-tuned custom model. Deployed on Hugging Face Spaces with 1,200+ monthly users.",
    result: "1,200+ monthly active users",
    size: "small",
    color: "#121212",
  },
  {
    id: "image-classifier",
    num: "09",
    category: "Streamlit / Gradio" as Category,
    title: "Image Classifier App",
    subtitle: "Gradio interface for a fine-tuned ViT model",
    year: "2024",
    tags: ["Gradio", "PyTorch", "ViT", "Hugging Face"],
    desc: "Production-ready Gradio app wrapping a fine-tuned Vision Transformer for multi-class image classification. Clean UI, confidence score visualization, and one-click Hugging Face Spaces deployment.",
    result: "Fine-tuned ViT, 94% val accuracy",
    size: "large",
    color: "#0A0A0A",
  },
];

const categories: Category[] = [
  "All",
  "ML Engineering",
  "Websites",
  "Streamlit / Gradio",
];

// ── 3D Tilt hook
function useTilt() {
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -8;
    const rotY = ((x - cx) / cx) * 8;
    gsap.to(card, {
      rotateX: rotX,
      rotateY: rotY,
      transformPerspective: 900,
      duration: 0.4,
      ease: "power2.out",
    });
    // Shine
    const shine = card.querySelector(".card-shine") as HTMLElement;
    if (shine) {
      const xPct = (x / rect.width) * 100;
      const yPct = (y / rect.height) * 100;
      shine.style.background = `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(255,255,255,0.07) 0%, transparent 70%)`;
    }
  }, []);

  const onMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "expo.out",
    });
    const shine = e.currentTarget.querySelector(".card-shine") as HTMLElement;
    if (shine) shine.style.background = "transparent";
  }, []);

  return { onMouseMove, onMouseLeave };
}

export default function Work() {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const [active, setActive] = useState<Category>("All");
  const { onMouseMove, onMouseLeave } = useTilt();

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

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

  // ── Hero sub items
  useGSAP(() => {
    gsap.fromTo(
      ".work-hero-sub",
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.7,
      },
    );
  }, []);

  // ── Filter tabs
  useGSAP(() => {
    gsap.fromTo(
      ".filter-tab",
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: ".filter-bar", start: "top 90%" },
      },
    );
  }, []);

  // ── Cards on scroll
  useGSAP(() => {
    gsap.fromTo(
      ".proj-card",
      { y: 60, opacity: 0, scale: 0.97 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".proj-grid", start: "top 82%" },
      },
    );
  }, [active]);

  // ── Stats bar
  useGSAP(() => {
    gsap.fromTo(
      ".work-stat",
      { y: 32, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".work-stats", start: "top 88%" },
      },
    );
  }, []);

  // ── CTA
  useGSAP(() => {
    gsap.fromTo(
      ".work-cta > *",
      { y: 32, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".work-cta-section", start: "top 85%" },
      },
    );
  }, []);

  return (
    <>
      <style>{`
        /* ══════════════════════════════════
           HERO
        ══════════════════════════════════ */
        .work-hero {
          min-height: 100svh;
          display: flex; flex-direction: column; justify-content: flex-end;
          padding-top: var(--nav-h);
          background: var(--bg); border-bottom: 1px solid var(--line);
          position: relative; overflow: hidden;
        }
        .work-hero-grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(var(--line) 1px, transparent 1px),
            linear-gradient(90deg, var(--line) 1px, transparent 1px);
          background-size: 72px 72px; opacity: 0.5; pointer-events: none;
        }
        .work-hero-inner {
          width: 95%; max-width: 1800px; margin: 0 auto;
          padding: 60px 0 80px; position: relative; z-index: 1;
        }
        .work-hero-top {
          display: flex; align-items: flex-start;
          justify-content: space-between; margin-bottom: 40px; flex-wrap: wrap; gap: 16px;
        }
        .work-hero-label {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-3);
          display: flex; align-items: center; gap: 10px;
        }
        .work-hero-label::before { content: ''; width: 28px; height: 1px; background: var(--ink-3); }
        .work-hero h1 {
          font-family: var(--font-display);
          font-size: clamp(56px, 11vw, 150px);
          font-weight: 800; letter-spacing: -0.045em; line-height: 0.88;
          color: var(--ink); margin-bottom: 48px;
        }
        .work-hero h1 em {
          font-style: normal; -webkit-text-stroke: 1.5px var(--ink); color: transparent;
        }
        .work-hero-bottom {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 48px; align-items: end;
          padding-top: 40px; border-top: 1px solid var(--line);
        }
        .work-hero-desc {
          font-size: clamp(14px, 1.4vw, 17px); color: var(--ink-2); line-height: 1.8;
        }
        .work-hero-nums {
          display: flex; gap: 0;
          justify-content: flex-end;
        }
        .work-hero-num {
          padding: 20px 28px; border-left: 1px solid var(--line);
          display: flex; flex-direction: column; gap: 4px; text-align: right;
        }
        .work-hero-num-val {
          font-family: var(--font-display); font-size: clamp(28px, 3vw, 40px);
          font-weight: 800; letter-spacing: -0.04em; color: var(--ink); line-height: 1;
        }
        .work-hero-num-label {
          font-family: var(--font-mono); font-size: 9px;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3);
        }

        /* ══════════════════════════════════
           FILTER BAR
        ══════════════════════════════════ */
        .filter-section {
          border-bottom: 1px solid var(--line); background: var(--bg-2); position: sticky;
          top: var(--nav-h); z-index: 100;
        }
        .filter-bar {
          width: 95%; max-width: 1800px; margin: 0 auto;
          display: flex; align-items: center; gap: 0;
          overflow-x: auto; scrollbar-width: none;
        }
        .filter-bar::-webkit-scrollbar { display: none; }
        .filter-tab {
          font-family: var(--font-mono); font-size: 10.5px;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 18px 24px; color: var(--ink-3); white-space: nowrap;
          border-right: 1px solid var(--line); cursor: pointer;
          transition: color var(--t-fast), background var(--t-fast);
          background: none; border-top: none; border-left: none; border-bottom: none;
          position: relative;
        }
        .filter-tab:hover { color: var(--ink); background: var(--bg); }
        .filter-tab.active { color: var(--ink); background: var(--bg); font-weight: 600; }
        .filter-tab.active::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px; background: var(--ink);
        }
        .filter-count {
          font-family: var(--font-mono); font-size: 9px; color: var(--ink-3);
          margin-left: 4px; padding: 2px 6px; border: 1px solid var(--line);
        }

        /* ══════════════════════════════════
           EDITORIAL GALLERY GRID
        ══════════════════════════════════ */
        .gallery-section { padding: 80px 0; background: var(--bg); }
        .gallery-wrap { width: 95%; max-width: 1800px; margin: 0 auto; }

        /* Editorial grid:
           large cards span 2 cols, small span 1 */
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--line);
          border: 1px solid var(--line);
        }

        /* ── Base card ── */
        .proj-card {
          background: var(--bg); position: relative;
          cursor: pointer; overflow: hidden;
          transform-style: preserve-3d;
          transition: background var(--t);
        }
        .proj-card:hover { background: var(--bg-2); z-index: 10; }
        .proj-card.large { grid-column: span 2; }

        /* Shine overlay */
        .card-shine {
          position: absolute; inset: 0;
          pointer-events: none; z-index: 3;
          transition: background 0.1s;
        }

        /* Placeholder visual */
        .card-visual {
          width: 100%; aspect-ratio: 16/9;
          background: var(--bg-3);
          position: relative; overflow: hidden;
          border-bottom: 1px solid var(--line);
          display: flex; align-items: center; justify-content: center;
        }
        .proj-card.large .card-visual { aspect-ratio: 21/9; }
        .card-visual-inner {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          background: repeating-linear-gradient(
            45deg,
            var(--bg-3) 0px, var(--bg-3) 1px,
            transparent 1px, transparent 12px
          );
        }
        .card-visual-label {
          position: relative; z-index: 1;
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-3);
          background: var(--bg); padding: 8px 16px; border: 1px solid var(--line);
        }
        /* Hover — scale visual */
        .proj-card:hover .card-visual-inner {
          transform: scale(1.03);
          transition: transform 0.6s cubic-bezier(0.4,0,0.2,1);
        }

        /* Card content */
        .card-content { padding: 28px 28px 32px; }
        .card-top {
          display: flex; align-items: center;
          justify-content: space-between; margin-bottom: 16px;
        }
        .card-num {
          font-family: var(--font-mono); font-size: 9.5px;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3);
        }
        .card-cat {
          font-family: var(--font-mono); font-size: 9.5px;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--ink-3); padding: 4px 10px; border: 1px solid var(--line);
        }
        .card-title {
          font-family: var(--font-display);
          font-size: clamp(18px, 2vw, 26px);
          font-weight: 700; letter-spacing: -0.03em; color: var(--ink);
          line-height: 1.1; margin-bottom: 8px;
        }
        .card-subtitle {
          font-family: var(--font-body); font-size: 13px;
          color: var(--ink-3); margin-bottom: 14px;
        }
        .card-desc {
          font-size: 13.5px; color: var(--ink-2); line-height: 1.75;
          margin-bottom: 20px;
          display: -webkit-box; -webkit-line-clamp: 3;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .card-bottom {
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 10px;
          margin-top: auto;
        }
        .card-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .card-tag {
          font-family: var(--font-mono); font-size: 9px;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 4px 10px; border: 1px solid var(--line);
          color: var(--ink-3); background: var(--bg);
        }
        .card-result {
          font-family: var(--font-mono); font-size: 9.5px;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--ink); padding: 5px 12px;
          border: 1px solid var(--ink); white-space: nowrap;
        }
        .card-arrow {
          width: 36px; height: 36px; border: 1px solid var(--line);
          display: flex; align-items: center; justify-content: center;
          color: var(--ink-3); transition: all var(--t-fast); flex-shrink: 0;
        }
        .proj-card:hover .card-arrow { background: var(--ink); border-color: var(--ink); color: var(--bg); }

        /* Year badge */
        .card-year {
          position: absolute; top: 16px; right: 16px; z-index: 2;
          font-family: var(--font-mono); font-size: 9px;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--ink-3); background: var(--bg);
          padding: 4px 10px; border: 1px solid var(--line);
        }

        /* ══════════════════════════════════
           STATS BAR
        ══════════════════════════════════ */
        .work-stats {
          border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
          background: var(--ink);
        }
        .work-stats-inner {
          width: 95%; max-width: 1800px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(4, 1fr);
        }
        .work-stat {
          padding: 44px 36px; border-right: 1px solid rgba(255,255,255,0.08);
          display: flex; flex-direction: column; gap: 8px;
        }
        .work-stat:last-child { border-right: none; }
        .work-stat-val {
          font-family: var(--font-display);
          font-size: clamp(36px, 4vw, 56px);
          font-weight: 800; letter-spacing: -0.04em; color: #fff; line-height: 1;
        }
        .work-stat-label {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }
        .work-stat-desc {
          font-size: 13px; color: rgba(255,255,255,0.3); line-height: 1.6; margin-top: 4px;
        }

        /* ══════════════════════════════════
           CTA
        ══════════════════════════════════ */
        .work-cta-section {
          padding: 120px 0; background: var(--bg);
          border-top: 1px solid var(--line);
        }
        .work-cta {
          width: 95%; max-width: 1800px; margin: 0 auto;
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 48px; flex-wrap: wrap;
        }
        .work-cta h2 {
          font-family: var(--font-display);
          font-size: clamp(36px, 6vw, 86px);
          font-weight: 800; letter-spacing: -0.045em; color: var(--ink); line-height: 0.94;
        }
        .work-cta h2 em {
          font-style: normal; -webkit-text-stroke: 1.5px var(--ink); color: transparent;
        }
        .work-cta-right { display: flex; flex-direction: column; gap: 20px; align-items: flex-start; }
        .work-cta-note { font-size: 15px; color: var(--ink-2); line-height: 1.8; max-width: 380px; }
        .work-cta-btns { display: flex; gap: 12px; flex-wrap: wrap; }
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
          color: var(--ink-2); transition: border-color var(--t-fast), color var(--t-fast);
        }
        .btn-ghost:hover { border-color: var(--ink); color: var(--ink); }

        /* ══════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════ */
        @media (max-width: 1024px) {
          .proj-grid { grid-template-columns: repeat(2, 1fr); }
          .proj-card.large { grid-column: span 2; }
          .work-hero-bottom { grid-template-columns: 1fr; gap: 32px; }
          .work-hero-nums { justify-content: flex-start; }
          .work-stats-inner { grid-template-columns: repeat(2, 1fr); }
          .work-stat:nth-child(2) { border-right: none; }
          .work-stat:nth-child(3) {
            border-right: rgba(255,255,255,0.08) 1px solid;
            border-top: 1px solid rgba(255,255,255,0.08);
          }
          .work-stat:nth-child(4) { border-top: 1px solid rgba(255,255,255,0.08); }
        }
        @media (max-width: 768px) {
          .proj-grid { grid-template-columns: 1fr; }
          .proj-card.large { grid-column: span 1; }
          .work-hero h1 { font-size: clamp(44px, 13vw, 80px); }
          .work-cta { flex-direction: column; align-items: flex-start; }
          .work-hero-num { padding: 16px 20px; }
        }
        @media (max-width: 480px) {
          .work-stats-inner { grid-template-columns: 1fr; }
          .work-stat { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); }
          .work-stat:last-child { border-bottom: none; }
          .work-hero-nums { flex-direction: column; }
          .work-hero-num { border-left: none; border-top: 1px solid var(--line); }
        }
      `}</style>

      {/* ═══════════ HERO ═══════════ */}
      <section className="work-hero">
        <div className="work-hero-grid-bg" />
        <div className="work-hero-inner">
          <div className="work-hero-top">
            <div className="work-hero-label work-hero-sub">Selected work</div>
            <div
              className="work-hero-sub"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.16em",
                color: "var(--ink-3)",
              }}
            >
              {projects.length} projects
            </div>
          </div>

          <h1 ref={h1Ref}>
            Work &<br />
            <em>Projects.</em>
          </h1>

          <div className="work-hero-bottom">
            <p className="work-hero-desc work-hero-sub">
              A selection of ML engineering projects, production websites, and
              Streamlit/Gradio apps — all built and shipped for real clients or
              as production-grade personal builds. Every project includes full
              source code delivery.
            </p>
            <div className="work-hero-nums work-hero-sub">
              {[
                { val: "4", label: "ML Projects" },
                { val: "3", label: "Websites" },
                { val: "2", label: "Streamlit/Gradio" },
              ].map(({ val, label }) => (
                <div key={label} className="work-hero-num">
                  <div className="work-hero-num-val">{val}</div>
                  <div className="work-hero-num-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FILTER BAR ═══════════ */}
      <div className="filter-section">
        <div className="filter-bar">
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? projects.length
                : projects.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                className={`filter-tab${active === cat ? " active" : ""}`}
                onClick={() => setActive(cat)}
              >
                {cat}
                <span className="filter-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══════════ GALLERY GRID ═══════════ */}
      <section className="gallery-section">
        <div className="gallery-wrap">
          <div className="proj-grid">
            {filtered.map((p, i) => (
              <div
                key={p.id}
                className={`proj-card${p.size === "large" ? " large" : ""}`}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
              >
                <div className="card-shine" />
                <span className="card-year">{p.year}</span>

                {/* Placeholder visual */}
                <div className="card-visual">
                  <div className="card-visual-inner" />
                  <span className="card-visual-label">{p.category}</span>
                </div>

                <div className="card-content">
                  <div className="card-top">
                    <span className="card-num">{p.num}</span>
                    <span className="card-cat">{p.category}</span>
                  </div>
                  <h3 className="card-title">{p.title}</h3>
                  <p className="card-subtitle">{p.subtitle}</p>
                  <p className="card-desc">{p.desc}</p>
                  <div className="card-bottom">
                    <div className="card-tags">
                      {p.tags.slice(0, 3).map((t) => (
                        <span key={t} className="card-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span className="card-result">{p.result}</span>
                      <div className="card-arrow">
                        <ArrowUpRight size={14} strokeWidth={2} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ STATS BAR ═══════════ */}
      <div className="work-stats">
        <div className="work-stats-inner">
          {[
            {
              val: "9+",
              label: "Projects Shown",
              desc: "Across ML, web, and apps",
            },
            {
              val: "96%",
              label: "Avg. Accuracy",
              desc: "Across all ML model deliveries",
            },
            {
              val: "80%",
              label: "Time Saved",
              desc: "For clients automating workflows",
            },
            {
              val: "100%",
              label: "Code Ownership",
              desc: "Full source code always delivered",
            },
          ].map(({ val, label, desc }) => (
            <div key={label} className="work-stat">
              <div className="work-stat-val">{val}</div>
              <div className="work-stat-label">{label}</div>
              <div className="work-stat-desc">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════ CTA ═══════════ */}
      <section className="work-cta-section">
        <div className="work-cta">
          <h2>
            Want results
            <br />
            <em>like these?</em>
          </h2>
          <div className="work-cta-right">
            <p className="work-cta-note">
              Every project here was scoped, built, and delivered by me alone —
              fast turnaround, full code ownership, and measurable results.
              Let's build yours.
            </p>
            <div className="work-cta-btns">
              <Link href="/contact" className="btn-primary">
                Start a Project <ArrowRight size={14} strokeWidth={2} />
              </Link>
              <Link href="/services" className="btn-ghost">
                View Services <ArrowRight size={14} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
