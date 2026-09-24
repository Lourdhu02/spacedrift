import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import AsciiScene from "@/components/ascii/AsciiScene";
import Marquee from "@/components/motion/Marquee";
import ContactForm from "@/components/ui/ContactForm";
import { CONTACT_EMAIL, SERVICES, type SceneKind } from "@/lib/services";

const STATIONS: { n: string; name: string; kind: SceneKind; title: string; body: string; out: string; when: string }[] = [
  {
    n: "01", name: "Noise", kind: "noise", when: "Day 0",
    title: "We listen before we build.",
    body: "You bring the problem, the data, the deadline, and the constraints. We ask practical questions and tell you honestly whether it fits a fixed-scope build.",
    out: "A clear go or no-go after one call",
  },
  {
    n: "02", name: "Parse", kind: "parse", when: "Within 24h",
    title: "Scope, written down.",
    body: "A fixed-price proposal: deliverables, milestones, assumptions, and exclusions. The quoted price is the boundary, so nothing drifts quietly.",
    out: "Signed scope and a fixed price",
  },
  {
    n: "03", name: "Model", kind: "model", when: "Build weeks",
    title: "Build against the scope.",
    body: "Working previews, sample outputs, and evaluation numbers at every milestone. Feedback lands while it's cheap to act on, not at the end.",
    out: "Weekly previews with real metrics",
  },
  {
    n: "04", name: "Ship", kind: "ship", when: "Handoff",
    title: "Hand it over, fully.",
    body: "Source code, documentation, and deployment on your own accounts, plus a handoff session. Everything we built is yours, with 30 days of support.",
    out: "Code, docs, and 30-day support",
  },
];

const STATS = [
  { v: 24, u: "h", label: "First reply to every inquiry" },
  { v: 3, u: "wk", label: "Typical AI MVP build" },
  { v: 30, u: "d", label: "Support after every handoff" },
  { v: 100, u: "%", label: "Code and IP handed to you" },
];

