export type ServiceData = {
  slug: string;
  num: string;
  iconName: string; // ← string key instead of component
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
    title: "ML Engineering",
    tagline: "From raw data to deployed API.",
    heroDesc:
      "End-to-end production AI/ML engineering — I take your raw data and turn it into a working, deployed model. NLP pipelines, computer vision systems, time-series forecasting, LLM integrations, and custom chatbots — all production-grade, fully documented, and delivered with source code.",
    price: "From ₹15,000",
    duration: "1–3 weeks",
    tags: [
      "NLP",
      "Computer Vision",
      "Time Series",
      "LLMs",
      "Chatbots",
      "FastAPI",
      "PyTorch",
    ],
    overview: [
      "Most businesses sitting on data are leaving value on the table. I specialize in turning that data into working, deployed ML systems — not research notebooks, not prototype scripts, but production APIs that your team can actually use.",
      "I work across the full ML lifecycle: problem scoping, data cleaning and EDA, feature engineering, model selection and training, evaluation, optimization, API wrapping, containerization, and deployment. Every system I deliver is production-ready from day one.",
      "My background spans NLP (classification, NER, summarization, RAG pipelines), computer vision (object detection, classification, segmentation), time-series forecasting, recommendation systems, and LLM fine-tuning and integration using OpenAI, Anthropic, and open-source models.",
    ],
    deliverables: [
      {
        title: "Trained Model",
        desc: "Fully trained, evaluated, and optimized model with performance benchmarks and confusion matrices.",
      },
      {
        title: "REST API",
        desc: "FastAPI or Flask endpoint with proper error handling, input validation, and response formatting.",
      },
      {
        title: "Docker Container",
        desc: "Production-ready Docker image with all dependencies pinned. Deploy anywhere in minutes.",
      },
      {
        title: "Source Code",
        desc: "Clean, commented Python codebase with a proper project structure, ready for your team to maintain.",
      },
      {
        title: "Documentation",
        desc: "Full technical docs: model card, API reference, setup guide, and usage examples.",
      },
      {
        title: "Post-Delivery Support",
        desc: "2 weeks of bug fixes, clarifications, and minor adjustments at no extra cost.",
      },
    ],
    process: [
      {
        num: "01",
        title: "Discovery & Data Audit",
        desc: "I review your data, understand your problem, and define clear success metrics before writing a single line of code.",
      },
      {
        num: "02",
        title: "Proposal & Scope",
        desc: "Written scope with timeline, model approach, expected performance, and fixed price. No surprises.",
      },
      {
        num: "03",
        title: "Data Preparation",
        desc: "Cleaning, EDA, feature engineering, and train/val/test splits. The foundation that determines model quality.",
      },
      {
        num: "04",
        title: "Model Training & Eval",
        desc: "Iterative training with multiple architectures, hyperparameter tuning, and rigorous evaluation on held-out data.",
      },
      {
        num: "05",
        title: "API & Deployment",
        desc: "Model wrapped in a production API, containerized with Docker, and deployed to your preferred platform.",
      },
      {
        num: "06",
        title: "Handoff & Support",
        desc: "Full source code, documentation, and a walkthrough call. 2 weeks of post-delivery support included.",
      },
    ],
    suited: [
      "Startups shipping their first AI feature",
      "Businesses automating repetitive data workflows",
      "Teams replacing manual review with ML systems",
      "Founders validating AI product ideas",
    ],
    results: [
      {
        val: "80%",
        label: "Reduction in manual review time (resume screener)",
      },
      {
        val: "96%",
        label: "Detection accuracy (manufacturing defect CV model)",
      },
      { val: "60%", label: "HR workload reduction (LLM staffing chatbot)" },
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
      "I build websites that do the opposite. Every site I deliver is custom-coded in Next.js, mobile-first by design, and optimized for both performance and SEO from the ground up. No Squarespace. No WordPress. No bloated themes.",
      "I handle everything — design, development, deployment, Google Analytics integration, sitemap generation, meta tags, and post-launch support. You get a site that loads fast, ranks well, and converts visitors into clients.",
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
        desc: "I outline the page structure, sections, and content hierarchy. Agreed before design.",
      },
      {
        num: "03",
        title: "Design in Code",
        desc: "I design and code simultaneously — no Figma handoff delays.",
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
      "Most ML systems in production have the same set of problems: leaky data pipelines, models trained on the wrong distribution, no monitoring, slow inference, and tech debt that nobody wants to touch.",
      "An AI Audit is a structured technical review that surfaces these problems before they become crises. I review your code, your data, your model, your serving infrastructure, and your monitoring setup.",
      "Unlike a generic consulting engagement, this is a hands-on technical audit. I read your code. I run your pipeline. I look at your model's actual behavior on real data. The output is a detailed written report you can act on immediately.",
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
        desc: "You share your codebase (NDA signed first). I define the audit scope.",
      },
      {
        num: "02",
        title: "Data Pipeline Review",
        desc: "I trace your data from source to model input, looking for leaks and silent failures.",
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
      "You've trained a model. Now you need to show it to someone — an investor, a client, a professor, or your team. A Jupyter notebook doesn't cut it. A full production web app takes weeks. A Streamlit or Gradio app takes 2–5 days.",
      "I build custom ML interfaces that are actually good-looking. Not the default grey Streamlit theme — properly designed, branded apps that make your model look as impressive as it actually is.",
      "Every app I build is deployed on Hugging Face Spaces or Streamlit Cloud, gives you a public URL you can share anywhere, and comes with full source code so you can extend it yourself.",
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
        desc: "You share your trained model. We define the interface requirements together.",
      },
      {
        num: "02",
        title: "UI Design & Layout",
        desc: "I plan the app layout, input/output components, and visual style before writing code.",
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
      "ML researchers who need a shareable demo",
      "Students presenting capstone or thesis projects",
      "Early-stage startups validating AI product ideas",
      "Data scientists building internal team tools",
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
      "High-quality labeled datasets for NLP, computer vision, and classification. I use Label Studio and custom scripts to annotate text and images, with full quality validation and export in your preferred format.",
    price: "From ₹3,000",
    duration: "2–7 days",
    tags: ["NLP", "Computer Vision", "Label Studio", "NER", "Classification"],
    overview: [
      "Model quality is a direct function of data quality. Noisy labels, inconsistent annotation guidelines, and poorly structured datasets are the most common reason ML projects underperform.",
      "I provide structured, validated data annotation for NLP (NER, intent classification, sentiment labeling, relation extraction) and computer vision (bounding boxes, polygon segmentation, keypoint detection, image classification) tasks.",
      "Every annotation project starts with a clear schema and annotation guidelines. Every output dataset is quality-validated — a sample is reviewed after annotation to catch systematic errors before they propagate into training.",
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
        desc: "1 week of free corrections for any annotation errors found after delivery.",
      },
    ],
    process: [
      {
        num: "01",
        title: "Schema Design",
        desc: "We define the label taxonomy, annotation guidelines, and edge case rules together.",
      },
      {
        num: "02",
        title: "Pilot Batch",
        desc: "I annotate a small pilot batch (50–100 samples) for your review to validate quality.",
      },
      {
        num: "03",
        title: "Full Annotation",
        desc: "Full dataset annotated following the validated schema, with progress updates.",
      },
      {
        num: "04",
        title: "Quality Validation",
        desc: "Random sample reviewed. Inter-annotator agreement calculated and reported.",
      },
      {
        num: "05",
        title: "Export & Delivery",
        desc: "Final dataset exported in your required format with schema documentation.",
      },
    ],
    suited: [
      "ML engineers building supervised learning datasets",
      "Researchers creating benchmarks for academic work",
      "Companies scaling annotation beyond internal capacity",
      "Startups preparing data for their first model training run",
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
