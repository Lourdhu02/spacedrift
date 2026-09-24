export type SceneKind = "noise" | "parse" | "model" | "ship" | "mobile" | "cycle";

export type Service = {
  slug: string;
  index: string;
  title: string;
  short: string;
  tags: string[];
  scene: SceneKind;
  metaDescription: string;
  hero: { lines: string[]; accent: string; lede: string };
  offers: { title: string; body: string }[];
  targets: { value: number; unit: string; label: string }[];
  stack: string[];
  process: { title: string; body: string }[];
  cta: { title: string; body: string };
};

export const SERVICES: Service[] = [
  {
    slug: "research-ops",
    index: "01",
    title: "Research Ops",
    short: "Reproducible experiment pipelines, dataset curation, and baseline replication for PhD scholars and academic labs.",
    tags: ["PyTorch", "W&B", "Hydra"],
    scene: "model",
    metaDescription:
      "Reproducible experiment pipelines, dataset curation, baseline replication, and publication support for PhD scholars and academic labs.",
    hero: {
      lines: ["Experiments your", "reviewers can"],
      accent: "reproduce.",
      lede: "We help PhD scholars, academic labs, and ed-tech teams turn research ideas into results that can be reviewed, defended, and re-run by someone who isn't you.",
    },
    offers: [
      { title: "Reproducible pipelines", body: "Environment-pinned, seed-controlled experiment runners with config sweeps, logging, and result capture. Handoff ships with a single command to re-run everything." },
      { title: "Dataset curation", body: "Sourcing, cleaning, splitting, and documenting datasets, with agreement checks and a data card on delivery." },
      { title: "Baseline replication", body: "Independent replication of published baselines against reported numbers, with a written note on every deviation." },
      { title: "Ablations & error analysis", body: "Structured ablation runs, error clustering, and a plain-language summary of what each variant actually changed." },
      { title: "Publication support", body: "Method-section drafting, figure prep, camera-ready formatting, and reviewer-response scaffolding." },
      { title: "Lab handoff kit", body: "Code, data, environment, and a walkthrough so the next student can run the pipeline without you." },
    ],
    targets: [
      { value: 24, unit: "h", label: "First response to every inquiry" },
      { value: 100, unit: "%", label: "Runs reproducible from a clean checkout" },
      { value: 30, unit: "d", label: "Support after handoff" },
    ],
    stack: ["PyTorch", "Hugging Face", "Weights & Biases", "Hydra", "DVC", "Docker", "Slurm", "Jupyter", "Nix"],
    process: [
      { title: "Discovery & scope", body: "Share the paper, data, target venue and deadline. We agree deliverables, exclusions, and timeline." },
      { title: "Smallest working pipeline", body: "We stand up an end-to-end run on seed data first, so you see results early instead of a diagram." },
      { title: "Runs & analysis", body: "Full sweep against agreed baselines. Every result versioned, every deviation logged." },
      { title: "Handoff & support", body: "Code, data, environment, walkthrough, and 30 days of support for fixes." },
    ],
    cta: { title: "Have a paper to defend?", body: "Tell us the deadline, the data, and the venue. You get a fixed scope and price within 24 hours." },
  },
  {
    slug: "document-ai",
    index: "02",
    title: "Document AI & OCR",
    short: "Validated extraction pipelines for invoices, receipts, IDs, forms, and Indian-language scripts.",
    tags: ["OCR", "LayoutLM", "Indic"],
    scene: "parse",
    metaDescription:
      "Custom OCR and document-AI pipelines for invoices, receipts, IDs, forms, and Indian-language scripts. Validated extraction against agreed accuracy targets.",
    hero: {
      lines: ["Documents in."],
      accent: "Clean data out.",
      lede: "We build document-AI pipelines that read invoices, receipts, IDs, forms, and Indian-language scripts, then hand back structured, testable output.",
    },
    offers: [
      { title: "Field-level extraction", body: "Named fields from PDFs, scans, and photos with confidence scores and a JSON schema you can validate against." },
      { title: "Indian-language OCR", body: "Tamil, Telugu, Kannada, Hindi, Bengali, and mixed-script documents, with a written accuracy report on your sample." },
      { title: "Semi-structured forms", body: "Layout-aware parsing for KYC packets, applications, and multi-page documents with checkboxes and signatures." },
      { title: "Human-in-the-loop review", body: "A keyboard-first review screen for low-confidence fields, with an audit trail per document." },
      { title: "Ingestion to database", body: "S3, SFTP, or API ingest; batch or event-driven processing; delivery straight into your system." },
      { title: "Runbook & metrics", body: "Deployment guide, monitoring, and an accuracy baseline measured on your own validation set." },
    ],
    targets: [
      { value: 97, unit: "%", label: "Field-accuracy target on the agreed schema" },
      { value: 24, unit: "h", label: "First response to every inquiry" },
      { value: 30, unit: "d", label: "Support after launch" },
    ],
    stack: ["PaddleOCR", "Tesseract", "LayoutLMv3", "Donut", "Textract", "OpenCV", "FastAPI", "Postgres", "Docker"],
    process: [
      { title: "Fields & samples", body: "Send 20–100 representative documents. We agree the schema, accuracy target, and validation split." },
      { title: "First extraction", body: "Working JSON output on your sample and a first accuracy readout, usually within the first week." },
      { title: "Harden & validate", body: "Error analysis, targeted fine-tuning if needed, and a validation report on held-out documents." },
      { title: "Deploy & handoff", body: "Deployed on your infrastructure with a runbook, dashboards, and 30 days of support." },
    ],
    cta: { title: "Paperwork piling up?", body: "Share the format, volume, and fields you need. You get a fixed scope, price, and accuracy target within 24 hours." },
  },
  {
    slug: "rag-mvp",
    index: "03",
    title: "RAG & AI MVPs",
    short: "Knowledge-base assistants, retrieval systems, and small agentic workflows. Fixed scope, about three weeks.",
    tags: ["RAG", "Agents", "Evals"],
    scene: "cycle",
    metaDescription:
      "Internal knowledge-base chatbots, retrieval-augmented generation systems, and small agentic workflows. Fixed scope, about three weeks, working product.",
    hero: {
      lines: ["AI that answers", "from your data,"],
      accent: "not guesses.",
      lede: "Internal knowledge-base assistants, RAG systems, and small agentic workflows that retrieve from your documents, databases, and approved sources.",
    },
    offers: [
      { title: "Knowledge-base assistant", body: "Ask in plain language; answers cite your docs, wikis, or databases. Web UI, Slack, Teams, or API." },
      { title: "Private / on-prem RAG", body: "Local embeddings, self-hosted vector stores, and approved model access for data that can't leave your network." },
      { title: "Agentic workflows", body: "Multi-step tasks like lookup, summarising, and report drafting, with logged actions and a hard step cap." },
      { title: "Ingestion pipeline", body: "Parse, chunk, embed, and index PDFs, docs, spreadsheets, web pages, and databases." },
      { title: "Where your team works", body: "Slack, Teams, a web app, or an endpoint, so it fits the workflow you already have." },
      { title: "Evaluation harness", body: "A test set of real questions with expected sources, plus a baseline accuracy report." },
    ],
    targets: [
      { value: 3, unit: "wk", label: "Typical MVP build" },
      { value: 100, unit: "%", label: "Fixed scope, fixed price" },
      { value: 30, unit: "d", label: "Support after launch" },
    ],
    stack: ["LlamaIndex", "LangChain", "Anthropic", "OpenAI", "Ollama", "pgvector", "Chroma", "FastAPI", "Next.js", "Docker"],
    process: [
      { title: "Use case & sources", body: "Users, data sources, success criteria, and what the assistant must refuse, all written down." },
      { title: "Prototype early", body: "Retrieval flow, model access, and UI shape. You click through a working prototype in week one." },
      { title: "Build & evaluate", body: "Tested against real questions and failure cases, with eval scores at every milestone." },
      { title: "Deploy & handoff", body: "On your infrastructure where possible, with docs, environment notes, and 30 days of support." },
    ],
    cta: { title: "Need an AI MVP you can actually test?", body: "Tell us the use case, the data, and who will use it. You get a fixed scope and price within 24 hours." },
  },
  {
    slug: "data-annotation",
    index: "04",
    title: "Data Annotation",
    short: "Vision, text, and audio labels with written guidelines, two-pass QA, and agreement reported per label.",
    tags: ["Vision", "NLP", "Audio"],
    scene: "noise",
    metaDescription:
      "Labeled datasets for vision, NLP, and audio, with QA protocols, inter-annotator agreement, and an audit trail on every span.",
    hero: {
      lines: ["Labels you can"],
      accent: "actually audit.",
      lede: "Labeled datasets for vision, text, and audio, with clear guidelines, two-pass QA, inter-annotator agreement, and an audit trail on every span.",
    },
    offers: [
      { title: "Image & video", body: "Boxes, polygons, keypoints, masks, and tracking IDs, with guidelines written and agreement reported." },
      { title: "Text", body: "Span labeling, entity extraction, intent classification, preference data, and multilingual review." },
      { title: "Audio", body: "Transcription including code-switched Indic speech, diarization, event tagging, and alignment." },
      { title: "Guidelines", body: "Written guidelines with worked examples, edge cases, and a decision tree annotators actually use." },
      { title: "Two-pass QA", body: "Independent second-pass review and agreement per label. Every error traces to a specific span." },
      { title: "Clean delivery", body: "COCO, YOLO, JSONL, or Parquet, whatever your training pipeline expects, plus a data card." },
    ],
    targets: [
      { value: 90, unit: "%", label: "Agreement target on production splits" },
      { value: 100, unit: "%", label: "Deliveries with a data card" },
      { value: 24, unit: "h", label: "First response to every inquiry" },
    ],
    stack: ["Label Studio", "CVAT", "Prodigy", "Argilla", "Whisper", "FFmpeg", "Pandas", "Great Expectations"],
    process: [
      { title: "Spec & pilot", body: "A 100-item pilot on your data, with agreement reported before anything scales." },
      { title: "Guideline lock", body: "Written guidelines signed off by you. Later changes are re-scoped, not absorbed silently." },
      { title: "Annotate & QA", body: "Rolling QA with agreement reported every milestone. Errors are fixed at the source." },
      { title: "Deliver & audit", body: "Data, data card, and error analysis, plus fixes for anything caught in the first 30 days." },
    ],
    cta: { title: "Labels that need to hold up?", body: "Send a sample and the schema. We run a pilot, report agreement, and quote a fixed price." },
  },
  {
    slug: "web-development",
    index: "05",
    title: "Web Development",
    short: "Fast, accessible marketing sites, product pages, and dashboards on Next.js that you fully own.",
    tags: ["Next.js", "TypeScript", "A11y"],
    scene: "ship",
    metaDescription:
      "Production websites and marketing sites built for performance and clarity. Next.js, real accessibility, and a codebase you own.",
    hero: {
      lines: ["Websites that load fast"],
      accent: "and ship faster.",
      lede: "Marketing sites, product pages, and small dashboards on Next.js and TypeScript, deployed to your accounts, with no devops handoff required.",
    },
    offers: [
      { title: "Marketing & landing sites", body: "Fast, accessible pages with a real CMS or a simple content model. Deployed to Vercel, Netlify, or your host." },
      { title: "Product & docs sites", body: "Product pages and documentation portals with search, versioning, and MDX content." },
      { title: "Micro-apps & dashboards", body: "Small internal tools and public dashboards for when a spreadsheet isn't enough." },
      { title: "SEO done properly", body: "Metadata, structured data, sitemap, robots, and social images configured, not left as TODOs." },
      { title: "Accessibility built in", body: "Focus states, semantic markup, keyboard navigation, contrast, and reduced-motion support from day one." },
      { title: "A handoff you own", body: "Repository transfer, deployment access, a short README, and 30 days of support." },
    ],
    targets: [
      { value: 10, unit: "d", label: "Typical landing-site delivery" },
      { value: 100, unit: "%", label: "Code and assets handed over" },
      { value: 30, unit: "d", label: "Support after launch" },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "GSAP", "MDX", "Sanity", "Vercel", "Netlify", "Playwright"],
    process: [
      { title: "Brief & scope", body: "Goals, content, deadline, and brand assets become a fixed-scope proposal with milestones." },
      { title: "Design & draft", body: "Straight to a working draft you can share internally, with feedback at each milestone." },
      { title: "Build & polish", body: "Real content, Lighthouse and accessibility checks, and manual QA before every review." },
      { title: "Ship & handoff", body: "Deployed to your account, DNS handled, and 30 days of support after launch." },
    ],
    cta: { title: "Need a site that's actually fast?", body: "Share the brief, the deadline, and the content you have. You get a fixed scope and price within 24 hours." },
  },
  {
    slug: "mobile-apps",
    index: "06",
    title: "Mobile Apps",
    short: "Android and iOS apps in Flutter, Kotlin, and Swift, with on-device ML and the store release handled.",
    tags: ["Flutter", "Kotlin", "Swift"],
    scene: "mobile",
    metaDescription:
      "Android and iOS app development in Flutter, Kotlin, and Swift, with on-device ML, offline-first data, and the Play Store and App Store release handled. Fixed scope, from Bengaluru.",
    hero: {
      lines: ["Android and iOS apps"],
      accent: "that feel native.",
      lede: "Flutter when one codebase should cover both stores. Kotlin and Swift when the app needs to go deep into the platform. Either way: on-device ML where it helps, offline-first data, and a clean store release under your accounts.",
    },
    offers: [
      { title: "Cross-platform with Flutter", body: "One Dart codebase for Android and iOS, with platform channels where native APIs are needed and smooth 60fps UI on mid-range phones." },
      { title: "Native Android in Kotlin", body: "Jetpack Compose, coroutines, and Material 3 for apps that live close to the hardware: camera, sensors, background work." },
      { title: "Native iOS in Swift", body: "SwiftUI and Swift concurrency, following Apple's Human Interface Guidelines so the app feels at home on iPhone." },
      { title: "On-device ML", body: "OCR, classification, and embeddings that run offline with LiteRT, Core ML, or ML Kit, with latency measured on real devices." },
      { title: "Backend & offline sync", body: "Firebase, Supabase, or your own API, with local-first storage and sync that survives a patchy network." },
      { title: "Store release & handoff", body: "Signing, CI builds, privacy labels, store listings, and review submission, all published under your own developer accounts." },
    ],
    targets: [
      { value: 60, unit: "fps", label: "Frame-rate target on mid-range Android" },
      { value: 100, unit: "%", label: "Published under your own store accounts" },
      { value: 30, unit: "d", label: "Support after store release" },
    ],
    stack: ["Flutter", "Dart", "Kotlin", "Jetpack Compose", "Swift", "SwiftUI", "Firebase", "Supabase", "LiteRT", "Core ML", "ML Kit", "Fastlane", "GitHub Actions"],
    process: [
      { title: "Scope & flows", body: "Screens, user flows, target platforms, and which features need native APIs, including the Flutter-or-native call, agreed before code." },
      { title: "A build on your phone", body: "A working build via TestFlight or Play internal testing in the first week, not just a design file." },
      { title: "Build & test on real devices", body: "Features against scope, tested on low- and high-end devices, with crash reporting wired in from day one." },
      { title: "Release & handoff", body: "Store listings, signing, review submission, and 30 days of support after launch." },
    ],
    cta: { title: "Have an app to ship?", body: "Tell us the platforms, the core flows, and the deadline. You get a fixed scope and price within 24 hours." },
  },
];

export const getService = (slug: string) => {
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown service: ${slug}`);
  return s;
};

export const CONTACT_EMAIL = "spacedrift.contact@gmail.com";
