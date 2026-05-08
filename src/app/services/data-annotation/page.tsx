"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function DataAnnotation() {
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
    gsap.utils.toArray<HTMLElement>(".da-type-card").forEach((card, i) => {
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
    gsap.utils.toArray<HTMLElement>(".da-format").forEach((el, i) => {
      gsap.fromTo(el, { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: i * 0.05,
        scrollTrigger: { trigger: ".da-format-grid", start: "top 85%" },
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

        .da-types {
          padding: 160px 0; background: var(--bg);
          border-top: 1px solid var(--line);
        }
        .da-types-grid {
          display: grid; grid-template-columns: repeat(12, 1fr); gap: 16px;
        }
        .da-type-card {
          background: var(--bg-2); border: 1px solid var(--line);
          padding: 36px 28px; display: flex; flex-direction: column; gap: 12px;
          transition: border-color var(--t-fast), transform var(--t-fast);
        }
        .da-type-card:hover { border-color: var(--line-light); transform: translateY(-3px); }
        .da-type-card.half { grid-column: span 6; }
        .da-type-card.third { grid-column: span 4; }
        .da-type-label {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--warm);
        }
        .da-type-card h4 {
          font-family: var(--font-display); font-size: 22px;
          font-weight: 700; letter-spacing: -0.03em; color: var(--ink);
        }
        .da-type-card p { font-size: 14px; color: var(--ink-2); line-height: 1.8; }

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

        .da-formats {
          padding: 160px 0; background: var(--bg);
          border-bottom: 1px solid var(--line);
        }
        .da-format-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .da-format {
          background: var(--bg-2); border: 1px solid var(--line);
          padding: 28px 24px; transition: all var(--t-fast);
        }
        .da-format:hover { border-color: var(--line-light); transform: translateY(-2px); }
        .da-format h4 {
          font-family: var(--font-mono); font-size: 12px; font-weight: 600;
          letter-spacing: 0.06em; color: var(--ink); margin-bottom: 4px;
        }
        .da-format p { font-size: 12px; color: var(--ink-3); }

        .da-pipeline {
          padding: 160px 0; background: var(--bg-2);
          border-bottom: 1px solid var(--line);
        }
        .da-pipeline-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 80px; align-items: start; }
        .da-pipeline-sticky { position: sticky; top: 120px; }
        .da-pipeline-steps { display: flex; flex-direction: column; }
        .da-p-step {
          display: grid; grid-template-columns: 64px 1fr; gap: 24px;
          padding: 36px 0; border-bottom: 1px solid var(--line);
        }
        .da-p-step:first-child { border-top: 1px solid var(--line); }
        .da-p-step-num {
          font-family: var(--font-display); font-size: 28px;
          font-weight: 800; color: var(--accent);
        }
        .da-p-step h4 {
          font-family: var(--font-display); font-size: 20px;
          font-weight: 700; color: var(--ink); margin-bottom: 8px; letter-spacing: -0.02em;
        }
        .da-p-step p { font-size: 14px; color: var(--ink-2); line-height: 1.8; }

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
          .da-types-grid { grid-template-columns: 1fr; }
          .da-type-card.half, .da-type-card.third { grid-column: span 1; }
          .da-metrics-row { grid-template-columns: 1fr 1fr; }
          .da-format-grid { grid-template-columns: 1fr 1fr; }
          .da-pipeline-grid { grid-template-columns: 1fr; gap: 48px; }
          .da-pipeline-sticky { position: static; }
        }
        @media (max-width: 480px) {
          .da-format-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="da-hero">
        <div className="line-bg" />
        <div className="da-inner">
          <h1 ref={h1Ref}>
            Production-Grade<br /><span className="accent">Data Annotation</span>
          </h1>
          <div className="da-intro da-reveal">
            <p>
              <strong>Your ML model is only as good as its training data.</strong> We provide
              human-labeled datasets with rigorous quality control for NLP, computer vision,
              audio, and video tasks. No crowdsourcing lottery — trained annotators following
              your guidelines.
            </p>
            <p>
              From startups training their first classifier to research labs preparing benchmark datasets,
              spacedrift.in delivers annotation that is accurate, consistent, and fast. We scale from
              hundreds to millions of labels without compromising quality.
            </p>
          </div>
          <a href="mailto:contact@spacedrift.in" className="btn-fill da-reveal">
            <span>Get a Quote <ArrowRight size={14} strokeWidth={2} /></span>
          </a>
        </div>
      </section>

      <section className="da-types">
        <div className="sec-wrap">
          <p className="sec-label">Capabilities</p>
          <h2 className="sec-heading">Every modality. One team.</h2>
          <p className="sec-desc">
            We handle text, image, document, audio, and video annotation with specialized
            pipelines built for each data type. Complex multi-modal? We do that too.
          </p>
          <div className="da-types-grid">
            <div className="da-type-card half">
              <span className="da-type-label">NLP</span>
              <h4>Text Annotation</h4>
              <p>
                Named entity recognition, sentiment analysis, intent classification, text categorization,
                relation extraction, and coreference resolution. Supports 12+ languages with native annotators.
              </p>
            </div>
            <div className="da-type-card half">
              <span className="da-type-label">Vision</span>
              <h4>Image Annotation</h4>
              <p>
                Bounding boxes, polygon segmentation, keypoint detection, semantic labeling, instance
                segmentation, and panoptic annotation. Pixel-level precision for autonomous driving,
                medical imaging, and retail.
              </p>
            </div>
            <div className="da-type-card third">
              <span className="da-type-label">Documents</span>
              <h4>Document Annotation</h4>
              <p>Table extraction, form field mapping, OCR correction, and structured data extraction from invoices, receipts, and contracts.</p>
            </div>
            <div className="da-type-card third">
              <span className="da-type-label">Audio</span>
              <h4>Audio Annotation</h4>
              <p>Speech transcription, speaker diarization, emotion detection, audio event classification, and music tagging.</p>
            </div>
            <div className="da-type-card third">
              <span className="da-type-label">Video</span>
              <h4>Video Annotation</h4>
              <p>Object tracking, action recognition, temporal segmentation, frame-by-frame labeling, and activity detection.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="da-quality">
        <div className="sec-wrap">
          <div className="da-metrics-row">
            <div className="da-metric">
              <p className="da-metric-num">98<span className="warm">%+</span></p>
              <p className="da-metric-label">Average annotation accuracy across all projects</p>
            </div>
            <div className="da-metric">
              <p className="da-metric-num">3x<span className="warm"> QC</span></p>
              <p className="da-metric-label">Triple quality check on every annotation batch</p>
            </div>
            <div className="da-metric">
              <p className="da-metric-num">48<span className="warm">hr</span></p>
              <p className="da-metric-label">Turnaround for pilot batches and sample reviews</p>
            </div>
            <div className="da-metric">
              <p className="da-metric-num">8<span className="warm">+</span></p>
              <p className="da-metric-label">Output formats supported natively</p>
            </div>
          </div>
        </div>
      </section>

      <section className="da-formats">
        <div className="sec-wrap">
          <p className="sec-label">Output</p>
          <h2 className="sec-heading">Your format. Our delivery.</h2>
          <p className="sec-desc">We deliver in whatever schema your pipeline expects. Standard formats ship by default; custom schemas are configured in the pilot phase.</p>
          <div className="da-format-grid">
            {[
              { name: "JSON / JSONL", desc: "Universal" },
              { name: "COCO", desc: "Computer Vision" },
              { name: "CSV / TSV", desc: "Tabular" },
              { name: "spaCy / CoNLL", desc: "NLP" },
              { name: "YOLO", desc: "Object Detection" },
              { name: "Pascal VOC", desc: "XML Format" },
              { name: "Parquet", desc: "Big Data" },
              { name: "Custom", desc: "Your Schema" },
            ].map(({ name, desc }) => (
              <div key={name} className="da-format">
                <h4>{name}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="da-pipeline">
        <div className="sec-wrap">
          <div className="da-pipeline-grid">
            <div className="da-pipeline-sticky">
              <p className="sec-label">Pipeline</p>
              <h2 className="sec-heading">How annotation works.</h2>
              <p style={{ fontSize: "15px", color: "var(--ink-2)", lineHeight: 1.8, marginTop: "20px" }}>
                Every project follows a structured pipeline with built-in quality gates.
                You see progress and quality metrics at every stage.
              </p>
            </div>
            <div className="da-pipeline-steps">
              {[
                { num: "01", title: "Requirements & Sample", desc: "Send us your data samples, annotation guidelines, and target format. We review feasibility and create a pilot plan within 24 hours." },
                { num: "02", title: "Pilot Batch", desc: "We annotate a small batch (50-100 samples) for your review. This calibrates our understanding of your guidelines and sets quality benchmarks." },
                { num: "03", title: "Production Run", desc: "After pilot approval, we scale to full production with trained annotators. Every batch passes triple quality control before delivery." },
                { num: "04", title: "Delivery & Iteration", desc: "Annotated data delivered in your format with quality reports. Feedback from your model training informs subsequent batches for continuous improvement." },
              ].map(({ num, title, desc }) => (
                <div key={num} className="da-p-step">
                  <span className="da-p-step-num">{num}</span>
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

      <section className="da-cta">
        <div className="sec-wrap">
          <h2 className="da-cta-r">Need labeled data<br />for your model?</h2>
          <p className="da-cta-r">
            Send us a sample dataset and your annotation guidelines.
            We respond with a pilot plan and quote within 24 hours.
          </p>
          <a href="mailto:contact@spacedrift.in" className="btn-fill da-cta-r">
            <span>contact@spacedrift.in <ArrowUpRight size={14} strokeWidth={2} /></span>
          </a>
        </div>
      </section>
    </>
  );
}
