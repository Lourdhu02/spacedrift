import type { Metadata } from "next";
import ServiceStation, { type ServiceData } from "@/components/services/ServiceStation";

export const metadata: Metadata = {
  title: "Research Ops for Academia",
  description:
    "Reproducible experiment pipelines, dataset curation, baseline replication, and publication support for PhD scholars and academic labs.",
};

const data: ServiceData = {
  slug: "research-ops",
  station: "PARSE",
  beat: "PARSE",
  index: "01",
  title: "Research Ops",
  subtitle: "for academia.",
  lede: [
    "We help PhD scholars, academic labs, and ed-tech teams turn research ideas into results that can be reviewed, defended, and reproduced.",
    "Fixed-scope engagements only. If a task can't be defined and delivered, we say so — before the invoice.",
  ],
  offers: [
    { label: "Pipelines",     title: "Reproducible experiment pipelines", body: "Environment-pinned, seed-controlled experiment runners with logging, config sweep, and result capture. Handoff comes with a make-target and a README." },
    { label: "Datasets",      title: "Dataset curation & QA",             body: "Sourcing, cleaning, splitting, and documenting datasets — including inter-annotator agreement checks and a data card on delivery." },
    { label: "Replication",   title: "Baseline replication",              body: "Independent replication of published baselines against the paper's reported numbers, with a written report of every deviation." },
    { label: "Analysis",      title: "Ablation & error analysis",         body: "Structured ablation runs, error clustering, and a written summary of what each variant actually changed and why." },
    { label: "Writing",       title: "Publication support",               body: "Method-section drafting, figure prep, camera-ready formatting for common venues, and reviewer-response scaffolding." },
    { label: "Handoff",       title: "Lab handoff kit",                   body: "Code, data, environment, and a walkthrough session so your students can run the pipeline without you." },
  ],
  metrics: [
    { value: 100, label: "24h response window",                     suffix: "%" },
    { value: 95,  label: "95%+ baseline replication accuracy",       suffix: "%" },
    { value: 0,   label: "0% work delivered without documentation",  suffix: "%" },
    { value: 30,  label: "30d support post-handoff",                 suffix: "d" },
  ],
  stack: ["PyTorch", "HuggingFace", "Weights & Biases", "Hydra", "DVC", "Nix", "Docker", "Slurm", "Jupyter"],
  process: [
    { num: "01", title: "Discovery & scope",   body: "Share your paper, data, target venue and deadline. We define a fixed scope with deliverables, exclusions, and timeline." },
    { num: "02", title: "Pipeline draft",       body: "We stand up the smallest working end-to-end pipeline — synthetic or seed data — before scaling. You see a run early, not a diagram." },
    { num: "03", title: "Runs & analysis",      body: "Full experiment sweep against agreed baselines. Every result versioned, every deviation logged. Feedback in milestones, not at the end." },
    { num: "04", title: "Handoff & support",    body: "Code, data, environment, and a walkthrough. 30 days of post-delivery support for bug fixes and small adjustments." },
  ],
  ctaTitle: "Have a paper to defend or a lab to bootstrap?",
  ctaBody:
    "Tell us about the deadline, the data, and the target venue. We respond within 24 hours with a fixed scope, timeline, and price if it fits.",
};

export default function Page() {
  return <ServiceStation data={data} />;
}
