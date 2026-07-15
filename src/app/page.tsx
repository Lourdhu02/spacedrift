"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Home() {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!h1Ref.current) return;
    document.fonts.ready.then(() => {
      if (!h1Ref.current) return;
      const split = SplitText.create(h1Ref.current, { type: "lines,words", mask: "lines" });
      gsap.from(split.words, { yPercent: 120, duration: 1.2, stagger: 0.04, ease: "expo.out", delay: 0.3 });
    });
    gsap.fromTo(".hero-sub", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 1 });
    gsap.fromTo(".hero-meta", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 1.2 });
    gsap.fromTo(".hero-cta", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 1.4 });
  }, []);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".bento-card").forEach((card, i) => {
      gsap.fromTo(card, { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: i * 0.08,
        scrollTrigger: { trigger: card, start: "top 90%" },
      });
    });
  }, []);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".stat-item").forEach((el, i) => {
      gsap.fromTo(el, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: i * 0.1,
        scrollTrigger: { trigger: ".stats-row", start: "top 85%" },
      });
    });
  }, []);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".approach-item").forEach((el, i) => {
      gsap.fromTo(el, { x: -30, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: i * 0.1,
        scrollTrigger: { trigger: ".approach-list", start: "top 82%" },
      });
    });
  }, []);

  useGSAP(() => {
    gsap.fromTo(".cta-reveal", { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out",
      scrollTrigger: { trigger: ".cta-block", start: "top 80%" },
    });
  }, []);

  return (
    <>
      <style>{`
        .dot-bg {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, var(--line-light) 1px, transparent 1px);
          background-size: 32px 32px; opacity: 0.5;
        }
        .hero {
          min-height: 100svh; display: flex; align-items: flex-end;
          padding: var(--nav-h) 0 100px; background: var(--bg);
          position: relative; overflow: hidden;
        }
        .hero-inner { width: 90%; max-width: 1400px; margin: 0 auto; position: relative; z-index: 1; overflow: hidden; }
        .hero h1 {
          font-family: var(--font-display);
          font-size: clamp(42px, 8vw, 100px);
          font-weight: 800; letter-spacing: -0.04em;
          line-height: 0.98; color: var(--ink); margin-bottom: 40px;
          max-width: 100%;
        }
        .hero h1 .accent { color: var(--accent); }
        .hero-sub {
          font-size: clamp(16px, 1.4vw, 20px); color: var(--ink-2);
          max-width: 560px; line-height: 1.8; margin-bottom: 40px;
        }
        .hero-meta {
          display: flex; gap: 40px; margin-bottom: 48px;
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.06em; color: var(--ink-3); text-transform: uppercase;
        }
        .hero-meta span { display: flex; align-items: center; gap: 8px; }
        .hero-meta .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }
        .hero-cta { display: flex; gap: 16px; flex-wrap: wrap; }
        .btn-fill {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 14px 28px; background: var(--accent); color: #fff;
          position: relative; overflow: hidden; transition: transform var(--t-fast);
        }
        .btn-fill:hover { transform: translateY(-2px); }
        .btn-fill::after {
          content: ''; position: absolute; inset: 0;
          background: var(--accent-2); transform: translateY(100%);
          transition: transform var(--t-fast);
        }
        .btn-fill:hover::after { transform: translateY(0); }
        .btn-fill span { position: relative; z-index: 1; display: inline-flex; align-items: center; gap: 10px; }
        .btn-outline {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 14px 28px; border: 1px solid var(--line-light);
          color: var(--ink-2); transition: all var(--t-fast);
        }
        .btn-outline:hover { border-color: var(--ink-3); color: var(--ink); }

        .services-section { padding: 160px 0; background: var(--bg); position: relative; }
        .services-section::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--line-light) 20%, var(--line-light) 80%, transparent);
        }
        .sec-wrap { width: 90%; max-width: 1400px; margin: 0 auto; }
        .sec-label {
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--accent); margin-bottom: 20px;
        }
        .sec-heading {
          font-family: var(--font-display); font-size: clamp(36px, 5vw, 64px);
          font-weight: 800; letter-spacing: -0.04em; color: var(--ink);
          margin-bottom: 16px; max-width: 700px;
        }
        .sec-desc { font-size: 16px; color: var(--ink-2); max-width: 520px; line-height: 1.8; margin-bottom: 64px; }

        .bento-grid {
          display: grid; grid-template-columns: repeat(12, 1fr);
          gap: 16px;
        }
        .bento-card {
          background: var(--bg-2); border: 1px solid var(--line);
          padding: 40px 32px; position: relative; overflow: hidden;
          display: flex; flex-direction: column; justify-content: space-between;
          transition: border-color var(--t-fast), transform var(--t-fast);
        }
        .bento-card:hover { border-color: var(--line-light); transform: translateY(-3px); }
        .bento-card.wide { grid-column: span 7; min-height: 320px; }
        .bento-card.narrow { grid-column: span 5; min-height: 320px; }
        .bento-card.third { grid-column: span 4; min-height: 280px; }
        .bento-num {
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.1em; color: var(--ink-3); margin-bottom: 24px;
        }
        .bento-card h3 {
          font-family: var(--font-display); font-size: 24px;
          font-weight: 700; letter-spacing: -0.03em; color: var(--ink);
          margin-bottom: 12px;
        }
        .bento-card p { font-size: 14px; color: var(--ink-2); line-height: 1.8; margin-bottom: 24px; }
        .bento-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--accent); transition: gap var(--t-fast);
          margin-top: auto;
        }
        .bento-card:hover .bento-link { gap: 12px; }
        .bento-tag {
          position: absolute; top: 32px; right: 32px;
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--warm); padding: 4px 10px;
          border: 1px solid rgba(249,115,22,0.3); background: rgba(249,115,22,0.05);
        }

        .stats-section { padding: 100px 0; background: var(--bg-2); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--line); }
        .stat-item { background: var(--bg-2); padding: 48px 32px; }
        .stat-num {
          font-family: var(--font-display); font-size: clamp(36px, 4vw, 56px);
          font-weight: 800; letter-spacing: -0.04em; color: var(--ink); margin-bottom: 8px;
        }
        .stat-num .warm { color: var(--warm); }
        .stat-label { font-size: 13px; color: var(--ink-3); line-height: 1.6; }

        .approach-section { padding: 160px 0; background: var(--bg); position: relative; }
        .approach-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 80px; align-items: start; }
        .approach-sticky { position: sticky; top: 120px; }
        .approach-list { display: flex; flex-direction: column; gap: 0; }
        .approach-item {
          display: grid; grid-template-columns: 64px 1fr; gap: 24px;
          padding: 36px 0; border-bottom: 1px solid var(--line);
        }
        .approach-item:first-child { border-top: 1px solid var(--line); }
        .approach-num {
          font-family: var(--font-display); font-size: 28px;
          font-weight: 800; color: var(--accent);
        }
        .approach-item h4 {
          font-family: var(--font-display); font-size: 20px;
          font-weight: 700; color: var(--ink); margin-bottom: 8px; letter-spacing: -0.02em;
        }
        .approach-item p { font-size: 14px; color: var(--ink-2); line-height: 1.8; }

        .cta-block {
          padding: 160px 0; background: var(--bg-2);
          border-top: 1px solid var(--line); position: relative;
        }
        .cta-inner { width: 90%; max-width: 1400px; margin: 0 auto; }
        .cta-inner h2 {
          font-family: var(--font-display); font-size: clamp(36px, 5vw, 72px);
          font-weight: 800; letter-spacing: -0.04em; color: var(--ink); margin-bottom: 24px;
          max-width: 700px;
        }
        .cta-inner p { font-size: 17px; color: var(--ink-2); margin-bottom: 40px; max-width: 500px; line-height: 1.8; }

        @media (max-width: 768px) {
          .bento-grid { grid-template-columns: 1fr; }
          .bento-card.wide, .bento-card.narrow, .bento-card.third { grid-column: span 1; min-height: auto; }
          .stats-row { grid-template-columns: 1fr 1fr; }
          .approach-grid { grid-template-columns: 1fr; gap: 48px; }
          .approach-sticky { position: static; }
          .hero-meta { flex-direction: column; gap: 12px; }
          .hero-cta { flex-direction: column; }
        }
      `}</style>

      <section className="hero">
        <div className="dot-bg" />
        <div className="hero-inner">
          <h1 ref={h1Ref}>
            Build useful ML,<br />AI, and web <span className="accent">systems</span>.
          </h1>
          <p className="hero-sub">
            spacedrift.in is a boutique ML and AI services studio in Bengaluru.
            We deliver research ops, document AI, OCR automation, RAG MVPs,
            data annotation, and web development as fixed-scope projects.
          </p>
          <div className="hero-meta">
            <span><span className="dot" />Based in Bengaluru</span>
            <span><span className="dot" />5 Core Services</span>
            <span><span className="dot" />24hr Response</span>
          </div>
          <div className="hero-cta">
            <a href="mailto:spacedrift.contact@gmail.com" className="btn-fill">
              <span>Start a Project <ArrowRight size={14} strokeWidth={2} /></span>
            </a>
            <Link href="/about" className="btn-outline">
              Learn About Us <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="sec-wrap">
          <p className="sec-label">Services</p>
          <h2 className="sec-heading">Five focused services. Clear deliverables.</h2>
          <p className="sec-desc">
            We take on work where the output can be defined, built, tested, and handed over.
            No open-ended retainers, no vague transformation work, and no generalist agency layers.
          </p>

          <div className="bento-grid">
            <Link href="/services/research-ops" className="bento-card wide">
              <div>
                <span className="bento-num">01</span>
                <h3>Research Ops for Academia</h3>
                <p>
                  Reproducible experiment pipelines, dataset curation, baseline replication, and
                  publication support for PhD scholars, academic labs, and ed-tech teams. We help
                  turn research ideas into results that can be reviewed and defended.
                </p>
              </div>
              <span className="bento-link">Explore <ArrowRight size={13} /></span>
              <span className="bento-tag">Research</span>
            </Link>

            <Link href="/services/document-ai" className="bento-card narrow">
              <div>
                <span className="bento-num">02</span>
                <h3>Document AI & OCR</h3>
                <p>
                  Custom OCR and document AI pipelines for invoices, receipts, ID documents,
                  forms, and Indian-language scripts. We deliver validated extraction workflows
                  with 97%+ accuracy targets on agreed fields.
                </p>
              </div>
              <span className="bento-link">Explore <ArrowRight size={13} /></span>
            </Link>

            <Link href="/services/rag-mvp" className="bento-card narrow">
              <div>
                <span className="bento-num">03</span>
                <h3>RAG & AI MVPs</h3>
                <p>
                  Internal knowledge-base chatbots, retrieval-augmented generation systems,
                  and AI MVPs for startups and internal teams. Fixed scope, working product
                  in 3 weeks, and no open-ended retainers.
                </p>
              </div>
              <span className="bento-link">Explore <ArrowRight size={13} /></span>
            </Link>

            <div className="bento-card wide" style={{ background: "var(--bg-3)", borderColor: "var(--line-light)" }}>
              <div>
                <span className="bento-num" style={{ color: "var(--warm)" }}>Why us?</span>
                <h3>Direct access. No middlemen.</h3>
                <p>
                  You work directly with the engineer building your project. There are no account
                  managers, outsourcing chains, or handoff gaps. That keeps decisions faster,
                  requirements clearer, and delivery easier to verify.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="sec-wrap">
          <div className="stats-row">
            <div className="stat-item">
              <p className="stat-num">24<span className="warm">hr</span></p>
              <p className="stat-label">Response time for every inquiry</p>
            </div>
            <div className="stat-item">
              <p className="stat-num">5-10<span className="warm">d</span></p>
              <p className="stat-label">Average website delivery time</p>
            </div>
            <div className="stat-item">
              <p className="stat-num">100<span className="warm">%</span></p>
              <p className="stat-label">Lighthouse scores on web builds</p>
            </div>
            <div className="stat-item">
              <p className="stat-num">0<span className="warm">%</span></p>
              <p className="stat-label">Lock-in. You own everything we build</p>
            </div>
          </div>
        </div>
      </section>

      <section className="approach-section">
        <div className="sec-wrap">
          <div className="approach-grid">
            <div className="approach-sticky">
              <p className="sec-label">Approach</p>
              <h2 className="sec-heading">How we work with you.</h2>
              <p style={{ fontSize: "15px", color: "var(--ink-2)", lineHeight: 1.8, marginTop: "20px" }}>
                Every engagement starts with a written scope and ends with a usable handoff.
                You know what is included, what is not, and when each milestone is due.
              </p>
            </div>
            <div className="approach-list">
              {[
                { num: "01", title: "Discovery Call", desc: "You explain the requirement, deadline, data, and constraints. We ask practical questions and decide whether the work fits a fixed-scope delivery." },
                { num: "02", title: "Scope & Proposal", desc: "Within 24 hours, you receive a fixed-price proposal with deliverables, milestones, assumptions, and exclusions. The quoted price is the working boundary." },
                { num: "03", title: "Build & Review", desc: "We build against the agreed scope and share regular progress updates, preview links, or sample outputs. Feedback is handled during milestones, not saved for the end." },
                { num: "04", title: "Deliver & Support", desc: "Final delivery includes source code or output files, documentation, and a handoff session where relevant. Post-delivery support is included for 30 days." },
              ].map(({ num, title, desc }) => (
                <div key={num} className="approach-item">
                  <span className="approach-num">{num}</span>
                  <div>
                    <h4>{title}</h4>
                    <p>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cta-block">
        <div className="cta-inner">
          <h2 className="cta-reveal">Have a project?<br />Let&apos;s talk.</h2>
          <p className="cta-reveal">
            Tell us what you need. We respond within 24 hours with a clear scope, timeline,
            and fixed price if the project is a fit. No sales pitch.
          </p>
          <form
            className="cta-form cta-reveal"
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            action="/?success=true"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div className="form-row">
              <input type="text" name="name" placeholder="Your name" required className="form-input" />
              <input type="email" name="email" placeholder="Email address" required className="form-input" />
            </div>
            <textarea name="message" placeholder="Tell us about your project" rows={4} required className="form-input form-textarea" />
            <div className="form-row">
              <button type="submit" className="btn-fill">
                <span>Send Message <ArrowUpRight size={14} strokeWidth={2} /></span>
              </button>
              <a href="mailto:spacedrift.contact@gmail.com" className="btn-outline">
                Or email us directly <ArrowUpRight size={14} strokeWidth={2} />
              </a>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
