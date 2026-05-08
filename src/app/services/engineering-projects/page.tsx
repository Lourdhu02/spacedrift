"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function EngineeringProjects() {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!h1Ref.current) return;
    document.fonts.ready.then(() => {
      if (!h1Ref.current) return;
      const split = SplitText.create(h1Ref.current, { type: "lines,words", mask: "lines" });
      gsap.from(split.words, { yPercent: 120, duration: 1.2, stagger: 0.04, ease: "expo.out", delay: 0.3 });
    });
    gsap.fromTo(".ep-reveal", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 1 });
  }, []);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".ep-card").forEach((card, i) => {
      gsap.fromTo(card, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: i * 0.08,
        scrollTrigger: { trigger: card, start: "top 90%" },
      });
    });
  }, []);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".ep-step").forEach((el, i) => {
      gsap.fromTo(el, { x: -30, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: i * 0.1,
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });
  }, []);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".ep-level").forEach((el, i) => {
      gsap.fromTo(el, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: i * 0.1,
        scrollTrigger: { trigger: ".ep-levels-grid", start: "top 85%" },
      });
    });
  }, []);

  useGSAP(() => {
    gsap.fromTo(".ep-cta-r", { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out",
      scrollTrigger: { trigger: ".ep-cta", start: "top 82%" },
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
        .ep-hero {
          min-height: 100svh; display: flex; align-items: flex-end;
          padding: var(--nav-h) 0 100px; background: var(--bg);
          position: relative; overflow: hidden;
        }
        .ep-inner { width: 90%; max-width: 1400px; margin: 0 auto; position: relative; z-index: 1; }
        .ep-hero h1 {
          font-family: var(--font-display);
          font-size: clamp(48px, 8vw, 110px);
          font-weight: 800; letter-spacing: -0.05em;
          line-height: 0.95; color: var(--ink); margin-bottom: 40px;
          max-width: 800px;
        }
        .ep-hero h1 .accent { color: var(--accent); }
        .ep-intro {
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
          margin-bottom: 48px;
        }
        .ep-intro p { font-size: 16px; color: var(--ink-2); line-height: 1.8; }
        .ep-intro strong { color: var(--ink); font-weight: 600; }

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

        .ep-coverage {
          padding: 160px 0; background: var(--bg);
          border-top: 1px solid var(--line);
        }
        .ep-cards {
          display: grid; grid-template-columns: repeat(12, 1fr); gap: 16px;
        }
        .ep-card {
          background: var(--bg-2); border: 1px solid var(--line);
          padding: 36px 28px; display: flex; flex-direction: column; gap: 12px;
          transition: border-color var(--t-fast), transform var(--t-fast);
        }
        .ep-card:hover { border-color: var(--line-light); transform: translateY(-3px); }
        .ep-card.half { grid-column: span 6; }
        .ep-card.third { grid-column: span 4; }
        .ep-card-label {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--warm);
        }
        .ep-card h4 {
          font-family: var(--font-display); font-size: 22px;
          font-weight: 700; letter-spacing: -0.03em; color: var(--ink);
        }
        .ep-card p { font-size: 14px; color: var(--ink-2); line-height: 1.8; }

        .ep-process {
          padding: 160px 0; background: var(--bg-2);
          border-top: 1px solid var(--line);
        }
        .ep-process-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 80px; align-items: start; }
        .ep-sticky { position: sticky; top: 120px; }
        .ep-steps { display: flex; flex-direction: column; }
        .ep-step {
          display: grid; grid-template-columns: 64px 1fr; gap: 24px;
          padding: 36px 0; border-bottom: 1px solid var(--line);
        }
        .ep-step:first-child { border-top: 1px solid var(--line); }
        .ep-step-num {
          font-family: var(--font-display); font-size: 28px;
          font-weight: 800; color: var(--accent);
        }
        .ep-step h4 {
          font-family: var(--font-display); font-size: 20px;
          font-weight: 700; color: var(--ink); margin-bottom: 8px; letter-spacing: -0.02em;
        }
        .ep-step p { font-size: 14px; color: var(--ink-2); line-height: 1.8; }

        .ep-levels {
          padding: 160px 0; background: var(--bg);
          border-top: 1px solid var(--line);
        }
        .ep-levels-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--line); margin-top: 64px; }
        .ep-level {
          background: var(--bg); padding: 48px 36px;
          transition: background var(--t);
        }
        .ep-level:hover { background: var(--bg-2); }
        .ep-level-tag {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--accent); margin-bottom: 16px;
          display: inline-block; padding: 4px 10px;
          border: 1px solid rgba(37,99,235,0.3); background: rgba(37,99,235,0.05);
        }
        .ep-level h4 {
          font-family: var(--font-display); font-size: 22px;
          font-weight: 700; color: var(--ink); margin-bottom: 12px; letter-spacing: -0.02em;
        }
        .ep-level p { font-size: 14px; color: var(--ink-2); line-height: 1.8; }
        .ep-level ul { list-style: none; margin-top: 16px; display: flex; flex-direction: column; gap: 8px; }
        .ep-level ul li {
          font-size: 13px; color: var(--ink-3); padding-left: 16px; position: relative;
        }
        .ep-level ul li::before {
          content: ''; position: absolute; left: 0; top: 8px;
          width: 4px; height: 4px; background: var(--accent); border-radius: 50%;
        }

        .ep-cta {
          padding: 160px 0; background: var(--bg-2);
          border-top: 1px solid var(--line);
        }
        .ep-cta h2 {
          font-family: var(--font-display); font-size: clamp(36px, 5vw, 72px);
          font-weight: 800; letter-spacing: -0.04em; color: var(--ink); margin-bottom: 24px;
          max-width: 700px;
        }
        .ep-cta p { font-size: 17px; color: var(--ink-2); margin-bottom: 40px; max-width: 500px; line-height: 1.8; }

        @media (max-width: 768px) {
          .ep-intro { grid-template-columns: 1fr; gap: 24px; }
          .ep-cards { grid-template-columns: 1fr; }
          .ep-card.half, .ep-card.third { grid-column: span 1; }
          .ep-process-grid { grid-template-columns: 1fr; gap: 48px; }
          .ep-sticky { position: static; }
          .ep-levels-grid { grid-template-columns: 1fr; }
          .ep-step { grid-template-columns: 48px 1fr; gap: 16px; }
        }
      `}</style>

      <section className="ep-hero">
        <div className="dot-bg" />
        <div className="ep-inner">
          <h1 ref={h1Ref}>
            Engineering<br />Project <span className="accent">Assistance</span>
          </h1>
          <div className="ep-intro ep-reveal">
            <p>
              <strong>Struggling with your final year project?</strong> You are not alone. Most engineering
              students face the same problem: unclear guidance, unrealistic timelines, and zero support
              for research paper writing. We exist to fix that.
            </p>
            <p>
              SpaceDrift provides end-to-end project guidance for B.Tech, M.Tech, and Ph.D. students.
              From topic selection to IEEE-formatted research papers, we handle the hard parts so you
              can focus on learning and presenting confidently.
            </p>
          </div>
          <a href="mailto:contact@spacedrift.in" className="btn-fill ep-reveal">
            <span>Discuss Your Project <ArrowRight size={14} strokeWidth={2} /></span>
          </a>
        </div>
      </section>

      <section className="ep-coverage">
        <div className="sec-wrap">
          <p className="sec-label">What We Cover</p>
          <h2 className="sec-heading">From ideation to publication.</h2>
          <p className="sec-desc">
            We do not just hand you code. We walk you through the entire lifecycle of an engineering project,
            ensuring you understand every component and can defend your work confidently.
          </p>
          <div className="ep-cards">
            <div className="ep-card half">
              <span className="ep-card-label">Core</span>
              <h4>Machine Learning & AI Projects</h4>
              <p>
                Deep learning, NLP, computer vision, LLM fine-tuning, reinforcement learning — we implement
                state-of-the-art architectures and train models on your datasets. Complete with evaluation
                metrics, ablation studies, and comparison with baselines.
              </p>
            </div>
            <div className="ep-card half">
              <span className="ep-card-label">Research</span>
              <h4>Research Paper Writing</h4>
              <p>
                IEEE, Springer, and ACM formatted papers with proper literature review, methodology sections,
                experimental setup, results analysis, and citation management. We help you write papers
                that get accepted.
              </p>
            </div>
            <div className="ep-card third">
              <span className="ep-card-label">Analytics</span>
              <h4>Data Science & Analytics</h4>
              <p>Statistical analysis, visualization dashboards, predictive modeling, and EDA on real-world datasets.</p>
            </div>
            <div className="ep-card third">
              <span className="ep-card-label">Documentation</span>
              <h4>Complete Documentation</h4>
              <p>Project reports, SRS documents, UML diagrams, presentation slides, and demo videos — everything your university requires.</p>
            </div>
            <div className="ep-card third">
              <span className="ep-card-label">Support</span>
              <h4>Post-Delivery Support</h4>
              <p>30 days of support after delivery. Bug fixes, presentation prep, viva coaching, and last-minute revisions included.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ep-process">
        <div className="sec-wrap">
          <div className="ep-process-grid">
            <div className="ep-sticky">
              <p className="sec-label">Process</p>
              <h2 className="sec-heading">Clear steps. No guesswork.</h2>
              <p style={{ fontSize: "15px", color: "var(--ink-2)", lineHeight: 1.8, marginTop: "20px" }}>
                Every project follows the same proven workflow. You know exactly what happens next
                at every stage.
              </p>
            </div>
            <div className="ep-steps">
              {[
                { num: "01", title: "Share Your Requirements", desc: "Tell us your branch, semester, university guidelines, and deadline. Share any existing work or ideas. We scope the project in a single call." },
                { num: "02", title: "Receive a Clear Proposal", desc: "Within 24 hours, you get a fixed-price proposal with topic options, methodology, tech stack, timeline, and deliverables. No ambiguity. No hidden costs." },
                { num: "03", title: "Build Together", desc: "We implement the project with weekly check-ins. You see working code at every milestone. Feedback is incorporated immediately, not at the end." },
                { num: "04", title: "Complete Delivery", desc: "You receive: working source code, research paper, project report, presentation slides, and a walkthrough session. Plus 30 days of post-delivery support." },
              ].map(({ num, title, desc }) => (
                <div key={num} className="ep-step">
                  <span className="ep-step-num">{num}</span>
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

      <section className="ep-levels">
        <div className="sec-wrap">
          <p className="sec-label">Programs</p>
          <h2 className="sec-heading">For every academic level.</h2>
          <div className="ep-levels-grid">
            <div className="ep-level">
              <span className="ep-level-tag">Undergraduate</span>
              <h4>B.Tech Projects</h4>
              <p>Final year and mini projects with working implementations, documentation, and presentation materials.</p>
              <ul>
                <li>Topic selection & feasibility</li>
                <li>Full implementation</li>
                <li>Project report & PPT</li>
                <li>Demo & viva preparation</li>
              </ul>
            </div>
            <div className="ep-level">
              <span className="ep-level-tag">Postgraduate</span>
              <h4>M.Tech Thesis</h4>
              <p>Research-oriented projects with novel contributions, comprehensive experiments, and journal-quality papers.</p>
              <ul>
                <li>Literature survey & gap analysis</li>
                <li>Novel methodology design</li>
                <li>Extensive experimentation</li>
                <li>IEEE/Springer paper</li>
              </ul>
            </div>
            <div className="ep-level">
              <span className="ep-level-tag">Doctoral</span>
              <h4>Ph.D. Research</h4>
              <p>Advanced research assistance with state-of-the-art implementations, ablation studies, and publication support.</p>
              <ul>
                <li>SOTA implementation</li>
                <li>Ablation studies & baselines</li>
                <li>Multi-paper publication plan</li>
                <li>Conference submission support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="ep-cta">
        <div className="sec-wrap">
          <h2 className="ep-cta-r">Deadline approaching?<br />We can start today.</h2>
          <p className="ep-cta-r">
            Reach out now. We respond within 24 hours with a clear scope and timeline.
            Most projects can begin within 48 hours of confirmation.
          </p>
          <a href="mailto:contact@spacedrift.in" className="btn-fill ep-cta-r">
            <span>contact@spacedrift.in <ArrowUpRight size={14} strokeWidth={2} /></span>
          </a>
        </div>
      </section>
    </>
  );
}
