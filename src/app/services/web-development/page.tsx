import type { Metadata } from "next";
import ServiceStation, { type ServiceData } from "@/components/services/ServiceStation";

export const metadata: Metadata = {
  title: "Web Development",
  description:
    "Production websites and marketing sites built for performance and clarity. Next.js, real accessibility, real Lighthouse scores.",
};

const data: ServiceData = {
  slug: "web-development",
  station: "SHIP",
  beat: "SHIP",
  index: "05",
  title: "Web development",
  subtitle: "that ships fast.",
  lede: [
    "Production websites and marketing sites built for performance, accessibility, and clarity. Next.js, TypeScript, and a build you can actually deploy without a devops handoff.",
    "Fixed scope, 5-10 day median delivery for landing sites, and honest Lighthouse numbers — not a screenshot on the day we shipped.",
  ],
  offers: [
    { label: "Marketing",  title: "Marketing & landing sites",       body: "Fast, accessible marketing pages on Next.js with real CMS or a static content model. Deployed to Vercel, Netlify, or your host." },
    { label: "Product",    title: "Product & docs sites",            body: "Product pages, documentation portals, and MDX-driven content sites with search and versioning." },
    { label: "Micro-apps", title: "Micro-apps & dashboards",         body: "Small internal tools and public dashboards — the kind where 'a spreadsheet with a form on top' is not enough." },
    { label: "SEO",        title: "SEO, sitemap, structured data",   body: "Metadata, JSON-LD, sitemap, robots, and OG images configured properly — not left as TODOs." },
    { label: "A11y",       title: "Accessibility baked in",          body: "Focus rings, semantic markup, keyboard nav, contrast tokens, and prefers-reduced-motion handled from the first commit." },
    { label: "Handoff",    title: "Handoff you own",                 body: "Repository transfer, deployment access, a short README, and a 30-day support window for bug fixes." },
  ],
  metrics: [
    { value: 95, label: "≥95 Lighthouse on delivered pages",     suffix: "%" },
    { value: 100, label: "24h response window",                   suffix: "%" },
    { value: 100, label: "100% code + assets handed over",        suffix: "%" },
    { value: 0,  label: "0% vendor lock-in on your delivered site", suffix: "%" },
  ],
  stack: ["Next.js", "TypeScript", "Tailwind", "MDX", "Sanity", "Contentlayer", "Vercel", "Netlify", "Playwright"],
  process: [
    { num: "01", title: "Brief & scope",   body: "You share the goal, content, deadline, and any brand assets. We write a fixed-scope proposal with milestones." },
    { num: "02", title: "Design & draft",  body: "Wireframes if useful; otherwise straight to a working draft you can share internally. Feedback in milestones." },
    { num: "03", title: "Build & polish",  body: "Full build with real content. Lighthouse, axe, and manual QA before every review round." },
    { num: "04", title: "Ship & handoff",  body: "Deployment to your account, DNS steps if needed, and 30 days of post-launch support." },
  ],
  ctaTitle: "Need a real site, shipped fast, that you fully own?",
  ctaBody:
    "Share the brief, deadline, and existing content. We respond within 24 hours with a fixed scope, timeline, and price if it fits.",
};

export default function Page() {
  return <ServiceStation data={data} />;
}
