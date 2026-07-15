"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function DocumentAI() {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!h1Ref.current) return;
    document.fonts.ready.then(() => {
      if (!h1Ref.current) return;
      const split = SplitText.create(h1Ref.current, { type: "lines,words", mask: "lines" });
      gsap.from(split.words, { yPercent: 120, duration: 1.2, stagger: 0.04, ease: "expo.out", delay: 0.3 });
    });
    gsap.fromTo(".da-reveal", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 1 });
  }, []);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".da-card").forEach((card, i) => {
      gsap.fromTo(card, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: i * 0.08,
        scrollTrigger: { trigger: card, start: "top 90%" },
      });
    });
  }, []);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".da-metric").forEach((el, i) => {
      gsap.fromTo(el, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: i * 0.08,
        scrollTrigger: { trigger: ".da-metrics-row", start: "top 85%" },
      });
    });
  }, []);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".da-step").forEach((el, i) => {
      gsap.fromTo(el, { x: -30, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: i * 0.1,
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });
  }, []);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".da-use-case").forEach((el, i) => {
      gsap.fromTo(el, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: i * 0.1,
        scrollTrigger: { trigger: ".da-use-grid", start: "top 85%" },
      });
    });
  }, []);

  useGSAP(() => {
    gsap.fromTo(".da-cta-r", { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out",
      scrollTrigger: { trigger: ".da-cta", start: "top 82%" },
    });
  }, []);

  return (
    <>
      <style>{`
        .line-bg {
          position: absolute; inset: 0; opacity: 0.3;
          background-image: repeating-linear-gradient(
            0deg, transparent, transparent 79px, var(--line) 79px, var(--line) 80px
          );
        }
        .da-hero {
          min-height: 100svh; display: flex; align-items: flex-end;
          padding: var(--nav-h) 0 100px; background: var(--bg);
          position: relative; overflow: hidden;
        }
        .da-inner { width: 90%; max-width: 1400px; margin: 0 auto; position: relative; z-index: 1; overflow: hidden; }
        .da-hero h1 {
          font-family: var(--font-display);
          font-size: clamp(40px, 7vw, 90px);
          font-weight: 800; letter-spacing: -0.04em;
          line-height: 0.98; color: var(--ink); margin-bottom: 40px;
          max-width: 100%;
        }
        .da-hero h1 .accent { color: var(--accent); }
        .da-intro {
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
          margin-bottom: 48px;
        }
        .da-intro p { font-size: 16px; color: var(--ink-2); line-height: 1.8; }
        .da-intro strong { color: var(--ink); font-weight: 600; }

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

        .da-capabilities {
          padding: 160px 0; background: var(--bg);
          border-top: 1px solid var(--line);
        }
        .da-cards {
          display: grid; grid-template-columns: repeat(12, 1fr); gap: 16px;
        }
        .da-card {
          background: var(--bg-2); border: 1px solid var(--line);
          padding: 36px 28px; display: flex; flex-direction: column; gap: 12px;
          transition: border-color var(--t-fast), transform var(--t-fast);
        }
        .da-card:hover { border-color: var(--line-light); transform: translateY(-3px); }
        .da-card.half { grid-column: span 6; }
        .da-card.third { grid-column: span 4; }
        .da-card-label {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--warm);
        }
        .da-card h4 {
          font-family: var(--font-display); font-size: 22px;
          font-weight: 700; letter-spacing: -0.03em; color: var(--ink);
        }
        .da-card p { font-size: 14px; color: var(--ink-2); line-height: 1.8; }

        .da-quality {
          padding: 100px 0; background: var(--bg-2);
          border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
        }
        .da-metrics-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--line); }
        .da-metric { background: var(--bg-2); padding: 48px 32px; }
        .da-metric-num {
          font-family: var(--font-display); font-size: clamp(32px, 3.5vw, 48px);
          font-weight: 800; letter-spacing: -0.04em; color: var(--ink); margin-bottom: 8px;
        }
        .da-metric-num .warm { color: var(--warm); }
        .da-metric-label { font-size: 13px; color: var(--ink-3); line-height: 1.6; }

        .da-process {
          padding: 160px 0; background: var(--bg);
          border-bottom: 1px solid var(--line);
        }
        .da-process-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 80px; align-items: start; }
        .da-sticky { position: sticky; top: 120px; }
        .da-steps { display: flex; flex-direction: column; }
        .da-step {
          display: grid; grid-template-columns: 64px 1fr; gap: 24px;
          padding: 36px 0; border-bottom: 1px solid var(--line);
        }
        .da-step:first-child { border-top: 1px solid var(--line); }
        .da-step-num {
          font-family: var(--font-display); font-size: 28px;
          font-weight: 800; color: var(--accent);
        }
        .da-step h4 {
          font-family: var(--font-display); font-size: 20px;
          font-weight: 700; color: var(--ink); margin-bottom: 8px; letter-spacing: -0.02em;
        }
        .da-step p { font-size: 14px; color: var(--ink-2); line-height: 1.8; }

        .da-use-cases {
          padding: 160px 0; background: var(--bg-2);
          border-bottom: 1px solid var(--line);
        }
        .da-use-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--line); margin-top: 64px; }
        .da-use-case {
          background: var(--bg-2); padding: 48px 36px;
          transition: background var(--t);
        }
        .da-use-case:hover { background: var(--bg-3); }
        .da-use-tag {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--accent); margin-bottom: 16px;
          display: inline-block; padding: 4px 10px;
          border: 1px solid rgba(37,99,235,0.3); background: rgba(37,99,235,0.05);
        }
        .da-use-case h4 {
          font-family: var(--font-display); font-size: 22px;
          font-weight: 700; color: var(--ink); margin-bottom: 12px; letter-spacing: -0.02em;
        }
        .da-use-case p { font-size: 14px; color: var(--ink-2); line-height: 1.8; }

        .da-cta {
          padding: 160px 0; background: var(--bg);
          border-top: 1px solid var(--line);
        }
        .da-cta h2 {
          font-family: var(--font-display); font-size: clamp(36px, 5vw, 72px);
          font-weight: 800; letter-spacing: -0.04em; color: var(--ink); margin-bottom: 24px;
          max-width: 700px;
        }
        .da-cta > .sec-wrap > p { font-size: 17px; color: var(--ink-2); margin-bottom: 40px; max-width: 500px; line-height: 1.8; }

        @media (max-width: 768px) {
          .da-intro { grid-template-columns: 1fr; gap: 24px; }
          .da-cards { grid-template-columns: 1fr; }
          .da-card.half, .da-card.third { grid-column: span 1; }
          .da-metrics-row { grid-template-columns: 1fr 1fr; }
          .da-process-grid { grid-template-columns: 1fr; gap: 48px; }
          .da-sticky { position: static; }
          .da-use-grid { grid-template-columns: 1fr; }
          .da-step { grid-template-columns: 48px 1fr; gap: 16px; }
        }
      `}</style>

      <section className="da-hero">
        <div className="line-bg" />
        <div className="da-inner">
          <h1 ref={h1Ref}>
            Document AI &<br /><span className="accent">OCR Automation</span>
          </h1>
          <div className="da-intro da-reveal">
            <p>
              <strong>Your documents already contain useful data.</strong> We build OCR and document AI
              extraction pipelines for invoices, receipts, forms, ID documents, and Indian-language
              scripts using your real samples.
            </p>
            <p>
              This service is for startups, operations teams, and researchers who need structured
              data from messy PDFs, scans, or images. Each project has a fixed scope, target fields,
              validation rules, and a pilot before production delivery.
            </p>
          </div>
          <a href="mailto:spacedrift.contact@gmail.com" className="btn-fill da-reveal">
            <span>Discuss Your Pipeline <ArrowRight size={14} strokeWidth={2} /></span>
          </a>
        </div>
      </section>

      <section className="da-capabilities">
        <div className="sec-wrap">
          <p className="sec-label">Capabilities</p>
          <h2 className="sec-heading">Document extraction built around your fields.</h2>
          <p className="sec-desc">
            We do not sell generic OCR output. We define the fields you need, test against
            representative documents, and deliver a pipeline with measurable extraction quality.
          </p>
          <div className="da-cards">
            <div className="da-card half">
              <span className="da-card-label">Financial</span>
              <h4>Invoice & Receipt Processing</h4>
              <p>
                Structured extraction from invoices, receipts, purchase orders, and financial statements.
                We handle varied layouts, multi-page files, and field-level validation for agreed
                outputs such as vendor, date, line items, tax, and totals.
              </p>
            </div>
            <div className="da-card half">
              <span className="da-card-label">Identity</span>
              <h4>ID & KYC Document Extraction</h4>
              <p>
                Extraction from passports, driving licenses, Aadhaar cards, and other identity
                documents where your use case allows it. We include MRZ reading, field checks,
                and confidence outputs when required.
              </p>
            </div>
            <div className="da-card third">
              <span className="da-card-label">Utilities</span>
              <h4>Meter & Form Reading</h4>
              <p>Reading for utility meters, insurance forms, and structured business documents with field extraction tied to your target schema.</p>
            </div>
            <div className="da-card third">
              <span className="da-card-label">Languages</span>
              <h4>Regional-Language OCR</h4>
              <p>OCR workflows for Indian scripts such as Devanagari, Bengali, Tamil, Telugu, and more, validated against the samples you provide.</p>
            </div>
            <div className="da-card third">
              <span className="da-card-label">Scale</span>
              <h4>Volume Processing</h4>
              <p>Batch document processing after pipeline approval, with error logs, confidence scores, and review queues for low-confidence outputs.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="da-quality">
        <div className="sec-wrap">
          <div className="da-metrics-row">
            <div className="da-metric">
              <p className="da-metric-num">97<span className="warm">%+</span></p>
              <p className="da-metric-label">Exact-match accuracy on production pipelines</p>
            </div>
            <div className="da-metric">
              <p className="da-metric-num">5K<span className="warm">+</span></p>
              <p className="da-metric-label">Documents processed in pilot phase</p>
            </div>
            <div className="da-metric">
              <p className="da-metric-num">48<span className="warm">hr</span></p>
              <p className="da-metric-label">Turnaround for pilot pipeline delivery</p>
            </div>
            <div className="da-metric">
              <p className="da-metric-num">12<span className="warm">+</span></p>
              <p className="da-metric-label">Indian languages supported</p>
            </div>
          </div>
        </div>
      </section>

      <section className="da-process">
        <div className="sec-wrap">
          <div className="da-process-grid">
            <div className="da-sticky">
              <p className="sec-label">Process</p>
              <h2 className="sec-heading">From pilot to production.</h2>
              <p style={{ fontSize: "15px", color: "var(--ink-2)", lineHeight: 1.8, marginTop: "20px" }}>
                Every pipeline starts with a pilot on your actual documents. We agree target
                fields and acceptance criteria before scaling the work.
              </p>
            </div>
            <div className="da-steps">
              {[
                { num: "01", title: "Document Sample & Requirements", desc: "Send sample documents, target fields, and preferred output format. We review feasibility, risks, and scope within 24 hours." },
                { num: "02", title: "Pilot Pipeline", desc: "We build a working extraction pipeline on a subset of your documents. You review field accuracy, failure cases, and output format before approval." },
                { num: "03", title: "Production Deployment", desc: "After pilot approval, we scale the pipeline with error handling, confidence thresholds, and quality checks for real document volumes." },
                { num: "04", title: "Handoff & Support", desc: "Delivery includes code or processing outputs, setup notes, and 30 days of support for agreed bug fixes and small adjustments." },
              ].map(({ num, title, desc }) => (
                <div key={num} className="da-step">
                  <span className="da-step-num">{num}</span>
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

      <section className="da-use-cases">
        <div className="sec-wrap">
          <p className="sec-label">Industries</p>
          <h2 className="sec-heading">Built for document-heavy workflows.</h2>
          <div className="da-use-grid">
            <div className="da-use-case">
              <span className="da-use-tag">Logistics</span>
              <h4>Supply Chain Documents</h4>
              <p>Bills of lading, packing lists, customs declarations, and shipping manifests extracted into structured data for operations workflows.</p>
            </div>
            <div className="da-use-case">
              <span className="da-use-tag">Finance</span>
              <h4>Financial Processing</h4>
              <p>Invoice automation, expense management, and accounts payable processing with field-level validation and reviewable output logs.</p>
            </div>
            <div className="da-use-case">
              <span className="da-use-tag">Insurance</span>
              <h4>Claims & Underwriting</h4>
              <p>Policy documents, claim forms, and medical records converted into structured fields for faster review and downstream processing.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="da-cta">
        <div className="sec-wrap">
          <h2 className="da-cta-r">Need document data<br />in a usable format?</h2>
          <p className="da-cta-r">
            Send us a sample batch of your documents. We respond within 24 hours with a
            feasibility assessment, pilot scope, and fixed price if the work is a fit.
          </p>
          <a href="mailto:spacedrift.contact@gmail.com" className="btn-fill da-cta-r">
            <span>spacedrift.contact@gmail.com <ArrowUpRight size={14} strokeWidth={2} /></span>
          </a>
        </div>
      </section>
    </>
  );
}
