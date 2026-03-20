"use client";

import { useRef, useState } from "react";
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
  Plus,
  Minus,
  Clock,
  CheckCircle2,
  Zap,
  Users,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const services = [
  {
    num: "01",
    icon: Brain,
    title: "ML Engineering",
    tagline: "From raw data to deployed API.",
    href: "/services/ml-projects",
    price: "From ₹15,000",
    duration: "1–3 weeks",
    tags: ["NLP", "Computer Vision", "Time Series", "LLMs", "Chatbots"],
    desc: "End-to-end production AI/ML engineering — I take your raw data and turn it into a working, deployed model that solves real business problems. Whether you need a document classifier, a recommendation engine, a forecasting system, or a fine-tuned LLM — I handle data cleaning, model training, evaluation, API wrapping, and deployment.",
    deliverables: [
      "Trained & evaluated model",
      "FastAPI or Flask REST endpoint",
      "Docker container ready to deploy",
      "Full source code + documentation",
      "Post-delivery support for 2 weeks",
    ],
    suited:
      "Startups shipping AI features, businesses automating workflows, researchers needing production-grade systems.",
  },
  {
    num: "02",
    icon: Globe,
    title: "Websites",
    tagline: "90+ Lighthouse. Live in 3–7 days.",
    href: "/services/websites",
    price: "From ₹8,000",
    duration: "3–7 days",
    tags: ["Next.js", "SEO", "Mobile-First", "Performance", "Analytics"],
    desc: "Fast, mobile-first, SEO-optimized websites built from scratch using Next.js. Every site I build scores 90+ on Lighthouse across performance, accessibility, and SEO. I handle design, development, deployment, and post-launch support — no templates, no builders, everything custom-coded.",
    deliverables: [
      "Fully custom Next.js website",
      "90+ Lighthouse score guaranteed",
      "SEO meta tags + sitemap",
      "Google Analytics integration",
      "Deployed on Vercel or Netlify",
      "Mobile-first responsive design",
    ],
    suited:
      "D2C brands, freelancers, consultants, startups needing a professional online presence fast.",
  },
  {
    num: "03",
    icon: BarChart2,
    title: "AI Audit",
    tagline: "Find what's broken. Fix what matters.",
    href: "/services/ai-audit",
    price: "From ₹5,000",
    duration: "2–3 days",
    tags: ["MLOps", "Code Review", "Pipeline Audit", "Report", "Strategy"],
    desc: "A deep technical review of your existing ML system — I audit your data pipeline, model architecture, training setup, inference stack, and monitoring. You get a detailed written report with findings ranked by impact, and a clear action plan you can act on immediately.",
    deliverables: [
      "Full written audit report (PDF)",
      "Data pipeline assessment",
      "Model performance analysis",
      "Prioritized fix list with effort estimates",
      "1-hour live review call",
    ],
    suited:
      "Teams with an existing ML system that's underperforming, scaling poorly, or costing too much to run.",
  },
  {
    num: "04",
    icon: Layers,
    title: "Streamlit / Gradio Apps",
    tagline: "Demo-ready ML interfaces. Ship fast.",
    href: "/services/streamlit-apps",
    price: "From ₹4,000",
    duration: "2–5 days",
    tags: ["Streamlit", "Gradio", "Hugging Face", "Python", "Demo"],
    desc: "Interactive ML web apps built with Streamlit or Gradio — perfect for researchers who need a shareable demo, students building capstone projects, and startups validating AI products before full engineering investment. I build, style, and deploy the app for you.",
    deliverables: [
      "Fully functional Streamlit or Gradio app",
      "Deployed to Hugging Face Spaces or Streamlit Cloud",
      "Custom UI matching your brand",
      "Source code + setup guide",
      "1 round of revisions included",
    ],
    suited:
      "ML researchers, students, early-stage startups validating AI ideas without heavy infrastructure.",
  },
  {
    num: "05",
    icon: Database,
    title: "Data Annotation",
    tagline: "Clean labels. Production-ready datasets.",
    href: "/services/data-annotation",
    price: "From ₹3,000",
    duration: "2–7 days",
    tags: ["NLP", "Computer Vision", "Label Studio", "Classification", "NER"],
    desc: "High-quality labeled datasets for NLP, computer vision, and classification tasks. I use Label Studio and custom scripts to annotate text (NER, sentiment, intent), images (bounding boxes, segmentation, classification), and tabular data. Every dataset is validated and exported in your preferred format.",
    deliverables: [
      "Annotated dataset in JSON/CSV/COCO format",
      "Quality validation report",
      "Annotation schema documentation",
      "Label Studio project file",
      "Free 1-week post-delivery corrections",
    ],
    suited:
      "ML engineers needing training data, researchers building benchmarks, teams scaling up annotation pipelines.",
  },
];