export default function Home() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="chip" data-reveal>
              <span className="dot-live" /> ML &amp; AI studio · Bengaluru<span className="hide-sm"> · replies in 24h</span>
            </div>
            <h1 className="display-1 hero-h1" data-split="now">
              We turn noise into ML systems <span className="grad-text">that ship.</span>
            </h1>
            <p className="lede" data-reveal>
              Research ops, document AI, RAG MVPs, data annotation, and web builds, taken from raw
              input to a working handoff. Fixed scope, fixed price, and one engineer accountable end to end.
            </p>
            <div className="hero-actions" data-reveal>
              <Button href={`mailto:${CONTACT_EMAIL}`}>Start a project</Button>
              <Button href="/#process" variant="glass">See how we work</Button>
            </div>
          </div>

          <div className="hero-card glass" data-glow data-reveal="glass">
            <AsciiScene kind="cycle" />
          </div>
        </div>

        <div className="container hero-foot" data-reveal>
          <span className="label">Scroll</span>
          <span className="hero-line" aria-hidden />
          <span className="label">Five services · fixed price · you own everything</span>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────── */}
      <section className="section-tight mq-sec" aria-label="Capabilities">
        <Marquee items={["Document AI", "RAG systems", "Research ops", "Data annotation", "Agentic workflows", "Web builds", "Evaluation"]} />
      </section>

      {/* ── MANIFESTO ────────────────────────────────────────── */}
      <section className="section manifesto">
        <div className="container"><div className="manifesto-inner">
          <p className="label label-accent" data-reveal>Why spacedrift</p>
          <p className="display-3 manifesto-text" data-scrub>
            Most AI projects don&apos;t fail on the model. They fail in the noise: loose scope, messy data,
            and nobody who owns the build. We run every engagement through four stations, and the person
            writing the code is on every call.
          </p>
          <div className="manifesto-sign" data-reveal>
            <span className="sign-avatar" aria-hidden>LR</span>
            <span>
              <strong>Lourdu Raju</strong>
              <span className="muted"> · Founder &amp; ML engineer</span>
            </span>
          </div>
        </div></div>
      </section>

      {/* ── PROCESS (stacked stations) ───────────────────────── */}
      <section className="section" id="process">
        <div className="container">
          <div className="sec-head">
            <p className="label label-accent" data-reveal>The process</p>
            <h2 className="display-2" data-split>
              Four stations. <span className="muted">One accountable engineer.</span>
            </h2>
          </div>

          <div className="stack">
            {STATIONS.map((s, i) => (
              <article
                key={s.n}
                className="stack-card glass glass-strong"
                data-stack-card
                style={{ ["--i" as string]: i }}
              >
                <div className="stack-shade" data-stack-shade aria-hidden />
                <div className="stack-copy">
                  <div className="stack-top">
                    <span className="label label-accent">Station {s.n}</span>
                    <span className="label">{s.when}</span>
                  </div>
                  <h3 className="stack-name">{s.name}</h3>
                  <p className="h3">{s.title}</p>
                  <p className="body">{s.body}</p>
                  <div className="stack-out">
                    <span className="label">You get</span>
                    <span>{s.out}</span>
                  </div>
                </div>
                <div className="stack-visual">
                  <AsciiScene kind={s.kind} chrome={false} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section className="section" id="services">
        <div className="container">
          <div className="sec-head sec-head-split">
            <div>
              <p className="label label-accent" data-reveal>Services</p>
              <h2 className="display-2" data-split>Five things we do well.</h2>
            </div>
            <p className="lede" data-reveal>
              We only take work where the output can be defined, built, tested, and handed over.
              No open-ended retainers and no agency layers.
            </p>
          </div>

          <div className="bento">
            {SERVICES.map((s, i) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className={`svc glass ${i < 2 ? "svc-wide" : ""}`}
                data-glow
                data-reveal="glass"
              >
                <div className="svc-top">
                  <span className="label">{s.index}</span>
                  <span className="svc-arrow" aria-hidden>
                    <ArrowUpRight size={18} strokeWidth={1.8} />
                  </span>
                </div>
                <div className="svc-body">
                  <h3 className="display-3 svc-title">{s.title}</h3>
                  <p className="small">{s.short}</p>
                </div>
                <div className="svc-tags">
                  {s.tags.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── NUMBERS ──────────────────────────────────────────── */}
      <section className="section-tight">
        <div className="container stats">
          {STATS.map((s) => (
            <div key={s.label} className="stat" data-reveal>
              <p className="stat-num">
                <span data-count={s.v}>{s.v}</span>
                <span className="grad-text stat-unit">{s.u}</span>
              </p>
              <p className="small">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────── */}
      <section className="section" id="contact">
        <div className="container contact">
          <div className="contact-copy">
            <p className="label label-accent" data-reveal>Contact</p>
            <h2 className="display-2" data-split>
              Tell us what you&apos;re <span className="grad-text">building.</span>
            </h2>
            <p className="lede" data-reveal>
              A paragraph is enough. We reply within 24 hours with questions, or with a scope,
              timeline, and fixed price if it&apos;s a fit.
            </p>
            <ul className="contact-list" data-reveal>
              <li>The problem, in plain words</li>
              <li>What data exists, and where it lives</li>
              <li>A rough deadline</li>
              <li>Constraints: budget range, hosting, compliance</li>
            </ul>
          </div>
          <div className="contact-card glass" data-glow data-reveal="glass">
            <ContactForm />
          </div>
        </div>
      </section>

      <style>{`
        /* hero */
        .hero { position: relative; min-height: 100svh; display: flex; flex-direction: column; justify-content: center; padding: calc(var(--nav-space) + 56px) 0 40px; }
        .hero-grid { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: clamp(32px, 5vw, 80px); align-items: center; }
        .hero-copy { display: flex; flex-direction: column; align-items: flex-start; gap: 28px; }
        .hero-h1 { font-size: clamp(46px, 6.4vw, 104px); }
        .hero-actions { display: flex; flex-wrap: wrap; gap: 12px; }
        .hero-card { padding: 20px 22px; }
        .hero-foot { display: flex; align-items: center; gap: 16px; margin-top: clamp(40px, 6vw, 72px); }
        .hero-line { position: relative; flex: 0 0 64px; height: 1px; background: var(--line-2); overflow: hidden; }
        .hero-line::after { content: ""; position: absolute; inset: 0; background: var(--grad); transform: translateX(-100%); animation: hero-line 2.4s var(--ease-io) infinite; }
        @keyframes hero-line { 60%, 100% { transform: translateX(100%); } }

        .mq-sec { padding-block: clamp(24px, 4vw, 56px); }

        /* manifesto */
        .manifesto-inner { display: flex; flex-direction: column; gap: 32px; max-width: 1160px; }
        .manifesto-text { font-weight: 500; line-height: 1.12; }
        .manifesto-sign { display: flex; align-items: center; gap: 14px; font-size: 15.5px; }
        .sign-avatar { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 99px; font-family: var(--font-mono); font-size: 13px; color: #0a0a10; background: var(--grad); }

        /* section heads */
        .sec-head { display: flex; flex-direction: column; gap: 20px; margin-bottom: clamp(40px, 6vw, 72px); max-width: 900px; }
        .sec-head-split { max-width: none; display: grid; grid-template-columns: 1.2fr 1fr; align-items: end; gap: 32px; }
        .sec-head-split > div { display: flex; flex-direction: column; gap: 20px; }

        /* stacked stations */
        .stack { display: flex; flex-direction: column; gap: 6vh; }
        .stack-card {
          position: sticky; top: calc(var(--nav-space) + 24px + var(--i) * 16px);
          display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); gap: clamp(24px, 4vw, 64px); align-items: center;
          min-height: min(600px, 74vh); padding: clamp(24px, 3.4vw, 48px);
          border-radius: 36px; transform-origin: 50% 0;
        }
        .stack-shade { position: absolute; inset: 0; border-radius: inherit; background: #06060a; opacity: 0; pointer-events: none; z-index: 2; }
        .stack-copy { display: flex; flex-direction: column; gap: 18px; }
        .stack-top { display: flex; justify-content: space-between; gap: 16px; }
        .stack-name { font-family: var(--font-display); font-weight: 600; font-size: clamp(56px, 8vw, 120px); line-height: .92; letter-spacing: -.035em; }
        .stack-out { display: flex; flex-direction: column; gap: 6px; padding-top: 18px; margin-top: 6px; border-top: 1px solid var(--line); font-size: 16px; }
        .stack-visual { padding: 18px; border-radius: 24px; background: rgba(0,0,0,.28); box-shadow: inset 0 0 0 1px var(--line); }

        /* services bento */
        .bento { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 16px; }
        .svc { grid-column: span 2; display: flex; flex-direction: column; gap: 28px; min-height: 340px; padding: 28px; }
        .svc-wide { grid-column: span 3; }
        .svc-top { display: flex; justify-content: space-between; align-items: center; }
        .svc-arrow { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 99px; background: rgba(255,255,255,.07); box-shadow: inset 0 0 0 1px var(--line); transition: background-color .4s var(--ease), color .4s var(--ease), transform .6s var(--ease); }
        .svc:hover .svc-arrow { background: #fff; color: #0a0a10; transform: rotate(45deg); }
        .svc-body { display: flex; flex-direction: column; gap: 12px; margin-top: auto; }
        .svc-title { transition: transform .6s var(--ease); }
        .svc:hover .svc-title { transform: translateX(4px); }
        .svc-tags { display: flex; flex-wrap: wrap; gap: 8px; }

        /* stats */
        .stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .stat { display: flex; flex-direction: column; gap: 10px; padding: 28px clamp(16px, 2vw, 28px); border-left: 1px solid var(--line); }
        .stat:first-child { border-left: 0; padding-left: 0; }
        .stat-num { font-family: var(--font-display); font-weight: 600; font-size: clamp(56px, 7vw, 104px); line-height: .9; letter-spacing: -.035em; display: flex; align-items: baseline; gap: 4px; }
        .stat-unit { font-size: .42em; letter-spacing: -.02em; }

        /* contact */
        .contact { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); gap: clamp(32px, 5vw, 80px); align-items: start; }
        .contact-copy { display: flex; flex-direction: column; gap: 24px; position: sticky; top: calc(var(--nav-space) + 40px); }
        .contact-list { display: flex; flex-direction: column; gap: 12px; color: var(--text-2); }
        .contact-list li { display: flex; gap: 12px; align-items: baseline; }
        .contact-list li::before { content: "→"; font-family: var(--font-mono); color: var(--accent); }
        .contact-card { padding: clamp(22px, 3vw, 40px); }

        @media (max-width: 1080px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-card { max-width: 640px; }
          .stack-card { grid-template-columns: 1fr; min-height: 0; position: relative; top: auto; }
          .svc, .svc-wide { grid-column: span 3; }
          .sec-head-split { grid-template-columns: 1fr; }
          .contact { grid-template-columns: 1fr; }
          .contact-copy { position: static; }
        }
        @media (max-width: 760px) {
          .hero { min-height: 0; }
          .bento { grid-template-columns: 1fr; }
          .svc, .svc-wide { grid-column: span 1; min-height: 280px; }
          .stats { grid-template-columns: 1fr 1fr; row-gap: 12px; }
          .stat { border-left: 0; padding-left: 0; border-top: 1px solid var(--line); }
          .stack-card { border-radius: 28px; }
          .stack { gap: 16px; }
          .stack-name { font-size: 56px; }
          .hero-foot { display: none; }
        }
      `}</style>
    </>
  );
}
