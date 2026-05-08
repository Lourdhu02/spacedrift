"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function WebDevelopment() {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!h1Ref.current) return;
    document.fonts.ready.then(() => {
      if (!h1Ref.current) return;
      const split = SplitText.create(h1Ref.current, { type: "lines,words", mask: "lines" });
      gsap.from(split.words, { yPercent: 120, duration: 1.2, stagger: 0.04, ease: "expo.out", delay: 0.3 });
    });
    gsap.fromTo(".wd-reveal", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 1 });
  }, []);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".wd-feature").forEach((el, i) => {
      gsap.fromTo(el, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: i * 0.08,
        scrollTrigger: { trigger: el, start: "top 90%" },
      });
    });
  }, []);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".wd-chip").forEach((el, i) => {
      gsap.fromTo(el, { y: 15, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: i * 0.04,
        scrollTrigger: { trigger: ".wd-stack-grid", start: "top 85%" },
      });
    });
  }, []);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".wd-step").forEach((el, i) => {
      gsap.fromTo(el, { x: -30, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: i * 0.1,
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });
  }, []);

  useGSAP(() => {
    gsap.fromTo(".wd-cta-r", { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out",
      scrollTrigger: { trigger: ".wd-cta", start: "top 82%" },
    });
  }, []);

  return (
    <>
      <style>{`
        .cross-bg {
          position: absolute; inset: 0; opacity: 0.3;
          background-image:
            radial-gradient(circle, var(--line-light) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .wd-hero {
          min-height: 100svh; display: flex; align-items: flex-end;
          padding: var(--nav-h) 0 100px; background: var(--bg);
          position: relative; overflow: hidden;
        }
        .wd-inner { width: 90%; max-width: 1400px; margin: 0 auto; position: relative; z-index: 1; overflow: hidden; }
        .wd-hero h1 {
          font-family: var(--font-display);
          font-size: clamp(40px, 7vw, 90px);
          font-weight: 800; letter-spacing: -0.04em;
          line-height: 0.98; color: var(--ink); margin-bottom: 40px;
          max-width: 100%;
        }
        .wd-hero h1 .accent { color: var(--accent); }
        .wd-intro {
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
          margin-bottom: 48px;
        }
        .wd-intro p { font-size: 16px; color: var(--ink-2); line-height: 1.8; }
        .wd-intro strong { color: var(--ink); font-weight: 600; }
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

        .wd-features {
          padding: 160px 0; background: var(--bg);
          border-top: 1px solid var(--line);
        }
        .wd-features-grid {
          display: grid; grid-template-columns: repeat(12, 1fr); gap: 16px;
        }
        .wd-feature {
          background: var(--bg-2); border: 1px solid var(--line);
          padding: 36px 28px; display: flex; flex-direction: column; gap: 12px;
          transition: border-color var(--t-fast), transform var(--t-fast);
        }
        .wd-feature:hover { border-color: var(--line-light); transform: translateY(-3px); }
        .wd-feature.half { grid-column: span 6; }
        .wd-feature.third { grid-column: span 4; }
        .wd-feature-label {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--warm);
        }
        .wd-feature h4 {
          font-family: var(--font-display); font-size: 22px;
          font-weight: 700; letter-spacing: -0.03em; color: var(--ink);
        }
        .wd-feature p { font-size: 14px; color: var(--ink-2); line-height: 1.8; }

        .wd-stack {
          padding: 120px 0; background: var(--bg-2);
          border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
        }
        .wd-stack-grid { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 48px; }
        .wd-chip {
          font-family: var(--font-mono); font-size: 12px;
          letter-spacing: 0.06em; text-transform: uppercase;
          padding: 12px 24px; border: 1px solid var(--line-light);
          color: var(--ink-2); background: var(--bg);
          transition: all var(--t-fast);
        }
        .wd-chip:hover { color: var(--ink); border-color: var(--accent); }

        .wd-process {
          padding: 160px 0; background: var(--bg);
          border-bottom: 1px solid var(--line);
        }
        .wd-process-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 80px; align-items: start; }
        .wd-sticky { position: sticky; top: 120px; }
        .wd-steps { display: flex; flex-direction: column; }
        .wd-step {
          display: grid; grid-template-columns: 64px 1fr; gap: 24px;
          padding: 36px 0; border-bottom: 1px solid var(--line);
        }
        .wd-step:first-child { border-top: 1px solid var(--line); }
        .wd-step-num {
          font-family: var(--font-display); font-size: 28px;
          font-weight: 800; color: var(--accent);
        }
        .wd-step h4 {
          font-family: var(--font-display); font-size: 20px;
          font-weight: 700; color: var(--ink); margin-bottom: 8px; letter-spacing: -0.02em;
        }
        .wd-step p { font-size: 14px; color: var(--ink-2); line-height: 1.8; }

        .wd-includes {
          padding: 120px 0; background: var(--bg-2);
          border-bottom: 1px solid var(--line);
        }
        .wd-inc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--line); margin-top: 64px; }
        .wd-inc-item {
          background: var(--bg-2); padding: 40px 36px;
          transition: background var(--t);
        }
        .wd-inc-item:hover { background: var(--bg-3); }
        .wd-inc-item h4 {
          font-family: var(--font-display); font-size: 18px;
          font-weight: 700; color: var(--ink); margin-bottom: 8px; letter-spacing: -0.02em;
        }
        .wd-inc-item p { font-size: 14px; color: var(--ink-2); line-height: 1.8; }

        .wd-cta {
          padding: 160px 0; background: var(--bg);
          border-top: 1px solid var(--line);
        }
        .wd-cta h2 {
          font-family: var(--font-display); font-size: clamp(36px, 5vw, 72px);
          font-weight: 800; letter-spacing: -0.04em; color: var(--ink); margin-bottom: 24px;
          max-width: 700px;
        }
        .wd-cta > .sec-wrap > p { font-size: 17px; color: var(--ink-2); margin-bottom: 40px; max-width: 500px; line-height: 1.8; }

        @media (max-width: 768px) {
          .wd-intro { grid-template-columns: 1fr; gap: 24px; }
          .wd-features-grid { grid-template-columns: 1fr; }
          .wd-feature.half, .wd-feature.third { grid-column: span 1; }
          .wd-process-grid { grid-template-columns: 1fr; gap: 48px; }
          .wd-sticky { position: static; }
          .wd-inc-grid { grid-template-columns: 1fr; }
          .wd-step { grid-template-columns: 48px 1fr; gap: 16px; }
        }
      `}</style>

      <section className="wd-hero">
        <div className="cross-bg" />
        <div className="wd-inner">
          <h1 ref={h1Ref}>
            High-Performance<br /><span className="accent">Web Development</span>
          </h1>
          <div className="wd-intro wd-reveal">
            <p>
              <strong>Your website is your best salesperson.</strong> It works 24/7, never takes a break,
              and forms the first impression of your business. A slow, generic template site costs you
              clients every single day. We build websites that actually convert.
            </p>
            <p>
              Built with Next.js, animated with GSAP, and deployed on Vercel — every site we deliver
              scores 100% on Lighthouse, loads in under 2 seconds, and looks stunning on every device
              from mobile to 4K. Delivered in 5-10 days with zero lock-in.
            </p>
          </div>
          <a href="mailto:contact@spacedrift.in" className="btn-fill wd-reveal">
            <span>Start Your Project <ArrowRight size={14} strokeWidth={2} /></span>
          </a>
        </div>
      </section>

      <section className="wd-features">
        <div className="sec-wrap">
          <p className="sec-label">Deliverables</p>
          <h2 className="sec-heading">Everything included. Nothing extra.</h2>
          <p className="sec-desc">
            Every website we build includes all of these by default.
            No upsells, no feature gates, no surprise invoices.
          </p>
          <div className="wd-features-grid">
            <div className="wd-feature half">
              <span className="wd-feature-label">Performance</span>
              <h4>100% Lighthouse Scores</h4>
              <p>
                Every page optimized for perfect scores across performance, accessibility, best practices,
                and SEO. Image optimization, code splitting, lazy loading, and font subsetting are
                standard — not optional add-ons.
              </p>
            </div>
            <div className="wd-feature half">
              <span className="wd-feature-label">Design</span>
              <h4>Motion & Scroll Animations</h4>
              <p>
                GSAP-powered animations that guide users through your content. Smooth scroll transitions,
                text reveals, parallax effects, and micro-interactions that make your site feel alive
                without hurting performance.
              </p>
            </div>
            <div className="wd-feature third">
              <span className="wd-feature-label">Responsive</span>
              <h4>Mobile-First Design</h4>
              <p>Pixel-perfect on every device. Tested on real devices from 320px to ultrawide. Touch-optimized interactions and responsive typography.</p>
            </div>
            <div className="wd-feature third">
              <span className="wd-feature-label">SEO</span>
              <h4>Search Optimized</h4>
              <p>Semantic HTML, structured data, Open Graph tags, XML sitemaps, and Core Web Vitals optimization. Your site ranks from day one.</p>
            </div>
            <div className="wd-feature third">
              <span className="wd-feature-label">Ownership</span>
              <h4>Full Source Access</h4>
              <p>You own everything. Source code on GitHub, deployed to your Vercel account. No proprietary CMS, no monthly platform fees, zero lock-in.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="wd-stack">
        <div className="sec-wrap">
          <p className="sec-label">Technology</p>
          <h2 className="sec-heading">Modern stack. Zero compromise.</h2>
          <p className="sec-desc">We use the same tools that power the best products in the world. No WordPress, no page builders, no shortcuts.</p>
          <div className="wd-stack-grid">
            {["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Lenis", "Vercel", "Figma", "GitHub", "Analytics"].map(t => (
              <span key={t} className="wd-chip">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="wd-process">
        <div className="sec-wrap">
          <div className="wd-process-grid">
            <div className="wd-sticky">
              <p className="sec-label">Process</p>
              <h2 className="sec-heading">From brief to launch in days.</h2>
              <p style={{ fontSize: "15px", color: "var(--ink-2)", lineHeight: 1.8, marginTop: "20px" }}>
                Most business websites are delivered in 5-10 working days.
                No meetings that should have been emails. No endless revision loops.
              </p>
            </div>
            <div className="wd-steps">
              {[
                { num: "01", title: "Brief & Discovery", desc: "You share your brand, goals, and references. We ask the right questions and align on scope within a single conversation. No multi-week discovery phase." },
                { num: "02", title: "Design & Build", desc: "We design directly in code — no static mockups that never match the final product. You see a live preview within 3 days and give feedback on the real thing." },
                { num: "03", title: "Refine & Polish", desc: "Animations, responsive testing, content refinement, and performance optimization. We iterate until every detail is right. Most sites need 1-2 revision rounds." },
                { num: "04", title: "Launch & Handoff", desc: "Deployed to Vercel with custom domain, analytics, and SEO configured. Source code pushed to your GitHub. A handoff doc covers everything you need to maintain it." },
              ].map(({ num, title, desc }) => (
                <div key={num} className="wd-step">
                  <span className="wd-step-num">{num}</span>
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

      <section className="wd-includes">
        <div className="sec-wrap">
          <p className="sec-label">Included</p>
          <h2 className="sec-heading">Standard with every build.</h2>
          <div className="wd-inc-grid">
            {[
              { title: "Custom Domain Setup", desc: "We configure your domain, SSL certificates, and DNS records. Your site runs on your domain from day one." },
              { title: "Analytics Integration", desc: "Google Analytics, Vercel Analytics, or your preferred tool — configured and verified during launch." },
              { title: "Content Management", desc: "For sites that need CMS, we integrate headless solutions like Sanity or Notion. Edit content without touching code." },
              { title: "30 Days Post-Launch Support", desc: "Bug fixes, content updates, and minor tweaks included for 30 days after launch. No additional charges." },
              { title: "Performance Monitoring", desc: "Core Web Vitals monitoring setup so you know your site stays fast as content changes over time." },
              { title: "Source Code Documentation", desc: "Clean, commented code with a README covering the project structure, deployment, and how to make changes." },
            ].map(({ title, desc }) => (
              <div key={title} className="wd-inc-item">
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wd-cta">
        <div className="sec-wrap">
          <h2 className="wd-cta-r">Need a website that<br />actually performs?</h2>
          <p className="wd-cta-r">
            Tell us about your business. We respond within 24 hours with a
            scope, timeline, and fixed price. No sales call required.
          </p>
          <a href="mailto:contact@spacedrift.in" className="btn-fill wd-cta-r">
            <span>contact@spacedrift.in <ArrowUpRight size={14} strokeWidth={2} /></span>
          </a>
        </div>
      </section>
    </>
  );
}
