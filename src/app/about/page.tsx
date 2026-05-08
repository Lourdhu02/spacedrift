"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function About() {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!h1Ref.current) return;
    document.fonts.ready.then(() => {
      if (!h1Ref.current) return;
      const split = SplitText.create(h1Ref.current, { type: "lines,words", mask: "lines" });
      gsap.from(split.words, { yPercent: 120, duration: 1.2, stagger: 0.04, ease: "expo.out", delay: 0.3 });
    });
    gsap.fromTo(".ab-reveal", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 1 });
  }, []);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".ab-story-p").forEach((el, i) => {
      gsap.fromTo(el, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: i * 0.15,
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });
  }, []);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".ab-value").forEach((el, i) => {
      gsap.fromTo(el, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: i * 0.08,
        scrollTrigger: { trigger: el, start: "top 90%" },
      });
    });
  }, []);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".ab-info-cell").forEach((el, i) => {
      gsap.fromTo(el, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: i * 0.1,
        scrollTrigger: { trigger: ".ab-info-grid", start: "top 85%" },
      });
    });
  }, []);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".ab-diff-item").forEach((el, i) => {
      gsap.fromTo(el, { x: -30, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: i * 0.1,
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });
  }, []);

  useGSAP(() => {
    gsap.fromTo(".ab-cta-r", { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out",
      scrollTrigger: { trigger: ".ab-cta", start: "top 82%" },
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
        .ab-hero {
          min-height: 100svh; display: flex; align-items: flex-end;
          padding: var(--nav-h) 0 100px; background: var(--bg);
          position: relative; overflow: hidden;
        }
        .ab-inner { width: 90%; max-width: 1400px; margin: 0 auto; position: relative; z-index: 1; overflow: hidden; }
        .ab-hero h1 {
          font-family: var(--font-display);
          font-size: clamp(40px, 7vw, 90px);
          font-weight: 800; letter-spacing: -0.04em;
          line-height: 0.98; color: var(--ink); margin-bottom: 40px;
          max-width: 100%;
        }
        .ab-hero h1 .accent { color: var(--accent); }
        .ab-hero-desc { font-size: 17px; color: var(--ink-2); max-width: 600px; line-height: 1.8; }
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

        .ab-story {
          padding: 160px 0; background: var(--bg);
          border-top: 1px solid var(--line);
        }
        .ab-story-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px; align-items: start; margin-top: 48px; }
        .ab-story-col { display: flex; flex-direction: column; gap: 24px; }
        .ab-story-p { font-size: 16px; color: var(--ink-2); line-height: 1.9; }
        .ab-story-p strong { color: var(--ink); font-weight: 600; }
        .ab-story-highlight {
          padding: 32px; border-left: 3px solid var(--accent);
          background: var(--bg-2); margin-top: 16px;
        }
        .ab-story-highlight p {
          font-family: var(--font-display); font-size: 20px;
          font-weight: 700; color: var(--ink); line-height: 1.5; letter-spacing: -0.02em;
        }

        .ab-values {
          padding: 160px 0; background: var(--bg-2);
          border-top: 1px solid var(--line);
        }
        .ab-value-grid {
          display: grid; grid-template-columns: repeat(12, 1fr); gap: 16px; margin-top: 64px;
        }
        .ab-value {
          background: var(--bg-3); border: 1px solid var(--line);
          padding: 36px 28px; display: flex; flex-direction: column; gap: 12px;
          transition: border-color var(--t-fast), transform var(--t-fast);
        }
        .ab-value:hover { border-color: var(--line-light); transform: translateY(-3px); }
        .ab-value.half { grid-column: span 6; }
        .ab-value.third { grid-column: span 4; }
        .ab-value-label {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--warm);
        }
        .ab-value h4 {
          font-family: var(--font-display); font-size: 22px;
          font-weight: 700; letter-spacing: -0.03em; color: var(--ink);
        }
        .ab-value p { font-size: 14px; color: var(--ink-2); line-height: 1.8; }

        .ab-info {
          padding: 100px 0; background: var(--bg);
          border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
        }
        .ab-info-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--line); }
        .ab-info-cell { background: var(--bg); padding: 48px 32px; }
        .ab-info-label {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--ink-3); margin-bottom: 12px;
        }
        .ab-info-val {
          font-family: var(--font-display); font-size: 20px;
          font-weight: 700; color: var(--ink); letter-spacing: -0.02em;
        }
        .ab-info-val a { color: var(--accent); transition: color var(--t-fast); }
        .ab-info-val a:hover { color: var(--accent-2); }

        .ab-diff {
          padding: 160px 0; background: var(--bg-2);
          border-bottom: 1px solid var(--line);
        }
        .ab-diff-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 80px; align-items: start; margin-top: 48px; }
        .ab-diff-sticky { position: sticky; top: 120px; }
        .ab-diff-list { display: flex; flex-direction: column; }
        .ab-diff-item {
          display: grid; grid-template-columns: 48px 1fr; gap: 20px;
          padding: 32px 0; border-bottom: 1px solid var(--line);
        }
        .ab-diff-item:first-child { border-top: 1px solid var(--line); }
        .ab-diff-num {
          font-family: var(--font-display); font-size: 24px;
          font-weight: 800; color: var(--warm);
        }
        .ab-diff-item h4 {
          font-family: var(--font-display); font-size: 18px;
          font-weight: 700; color: var(--ink); margin-bottom: 6px; letter-spacing: -0.02em;
        }
        .ab-diff-item p { font-size: 14px; color: var(--ink-2); line-height: 1.8; }

        .ab-cta {
          padding: 160px 0; background: var(--bg);
          border-top: 1px solid var(--line);
        }
        .ab-cta h2 {
          font-family: var(--font-display); font-size: clamp(36px, 5vw, 72px);
          font-weight: 800; letter-spacing: -0.04em; color: var(--ink); margin-bottom: 24px;
          max-width: 600px;
        }
        .ab-cta > .sec-wrap > p { font-size: 17px; color: var(--ink-2); margin-bottom: 40px; max-width: 500px; line-height: 1.8; }

        @media (max-width: 768px) {
          .ab-story-grid { grid-template-columns: 1fr; gap: 40px; }
          .ab-value-grid { grid-template-columns: 1fr; }
          .ab-value.half, .ab-value.third { grid-column: span 1; }
          .ab-info-grid { grid-template-columns: 1fr 1fr; }
          .ab-diff-grid { grid-template-columns: 1fr; gap: 48px; }
          .ab-diff-sticky { position: static; }
        }
        @media (max-width: 480px) {
          .ab-info-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="ab-hero">
        <div className="dot-bg" />
        <div className="ab-inner">
          <h1 ref={h1Ref}>
            About<br /><span className="accent">spacedrift.in</span>
          </h1>
          <p className="ab-hero-desc ab-reveal">
            We are a Bengaluru-based studio that helps engineers build great projects,
            delivers production-quality data annotation for ML teams, and builds websites
            that perform at the highest level. Three things, done exceptionally well.
          </p>
        </div>
      </section>

      <section className="ab-story">
        <div className="sec-wrap">
          <p className="sec-label">Our Story</p>
          <h2 className="sec-heading">Why spacedrift.in exists.</h2>
          <div className="ab-story-grid">
            <div className="ab-story-col">
              <p className="ab-story-p">
                <strong>spacedrift.in was born from frustration.</strong> We watched engineering students
                struggle with outdated project guidance, businesses settle for mediocre template websites,
                and ML teams waste months on poorly labeled data. The pattern was always the same:
                affordable options were terrible, and quality options were inaccessible.
              </p>
              <p className="ab-story-p">
                So we built a company that delivers top-tier work at prices that make sense.
                The secret? We stay focused. Three services, done perfectly. No agency bloat,
                no account managers, no layers between you and the people doing the work.
              </p>
            </div>
            <div className="ab-story-col">
              <p className="ab-story-p">
                Every client works directly with our senior engineers. That means faster
                turnaround, fewer misunderstandings, and results that match what was promised.
                We take on fewer projects than we could — because quality requires focus, and
                focus requires saying no.
              </p>
              <div className="ab-story-highlight">
                <p>Fewer projects. Better results. Full ownership of everything we build.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ab-values">
        <div className="sec-wrap">
          <p className="sec-label">Principles</p>
          <h2 className="sec-heading">What drives every decision.</h2>
          <div className="ab-value-grid">
            <div className="ab-value half">
              <span className="ab-value-label">Principle 01</span>
              <h4>Quality Over Volume</h4>
              <p>
                We deliberately limit the number of projects we take on. Every engagement gets our
                full attention and senior-level expertise. We would rather lose a deal than deliver
                mediocre work.
              </p>
            </div>
            <div className="ab-value half">
              <span className="ab-value-label">Principle 02</span>
              <h4>Radical Transparency</h4>
              <p>
                Fixed pricing quoted upfront. Clear timelines with milestone visibility. Regular progress
                updates without you having to ask. If something goes wrong, you hear about it immediately
                — not at delivery.
              </p>
            </div>
            <div className="ab-value third">
              <span className="ab-value-label">Principle 03</span>
              <h4>Full Ownership</h4>
              <p>Everything we build belongs to you. Source code, assets, documentation. No platform lock-in, no recurring fees, no dependencies on us.</p>
            </div>
            <div className="ab-value third">
              <span className="ab-value-label">Principle 04</span>
              <h4>Speed Without Shortcuts</h4>
              <p>Fast delivery is not about cutting corners. It is about eliminating waste — unnecessary meetings, approval chains, and busywork that slow everyone down.</p>
            </div>
            <div className="ab-value third">
              <span className="ab-value-label">Principle 05</span>
              <h4>Direct Communication</h4>
              <p>You talk to the people doing the work. No project managers relaying messages, no telephone game. Faster decisions, better outcomes.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ab-info">
        <div className="sec-wrap">
          <div className="ab-info-grid">
            <div className="ab-info-cell">
              <p className="ab-info-label">Location</p>
              <p className="ab-info-val">Bengaluru, India</p>
            </div>
            <div className="ab-info-cell">
              <p className="ab-info-label">Founded</p>
              <p className="ab-info-val">2024</p>
            </div>
            <div className="ab-info-cell">
              <p className="ab-info-label">Response</p>
              <p className="ab-info-val">Within 24 hours</p>
            </div>
            <div className="ab-info-cell">
              <p className="ab-info-label">Contact</p>
              <p className="ab-info-val"><a href="mailto:contact@spacedrift.in">contact@spacedrift.in</a></p>
            </div>
          </div>
        </div>
      </section>

      <section className="ab-diff">
        <div className="sec-wrap">
          <div className="ab-diff-grid">
            <div className="ab-diff-sticky">
              <p className="sec-label">Difference</p>
              <h2 className="sec-heading">How we are different.</h2>
              <p style={{ fontSize: "15px", color: "var(--ink-2)", lineHeight: 1.8, marginTop: "20px" }}>
                Most agencies optimize for volume. We optimize for outcomes.
                Here is what that looks like in practice.
              </p>
            </div>
            <div className="ab-diff-list">
              {[
                { title: "No Account Managers", desc: "You work directly with the engineers building your project. Questions get answered in hours, not days. Context is never lost in translation." },
                { title: "Fixed Pricing, Always", desc: "We quote a fixed price before work begins. No hourly billing surprises, no scope creep invoices. The price we quote is the price you pay." },
                { title: "Fewer Projects, More Focus", desc: "We cap the number of active projects. Your work is never deprioritized because a bigger client came along. Every project gets full attention." },
                { title: "Zero Lock-In", desc: "Every deliverable is fully yours — source code, documentation, assets. We deploy to your accounts. If you want to leave, you walk away with everything." },
                { title: "30-Day Support Included", desc: "Post-delivery support is standard, not an upsell. Bug fixes, content tweaks, and minor adjustments for 30 days after launch. No extra charges." },
              ].map(({ title, desc }, i) => (
                <div key={title} className="ab-diff-item">
                  <span className="ab-diff-num">{String(i + 1).padStart(2, "0")}</span>
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

      <section className="ab-cta">
        <div className="sec-wrap">
          <h2 className="ab-cta-r">Let&apos;s work<br />together.</h2>
          <p className="ab-cta-r">
            Have a project in mind? Reach out and we will get back to you within 24 hours
            with a clear scope and timeline. No sales pitch, no obligation.
          </p>
          <a href="mailto:contact@spacedrift.in" className="btn-fill ab-cta-r">
            <span>contact@spacedrift.in <ArrowUpRight size={14} strokeWidth={2} /></span>
          </a>
        </div>
      </section>
    </>
  );
}
