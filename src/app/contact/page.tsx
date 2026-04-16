"use client";

import { useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Clock,
  Mail,
  Instagram,
  CheckCircle2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText);

// FIX 4: WhatsAppIcon accepts and ignores size/strokeWidth so it can be used
// both as a standalone icon and as a channel icon without prop errors.
const WhatsAppIcon = ({
  size = 16,
  strokeWidth = 1.5,
  className = "",
}: {
  size?: number;
  strokeWidth?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.29l3-.01a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxs5WnpPpEmMilt1e3KERkOyUSTC3tHsiTRhRpdPlHW6IuHDRfBgAf5npIzMPIMneIz/exec";

const services = [
  "ML Engineering",
  "Website Development",
  "AI Audit & Consulting",
  "Streamlit / Gradio App",
  "Data Annotation",
  "Not Sure Yet",
];

const faqs = [
  {
    q: "How fast do you respond?",
    a: "Within 2 hours, every day including weekends.",
  },
  {
    q: "Do you offer free consultations?",
    a: "Yes — a free 30-min discovery call for every new project.",
  },
  {
    q: "What's your typical timeline?",
    a: "Most projects: 3–14 days depending on scope. Discussed upfront.",
  },
  {
    q: "Do you work internationally?",
    a: "Yes. Clients across India, UAE, US, and Europe. Payments via UPI, PayPal, Stripe.",
  },
];

export default function Contact() {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const magnetRef = useRef<HTMLAnchorElement>(null);
  const [selected, setSelected] = useState<string>("");
  const [charCount, setCharCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const MAX_CHARS = 500;

  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");

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

  // ── Sub elements stagger
  useGSAP(() => {
    gsap.fromTo(
      ".c-hero-sub",
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

  // ── Vertical line draw
  useGSAP(() => {
    gsap.fromTo(
      ".v-line",
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 1.2,
        ease: "expo.out",
        delay: 0.5,
        transformOrigin: "top",
      },
    );
  }, []);

  // ── Contact info items
  useGSAP(() => {
    gsap.fromTo(
      ".contact-info-item",
      { x: 32, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-info", start: "top 85%" },
      },
    );
  }, []);

  // ── Form fields
  useGSAP(() => {
    gsap.fromTo(
      ".form-field",
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-form", start: "top 82%" },
      },
    );
  }, []);

  // ── FAQ
  useGSAP(() => {
    gsap.fromTo(
      ".faq-item",
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: ".faq-grid", start: "top 85%" },
      },
    );
  }, []);

  // ── Magnetic button
  const onMagnetMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = magnetRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const onMagnetLeave = useCallback(() => {
    gsap.to(magnetRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "expo.out",
    });
  }, []);

  // FIX 1 + 2: Use FormData with named inputs instead of form[index] indexing.
  // FIX 3: Added redirect: "follow" so Google's 302 redirect is handled correctly.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selected || !budget || !timeline) {
      alert("Please select a service, budget range, and timeline.");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      service: selected,
      budget,
      message: formData.get("message") as string,
      timeline,
    };

    setLoading(true);

    try {
      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        redirect: "follow", // FIX 3: follow Google's 302 redirect
        headers: {
          // Keep as text/plain to avoid CORS preflight on Apps Script
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(data),
      });

      const text = await res.text();

      let result: { status: string; message?: string };
      try {
        result = JSON.parse(text);
      } catch {
        throw new Error("Invalid JSON response from server: " + text);
      }

      if (result.status === "success") {
        setSubmitted(true);
      } else {
        alert("Submission failed: " + (result.message ?? "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try WhatsApp or Instagram instead.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        /* ══════════════════════════════════
           HERO — Full split screen
        ══════════════════════════════════ */
        .c-hero {
          min-height: 100svh;
          display: grid;
          grid-template-columns: 1fr 480px;
          padding-top: var(--nav-h);
          border-bottom: 1px solid var(--line);
          background: var(--bg);
          position: relative; overflow: hidden;
        }
        .c-hero-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(var(--line) 1px, transparent 1px),
            linear-gradient(90deg, var(--line) 1px, transparent 1px);
          background-size: 72px 72px; opacity: 0.5; pointer-events: none;
        }
        .c-hero-left {
          padding: 80px 0;
          width: 95%; margin: 0 auto;
          display: flex; flex-direction: column; justify-content: flex-end;
          position: relative; z-index: 1;
        }
        .c-eyebrow {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-3);
          display: flex; align-items: center; gap: 10px; margin-bottom: 28px;
        }
        .c-eyebrow::before { content: ''; width: 28px; height: 1px; background: var(--ink-3); }
        .c-hero-left h1 {
          font-family: var(--font-display);
          font-size: clamp(52px, 9vw, 130px);
          font-weight: 800; letter-spacing: -0.045em; line-height: 0.90;
          color: var(--ink); margin-bottom: 40px;
        }
        .c-hero-left h1 em {
          font-style: normal; -webkit-text-stroke: 1.5px var(--ink); color: transparent;
        }
        .c-hero-desc {
          font-size: clamp(14px, 1.4vw, 17px); color: var(--ink-2);
          max-width: 520px; line-height: 1.8; margin-bottom: 48px;
        }

        /* Availability badge */
        .avail-badge {
          display: inline-flex; align-items: center; gap: 10px;
          border: 1px solid var(--line); padding: 12px 20px;
          align-self: flex-start;
        }
        .avail-dot {
          width: 8px; height: 8px; background: var(--ink);
          border-radius: 50%; animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.5); opacity: 0.4; }
        }
        .avail-text {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-2);
        }

        /* Right panel */
        .c-hero-right {
          border-left: 1px solid var(--line);
          background: var(--bg-2);
          display: flex; flex-direction: column;
          justify-content: flex-end;
          padding: 60px 40px;
          position: relative; z-index: 1;
          gap: 0;
        }
        .c-hero-right-label {
          font-family: var(--font-mono); font-size: 9.5px;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--ink-3); margin-bottom: 24px;
        }

        /* Magnetic WhatsApp button */
        .magnet-wrap { display: flex; justify-content: center; margin-bottom: 36px; }
        .magnet-btn {
          display: inline-flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 8px;
          width: 160px; height: 160px;
          border: 1px solid var(--ink);
          background: var(--ink); color: var(--bg);
          cursor: pointer; position: relative;
          transition: background var(--t-fast), color var(--t-fast);
          text-align: center;
        }
        .magnet-btn:hover { background: var(--bg); color: var(--ink); }
        .magnet-btn-label {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.14em; text-transform: uppercase;
          line-height: 1.5;
        }

        /* Channel rows */
        .c-channel {
          padding: 18px 0; border-top: 1px solid var(--line);
          display: flex; align-items: center; justify-content: space-between;
          transition: background var(--t-fast);
          cursor: pointer;
        }
        .c-channel:hover { padding-left: 8px; }
        .c-channel-left { display: flex; align-items: center; gap: 12px; }
        .c-channel-icon {
          width: 36px; height: 36px; border: 1px solid var(--line);
          display: flex; align-items: center; justify-content: center;
          color: var(--ink-3); transition: all var(--t-fast);
        }
        .c-channel:hover .c-channel-icon { border-color: var(--ink); color: var(--ink); }
        .c-channel-name {
          font-family: var(--font-body); font-size: 14px;
          font-weight: 600; color: var(--ink);
        }
        .c-channel-handle {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.1em; color: var(--ink-3);
        }
        .c-channel-arrow {
          color: var(--ink-3); transition: transform var(--t-fast), color var(--t-fast);
        }
        .c-channel:hover .c-channel-arrow { transform: translate(3px,-3px); color: var(--ink); }

        /* ══════════════════════════════════
           FORM SECTION
        ══════════════════════════════════ */
        .form-section {
          padding: 100px 0; background: var(--bg);
          border-bottom: 1px solid var(--line);
        }
        .form-inner {
          width: 95%; max-width: 1800px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start;
        }
        .form-left { position: sticky; top: calc(var(--nav-h) + 32px); }
        .form-left-label {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--ink-3); margin-bottom: 16px;
        }
        .form-left h2 {
          font-family: var(--font-display);
          font-size: clamp(32px, 4vw, 56px);
          font-weight: 800; letter-spacing: -0.04em;
          color: var(--ink); line-height: 1; margin-bottom: 24px;
        }
        .form-left h2 em {
          font-style: normal; -webkit-text-stroke: 1px var(--ink); color: transparent;
        }
        .form-left-desc {
          font-size: 14px; color: var(--ink-2); line-height: 1.8; margin-bottom: 32px;
        }

        /* Process steps */
        .v-line-wrap {
          position: relative; padding-left: 28px;
        }
        .v-line {
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 1px; background: var(--ink);
        }
        .form-step { padding: 16px 0; border-bottom: 1px solid var(--line); }
        .form-step:last-child { border-bottom: none; }
        .form-step-num {
          font-family: var(--font-mono); font-size: 9.5px;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--ink-3); margin-bottom: 6px;
        }
        .form-step-text {
          font-family: var(--font-body); font-size: 14px;
          font-weight: 600; color: var(--ink);
        }

        /* Form */
        .contact-form { display: flex; flex-direction: column; gap: 0; }

        .form-field {
          border-bottom: 1px solid var(--line);
          padding: 28px 0;
          display: flex; flex-direction: column; gap: 10px;
        }
        .form-field:first-child { border-top: 1px solid var(--line); }
        .form-label {
          font-family: var(--font-mono); font-size: 9.5px;
          letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-3);
          display: flex; justify-content: space-between; align-items: center;
        }
        .form-char-count { font-size: 9px; color: var(--ink-3); }
        .form-input, .form-textarea {
          font-family: var(--font-body); font-size: 15px;
          color: var(--ink); background: transparent;
          border: none; outline: none; width: 100%; resize: none;
          padding: 0; line-height: 1.6;
        }
        .form-input::placeholder, .form-textarea::placeholder { color: var(--ink-3); }
        .form-input:focus, .form-textarea:focus { outline: none; }

        /* Service selector */
        .service-chips {
          display: flex; flex-wrap: wrap; gap: 8px;
        }
        .service-chip {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 8px 16px; border: 1px solid var(--line);
          color: var(--ink-3); cursor: pointer;
          transition: all var(--t-fast); background: transparent;
        }
        .service-chip:hover { border-color: var(--ink); color: var(--ink); }
        .service-chip.sel { background: var(--ink); color: var(--bg); border-color: var(--ink); }

        /* Submit */
        .form-submit-row {
          display: flex; align-items: center;
          justify-content: space-between; gap: 16px;
          padding-top: 32px; flex-wrap: wrap;
        }
        .form-note {
          font-family: var(--font-mono); font-size: 9.5px;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-3);
        }
        .btn-submit {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 14px 32px; background: var(--ink); color: var(--bg);
          border: none; cursor: pointer; transition: opacity var(--t-fast);
        }
        .btn-submit:hover { opacity: 0.82; }
        .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        /* Success state */
        .form-success {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; gap: 20px;
          padding: 80px 40px; text-align: center;
          border: 1px solid var(--line);
        }
        .form-success-icon { color: var(--ink); }
        .form-success h3 {
          font-family: var(--font-display); font-size: 28px;
          font-weight: 800; letter-spacing: -0.04em; color: var(--ink);
        }
        .form-success p {
          font-size: 14px; color: var(--ink-2); max-width: 320px; line-height: 1.7;
        }

        /* ══════════════════════════════════
           CONTACT INFO STRIP
        ══════════════════════════════════ */
        .contact-info {
          border-bottom: 1px solid var(--line);
          background: var(--bg-2);
        }
        .contact-info-inner {
          width: 95%; max-width: 1800px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(4, 1fr);
        }
        .contact-info-item {
          padding: 36px 32px; border-right: 1px solid var(--line);
          display: flex; flex-direction: column; gap: 12px;
        }
        .contact-info-item:last-child { border-right: none; }
        .ci-label {
          font-family: var(--font-mono); font-size: 9.5px;
          letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-3);
        }
        .ci-val {
          font-family: var(--font-body); font-size: 15px;
          font-weight: 600; color: var(--ink);
        }
        .ci-val a { color: var(--ink); transition: opacity var(--t-fast); }
        .ci-val a:hover { opacity: 0.6; }
        .ci-icon { color: var(--ink-3); }

        /* ══════════════════════════════════
           FAQ
        ══════════════════════════════════ */
        .faq-section { padding: 100px 0; background: var(--bg); border-bottom: 1px solid var(--line); }
        .faq-section-wrap { width: 95%; max-width: 1800px; margin: 0 auto; }
        .faq-section-header {
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 32px; margin-bottom: 56px;
        }
        .faq-section-header h2 {
          font-family: var(--font-display);
          font-size: clamp(32px, 4vw, 56px);
          font-weight: 800; letter-spacing: -0.04em; color: var(--ink); line-height: 1;
        }
        .faq-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          border: 1px solid var(--line); overflow: hidden;
        }
        .faq-item {
          padding: 32px 36px; border-right: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          transition: background var(--t); cursor: pointer;
        }
        .faq-item:nth-child(2n)        { border-right: none; }
        .faq-item:nth-last-child(-n+2) { border-bottom: none; }
        .faq-item:hover                { background: var(--bg-2); }
        .faq-item-q {
          font-family: var(--font-display); font-size: 16px;
          font-weight: 700; letter-spacing: -0.02em; color: var(--ink);
          margin-bottom: 12px; display: flex;
          align-items: flex-start; justify-content: space-between; gap: 12px;
        }
        .faq-item-toggle {
          width: 24px; height: 24px; border: 1px solid var(--line);
          display: flex; align-items: center; justify-content: center;
          color: var(--ink-3); flex-shrink: 0; font-size: 16px; line-height: 1;
          transition: all var(--t-fast);
        }
        .faq-item.open .faq-item-toggle { background: var(--ink); color: var(--bg); border-color: var(--ink); }
        .faq-item-a {
          font-size: 13.5px; color: var(--ink-2); line-height: 1.75;
          max-height: 0; overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .faq-item.open .faq-item-a { max-height: 200px; }

        /* ══════════════════════════════════
           BOTTOM CTA
        ══════════════════════════════════ */
        .c-bottom {
          padding: 120px 0; background: var(--ink); position: relative; overflow: hidden;
        }
        .c-bottom::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 72px 72px;
        }
        .c-bottom-inner {
          width: 95%; max-width: 1800px; margin: 0 auto;
          position: relative; z-index: 1;
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 48px; flex-wrap: wrap;
        }
        .c-bottom h2 {
          font-family: var(--font-display);
          font-size: clamp(40px, 7vw, 100px);
          font-weight: 800; letter-spacing: -0.045em; color: #fff; line-height: 0.90;
        }
        .c-bottom h2 em {
          font-style: normal;
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.4); color: transparent;
        }
        .c-bottom-right { display: flex; flex-direction: column; gap: 20px; align-items: flex-start; }
        .c-bottom-note { font-size: 14px; color: rgba(255,255,255,0.45); line-height: 1.8; max-width: 360px; }
        .c-bottom-btns { display: flex; gap: 12px; flex-wrap: wrap; }
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
          .c-hero             { grid-template-columns: 1fr; }
          .c-hero-right       { border-left: none; border-top: 1px solid var(--line); padding: 48px 0; width: 95%; margin: 0 auto; background: transparent; }
          .form-inner         { grid-template-columns: 1fr; gap: 48px; }
          .form-left          { position: static; }
          .contact-info-inner { grid-template-columns: repeat(2, 1fr); }
          .contact-info-item:nth-child(2) { border-right: none; }
          .contact-info-item:nth-child(3) { border-right: 1px solid var(--line); border-top: 1px solid var(--line); }
          .contact-info-item:nth-child(4) { border-top: 1px solid var(--line); }
          .faq-grid           { grid-template-columns: 1fr; }
          .faq-item           { border-right: none; }
          .faq-item:nth-last-child(-n+2) { border-bottom: 1px solid var(--line); }
          .faq-item:last-child { border-bottom: none; }
          .c-bottom-inner     { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 768px) {
          .c-hero-left h1         { font-size: clamp(44px, 12vw, 80px); }
          .contact-info-inner     { grid-template-columns: 1fr; }
          .contact-info-item      { border-right: none; border-bottom: 1px solid var(--line); }
          .contact-info-item:last-child { border-bottom: none; }
          .faq-section-header     { flex-direction: column; align-items: flex-start; }
          .magnet-btn             { width: 130px; height: 130px; }
        }
        @media (max-width: 480px) {
          .service-chips          { gap: 6px; }
          .form-submit-row        { flex-direction: column; align-items: flex-start; }
          .btn-submit             { width: 100%; justify-content: center; }
        }
      `}</style>

      {/* ═══════════ HERO ═══════════ */}
      <section className="c-hero">
        <div className="c-hero-bg" />

        {/* Left */}
        <div className="c-hero-left">
          <div className="c-eyebrow c-hero-sub">Get in touch</div>
          <h1 ref={h1Ref}>
            Let&apos;s build
            <br />
            <em>something</em>
            <br />
            real.
          </h1>
          <p className="c-hero-desc c-hero-sub">
            Have a project in mind? Fill the form, message me on WhatsApp, or
            reach out via Instagram. I respond within 2 hours and can start most
            projects within a week.
          </p>
          <div className="avail-badge c-hero-sub">
            <span className="avail-dot" />
            <span className="avail-text">
              Available for new projects · March 2026
            </span>
          </div>
        </div>

        {/* Right — channels */}
        <div className="c-hero-right">
          <p className="c-hero-right-label">Reach me directly</p>

          {/* Magnetic WhatsApp */}
          <div className="magnet-wrap">
            <Link
              href="https://wa.me/916360812808?text=Hi! I'd like to discuss a project."
              target="_blank"
              rel="noopener noreferrer"
              ref={magnetRef}
              className="magnet-btn"
              onMouseMove={onMagnetMove}
              onMouseLeave={onMagnetLeave}
            >
              <WhatsAppIcon />
              <span className="magnet-btn-label">
                Message
                <br />
                on WhatsApp
              </span>
              <ArrowUpRight
                size={14}
                strokeWidth={1.5}
                style={{ position: "absolute", top: 14, right: 14 }}
              />
            </Link>
          </div>

          {/* Other channels */}
          {[
            {
              icon: Instagram,
              label: "Instagram",
              handle: "@spacedrift.in",
              href: "https://instagram.com/spacedrift.in",
            },
            {
              icon: MapPin,
              label: "Location",
              handle: "Bengaluru, Karnataka",
              href: "#",
            },
            {
              icon: Clock,
              label: "Response",
              handle: "Within 2 hours",
              href: "#",
            },
          ].map(({ icon: Icon, label, handle, href }) => (
            <Link
              key={label}
              href={href}
              target={href !== "#" ? "_blank" : undefined}
              rel={href !== "#" ? "noopener noreferrer" : undefined}
              className="c-channel"
            >
              <div className="c-channel-left">
                <div className="c-channel-icon">
                  <Icon size={15} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="c-channel-name">{label}</div>
                  <div className="c-channel-handle">{handle}</div>
                </div>
              </div>
              {href !== "#" && (
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.5}
                  className="c-channel-arrow"
                />
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════ FORM ═══════════ */}
      <section className="form-section">
        <div className="form-inner">
          {/* Left — sticky info */}
          <div className="form-left">
            <p className="form-left-label">Send a message</p>
            <h2>
              Tell me
              <br />
              <em>everything.</em>
            </h2>
            <p className="form-left-desc">
              The more detail you share upfront, the faster I can come back with
              a clear scope and quote. Takes 2 minutes.
            </p>
            <div className="v-line-wrap">
              <div className="v-line" />
              {[
                { num: "01", text: "Fill the form with project details" },
                { num: "02", text: "I review and respond within 2 hours" },
                { num: "03", text: "Free 30-min discovery call" },
                { num: "04", text: "Clear scope + fixed quote delivered" },
              ].map(({ num, text }) => (
                <div key={num} className="form-step">
                  <div className="form-step-num">{num}</div>
                  <div className="form-step-text">{text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          {submitted ? (
            <div className="form-success">
              <CheckCircle2
                size={48}
                strokeWidth={1}
                className="form-success-icon"
              />
              <h3>Message sent!</h3>
              <p>
                Thanks for reaching out. I&apos;ll get back to you within 2 hours.
              </p>
              <Link
                href="/"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10.5px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "11px 24px",
                  background: "var(--ink)",
                  color: "var(--bg)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                Back to Home <ArrowRight size={13} strokeWidth={2} />
              </Link>
            </div>
          ) : (
            // FIX 1: All text inputs have a `name` attribute so FormData works correctly
            <form className="contact-form" onSubmit={handleSubmit}>
              {/* Name */}
              <div className="form-field">
                <label className="form-label">Your Name</label>
                <input
                  className="form-input"
                  type="text"
                  name="name"
                  placeholder="Ravi Kumar"
                  required
                />
              </div>

              {/* Email */}
              <div className="form-field">
                <label className="form-label">Email Address</label>
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  placeholder="ravi@company.com"
                  required
                />
              </div>

              {/* Service */}
              <div className="form-field">
                <label className="form-label">Service Interested In</label>
                <div className="service-chips">
                  {services.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`service-chip ${selected === s ? "sel" : ""}`}
                      onClick={() => setSelected(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div className="form-field">
                <label className="form-label">Budget Range</label>
                <div className="service-chips">
                  {["Under ₹5K", "₹5K–₹15K", "₹15K–₹50K", "₹50K+", "Let's Discuss"].map(
                    (b) => (
                      <button
                        key={b}
                        type="button"
                        className={`service-chip ${budget === b ? "sel" : ""}`}
                        onClick={() => setBudget(b)}
                      >
                        {b}
                      </button>
                    ),
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="form-field">
                <label className="form-label">
                  Tell Me About Your Project
                  <span className="form-char-count">
                    {charCount}/{MAX_CHARS}
                  </span>
                </label>
                <textarea
                  className="form-textarea"
                  name="message"
                  rows={5}
                  placeholder="Describe your project, what problem you're trying to solve, and any relevant context..."
                  maxLength={MAX_CHARS}
                  onChange={(e) => setCharCount(e.target.value.length)}
                  required
                />
              </div>

              {/* Timeline */}
              <div className="form-field">
                <label className="form-label">Timeline</label>
                <div className="service-chips">
                  {["ASAP", "1–2 Weeks", "1 Month", "Flexible"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={`service-chip ${timeline === t ? "sel" : ""}`}
                      onClick={() => setTimeline(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-submit-row">
                <span className="form-note">I reply within 2 hours.</span>
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? "Sending…" : "Send Message"}{" "}
                  <ArrowRight size={14} strokeWidth={2} />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ═══════════ CONTACT INFO STRIP ═══════════ */}
      {/* FIX 4: WhatsAppIcon now accepts size/strokeWidth/className so it renders correctly here */}
      <div className="contact-info">
        <div className="contact-info-inner">
          {[
            {
              icon: MapPin,
              label: "Based In",
              val: "Bengaluru, Karnataka, India",
            },
            {
              icon: Clock,
              label: "Response Time",
              val: "Within 2 hours, every day",
            },
            {
              icon: WhatsAppIcon,
              label: "WhatsApp",
              val: "+91 99595 94460",
            },
            {
              icon: Instagram,
              label: "Instagram",
              val: "@spacedrift.in",
            },
          ].map(({ icon: Icon, label, val }) => (
            <div key={label} className="contact-info-item">
              <Icon size={16} strokeWidth={1.5} className="ci-icon" />
              <span className="ci-label">{label}</span>
              <span className="ci-val">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="faq-section">
        <div className="faq-section-wrap">
          <div className="faq-section-header">
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
                Quick answers
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(32px,4vw,56px)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  color: "var(--ink)",
                  lineHeight: 1,
                }}
              >
                Common Questions
              </h2>
            </div>
            <Link
              href="https://wa.me/916360812808"
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
                flexShrink: 0,
              }}
            >
              More Questions? WhatsApp Me{" "}
              <ArrowUpRight size={13} strokeWidth={2} />
            </Link>
          </div>

          <div className="faq-grid">
            {faqs.map(({ q, a }, i) => (
              <div
                key={i}
                className={`faq-item${openFaq === i ? " open" : ""}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="faq-item-q">
                  {q}
                  <span className="faq-item-toggle">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </div>
                <div className="faq-item-a">{a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ BOTTOM CTA ═══════════ */}
      <section className="c-bottom">
        <div className="c-bottom-inner">
          <h2>
            Let&apos;s build
            <br />
            <em>together.</em>
          </h2>
          <div className="c-bottom-right">
            <p className="c-bottom-note">
              Every great project starts with a conversation. Reach out now —
              I&apos;ll respond within 2 hours and we can get started within a
              week.
            </p>
            <div className="c-bottom-btns">
              <Link
                href="https://wa.me/916360812808?text=Hi! I'd like to start a project."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-white"
              >
                <WhatsAppIcon /> WhatsApp Me
              </Link>
              <Link href="/services" className="btn-outline-white">
                Browse Services <ArrowRight size={14} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}