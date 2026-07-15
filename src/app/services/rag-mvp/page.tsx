"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function RagMVP() {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!h1Ref.current) return;
    document.fonts.ready.then(() => {
      if (!h1Ref.current) return;
      const split = SplitText.create(h1Ref.current, { type: "lines,words", mask: "lines" });
      gsap.from(split.words, { yPercent: 120, duration: 1.2, stagger: 0.04, ease: "expo.out", delay: 0.3 });
    });
    gsap.fromTo(".rm-reveal", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 1 });
  }, []);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".rm-card").forEach((card, i) => {
      gsap.fromTo(card, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: i * 0.08,
        scrollTrigger: { trigger: card, start: "top 90%" },
      });
    });
  }, []);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".rm-metric").forEach((el, i) => {
      gsap.fromTo(el, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: i * 0.08,
        scrollTrigger: { trigger: ".rm-metrics-row", start: "top 85%" },
      });
    });
  }, []);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".rm-chip").forEach((el, i) => {
      gsap.fromTo(el, { y: 15, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: i * 0.04,
        scrollTrigger: { trigger: ".rm-stack-grid", start: "top 85%" },
      });
    });
  }, []);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".rm-step").forEach((el, i) => {
      gsap.fromTo(el, { x: -30, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: i * 0.1,
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });
  }, []);

  useGSAP(() => {
    gsap.fromTo(".rm-cta-r", { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out",
      scrollTrigger: { trigger: ".rm-cta", start: "top 82%" },
    });
  }, []);

  return (
    <>
      <style>{`
        .grid-bg {
          position: absolute; inset: 0; opacity: 0.3;
          background-image:
            radial-gradient(circle, var(--line-light) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .rm-hero {
          min-height: 100svh; display: flex; align-items: flex-end;
          padding: var(--nav-h) 0 100px; background: var(--bg);
          position: relative; overflow: hidden;
        }
        .rm-inner { width: 90%; max-width: 1400px; margin: 0 auto; position: relative; z-index: 1; overflow: hidden; }
        .rm-hero h1 {
          font-family: var(--font-display);
          font-size: clamp(40px, 7vw, 90px);
          font-weight: 800; letter-spacing: -0.04em;
          line-height: 0.98; color: var(--ink); margin-bottom: 40px;
          max-width: 100%;
        }
        .rm-hero h1 .accent { color: var(--accent); }
        .rm-intro {
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
          margin-bottom: 48px;
        }
        .rm-intro p { font-size: 16px; color: var(--ink-2); line-height: 1.8; }
        .rm-intro strong { color: var(--ink); font-weight: 600; }

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

        .rm-features {
          padding: 160px 0; background: var(--bg);
          border-top: 1px solid var(--line);
        }
        .rm-features-grid {
          display: grid; grid-template-columns: repeat(12, 1fr); gap: 16px;
        }
        .rm-card {
          background: var(--bg-2); border: 1px solid var(--line);
          padding: 36px 28px; display: flex; flex-direction: column; gap: 12px;
          transition: border-color var(--t-fast), transform var(--t-fast);
        }
        .rm-card:hover { border-color: var(--line-light); transform: translateY(-3px); }
        .rm-card.half { grid-column: span 6; }
        .rm-card.third { grid-column: span 4; }
        .rm-card-label {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--warm);
        }
        .rm-card h4 {
          font-family: var(--font-display); font-size: 22px;
          font-weight: 700; letter-spacing: -0.03em; color: var(--ink);
        }
        .rm-card p { font-size: 14px; color: var(--ink-2); line-height: 1.8; }

        .rm-quality {
          padding: 100px 0; background: var(--bg-2);
          border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
        }
        .rm-metrics-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--line); }
        .rm-metric { background: var(--bg-2); padding: 48px 32px; }
        .rm-metric-num {
          font-family: var(--font-display); font-size: clamp(32px, 3.5vw, 48px);
          font-weight: 800; letter-spacing: -0.04em; color: var(--ink); margin-bottom: 8px;
        }
        .rm-metric-num .warm { color: var(--warm); }
        .rm-metric-label { font-size: 13px; color: var(--ink-3); line-height: 1.6; }

        .rm-stack {
          padding: 120px 0; background: var(--bg);
          border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
        }
        .rm-stack-grid { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 48px; }
        .rm-chip {
          font-family: var(--font-mono); font-size: 12px;
          letter-spacing: 0.06em; text-transform: uppercase;
          padding: 12px 24px; border: 1px solid var(--line-light);
          color: var(--ink-2); background: var(--bg);
          transition: all var(--t-fast);
        }
        .rm-chip:hover { color: var(--ink); border-color: var(--accent); }

        .rm-process {
          padding: 160px 0; background: var(--bg-2);
          border-bottom: 1px solid var(--line);
        }
        .rm-process-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 80px; align-items: start; }
        .rm-sticky { position: sticky; top: 120px; }
        .rm-steps { display: flex; flex-direction: column; }
        .rm-step {
          display: grid; grid-template-columns: 64px 1fr; gap: 24px;
          padding: 36px 0; border-bottom: 1px solid var(--line);
        }
        .rm-step:first-child { border-top: 1px solid var(--line); }
        .rm-step-num {
          font-family: var(--font-display); font-size: 28px;
          font-weight: 800; color: var(--accent);
        }
        .rm-step h4 {
          font-family: var(--font-display); font-size: 20px;
          font-weight: 700; color: var(--ink); margin-bottom: 8px; letter-spacing: -0.02em;
        }
        .rm-step p { font-size: 14px; color: var(--ink-2); line-height: 1.8; }

        .rm-cta {
          padding: 160px 0; background: var(--bg);
          border-top: 1px solid var(--line);
        }
        .rm-cta h2 {
          font-family: var(--font-display); font-size: clamp(36px, 5vw, 72px);
          font-weight: 800; letter-spacing: -0.04em; color: var(--ink); margin-bottom: 24px;
          max-width: 700px;
        }
        .rm-cta > .sec-wrap > p { font-size: 17px; color: var(--ink-2); margin-bottom: 40px; max-width: 500px; line-height: 1.8; }

        @media (max-width: 768px) {
          .rm-intro { grid-template-columns: 1fr; gap: 24px; }
          .rm-features-grid { grid-template-columns: 1fr; }
          .rm-card.half, .rm-card.third { grid-column: span 1; }
          .rm-metrics-row { grid-template-columns: 1fr 1fr; }
          .rm-process-grid { grid-template-columns: 1fr; gap: 48px; }
          .rm-sticky { position: static; }
          .rm-step { grid-template-columns: 48px 1fr; gap: 16px; }
        }
      `}</style>

      <section className="rm-hero">
        <div className="grid-bg" />
        <div className="rm-inner">
          <h1 ref={h1Ref}>
            RAG & Agentic AI<br /><span className="accent">MVP Builds</span>
          </h1>
          <div className="rm-intro rm-reveal">
            <p>
              <strong>Your AI MVP should answer from your data, not guesses.</strong> We build
              internal knowledge-base chatbots, RAG systems, and small agentic workflows that
              retrieve from your documents, databases, or approved sources.
            </p>
            <p>
              This service is for founders, product teams, and internal teams that need a
              working prototype with clear limits. Each build has a fixed scope, timeline,
              and handoff plan before implementation starts.
            </p>
          </div>
          <a href="mailto:spacedrift.contact@gmail.com" className="btn-fill rm-reveal">
            <span>Start Your MVP <ArrowRight size={14} strokeWidth={2} /></span>
          </a>
        </div>
      </section>

      <section className="rm-features">
        <div className="sec-wrap">
          <p className="sec-label">What We Build</p>
          <h2 className="sec-heading">RAG systems with clear boundaries.</h2>
          <p className="sec-desc">
            We define data sources, retrieval behavior, evaluation checks, and deployment target
            upfront. The goal is a usable AI MVP you can test with real users or internal teams.
          </p>
          <div className="rm-features-grid">
            <div className="rm-card half">
              <span className="rm-card-label">Knowledge</span>
              <h4>Internal Knowledge-Base Chatbot</h4>
              <p>
                Your team asks questions in natural language and the system retrieves answers
                from internal docs, wikis, or databases. We can deliver a web UI, Slack bot,
                Teams bot, or API depending on the fixed scope.
              </p>
            </div>
            <div className="rm-card half">
              <span className="rm-card-label">Privacy</span>
              <h4>Privacy-First / On-Prem RAG</h4>
              <p>
                For use cases where data cannot leave your network. We can scope local embeddings,
                vector stores, and self-hosted or approved model access based on your security
                and data residency requirements.
              </p>
            </div>
            <div className="rm-card third">
              <span className="rm-card-label">Agents</span>
              <h4>Agentic Workflows</h4>
              <p>Small multi-step AI workflows for tasks such as document lookup, summarization, report drafting, and tool calling with logged actions.</p>
            </div>
            <div className="rm-card third">
              <span className="rm-card-label">Pipeline</span>
              <h4>Document Ingestion</h4>
              <p>Ingestion pipelines that parse, chunk, embed, and index your content for retrieval. Supports PDFs, docs, spreadsheets, web pages, and databases.</p>
            </div>
            <div className="rm-card third">
              <span className="rm-card-label">Integration</span>
              <h4>Platform Integration</h4>
              <p>Slack bots, Teams integrations, web apps, and API endpoints so the assistant fits into the workflow your team already uses.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rm-quality">
        <div className="sec-wrap">
          <div className="rm-metrics-row">
            <div className="rm-metric">
              <p className="rm-metric-num">3<span className="warm">wk</span></p>
              <p className="rm-metric-label">Average MVP delivery time</p>
            </div>
            <div className="rm-metric">
              <p className="rm-metric-num">100<span className="warm">%</span></p>
              <p className="rm-metric-label">Fixed-scope, fixed-price engagements</p>
            </div>
            <div className="rm-metric">
              <p className="rm-metric-num">10<span className="warm">+</span></p>
              <p className="rm-metric-label">RAG systems deployed in production</p>
            </div>
            <div className="rm-metric">
              <p className="rm-metric-num">30<span className="warm">d</span></p>
              <p className="rm-metric-label">Post-launch support included</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rm-stack">
        <div className="sec-wrap">
          <p className="sec-label">Technology</p>
          <h2 className="sec-heading">Practical AI stack.</h2>
          <p className="sec-desc">We use documented tools that are easy to inspect, deploy, and replace. No black boxes and no avoidable vendor lock-in.</p>
          <div className="rm-stack-grid">
            {["LangChain", "LlamaIndex", "OpenAI", "Ollama", "ChromaDB", "Pinecone", "FastAPI", "Next.js", "Docker", "Vercel"].map(t => (
              <span key={t} className="rm-chip">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="rm-process">
        <div className="sec-wrap">
          <div className="rm-process-grid">
            <div className="rm-sticky">
              <p className="sec-label">Process</p>
          <h2 className="sec-heading">MVP build in weeks, not months.</h2>
              <p style={{ fontSize: "15px", color: "var(--ink-2)", lineHeight: 1.8, marginTop: "20px" }}>
                Every engagement follows a tight, scoped workflow. We agree what the AI system
                should do, what it should refuse, and how success will be checked.
              </p>
            </div>
            <div className="rm-steps">
              {[
                { num: "01", title: "Requirements & Scoping", desc: "Share your use case, data sources, user roles, and success criteria. We define a fixed scope with deliverables, exclusions, and timeline." },
                { num: "02", title: "Architecture & Prototype", desc: "We design the retrieval flow, model access, storage, and UI/API shape. You see a working prototype early, not just a diagram." },
                { num: "03", title: "Build & Evaluate", desc: "We implement the MVP and test it with real questions, documents, and failure cases. Feedback is handled within the agreed scope." },
                { num: "04", title: "Deploy & Handoff", desc: "Deployment goes to your chosen infrastructure where possible, with documentation, environment notes, and 30 days of post-launch support." },
              ].map(({ num, title, desc }) => (
                <div key={num} className="rm-step">
                  <span className="rm-step-num">{num}</span>
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

      <section className="rm-cta">
        <div className="sec-wrap">
          <h2 className="rm-cta-r">Need a scoped AI MVP<br />you can test?</h2>
          <p className="rm-cta-r">
            Tell us about your use case. We respond within 24 hours with a
            fixed scope, timeline, and price if the project is a fit.
          </p>
          <a href="mailto:spacedrift.contact@gmail.com" className="btn-fill rm-cta-r">
            <span>spacedrift.contact@gmail.com <ArrowUpRight size={14} strokeWidth={2} /></span>
          </a>
        </div>
      </section>
    </>
  );
}
