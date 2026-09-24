import type { Metadata } from "next";
import ServiceStation, { type ServiceData } from "@/components/services/ServiceStation";

export const metadata: Metadata = {
  title: "Data Annotation",
  description:
    "Labeled datasets for vision, NLP, and audio — with QA protocols, inter-annotator agreement, and an audit trail on every span.",
};

const data: ServiceData = {
  slug: "data-annotation",
  station: "PARSE",
  beat: "PARSE",
  index: "04",
  title: "Data annotation",
  subtitle: "you can audit.",
  lede: [
    "Labeled datasets for vision, NLP, and audio — with clear guidelines, QA protocols, inter-annotator agreement, and an audit trail on every span.",
    "Small batches, sharp specs, honest error reports. If we can't hit the agreed IAA target on the pilot, we say so and re-scope — not paper it over with a lower bar.",
  ],
  offers: [
    { label: "Vision",     title: "Image & video annotation",       body: "Bounding boxes, polygons, keypoints, segmentation masks, tracking IDs. Guidelines written, QA sampled, IAA reported." },
    { label: "NLP",        title: "Text annotation",                body: "Span labeling, entity extraction, intent classification, RLHF-style preference data, and multilingual review." },
    { label: "Audio",      title: "Audio annotation",               body: "Transcription (including code-switched Indic content), speaker diarization, event tagging, and forced alignment." },
    { label: "Guidelines", title: "Guideline authoring",            body: "Written label guidelines with worked examples, edge cases, and a decision tree annotators actually use." },
    { label: "QA",         title: "Two-pass QA + IAA",              body: "Independent second-pass review on a sample and inter-annotator agreement reported per label. Errors trace to a specific span." },
    { label: "Delivery",   title: "Clean handoff",                  body: "COCO / YOLO / JSONL / Parquet — whatever fits your training pipeline. Plus a data card and error analysis." },
  ],
  metrics: [
    { value: 90,  label: "≥0.9 Cohen's κ on production splits",     suffix: "%" },
    { value: 100, label: "24h response window",                     suffix: "%" },
    { value: 100, label: "100% delivery with data card & IAA",      suffix: "%" },
    { value: 0,   label: "0% ghost workers · direct-managed team",  suffix: "%" },
  ],
  stack: ["Label Studio", "CVAT", "Prodigy", "Argilla", "Doccano", "Whisper", "FFmpeg", "Pandas", "Great Expectations"],
  process: [
    { num: "01", title: "Spec & pilot",         body: "Sample data + label schema. We run a 100-item pilot and report initial IAA before scaling." },
    { num: "02", title: "Guideline lock",       body: "Written guidelines with edge cases, sign-off from you. Any post-lock changes are re-scoped." },
    { num: "03", title: "Annotate & QA",        body: "Full annotation with rolling QA. IAA reported per milestone. Errors are corrected at the source, not batched." },
    { num: "04", title: "Deliver & audit",      body: "Final delivery includes the data, a data card, and an error analysis. Fixes for anything caught in the first 30 days." },
  ],
  ctaTitle: "Have a labeling job with real accuracy needs?",
  ctaBody:
    "Send a sample and the label schema. We run a pilot, report IAA, and quote a fixed price for the full run.",
};

export default function Page() {
  return <ServiceStation data={data} />;
}
