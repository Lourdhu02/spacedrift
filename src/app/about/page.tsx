import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import AsciiScene from "@/components/ascii/AsciiScene";
import { CONTACT_EMAIL } from "@/lib/services";

export const metadata: Metadata = {
  title: "About",
  description:
    "spacedrift is a boutique ML & AI studio in Bengaluru, run by Lourdu Raju, a Machine Learning Engineer. Fixed scope, fixed price, direct engineering ownership.",
};

const PRINCIPLES = [
  { title: "Quality over volume", body: "We cap active projects so every engagement gets direct engineering attention. If the timeline, data, or scope isn't realistic, we say no." },
  { title: "Scope in writing", body: "Deliverables, milestones, assumptions, and exclusions are agreed before work starts. If delivery risk changes, you hear about it early." },
  { title: "You own everything", body: "Source code, datasets, assets, and documentation are handed over. We deploy to your accounts and avoid needless recurring dependencies." },
  { title: "Fast, not rushed", body: "Speed comes from tight scope and fewer handoffs, never from skipping review, testing, or documentation." },
  { title: "Direct line", body: "You talk to the person writing the code. Technical decisions get made faster and context doesn't get lost between meetings." },
  { title: "30 days included", body: "Bug fixes, small adjustments, and handoff questions for 30 days after delivery. It's part of the scope, not an upsell." },
];

const FACTS = [
  { k: "Based in", v: "Bengaluru, IN" },
  { k: "Founded", v: "2024" },
  { k: "First reply", v: "Within 24h" },
  { k: "Model", v: "Fixed scope" },
];

export default function About() {
  return (
    <>
      <section className="ab-hero">
        <div className="container ab-hero-grid">
          <div className="ab-hero-copy">
            <span className="chip" data-reveal>About the studio</span>
            <h1 className="display-1 ab-h1" data-split="now">
              A small studio for ML systems <span className="grad-text">that need to ship.</span>
            </h1>
            <p className="lede" data-reveal>
              spacedrift is a Bengaluru ML &amp; AI studio run by Lourdu Raju, a Machine Learning
              Engineer. We take on fixed-scope work for teams that need practical output, not a long
              agency engagement.
            </p>
          </div>
          <div className="ab-card glass" data-glow data-reveal="glass">
            <AsciiScene kind="model" label="operator online" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container ab-story">
          <p className="label label-accent" data-reveal>Why it exists</p>
          <p className="display-3 ab-story-lead" data-scrub>
            Researchers need experiments they can reproduce. Startups need AI that works on their own data.
            ML teams need labels they can audit. These projects fail when the scope is loose and nobody owns
            the build.
          </p>
          <div className="ab-story-cols">
            <p className="body" data-reveal>
              So the studio is small on purpose. spacedrift is a registered MSME run alongside a
              full-time engineering role. That means fewer projects, each one defined before work starts.
              Fixed scope and fixed price protect both quality and availability.
            </p>
            <p className="body" data-reveal>
              You work directly with the person building your system, so requirements, tradeoffs, and
              delivery questions stay close to the code. If a request really needs a retainer or a large
              team, we say so up front instead of pretending otherwise.
            </p>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container ab-facts">
          {FACTS.map((f) => (
            <div key={f.k} className="ab-fact" data-reveal>
              <span className="label">{f.k}</span>
              <span className="ab-fact-v">{f.v}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="ab-head">
            <p className="label label-accent" data-reveal>Principles</p>
            <h2 className="display-2" data-split>What drives every decision.</h2>
          </div>
          <div className="ab-grid">
            {PRINCIPLES.map((p, i) => (
              <div key={p.title} className="ab-p glass" data-glow data-reveal="glass">
                <span className="label">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3">{p.title}</h3>
                <p className="small">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="ab-cta glass" data-glow data-reveal="glass">
            <div>
              <h2 className="display-3">Let&apos;s work together.</h2>
              <p className="body">Tell us what you&apos;re building. You&apos;ll get a reply within 24 hours.</p>
            </div>
            <Button href={`mailto:${CONTACT_EMAIL}`}>Start a project</Button>
          </div>
        </div>
      </section>

      <style>{`
        .ab-hero { padding: calc(var(--nav-space) + clamp(56px, 8vw, 110px)) 0 clamp(40px, 6vw, 80px); }
        .ab-hero-grid { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: clamp(32px, 5vw, 80px); align-items: center; }
        .ab-hero-copy { display: flex; flex-direction: column; align-items: flex-start; gap: 26px; }
        .ab-h1 { font-size: clamp(44px, 6vw, 96px); }
        .ab-card { padding: 20px 22px; }

        .ab-story { display: flex; flex-direction: column; gap: 36px; max-width: 1180px; }
        .ab-story-lead { font-weight: 500; line-height: 1.12; }
        .ab-story-cols { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(24px, 4vw, 64px); max-width: 980px; }

        .ab-facts { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .ab-fact { display: flex; flex-direction: column; gap: 10px; padding: 24px clamp(16px, 2vw, 28px); border-left: 1px solid var(--line); }
        .ab-fact:first-child { border-left: 0; padding-left: 0; }
        .ab-fact-v { font-family: var(--font-display); font-weight: 600; font-size: clamp(26px, 2.6vw, 38px); letter-spacing: -.025em; line-height: 1.05; }

        .ab-head { display: flex; flex-direction: column; gap: 20px; margin-bottom: clamp(36px, 5vw, 64px); }
        .ab-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
        .ab-p { display: flex; flex-direction: column; gap: 14px; padding: 28px; min-height: 250px; }
        .ab-p .h3 { margin-top: auto; }

        .ab-cta { display: flex; justify-content: space-between; align-items: center; gap: 32px; padding: clamp(28px, 4vw, 56px); border-radius: 36px; }
        .ab-cta > div { display: flex; flex-direction: column; gap: 12px; }

        @media (max-width: 1080px) {
          .ab-hero-grid { grid-template-columns: 1fr; }
          .ab-card { max-width: 640px; }
          .ab-grid { grid-template-columns: 1fr 1fr; }
          .ab-cta { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 720px) {
          .ab-story-cols { grid-template-columns: 1fr; }
          .ab-facts { grid-template-columns: 1fr 1fr; row-gap: 8px; }
          .ab-fact { border-left: 0; padding-left: 0; border-top: 1px solid var(--line); }
          .ab-grid { grid-template-columns: 1fr; }
          .ab-p { min-height: 0; }
        }
      `}</style>
    </>
  );
}
