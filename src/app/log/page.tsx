import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import { CONTACT_EMAIL } from "@/lib/services";

export const metadata: Metadata = {
  title: "Log",
  description: "Engagement write-ups from spacedrift, published once each client has signed off on what can be shared.",
};

const CHECKLIST = [
  { done: true, text: "Problem statement" },
  { done: true, text: "Approach & architecture" },
  { done: false, text: "Measured outcome, under review" },
  { done: false, text: "Client sign-off" },
];

export default function Log() {
  return (
    <>
      <section className="lg-hero">
        <div className="container lg-hero-inner">
          <span className="chip" data-reveal>Studio log</span>
          <h1 className="display-1 lg-h1" data-split="now">
            Working notes, <span className="grad-text">published when cleared.</span>
          </h1>
          <p className="lede" data-reveal>
            Write-ups land here once an engagement is finished, the client has approved what can be shared,
            and the numbers have been checked twice.
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container lg-list">
          <article className="lg-entry glass" data-glow data-reveal="glass">
            <div className="lg-entry-top">
              <span className="label label-accent">Log 001</span>
              <span className="chip"><span className="lg-lock" aria-hidden /> Sealed until Q1</span>
            </div>
            <h2 className="display-3">First engagement write-up</h2>
            <p className="body">
              Problem, approach, the options we didn&apos;t take, the measured outcome, and what we&apos;d do
              differently. It publishes once the client signs off.
            </p>
            <ul className="lg-check">
              {CHECKLIST.map((c) => (
                <li key={c.text} className={c.done ? "done" : ""}>
                  <span className="lg-box" aria-hidden>{c.done ? "✓" : ""}</span>
                  {c.text}
                </li>
              ))}
            </ul>
          </article>

          {["002", "003"].map((n) => (
            <div key={n} className="lg-ghost" data-reveal>
              <span className="label">Log {n}</span>
              <span className="label">Reserved</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="lg-cta glass" data-glow data-reveal="glass">
            <div>
              <h2 className="display-3">Want to be the next entry?</h2>
              <p className="body">If we build it together and you&apos;re happy to share, it lands here.</p>
            </div>
            <Button href={`mailto:${CONTACT_EMAIL}`}>Start a project</Button>
          </div>
        </div>
      </section>

      <style>{`
        .lg-hero { padding: calc(var(--nav-space) + clamp(56px, 8vw, 110px)) 0 clamp(32px, 5vw, 64px); }
        .lg-hero-inner { display: flex; flex-direction: column; align-items: flex-start; gap: 26px; max-width: 1100px; }
        .lg-h1 { font-size: clamp(44px, 6.4vw, 104px); }
        .lg-list { display: flex; flex-direction: column; gap: 14px; max-width: 980px; }
        .lg-entry { display: flex; flex-direction: column; gap: 18px; padding: clamp(24px, 3.4vw, 44px); border-radius: 32px; }
        .lg-entry-top { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
        .lg-lock { width: 8px; height: 8px; border-radius: 2px; background: var(--accent-3); }
        .lg-check { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 24px; padding-top: 18px; border-top: 1px solid var(--line); }
        .lg-check li { display: flex; align-items: center; gap: 12px; color: var(--text-3); font-size: 15.5px; }
        .lg-check li.done { color: var(--text); }
        .lg-box { display: grid; place-items: center; width: 22px; height: 22px; border-radius: 7px; font-size: 12px; box-shadow: inset 0 0 0 1px var(--line-2); color: #0a0a10; }
        .lg-check li.done .lg-box { background: var(--grad); box-shadow: none; }
        .lg-ghost { display: flex; justify-content: space-between; padding: 22px 28px; border-radius: 24px; border: 1px dashed var(--line-2); }
        .lg-cta { display: flex; justify-content: space-between; align-items: center; gap: 32px; padding: clamp(28px, 4vw, 56px); border-radius: 36px; }
        .lg-cta > div { display: flex; flex-direction: column; gap: 12px; }
        @media (max-width: 720px) {
          .lg-check { grid-template-columns: 1fr; }
          .lg-cta { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </>
  );
}