const faqs = [
  {
    q: "How do I get started?",
    a: "Message me on WhatsApp or fill the contact form. I reply within 2 hours and we can start with a free 30-min discovery call to scope your project.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. I work with clients across India and internationally. Payments are accepted via UPI, bank transfer, PayPal, and Stripe.",
  },
  {
    q: "What if I'm not satisfied?",
    a: "I offer unlimited revisions within the agreed scope until you're satisfied. For larger scope changes, we discuss and adjust pricing transparently.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Absolutely. I sign NDAs before any sensitive project discussion. All client data and code is kept strictly confidential.",
  },
  {
    q: "Can you work on an existing codebase?",
    a: "Yes. I regularly work on existing Python/ML codebases — debugging, optimizing, refactoring, or extending them with new features.",
  },
  {
    q: "What's included in post-delivery support?",
    a: "2 weeks of bug fixes, clarifications, and minor adjustments at no extra cost. Extended support contracts are available for ongoing projects.",
  },
];

export default function Services() {
  const heroRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openSvc, setOpenSvc] = useState<number | null>(null);

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

  // ── Hero sub elements
  useGSAP(() => {
    gsap.fromTo(
      ".hero-sub-el",
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.7,
      },
    );
  }, []);

  // ── Ticker bar
  useGSAP(() => {
    gsap.fromTo(
      ".ticker-bar",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: ".ticker-bar", start: "top 90%" },
      },
    );
  }, []);

  // ── Service rows
  useGSAP(() => {
    gsap.fromTo(
      ".svc-accordion-row",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: ".svc-accordion", start: "top 82%" },
      },
    );
  }, []);

  // ── Why section
  useGSAP(() => {
    gsap.fromTo(
      ".why-cell",
      { scale: 0.94, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: ".why-grid", start: "top 83%" },
      },
    );
  }, []);

  // ── FAQ rows
  useGSAP(() => {
    gsap.fromTo(
      ".faq-row",
      { x: -28, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".faq-list", start: "top 85%" },
      },
    );
  }, []);

  // ── CTA
  useGSAP(() => {
    gsap.fromTo(
      ".svc-cta > *",
      { y: 32, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".svc-cta-section", start: "top 84%" },
      },
    );
  }, []);

  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);
  const toggleSvc = (i: number) => setOpenSvc(openSvc === i ? null : i);

  return (
    <>
      <style>{`
        /* ══════════════════════════════════
           HERO
        ══════════════════════════════════ */
        .svc-hero {
          min-height: 100svh;
          display: flex; flex-direction: column; justify-content: flex-end;
          padding-top: var(--nav-h);
          border-bottom: 1px solid var(--line);
          background: var(--bg); position: relative; overflow: hidden;
        }
        .svc-hero-bg-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(var(--line) 1px, transparent 1px),
            linear-gradient(90deg, var(--line) 1px, transparent 1px);
          background-size: 72px 72px; opacity: 0.5; pointer-events: none;
        }
        .svc-hero-inner {
          width: 95%; max-width: 1800px; margin: 0 auto;
          padding: 60px 0 80px; position: relative; z-index: 1;
        }
        .svc-hero-top {
          display: flex; align-items: flex-start;
          justify-content: space-between; margin-bottom: 48px;
        }
        .svc-hero-label {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--ink-3); display: flex; align-items: center; gap: 10px;
        }
        .svc-hero-label::before {
          content: ''; width: 28px; height: 1px; background: var(--ink-3);
        }
        .svc-hero-count {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.16em; color: var(--ink-3);
        }
        .svc-hero h1 {
          font-family: var(--font-display);
          font-size: clamp(52px, 10vw, 140px);
          font-weight: 800; letter-spacing: -0.045em; line-height: 0.90;
          color: var(--ink);
        }
        .svc-hero h1 em {
          font-style: normal;
          -webkit-text-stroke: 1.5px var(--ink); color: transparent;
        }
        .svc-hero-bottom {
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 32px;
          padding-top: 48px; border-top: 1px solid var(--line);
          flex-wrap: wrap;
        }
        .svc-hero-sub {
          font-size: clamp(14px, 1.4vw, 17px); color: var(--ink-2);
          max-width: 520px; line-height: 1.8;
        }
        .svc-hero-stats {
          display: flex; gap: 0;
          border: 1px solid var(--line); overflow: hidden;
        }
        .svc-hero-stat {
          padding: 20px 28px; border-right: 1px solid var(--line);
          display: flex; flex-direction: column; gap: 4px;
        }
        .svc-hero-stat:last-child { border-right: none; }
        .svc-hero-stat-val {
          font-family: var(--font-display); font-size: 26px;
          font-weight: 800; letter-spacing: -0.04em; color: var(--ink); line-height: 1;
        }
        .svc-hero-stat-label {
          font-family: var(--font-mono); font-size: 9px;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3);
        }

        /* ══════════════════════════════════
           TICKER
        ══════════════════════════════════ */
        .ticker-bar {
          border-bottom: 1px solid var(--line); background: var(--ink);
          padding: 14px 0; overflow: hidden;
        }
        .ticker-track {
          display: flex; width: max-content;
          animation: ticker 20s linear infinite;
        }
        .ticker-item {
          display: flex; align-items: center; gap: 16px;
          padding: 0 32px; white-space: nowrap;
          font-family: var(--font-mono); font-size: 10.5px;
          letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.6);
        }
        .ticker-dot { width: 4px; height: 4px; background: rgba(255,255,255,0.3); flex-shrink: 0; }
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        /* ══════════════════════════════════
           SERVICES ACCORDION
        ══════════════════════════════════ */
        .svc-main { padding: 100px 0; background: var(--bg); border-bottom: 1px solid var(--line); }
        .svc-main-wrap { width: 95%; max-width: 1800px; margin: 0 auto; }
        .svc-main-header {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: end; margin-bottom: 64px;
        }
        .svc-main-header h2 {
          font-family: var(--font-display);
          font-size: clamp(36px, 5vw, 72px);
          font-weight: 800; letter-spacing: -0.045em; color: var(--ink); line-height: 0.94;
        }
        .svc-main-header h2 em {
          font-style: normal; -webkit-text-stroke: 1.5px var(--ink); color: transparent;
        }
        .svc-main-desc {
          font-size: 15px; color: var(--ink-2); line-height: 1.8; max-width: 440px;
        }
        .svc-accordion { border: 1px solid var(--line); overflow: hidden; }
        .svc-accordion-row {
          border-bottom: 1px solid var(--line); overflow: hidden;
          transition: background var(--t);
        }
        .svc-accordion-row:last-child { border-bottom: none; }
        .svc-accordion-row:hover { background: var(--bg-2); }
        .svc-accordion-header {
          display: grid;
          grid-template-columns: 56px 1fr auto auto auto;
          align-items: center; gap: 24px;
          padding: 28px 36px; cursor: pointer;
          transition: padding-left var(--t);
        }
        .svc-accordion-row.open .svc-accordion-header { padding-left: 44px; background: var(--bg-2); }
        .svc-acc-num {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3);
        }
        .svc-acc-title {
          font-family: var(--font-display); font-size: clamp(18px, 2vw, 24px);
          font-weight: 700; letter-spacing: -0.03em; color: var(--ink);
        }
        .svc-acc-tagline {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-3);
        }
        .svc-acc-price {
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.08em; color: var(--ink-2); white-space: nowrap;
        }
        .svc-acc-toggle {
          width: 32px; height: 32px; border: 1px solid var(--line);
          display: flex; align-items: center; justify-content: center;
          color: var(--ink-3); flex-shrink: 0;
          transition: background var(--t-fast), color var(--t-fast), border-color var(--t-fast);
        }
        .svc-accordion-row.open .svc-acc-toggle { background: var(--ink); color: var(--bg); border-color: var(--ink); }
        .svc-accordion-body {
          display: grid; grid-template-columns: 1fr 1fr 1fr;
          gap: 0; border-top: 1px solid var(--line);
          background: var(--bg-2);
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.55s cubic-bezier(0.4,0,0.2,1);
        }
        .svc-accordion-row.open .svc-accordion-body { max-height: 600px; }
        .svc-body-col {
          padding: 36px 32px; border-right: 1px solid var(--line);
        }
        .svc-body-col:last-child { border-right: none; }
        .svc-body-label {
          font-family: var(--font-mono); font-size: 9.5px;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--ink-3); margin-bottom: 16px;
        }
        .svc-body-text { font-size: 13.5px; color: var(--ink-2); line-height: 1.8; }
        .svc-body-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .svc-body-list li {
          font-size: 13px; color: var(--ink-2); display: flex; align-items: flex-start; gap: 10px;
        }
        .svc-body-list li::before {
          content: '—'; color: var(--ink-3); font-family: var(--font-mono);
          font-size: 10px; margin-top: 3px; flex-shrink: 0;
        }
        .svc-tags { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 16px; }
        .svc-tag {
          font-family: var(--font-mono); font-size: 9.5px;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 5px 12px; border: 1px solid var(--line); color: var(--ink-3);
          background: var(--bg);
        }
        .svc-body-cta {
          display: inline-flex; align-items: center; gap: 8px; margin-top: 20px;
          font-family: var(--font-mono); font-size: 10.5px;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 10px 20px; background: var(--ink); color: var(--bg);
          transition: opacity var(--t-fast);
        }
        .svc-body-cta:hover { opacity: 0.82; }

        /* ══════════════════════════════════
           WHY CHOOSE ME
        ══════════════════════════════════ */
        .why-section { padding: 100px 0; background: var(--bg-2); border-bottom: 1px solid var(--line); }
        .why-wrap { width: 95%; max-width: 1800px; margin: 0 auto; }
        .why-top {
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 32px; margin-bottom: 64px;
        }
        .why-top h2 {
          font-family: var(--font-display);
          font-size: clamp(36px, 5vw, 72px);
          font-weight: 800; letter-spacing: -0.045em; color: var(--ink); line-height: 0.94;
        }
        .why-top h2 em { font-style: normal; -webkit-text-stroke: 1.5px var(--ink); color: transparent; }
        .why-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          border: 1px solid var(--line); overflow: hidden;
        }
        .why-cell {
          padding: 44px 36px; border-right: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          background: var(--bg-2); transition: background var(--t);
          position: relative; overflow: hidden;
        }
        .why-cell:nth-child(3n) { border-right: none; }
        .why-cell:nth-last-child(-n+3) { border-bottom: none; }
        .why-cell:hover { background: var(--bg); }
        .why-cell::after {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
          background: var(--ink); transform: scaleY(0); transform-origin: bottom;
          transition: transform var(--t);
        }
        .why-cell:hover::after { transform: scaleY(1); }
        .why-icon {
          width: 44px; height: 44px; border: 1px solid var(--line);
          display: flex; align-items: center; justify-content: center;
          color: var(--ink-3); margin-bottom: 20px;
          transition: all var(--t);
        }
        .why-cell:hover .why-icon { border-color: var(--ink); color: var(--ink); }
        .why-cell-num {
          font-family: var(--font-mono); font-size: 9.5px;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--ink-3); margin-bottom: 12px; display: block;
        }
        .why-cell h3 {
          font-family: var(--font-display); font-size: 19px;
          font-weight: 700; letter-spacing: -0.03em;
          color: var(--ink); margin-bottom: 12px;
        }
        .why-cell p { font-size: 13.5px; color: var(--ink-2); line-height: 1.75; }

        /* ══════════════════════════════════
           FAQ
        ══════════════════════════════════ */
        .faq-section { padding: 100px 0; background: var(--bg); border-bottom: 1px solid var(--line); }
        .faq-wrap { width: 95%; max-width: 1800px; margin: 0 auto; }
        .faq-inner {
          display: grid; grid-template-columns: 1fr 2fr;
          gap: 80px; align-items: start;
        }
        .faq-left { position: sticky; top: calc(var(--nav-h) + 32px); }
        .faq-left h2 {
          font-family: var(--font-display);
          font-size: clamp(32px, 4vw, 56px);
          font-weight: 800; letter-spacing: -0.04em; color: var(--ink); line-height: 1;
          margin-bottom: 20px;
        }
        .faq-left p { font-size: 14px; color: var(--ink-2); line-height: 1.8; margin-bottom: 28px; }
        .faq-list { border: 1px solid var(--line); overflow: hidden; }
        .faq-row {
          border-bottom: 1px solid var(--line); overflow: hidden;
        }
        .faq-row:last-child { border-bottom: none; }
        .faq-question {
          display: flex; align-items: center; justify-content: space-between;
          padding: 24px 28px; cursor: pointer; gap: 16px;
          transition: background var(--t);
        }
        .faq-question:hover { background: var(--bg-2); }
        .faq-row.open .faq-question { background: var(--bg-2); }
        .faq-q-text {
          font-family: var(--font-body); font-size: 15px;
          font-weight: 600; color: var(--ink);
        }
        .faq-icon {
          width: 28px; height: 28px; border: 1px solid var(--line);
          display: flex; align-items: center; justify-content: center;
          color: var(--ink-3); flex-shrink: 0;
          transition: all var(--t-fast);
        }
        .faq-row.open .faq-icon { background: var(--ink); color: var(--bg); border-color: var(--ink); }
        .faq-answer {
          max-height: 0; overflow: hidden;
          transition: max-height 0.45s cubic-bezier(0.4,0,0.2,1);
        }
        .faq-row.open .faq-answer { max-height: 300px; }
        .faq-answer-inner {
          padding: 0 28px 24px;
          font-size: 13.5px; color: var(--ink-2); line-height: 1.8;
          border-top: 1px solid var(--line); padding-top: 20px;
        }

        /* ══════════════════════════════════
           CTA
        ══════════════════════════════════ */
        .svc-cta-section {
          padding: 120px 0; background: var(--ink);
          position: relative; overflow: hidden;
        }
        .svc-cta-section::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 72px 72px;
        }
        .svc-cta {
          width: 95%; max-width: 1800px; margin: 0 auto;
          position: relative; z-index: 1;
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 48px; flex-wrap: wrap;
        }
        .svc-cta h2 {
          font-family: var(--font-display);
          font-size: clamp(36px, 7vw, 96px);
          font-weight: 800; letter-spacing: -0.045em; color: #fff; line-height: 0.94;
        }
        .svc-cta h2 em {
          font-style: normal;
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.45); color: transparent;
        }
        .svc-cta-right { display: flex; flex-direction: column; gap: 20px; align-items: flex-start; }
        .svc-cta-note { font-size: 14px; color: rgba(255,255,255,0.45); line-height: 1.8; max-width: 360px; }
        .svc-cta-btns { display: flex; gap: 12px; flex-wrap: wrap; }
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
          .svc-main-header { grid-template-columns: 1fr; gap: 24px; }
          .svc-accordion-header { grid-template-columns: 48px 1fr auto; }
          .svc-acc-tagline, .svc-acc-price { display: none; }
          .svc-accordion-body { grid-template-columns: 1fr; }
          .svc-body-col { border-right: none; border-bottom: 1px solid var(--line); }
          .svc-body-col:last-child { border-bottom: none; }
          .why-grid { grid-template-columns: 1fr 1fr; }
          .why-cell:nth-child(3n) { border-right: 1px solid var(--line); }
          .why-cell:nth-child(2n) { border-right: none; }
          .faq-inner { grid-template-columns: 1fr; gap: 40px; }
          .faq-left { position: static; }
          .svc-hero-stats { flex-wrap: wrap; }
        }
        @media (max-width: 768px) {
          .svc-hero-top { flex-direction: column; gap: 16px; }
          .svc-hero-bottom { flex-direction: column; align-items: flex-start; }
          .svc-hero-stats { width: 100%; }
          .svc-hero-stat { flex: 1; }
          .svc-accordion-header { grid-template-columns: 40px 1fr auto; gap: 16px; padding: 22px 20px; }
          .svc-accordion-row.open .svc-accordion-header { padding-left: 28px; }
          .why-grid { grid-template-columns: 1fr; }
          .why-cell { border-right: none; }
          .why-cell:nth-last-child(-n+3) { border-bottom: 1px solid var(--line); }
          .why-cell:last-child { border-bottom: none; }
          .svc-cta { flex-direction: column; align-items: flex-start; }
          .svc-hero h1 { font-size: clamp(44px, 12vw, 80px); }
        }
        @media (max-width: 480px) {
          .svc-hero-stats { flex-direction: column; }
          .svc-hero-stat { border-right: none; border-bottom: 1px solid var(--line); }
          .svc-hero-stat:last-child { border-bottom: none; }
        }
      `}</style>

      {/* ═══════════ HERO ═══════════ */}
      <section className="svc-hero" ref={heroRef}>
        <div className="svc-hero-bg-grid" />
        <div className="svc-hero-inner">
          <div className="svc-hero-top">
            <div className="svc-hero-label hero-sub-el">What I offer</div>
            <div className="svc-hero-count hero-sub-el">05 Services</div>
          </div>

          <h1 ref={h1Ref}>
            All
            <br />
            <em>Services.</em>
          </h1>

          <div className="svc-hero-bottom">
            <p className="svc-hero-sub hero-sub-el">
              5 focused AI/ML services built for real results. Every service is
              scoped clearly, priced fairly, and delivered with full source code
              and documentation. Click any service to expand and see full
              details.
            </p>
            <div className="svc-hero-stats hero-sub-el">
              {[
                { val: "5", label: "Services" },
                { val: "≤2h", label: "Response" },
                { val: "100%", label: "Satisfaction" },
                { val: "40+", label: "Projects Done" },
              ].map(({ val, label }) => (
                <div key={label} className="svc-hero-stat">
                  <div className="svc-hero-stat-val">{val}</div>
                  <div className="svc-hero-stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ TICKER ═══════════ */}
      <div className="ticker-bar">
        <div className="ticker-track">
          {[
            "ML Engineering",
            "Websites",
            "AI Audit",
            "Streamlit Apps",
            "Data Annotation",
            "ML Engineering",
            "Websites",
            "AI Audit",
            "Streamlit Apps",
            "Data Annotation",
          ].map((item, i) => (
            <div key={i} className="ticker-item">
              <span className="ticker-dot" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════ SERVICES ACCORDION ═══════════ */}
      <section className="svc-main">
        <div className="svc-main-wrap">
          <div className="svc-main-header">
            <h2>
              Every service,
              <br />
              <em>fully detailed.</em>
            </h2>
            <p className="svc-main-desc">
              Click any service row to expand the full scope — including
              deliverables, pricing, timeline, and who each service is best
              suited for. No guesswork, no vague promises.
            </p>
          </div>

          <div className="svc-accordion">
            {services.map(
              (
                {
                  num,
                  icon: Icon,
                  title,
                  tagline,
                  price,
                  duration,
                  tags,
                  desc,
                  deliverables,
                  suited,
                  href,
                },
                i,
              ) => (
                <div
                  key={num}
                  className={`svc-accordion-row${openSvc === i ? " open" : ""}`}
                >
                  {/* Header — always visible */}
                  <div
                    className="svc-accordion-header"
                    onClick={() => toggleSvc(i)}
                  >
                    <span className="svc-acc-num">{num}</span>
                    <span className="svc-acc-title">{title}</span>
                    <span className="svc-acc-tagline">{tagline}</span>
                    <span className="svc-acc-price">{price}</span>
                    <div className="svc-acc-toggle">
                      {openSvc === i ? (
                        <Minus size={14} strokeWidth={2} />
                      ) : (
                        <Plus size={14} strokeWidth={2} />
                      )}
                    </div>
                  </div>

                  {/* Body — expands */}
                  <div className="svc-accordion-body">
                    {/* Col 1 — Description + Tags */}
                    <div className="svc-body-col">
                      <p className="svc-body-label">Overview</p>
                      <p className="svc-body-text">{desc}</p>
                      <div className="svc-tags">
                        {tags.map((t) => (
                          <span key={t} className="svc-tag">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Col 2 — Deliverables */}
                    <div className="svc-body-col">
                      <p className="svc-body-label">What You Get</p>
                      <ul className="svc-body-list">
                        {deliverables.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                      <div
                        style={{
                          marginTop: "20px",
                          display: "flex",
                          gap: "16px",
                        }}
                      >
                        <div>
                          <p
                            className="svc-body-label"
                            style={{ marginBottom: "4px" }}
                          >
                            Timeline
                          </p>
                          <p
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "12px",
                              color: "var(--ink)",
                              fontWeight: 600,
                            }}
                          >
                            {duration}
                          </p>
                        </div>
                        <div>
                          <p
                            className="svc-body-label"
                            style={{ marginBottom: "4px" }}
                          >
                            Starting At
                          </p>
                          <p
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "12px",
                              color: "var(--ink)",
                              fontWeight: 600,
                            }}
                          >
                            {price}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Col 3 — Suited + CTA */}
                    <div className="svc-body-col">
                      <p className="svc-body-label">Best Suited For</p>
                      <p className="svc-body-text">{suited}</p>
                      <Link href={href} className="svc-body-cta">
                        Learn More <ArrowUpRight size={13} strokeWidth={2} />
                      </Link>
                      <br />
                      <Link
                        href={`https://wa.me/919959594460?text=Hi! I'm interested in your ${title} service.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          marginTop: "12px",
                          fontFamily: "var(--font-mono)",
                          fontSize: "10.5px",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          padding: "10px 20px",
                          border: "1px solid var(--line)",
                          color: "var(--ink-2)",
                          transition: "all var(--t-fast)",
                        }}
                        className="svc-wa-btn"
                      >
                        WhatsApp Me ↗
                      </Link>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE ME ═══════════ */}
      <section className="why-section">
        <div className="why-wrap">
          <div className="why-top">
            <div>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                  marginBottom: "12px",
                }}
              >
                Why work with me
              </p>
              <h2>
                Not an agency.
                <br />
                <em>Better.</em>
              </h2>
            </div>
            <p
              style={{
                fontSize: "15px",
                color: "var(--ink-2)",
                lineHeight: 1.8,
                maxWidth: "420px",
              }}
            >
              You get direct access to an ML engineer who has shipped real
              projects — not project managers, not interns, not offshore teams.
            </p>
          </div>

          <div className="why-grid">
            {[
              {
                num: "01",
                icon: Users,
                title: "You Talk to Me Directly",
                desc: "No account managers. No ticket queues. Every message goes to me and I respond within 2 hours, every day.",
              },
              {
                num: "02",
                icon: Zap,
                title: "Fast Turnaround",
                desc: "Most projects delivered in days. I run a tight, efficient solo operation — no bureaucracy, no delays.",
              },
              {
                num: "03",
                icon: CheckCircle2,
                title: "Production-First Mindset",
                desc: "I build things that actually run in production. Clean code, proper error handling, tested, documented.",
              },
              {
                num: "04",
                icon: Clock,
                title: "Fixed Pricing",
                desc: "You know the cost upfront. No hourly billing surprises. Price is agreed before a single line of code is written.",
              },
              {
                num: "05",
                icon: Database,
                title: "Full Ownership Transfer",
                desc: "All source code, models, notebooks, and documentation belong to you from day one. No lock-in.",
              },
              {
                num: "06",
                icon: Brain,
                title: "Deep ML Expertise",
                desc: "3+ years building and shipping ML systems — not reading about them. NLP, CV, LLMs, forecasting, annotation pipelines.",
              },
            ].map(({ num, icon: Icon, title, desc }) => (
              <div key={num} className="why-cell">
                <div className="why-icon">
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <span className="why-cell-num">{num}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="faq-section">
        <div className="faq-wrap">
          <div className="faq-inner">
            <div className="faq-left">
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                  marginBottom: "12px",
                }}
              >
                Common questions
              </p>
              <h2>FAQ</h2>
              <p>
                Everything you need to know before working together. Still have
                questions? Message me on WhatsApp.
              </p>
              <Link
                href="https://wa.me/919959594460"
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
                WhatsApp Me <ArrowUpRight size={13} strokeWidth={2} />
              </Link>
            </div>

            <div className="faq-list">
              {faqs.map(({ q, a }, i) => (
                <div
                  key={i}
                  className={`faq-row${openFaq === i ? " open" : ""}`}
                >
                  <div className="faq-question" onClick={() => toggleFaq(i)}>
                    <span className="faq-q-text">{q}</span>
                    <div className="faq-icon">
                      {openFaq === i ? (
                        <Minus size={13} strokeWidth={2} />
                      ) : (
                        <Plus size={13} strokeWidth={2} />
                      )}
                    </div>
                  </div>
                  <div className="faq-answer">
                    <div className="faq-answer-inner">{a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="svc-cta-section">
        <div className="svc-cta">
          <h2>
            Not sure
            <br />
            <em>which service?</em>
          </h2>
          <div className="svc-cta-right">
            <p className="svc-cta-note">
              Tell me your problem in plain language — I'll tell you exactly
              which service fits and give you a free estimate. No commitment
              required.
            </p>
            <div className="svc-cta-btns">
              <Link href="/contact" className="btn-white">
                Get a Free Estimate <ArrowRight size={14} strokeWidth={2} />
              </Link>
              <Link
                href="https://wa.me/919959594460?text=Hi! I need help choosing a service."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-white"
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
