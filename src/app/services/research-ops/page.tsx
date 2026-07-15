"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function ResearchOps() {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!h1Ref.current) return;
    document.fonts.ready.then(() => {
      if (!h1Ref.current) return;
      const split = SplitText.create(h1Ref.current, { type: "lines,words", mask: "lines" });
      gsap.from(split.words, { yPercent: 120, duration: 1.2, stagger: 0.04, ease: "expo.out", delay: 0.3 });
    });
    gsap.fromTo(".ro-reveal", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 1 });
  }, []);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".ro-card").forEach((card, i) => {
      gsap.fromTo(card, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: i * 0.08,
        scrollTrigger: { trigger: card, start: "top 90%" },
      });
    });
  }, []);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".ro-metric").forEach((el, i) => {
      gsap.fromTo(el, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: i * 0.08,
        scrollTrigger: { trigger: ".ro-metrics-row", start: "top 85%" },
      });
    });
  }, []);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".ro-step").forEach((el, i) => {
      gsap.fromTo(el, { x: -30, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: i * 0.1,
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });
  }, []);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".ro-domain").forEach((el, i) => {
      gsap.fromTo(el, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: i * 0.1,
        scrollTrigger: { trigger: ".ro-domains-grid", start: "top 85%" },
      });
    });
  }, []);

  useGSAP(() => {
    gsap.fromTo(".ro-cta-r", { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out",
      scrollTrigger: { trigger: ".ro-cta", start: "top 82%" },
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
        .ro-hero {
          min-height: 100svh; display: flex; align-items: flex-end;
          padding: var(--nav-h) 0 100px; background: var(--bg);
          position: relative; overflow: hidden;
        }
        .ro-inner { width: 90%; max-width: 1400px; margin: 0 auto; position: relative; z-index: 1; overflow: hidden; }
        .ro-hero h1 {
          font-family: var(--font-display);
          font-size: clamp(40px, 7vw, 90px);
          font-weight: 800; letter-spacing: -0.04em;
          line-height: 0.98; color: var(--ink); margin-bottom: 40px;
          max-width: 100%;
        }
        .ro-hero h1 .accent { color: var(--accent); }
        .ro-intro {
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
          margin-bottom: 48px;
        }
        .ro-intro p { font-size: 16px; color: var(--ink-2); line-height: 1.8; }
        .ro-intro strong { color: var(--ink); font-weight: 600; }

        .sec-wrap { width: 90%; max-width: 1400px; margin: 0 auto; }
        .sec-label {
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--accent); margin-bottom: 20px;
        }
        .sec-heading {
          font-family: var(--font-display); font-size: clamp(32px, 4vw, 56px);
          font-weight: 800; letter-spacing: -0.04em; color: var(--ink);
          margin-bottom: 16px; max-width: 600px;
        }
        .sec-desc { font-size: 15px; color: var(--ink-2); max-width: 520px; line-height: 1.8; margin-bottom: 64px; }
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

        .ro-services {
          padding: 160px 0; background: var(--bg);
          border-top: 1px solid var(--line);
        }
        .ro-cards {
          display: grid; grid-template-columns: repeat(12, 1fr); gap: 16px;
        }
        .ro-card {
          background: var(--bg-2); border: 1px solid var(--line);
          padding: 36px 28px; display: flex; flex-direction: column; gap: 12px;
          transition: border-color var(--t-fast), transform var(--t-fast);
        }
        .ro-card:hover { border-color: var(--line-light); transform: translateY(-3px); }
        .ro-card.half { grid-column: span 6; }
        .ro-card.third { grid-column: span 4; }
        .ro-card-label {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--warm);
        }
        .ro-card h4 {
          font-family: var(--font-display); font-size: 22px;
          font-weight: 700; letter-spacing: -0.03em; color: var(--ink);
        }
        .ro-card p { font-size: 14px; color: var(--ink-2); line-height: 1.8; }

        .ro-quality {
          padding: 100px 0; background: var(--bg-2);
          border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
        }
        .ro-metrics-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--line); }
        .ro-metric { background: var(--bg-2); padding: 48px 32px; }
        .ro-metric-num {
          font-family: var(--font-display); font-size: clamp(32px, 3.5vw, 48px);
          font-weight: 800; letter-spacing: -0.04em; color: var(--ink); margin-bottom: 8px;
        }
        .ro-metric-num .warm { color: var(--warm); }
        .ro-metric-label { font-size: 13px; color: var(--ink-3); line-height: 1.6; }

        .ro-process {
          padding: 160px 0; background: var(--bg);
          border-bottom: 1px solid var(--line);
        }
        .ro-process-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 80px; align-items: start; }
        .ro-sticky { position: sticky; top: 120px; }
        .ro-steps { display: flex; flex-direction: column; }
        .ro-step {
          display: grid; grid-template-columns: 64px 1fr; gap: 24px;
          padding: 36px 0; border-bottom: 1px solid var(--line);
        }
        .ro-step:first-child { border-top: 1px solid var(--line); }
        .ro-step-num {
          font-family: var(--font-display); font-size: 28px;
          font-weight: 800; color: var(--accent);
        }
        .ro-step h4 {
          font-family: var(--font-display); font-size: 20px;
          font-weight: 700; color: var(--ink); margin-bottom: 8px; letter-spacing: -0.02em;
        }
        .ro-step p { font-size: 14px; color: var(--ink-2); line-height: 1.8; }

        .ro-domains {
          padding: 160px 0; background: var(--bg-2);
          border-bottom: 1px solid var(--line);
        }
        .ro-domains-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--line); margin-top: 64px; }
        .ro-domain {
          background: var(--bg-2); padding: 48px 36px;
          transition: background var(--t);
        }
        .ro-domain:hover { background: var(--bg-3); }
        .ro-domain-tag {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--accent); margin-bottom: 16px;
          display: inline-block; padding: 4px 10px;
          border: 1px solid rgba(37,99,235,0.3); background: rgba(37,99,235,0.05);
        }
        .ro-domain h4 {
          font-family: var(--font-display); font-size: 22px;
          font-weight: 700; color: var(--ink); margin-bottom: 12px; letter-spacing: -0.02em;
        }
        .ro-domain p { font-size: 14px; color: var(--ink-2); line-height: 1.8; }

        .ro-cta {
          padding: 160px 0; background: var(--bg);
          border-top: 1px solid var(--line);
        }
        .ro-cta h2 {
          font-family: var(--font-display); font-size: clamp(36px, 5vw, 72px);
          font-weight: 800; letter-spacing: -0.04em; color: var(--ink); margin-bottom: 24px;
          max-width: 700px;
        }
        .ro-cta > .sec-wrap > p { font-size: 17px; color: var(--ink-2); margin-bottom: 40px; max-width: 500px; line-height: 1.8; }

        @media (max-width: 768px) {
          .ro-intro { grid-template-columns: 1fr; gap: 24px; }
          .ro-cards { grid-template-columns: 1fr; }
          .ro-card.half, .ro-card.third { grid-column: span 1; }
          .ro-metrics-row { grid-template-columns: 1fr 1fr; }
          .ro-process-grid { grid-template-columns: 1fr; gap: 48px; }
          .ro-sticky { position: static; }
          .ro-domains-grid { grid-template-columns: 1fr; }
          .ro-step { grid-template-columns: 48px 1fr; gap: 16px; }
        }
      `}</style>

      <section className="ro-hero">
        <div className="dot-bg" />
        <div className="ro-inner">
          <h1 ref={h1Ref}>
            Research <span className="accent">Ops</span> for Academia
          </h1>
          <div className="ro-intro ro-reveal">
            <p>
              <strong>Academic ML research needs more than scattered notebooks.</strong> We build
              reproducible experiment pipelines, clean datasets, and baseline replications for
              PhD scholars, research labs, and ed-tech teams.
            </p>
            <p>
              spacedrift.in supports fixed-scope research operations from Bengaluru, India.
              You get code, configs, result tables, documentation, and a handoff that makes
              the work easier to review, rerun, and defend.
            </p>
          </div>
          <a href="mailto:spacedrift.contact@gmail.com" className="btn-fill ro-reveal">
            <span>Discuss Your Research <ArrowRight size={14} strokeWidth={2} /></span>
          </a>
        </div>
      </section>

      <section className="ro-services">
        <div className="sec-wrap">
          <p className="sec-label">What We Deliver</p>
          <h2 className="sec-heading">From data to reproducible results.</h2>
          <p className="sec-desc">
            We handle the implementation and experiment operations around your research question.
            Every deliverable is scoped upfront and built so results can be traced back to data,
            code, and configuration.
          </p>
          <div className="ro-cards">
            <div className="ro-card half">
              <span className="ro-card-label">Foundation</span>
              <h4>Dataset Curation & Cleaning</h4>
              <p>
                Raw data converted into research-ready datasets. We handle collection support,
                deduplication, normalization, train/test splitting, and format standardization.
                Your experiments start from documented data, not loose files.
              </p>
            </div>
            <div className="ro-card half">
              <span className="ro-card-label">Pipeline</span>
              <h4>Reproducible Experiment Pipelines</h4>
              <p>
                Train/eval harnesses with version-controlled configs, automated metric tracking,
                and deterministic seeds. Run agreed experiments from a single command and trace
                each result back to the exact configuration used.
              </p>
            </div>
            <div className="ro-card third">
              <span className="ro-card-label">Validation</span>
              <h4>Baseline Replication</h4>
              <p>We reproduce selected results from published papers on your dataset or hardware, then document the gap between the paper and your setup.</p>
            </div>
            <div className="ro-card third">
              <span className="ro-card-label">Advisory</span>
              <h4>ML & Stats Consulting</h4>
              <p>Practical guidance on methodology, experimental design, statistical tests, and results interpretation for thesis or paper chapters.</p>
            </div>
            <div className="ro-card third">
              <span className="ro-card-label">Writing</span>
              <h4>Publication Support</h4>
              <p>Support for IEEE, Springer, and ACM-style drafts, including literature review structure, methodology sections, figures, and citation cleanup.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ro-quality">
        <div className="sec-wrap">
          <div className="ro-metrics-row">
            <div className="ro-metric">
              <p className="ro-metric-num">100<span className="warm">%</span></p>
              <p className="ro-metric-label">Reproducible results across all pipelines</p>
            </div>
            <div className="ro-metric">
              <p className="ro-metric-num">72<span className="warm">hr</span></p>
              <p className="ro-metric-label">Average turnaround for dataset delivery</p>
            </div>
            <div className="ro-metric">
              <p className="ro-metric-num">15<span className="warm">+</span></p>
              <p className="ro-metric-label">Research domains covered</p>
            </div>
            <div className="ro-metric">
              <p className="ro-metric-num">30<span className="warm">d</span></p>
              <p className="ro-metric-label">Post-delivery support included</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ro-process">
        <div className="sec-wrap">
          <div className="ro-process-grid">
            <div className="ro-sticky">
              <p className="sec-label">Process</p>
              <h2 className="sec-heading">Structured research support.</h2>
              <p style={{ fontSize: "15px", color: "var(--ink-2)", lineHeight: 1.8, marginTop: "20px" }}>
                Every engagement starts with a written scope. You know which experiments,
                datasets, metrics, and documents are included before work begins.
              </p>
            </div>
            <div className="ro-steps">
              {[
                { num: "01", title: "Research Brief", desc: "Share your topic, guidelines, papers, dataset status, and deadline. We assess feasibility and identify what can be delivered within a fixed scope." },
                { num: "02", title: "Scope & Proposal", desc: "Within 24 hours, you receive a fixed-price proposal with deliverables, timeline, assumptions, and exclusions. There is no open-ended research retainer." },
                { num: "03", title: "Build & Validate", desc: "We implement pipelines, curate datasets, and run agreed experiments with regular check-ins. You see working code and result artifacts at each milestone." },
                { num: "04", title: "Deliver & Support", desc: "Delivery includes source code, configs, documentation, and a walkthrough session. 30 days of post-delivery support covers questions and scoped revisions." },
              ].map(({ num, title, desc }) => (
                <div key={num} className="ro-step">
                  <span className="ro-step-num">{num}</span>
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

      <section className="ro-domains">
        <div className="sec-wrap">
          <p className="sec-label">Domains</p>
          <h2 className="sec-heading">Research domains we support.</h2>
          <div className="ro-domains-grid">
            <div className="ro-domain">
              <span className="ro-domain-tag">ML & AI</span>
              <h4>Machine Learning</h4>
              <p>Deep learning, NLP, computer vision, LLM evaluation, fine-tuning workflows, reinforcement learning, and generative model experiments.</p>
            </div>
            <div className="ro-domain">
              <span className="ro-domain-tag">Data</span>
              <h4>Data Science</h4>
              <p>Statistical analysis, predictive modeling, exploratory data analysis, and reproducible visualization for research reporting.</p>
            </div>
            <div className="ro-domain">
              <span className="ro-domain-tag">Engineering</span>
              <h4>Software Engineering</h4>
              <p>System design, performance optimization, distributed computing experiments, and implementation support for academic prototypes.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ro-cta">
        <div className="sec-wrap">
          <h2 className="ro-cta-r">Need research support<br />with a clear scope?</h2>
          <p className="ro-cta-r">
            Share your research requirements. We respond within 24 hours with a
            clear scope, methodology, and fixed price if the work is a fit.
          </p>
          <a href="mailto:spacedrift.contact@gmail.com" className="btn-fill ro-cta-r">
            <span>spacedrift.contact@gmail.com <ArrowUpRight size={14} strokeWidth={2} /></span>
          </a>
        </div>
      </section>
    </>
  );
}
