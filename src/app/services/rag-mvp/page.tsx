import type { Metadata } from "next";
import ServiceStation, { type ServiceData } from "@/components/services/ServiceStation";

export const metadata: Metadata = {
  title: "RAG & Agentic AI MVPs",
  description:
    "Internal knowledge-base chatbots, retrieval-augmented generation systems, and small agentic workflows. Fixed scope, three-week builds, working product.",
};

const data: ServiceData = {
  slug: "rag-mvp",
  station: "MODEL",
  beat: "MODEL",
  index: "03",
  title: "RAG & agentic",
  subtitle: "AI MVP builds.",
  lede: [
    "Your AI MVP should answer from your data, not guesses. We build internal knowledge-base chatbots, RAG systems, and small agentic workflows that retrieve from your documents, databases, or approved sources.",
    "For founders, product teams, and internal teams that need a working prototype with clear limits. Fixed scope, fixed timeline, fixed handoff plan — before implementation starts.",
  ],
  offers: [
    { label: "Knowledge",    title: "Internal knowledge-base chatbot", body: "Team asks in natural language, system retrieves from internal docs, wikis, or databases. Web UI, Slack bot, Teams bot, or API." },
    { label: "Privacy",      title: "Privacy-first / on-prem RAG",     body: "Local embeddings, self-hosted vector stores, approved model access. For data that cannot leave your network." },
    { label: "Agents",       title: "Small agentic workflows",         body: "Multi-step tasks — document lookup, summarization, report drafting, tool calling — with logged actions and a hard step cap." },
    { label: "Pipeline",     title: "Document ingestion",              body: "Parse, chunk, embed, and index your content for retrieval. PDFs, docs, spreadsheets, web pages, databases." },
    { label: "Integration",  title: "Platform integration",            body: "Slack, Teams, web apps, or API endpoints — so the assistant fits the workflow your team already uses." },
    { label: "Evaluation",   title: "Eval harness",                    body: "A test set of real questions with expected sources, plus a written baseline accuracy report on your data." },
  ],
  metrics: [
    { value: 100, label: "3-week average MVP delivery",       suffix: "%" },
    { value: 100, label: "100% fixed-scope, fixed-price",     suffix: "%" },
    { value: 30,  label: "30d support post-launch",           suffix: "d" },
    { value: 0,   label: "0% delivery without eval report",   suffix: "%" },
  ],
  stack: ["LangChain", "LlamaIndex", "OpenAI", "Anthropic", "Ollama", "ChromaDB", "Pinecone", "pgvector", "FastAPI", "Next.js", "Docker"],
  process: [
    { num: "01", title: "Requirements & scoping", body: "Share use case, data sources, user roles, success criteria. We define a fixed scope, exclusions, and timeline." },
    { num: "02", title: "Architecture & prototype", body: "Retrieval flow, model access, storage, UI/API shape. You see a working prototype early — not just a diagram." },
    { num: "03", title: "Build & evaluate", body: "Full MVP against real questions, documents, failure cases. Eval scores in every milestone update." },
    { num: "04", title: "Deploy & handoff", body: "Deployment to your infrastructure where possible. Documentation, env notes, 30 days post-launch support." },
  ],
  ctaTitle: "Need a scoped AI MVP you can actually test?",
  ctaBody:
    "Tell us the use case, the data sources, and who's going to use it. We respond within 24 hours with a fixed scope, timeline, and price if it fits.",
};

export default function Page() {
  return <ServiceStation data={data} />;
}
