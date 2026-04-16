export type ServiceData = {
  slug: string;
  num: string;
  iconName: string;
  title: string;
  tagline: string;
  heroDesc: string;
  price: string;
  duration: string;
  tags: string[];
  overview: string[];
  deliverables: { title: string; desc: string }[];
  process: { num: string; title: string; desc: string }[];
  suited: string[];
  results: { val: string; label: string }[];
  related: string[];
};

export const servicesData: ServiceData[] = [
  {
    slug: "ml-projects",
    num: "01",
    iconName: "Brain",
    title: "ML Engineering Projects",
    tagline: "Research-backed projects. Delivered end-to-end.",
    heroDesc:
      "SpaceDrift delivers complete, submission-ready ML/AI engineering projects for B.Tech, B.A., M.Tech, and Ph.D. students — bundled with a co-authored research paper. Every project is custom-built, technically rigorous, and aligned with your university's academic standards.",
    price: "From ₹15,000",
    duration: "1–3 weeks",
    tags: [
      "NLP",
      "Computer Vision",
      "Deep Learning",
      "Data Science",
      "Research Paper",
      "B.Tech",
      "M.Tech",
      "Ph.D",
    ],
    overview: [
      "At SpaceDrift, we specialize in building production-quality ML and AI projects for students at every academic level — from final-year B.Tech and B.A. dissertations to M.Tech theses and Ph.D. research prototypes. Every project we deliver is technically sound, well-documented, and built to meet the evaluation standards of leading universities.",
      "Our team covers the full spectrum of ML disciplines: Natural Language Processing (text classification, NER, summarization, RAG pipelines), Computer Vision (object detection, image classification, segmentation), Deep Learning (custom neural architectures, transfer learning), and Data Science & Analytics (predictive modeling, EDA, dashboards). We don't deliver generic templates — every project is built from scratch for your specific problem statement.",
      "Each engagement includes both the complete working project codebase and a co-authored research paper written in standard IEEE or Springer format, ready for submission to journals or as part of your thesis. We handle the engineering, the writing, and the documentation — so you can focus on understanding and presenting your work.",
    ],
    deliverables: [
      {
        title: "Complete Project Codebase",
        desc: "Fully implemented, tested, and commented Python codebase covering data preprocessing, model training, evaluation, and inference.",
      },
      {
        title: "Research Paper",
        desc: "Co-authored research paper written in IEEE or Springer format — abstract, literature review, methodology, results, and conclusion — ready for journal or thesis submission.",
      },
      {
        title: "Trained Model & Results",
        desc: "Trained model with performance benchmarks, evaluation metrics, and visualizations (confusion matrices, loss curves, accuracy plots).",
      },
      {
        title: "Project Report",
        desc: "Detailed academic project report formatted to standard university guidelines, including problem statement, objectives, and references.",
      },
      {
        title: "Presentation Deck",
        desc: "A structured PowerPoint presentation covering your project — ready for viva voce, seminars, or internal reviews.",
      },
      {
        title: "Post-Delivery Support",
        desc: "2 weeks of support for clarifications, viva preparation questions, minor modifications, and guidance on presenting your work.",
      },
    ],
    process: [
      {
        num: "01",
        title: "Requirement Gathering",
        desc: "We understand your academic level, domain preference, university guidelines, and submission deadline before scoping the project.",
      },
      {
        num: "02",
        title: "Topic Finalization & Proposal",
        desc: "We propose 2–3 project topics aligned with current research trends. Once confirmed, we provide a written scope and timeline.",
      },
      {
        num: "03",
        title: "Data Collection & Preparation",
        desc: "Dataset sourcing, cleaning, and preprocessing — all documented for inclusion in your methodology chapter.",
      },
      {
        num: "04",
        title: "Model Development & Evaluation",
        desc: "Full model training pipeline with iterative improvements, ablation studies, and rigorous evaluation metrics.",
      },
      {
        num: "05",
        title: "Research Paper & Report Writing",
        desc: "Parallel writing of the research paper and academic report — structured, referenced, and formatted to your institution's standards.",
      },
      {
        num: "06",
        title: "Delivery, Review & Support",
        desc: "All deliverables handed off with a walkthrough session. 2 weeks of post-delivery support for revisions and viva preparation.",
      },
    ],
    suited: [
      "Final-year B.Tech and B.A. students with an ML/AI project requirement",
      "M.Tech students requiring a thesis-grade implementation with a research paper",
      "Ph.D. scholars needing a working prototype to support their research contributions",
      "Students targeting journal publication or conference paper submission",
    ],
    results: [
      {
        val: "500+",
        label: "Academic ML projects delivered across disciplines",
      },
      {
        val: "96%",
        label: "On-time delivery rate across all project engagements",
      },
      {
        val: "IEEE/Springer",
        label: "Research papers formatted to international standards",
      },
      { val: "1–3w", label: "Typical delivery timeline" },
    ],
    related: ["websites", "ai-audit", "streamlit-apps"],
  },
  {
    slug: "websites",
    num: "02",
    iconName: "Globe",
    title: "Websites",
    tagline: "90+ Lighthouse. Live in 3–7 days.",
    heroDesc:
      "Fast, mobile-first, SEO-optimized websites built from scratch with Next.js. No templates, no page builders — every site is custom-coded, performance-tuned, and delivered with a 90+ Lighthouse score guarantee.",
    price: "From ₹8,000",
    duration: "3–7 days",
    tags: [
      "Next.js",
      "TypeScript",
      "SEO",
      "Mobile-First",
      "Vercel",
      "Analytics",
    ],
    overview: [
      "Your website is the first thing a potential client judges you on. A slow, generic, template-built site communicates exactly the wrong things — that you don't invest in quality, that you're not serious, that you're easy to ignore.",
      "SpaceDrift builds websites that do the opposite. Every site we deliver is custom-coded in Next.js, mobile-first by design, and optimized for both performance and SEO from the ground up. No Squarespace. No WordPress. No bloated themes.",
      "We handle everything — design, development, deployment, Google Analytics integration, sitemap generation, meta tags, and post-launch support. You get a site that loads fast, ranks well, and converts visitors into clients.",
    ],
    deliverables: [
      {
        title: "Custom Next.js Site",
        desc: "Fully custom-built with TypeScript, no templates or component libraries unless specified.",
      },
      {
        title: "90+ Lighthouse Score",
        desc: "Performance, accessibility, best practices, and SEO all scored and guaranteed before delivery.",
      },
      {
        title: "SEO Setup",
        desc: "Meta tags, Open Graph, sitemap.xml, robots.txt, structured data, and canonical URLs.",
      },
      {
        title: "Analytics Integration",
        desc: "Google Analytics 4 and Google Search Console set up and verified.",
      },
      {
        title: "Deployment",
        desc: "Deployed to Vercel or Netlify with a custom domain and SSL configured.",
      },
      {
        title: "Mobile-First Design",
        desc: "Pixel-perfect on all screen sizes from 320px to 4K. Tested on real devices.",
      },
    ],
    process: [
      {
        num: "01",
        title: "Brief & Reference",
        desc: "You share your brand, goals, target audience, and any reference sites you like.",
      },
      {
        num: "02",
        title: "Structure & Scope",
        desc: "We outline the page structure, sections, and content hierarchy. Agreed before design.",
      },
      {
        num: "03",
        title: "Design in Code",
        desc: "We design and code simultaneously — no Figma handoff delays.",
      },
      {
        num: "04",
        title: "Content Integration",
        desc: "Your copy, images, and brand assets dropped into the live build.",
      },
      {
        num: "05",
        title: "QA & Performance",
        desc: "Cross-browser testing, mobile QA, Lighthouse audit, and SEO checklist completed.",
      },
      {
        num: "06",
        title: "Launch & Handoff",
        desc: "Deployed, domain configured, analytics live. Full source code and 2-week support.",
      },
    ],
    suited: [
      "D2C brands needing a product landing page",
      "Freelancers and consultants building credibility",
      "Startups launching an MVP web presence",
      "Local businesses improving organic search ranking",
    ],
    results: [
      { val: "97", label: "Lighthouse score on this site" },
      { val: "3×", label: "Organic traffic growth (clinic site, 90d)" },
      { val: "P1", label: "Page 1 ranking in 6 weeks (SaaS client)" },
      { val: "3–7d", label: "Typical delivery timeline" },
    ],
    related: ["ml-projects", "ai-audit", "streamlit-apps"],
  },
  {
    slug: "ai-audit",
    num: "03",
    iconName: "BarChart2",
    title: "AI Audit",
    tagline: "Find what's broken. Fix what matters.",
    heroDesc:
      "A deep technical review of your existing ML system — data pipeline, model architecture, training setup, inference stack, and monitoring. You get a written report with ranked findings and a clear action plan you can execute immediately.",
    price: "From ₹5,000",
    duration: "2–3 days",
    tags: ["MLOps", "Code Review", "Pipeline Audit", "Report", "Consulting"],
    overview: [
      "Most ML systems in production share a common set of problems: leaky data pipelines, models trained on the wrong distribution, no monitoring, slow inference, and accumulated technical debt. Left unaddressed, these issues compound.",
      "SpaceDrift's AI Audit is a structured technical review that surfaces these problems before they become critical failures. Our team reviews your code, your data pipeline, your model architecture, your serving infrastructure, and your monitoring setup — end to end.",
      "Unlike a generic consulting engagement, this is a hands-on technical audit. We read your code. We run your pipeline. We examine your model's actual behavior on real data. The output is a detailed written report you can act on immediately.",
    ],
    deliverables: [
      {
        title: "Written Audit Report",
        desc: "Comprehensive PDF covering all audit dimensions with findings, severity ratings, and recommendations.",
      },
      {
        title: "Data Pipeline Assessment",
        desc: "Review of your data ingestion, cleaning, and transformation logic for leaks and inefficiencies.",
      },
      {
        title: "Model Performance Analysis",
        desc: "Evaluation of your current model on representative data — accuracy, robustness, and bias.",
      },
      {
        title: "Prioritized Fix List",
        desc: "Every finding ranked by impact vs. effort. A clear, actionable backlog you can execute immediately.",
      },
      {
        title: "Live Review Call",
        desc: "1-hour call to walk through the report, answer questions, and discuss implementation strategy.",
      },
    ],
    process: [
      {
        num: "01",
        title: "Access & Scope",
        desc: "You share your codebase (NDA signed first). We define the audit scope and success criteria.",
      },
      {
        num: "02",
        title: "Data Pipeline Review",
        desc: "We trace your data from source to model input, identifying leaks and silent failure points.",
      },
      {
        num: "03",
        title: "Model & Training Review",
        desc: "Architecture, training code, evaluation methodology, and overfitting analysis.",
      },
      {
        num: "04",
        title: "Inference & MLOps Review",
        desc: "Serving infrastructure, latency profiling, monitoring setup, and deployment configuration.",
      },
      {
        num: "05",
        title: "Report Writing",
        desc: "Structured findings with severity ratings (Critical/High/Medium/Low) and code-level recommendations.",
      },
      {
        num: "06",
        title: "Review Call",
        desc: "1-hour live walkthrough. You leave with a clear picture of what to fix first and why.",
      },
    ],
    suited: [
      "Teams whose ML models are underperforming in production",
      "Startups before a major ML infrastructure investment",
      "Companies with high inference costs or latency issues",
      "Engineering teams inheriting an ML codebase",
    ],
    results: [
      { val: "2–3d", label: "Full audit turnaround time" },
      { val: "100%", label: "Of clients found at least 3 critical issues" },
      { val: "1hr", label: "Live review call included" },
      { val: "PDF", label: "Detailed written report delivered" },
    ],
    related: ["ml-projects", "streamlit-apps", "data-annotation"],
  },
  {
    slug: "streamlit-apps",
    num: "04",
    iconName: "Layers",
    title: "Streamlit / Gradio Apps",
    tagline: "Demo-ready ML interfaces. Ship fast.",
    heroDesc:
      "Interactive ML web apps built with Streamlit or Gradio — deployed and shareable in days. Perfect for researchers who need a demo, students building capstone projects, and startups validating AI products before full engineering investment.",
    price: "From ₹4,000",
    duration: "2–5 days",
    tags: ["Streamlit", "Gradio", "Hugging Face Spaces", "Python", "UI/UX"],
    overview: [
      "You've trained a model. Now you need to demonstrate it — to an evaluator, an investor, a client, or your thesis committee. A Jupyter notebook doesn't cut it. A full production web app takes weeks. A Streamlit or Gradio app, built by SpaceDrift, takes 2–5 days.",
      "We build custom ML interfaces that are professionally designed — not the default grey Streamlit theme, but properly structured, branded applications that present your model with the credibility it deserves.",
      "Every app we build is deployed on Hugging Face Spaces or Streamlit Cloud, provides a public URL you can share anywhere, and is delivered with full source code so your team can extend it independently.",
    ],
    deliverables: [
      {
        title: "Fully Functional App",
        desc: "Streamlit or Gradio app with your model integrated, tested, and working end-to-end.",
      },
      {
        title: "Custom UI Design",
        desc: "Beyond the default theme — custom layouts and component arrangement matching your brand.",
      },
      {
        title: "Deployed Public URL",
        desc: "Live on Hugging Face Spaces or Streamlit Cloud. Shareable immediately.",
      },
      {
        title: "Source Code",
        desc: "Clean Python source with setup instructions so you can modify and extend it.",
      },
      {
        title: "1 Round of Revisions",
        desc: "One full round of design and functionality revisions after initial delivery.",
      },
    ],
    process: [
      {
        num: "01",
        title: "Model & Requirements",
        desc: "You share your trained model. We define the interface requirements and user flow together.",
      },
      {
        num: "02",
        title: "UI Design & Layout",
        desc: "We plan the app layout, input/output components, and visual style before writing code.",
      },
      {
        num: "03",
        title: "Build & Integrate",
        desc: "App built, model integrated, edge cases and error states handled properly.",
      },
      {
        num: "04",
        title: "Deploy & Test",
        desc: "Deployed to Hugging Face Spaces or Streamlit Cloud. Tested on multiple devices.",
      },
      {
        num: "05",
        title: "Revisions & Handoff",
        desc: "One round of revisions based on your feedback. Source code delivered with documentation.",
      },
    ],
    suited: [
      "ML researchers who need a shareable, interactive demo",
      "Students presenting capstone or thesis projects to an evaluation panel",
      "Early-stage startups validating AI product ideas with stakeholders",
      "Data science teams building internal decision-support tools",
    ],
    results: [
      {
        val: "1,200+",
        label: "Monthly users on a deployed sentiment analyser app",
      },
      {
        val: "94%",
        label: "Validation accuracy on a ViT image classifier app",
      },
      { val: "2–5d", label: "Typical delivery timeline" },
      {
        val: "Free",
        label: "Hosting on Hugging Face Spaces / Streamlit Cloud",
      },
    ],
    related: ["ml-projects", "data-annotation", "ai-audit"],
  },
  {
    slug: "data-annotation",
    num: "05",
    iconName: "Database",
    title: "Data Annotation",
    tagline: "Clean labels. Production-ready datasets.",
    heroDesc:
      "High-quality labeled datasets for NLP, computer vision, and classification. SpaceDrift uses Label Studio and custom validation pipelines to annotate text and images at scale, with full quality reporting and export in your preferred format.",
    price: "From ₹3,000",
    duration: "2–7 days",
    tags: ["NLP", "Computer Vision", "Label Studio", "NER", "Classification"],
    overview: [
      "Model quality is a direct function of data quality. Noisy labels, inconsistent annotation guidelines, and poorly structured datasets are among the most common reasons ML systems underperform — in both academic and production settings.",
      "SpaceDrift provides structured, validated data annotation services for NLP tasks (NER, intent classification, sentiment labeling, relation extraction) and computer vision tasks (bounding boxes, polygon segmentation, keypoint detection, image classification).",
      "Every annotation engagement begins with a clearly defined schema and annotation guidelines. Every delivered dataset is quality-validated — a representative sample is reviewed post-annotation to identify and correct systematic labeling errors before they propagate into model training.",
    ],
    deliverables: [
      {
        title: "Annotated Dataset",
        desc: "Labeled data exported in JSON, CSV, COCO, Pascal VOC, or your preferred format.",
      },
      {
        title: "Quality Validation Report",
        desc: "Inter-annotator agreement metrics and error analysis on a sampled subset.",
      },
      {
        title: "Annotation Schema & Guide",
        desc: "Full documentation of label taxonomy, annotation rules, and edge case handling.",
      },
      {
        title: "Label Studio Project File",
        desc: "Exported project so you can review annotations and run future annotation rounds.",
      },
      {
        title: "Post-Delivery Corrections",
        desc: "1 week of free corrections for any annotation errors identified after delivery.",
      },
    ],
    process: [
      {
        num: "01",
        title: "Schema Design",
        desc: "We define the label taxonomy, annotation guidelines, and edge case resolution rules in collaboration with your team.",
      },
      {
        num: "02",
        title: "Pilot Batch",
        desc: "We annotate a pilot batch of 50–100 samples for your review to validate quality before full-scale work begins.",
      },
      {
        num: "03",
        title: "Full Annotation",
        desc: "Complete dataset annotated following the validated schema, with regular progress updates.",
      },
      {
        num: "04",
        title: "Quality Validation",
        desc: "Random sample reviewed. Inter-annotator agreement calculated and included in the final report.",
      },
      {
        num: "05",
        title: "Export & Delivery",
        desc: "Final dataset exported in your required format, accompanied by full schema documentation.",
      },
    ],
    suited: [
      "ML engineers building supervised learning datasets for model training",
      "Researchers creating labeled benchmarks for academic publication",
      "Organizations scaling annotation capacity beyond internal resources",
      "Students and startups preparing data for their first model training run",
    ],
    results: [
      {
        val: "95%+",
        label: "Typical inter-annotator agreement on delivered datasets",
      },
      {
        val: "2–7d",
        label: "Typical delivery timeline depending on dataset size",
      },
      { val: "5+", label: "Export formats supported" },
      { val: "100%", label: "Of datasets quality-validated before delivery" },
    ],
    related: ["ml-projects", "ai-audit", "streamlit-apps"],
  },
];