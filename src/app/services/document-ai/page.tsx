import type { Metadata } from "next";
import ServiceStation, { type ServiceData } from "@/components/services/ServiceStation";

export const metadata: Metadata = {
  title: "Document AI & OCR",
  description:
    "Custom OCR and document-AI pipelines for invoices, receipts, IDs, forms, and Indian-language scripts. Validated extraction with 97%+ accuracy targets on agreed fields.",
};

const data: ServiceData = {
  slug: "document-ai",
  station: "PARSE",
  beat: "PARSE",
  index: "02",
  title: "Document AI",
  subtitle: "& OCR pipelines.",
  lede: [
    "We build validated document-AI pipelines that read invoices, receipts, IDs, forms, and Indian-language scripts — then hand back structured, testable output.",
    "Every engagement defines the fields, the accuracy target, and the validation set upfront. If the target isn't reachable on your data, we say so before we build.",
  ],
  offers: [
    { label: "Extraction", title: "Field-level extraction",           body: "Named-field extraction from PDFs, scans, and images with confidence scores and a JSON schema you can validate against." },
    { label: "Indic",      title: "Indian-language OCR",              body: "OCR for Tamil, Telugu, Kannada, Hindi, Bengali, and mixed-script documents. Includes a written accuracy report on your sample." },
    { label: "Forms",      title: "Semi-structured forms",            body: "Layout-aware parsing for KYC forms, application packets, and multi-page documents with checkboxes and signatures." },
    { label: "Validation", title: "Human-in-the-loop review",         body: "Optional review UI for low-confidence fields with keyboard-first correction and an audit trail per document." },
    { label: "Pipeline",   title: "Ingestion → structured output",    body: "S3 / SFTP / API ingest, batch or event-driven processing, and delivery to your database or downstream system." },
    { label: "Handoff",    title: "Runbook & metrics",                body: "Deployment guide, monitoring dashboards, and a written accuracy baseline against your validation set." },
  ],
  metrics: [
    { value: 97, label: "97%+ field accuracy on agreed schema",  suffix: "%" },
    { value: 100, label: "24h response window",                   suffix: "%" },
    { value: 30, label: "30d post-launch support",                suffix: "d" },
    { value: 0,  label: "0% delivery without validation report",  suffix: "%" },
  ],
  stack: ["Tesseract", "PaddleOCR", "LayoutLMv3", "Donut", "Textract", "OpenCV", "FastAPI", "Postgres", "Docker"],
  process: [
    { num: "01", title: "Fields & samples",   body: "Send 20-100 representative documents. We agree the field schema, accuracy target, and validation split." },
    { num: "02", title: "Prototype extract",  body: "Working extract on the sample. You see JSON output and a first accuracy readout in the first week." },
    { num: "03", title: "Harden & validate",  body: "Error analysis, targeted fine-tuning if needed, and validation against the held-out set. All metrics reported." },
    { num: "04", title: "Deploy & handoff",   body: "Deployed to your infrastructure. Runbook, dashboards, and 30 days of support for corrections." },
  ],
  ctaTitle: "Documents to parse at scale?",
  ctaBody:
    "Share the format, volume, and the fields you need. We respond within 24 hours with a fixed scope, price, and a target accuracy floor for your sample.",
};

export default function Page() {
  return <ServiceStation data={data} />;
}
