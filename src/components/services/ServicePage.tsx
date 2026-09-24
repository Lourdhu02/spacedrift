import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import AsciiScene from "@/components/ascii/AsciiScene";
import Marquee from "@/components/motion/Marquee";
import { CONTACT_EMAIL, SERVICES, type Service } from "@/lib/services";

export default function ServicePage({ s }: { s: Service }) {
  const i = SERVICES.findIndex((x) => x.slug === s.slug);
  const next = SERVICES[(i + 1) % SERVICES.length];

  return (
    <>
      <section className="sp-hero">
        <div className="container sp-hero-grid">
          <div className="sp-hero-copy">
            <div className="sp-crumbs" data-reveal>
              <Link href="/#services" className="chip">Services</Link>
              <span className="chip">{s.index} / 05</span>
            </div>
            <h1 className="display-1 sp-h1" data-split="now">
              {s.hero.lines.join(" ")} <span className="grad-text">{s.hero.accent}</span>
            </h1>
            <p className="lede" data-reveal>{s.hero.lede}</p>
            <div className="sp-actions" data-reveal>
              <Button href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(s.title)}`}>Start this project</Button>
              <Button href="#deliverables" variant="glass">What you get</Button>
            </div>
          </div>
          <div className="sp-hero-card term" data-reveal="glass">
            <AsciiScene kind={s.scene} label={s.title} />
          </div>
        </div>
      </section>

      <section className="section" id="deliverables">
        <div className="container">
          <div className="sp-head">
            <p className="label label-accent" data-reveal>Deliverables</p>
            <h2 className="display-2" data-split>What you get, <span className="muted">in writing.</span></h2>
          </div>
          <div className="sp-offers">
            {s.offers.map((o, k) => (
              <div key={o.title} className="sp-offer glass" data-glow data-reveal="glass">
                <span className="label">{String(k + 1).padStart(2, "0")}</span>
                <h3 className="h3">{o.title}</h3>
                <p className="small">{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container sp-stats">
          {s.targets.map((t) => (
            <div key={t.label} className="sp-stat" data-reveal>
              <p className="sp-stat-num">
                <span data-count={t.value}>{t.value}</span>
                <span className="grad-text sp-stat-unit">{t.unit}</span>
              </p>
              <p className="small">{t.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-tight sp-stack" aria-label="Tools">
        <div className="container">
          <p className="label" data-reveal>Tools we reach for · documented, replaceable, no lock-in</p>
        </div>
        <Marquee items={s.stack} variant="chips" duration={30} />
      </section>

      <section className="section">
        <div className="container sp-proc">
          <div className="sp-proc-head">
            <p className="label label-accent" data-reveal>Process</p>
            <h2 className="display-2" data-split>How it runs.</h2>
            <p className="lede" data-reveal>
              Four steps, agreed before any code is written: what the system should do, what it should
              refuse, and how success gets measured.
            </p>
          </div>
          <ol className="sp-steps">
            {s.process.map((p, k) => (
              <li key={p.title} className="sp-step" data-reveal>
                <span className="sp-step-n">{String(k + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="h3">{p.title}</h3>
                  <p className="body">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="sp-cta glass" data-glow data-reveal="glass">
            <div>
              <h2 className="display-3">{s.cta.title}</h2>
              <p className="body">{s.cta.body}</p>
            </div>
            <Button href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(s.title)}`}>Start this project</Button>
          </div>

          <Link href={`/services/${next.slug}`} className="sp-next" data-reveal>
            <span className="label">Next service · {next.index}</span>
            <span className="sp-next-title">
              {next.title}
              <ArrowUpRight className="sp-next-ico" size={40} strokeWidth={1.4} />
            </span>
          </Link>
        </div>
      </section>

      <style>{`
        .sp-hero { padding: calc(var(--nav-space) + clamp(56px, 8vw, 110px)) 0 clamp(40px, 6vw, 80px); }
        .sp-hero-grid { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: clamp(32px, 5vw, 80px); align-items: center; }
        .sp-hero-copy { display: flex; flex-direction: column; align-items: flex-start; gap: 26px; }
        .sp-crumbs { display: flex; gap: 8px; }
        .sp-crumbs a.chip:hover { color: var(--text); }
        .sp-h1 { font-size: clamp(44px, 6vw, 96px); }
        .sp-actions { display: flex; flex-wrap: wrap; gap: 12px; }
        .sp-hero-card { padding: 20px 22px; }

        .sp-head { display: flex; flex-direction: column; gap: 20px; margin-bottom: clamp(36px, 5vw, 64px); }
        .sp-offers { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
        .sp-offer { display: flex; flex-direction: column; gap: 14px; padding: 28px; min-height: 240px; }
        .sp-offer .h3 { margin-top: auto; }

        .sp-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .sp-stat { display: flex; flex-direction: column; gap: 10px; padding: 24px clamp(16px, 2vw, 28px); border-left: 1px solid var(--line-2); border-top: 1px solid var(--ink); }
        .sp-stat:first-child { border-left: 0; padding-left: 0; }
        .sp-stat-num { font-family: var(--font-display); font-weight: 600; font-size: clamp(56px, 7vw, 104px); line-height: .9; letter-spacing: -.055em; display: flex; align-items: baseline; gap: 4px; }
        .sp-stat-unit { font-size: .42em; letter-spacing: -.02em; }

        .sp-stack .container { margin-bottom: 20px; }

        .sp-proc { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); gap: clamp(32px, 6vw, 96px); align-items: start; }
        .sp-proc-head { display: flex; flex-direction: column; gap: 22px; position: sticky; top: calc(var(--nav-space) + 40px); }
        .sp-steps { display: flex; flex-direction: column; }
        .sp-step { display: grid; grid-template-columns: 72px 1fr; gap: 16px; padding: 32px 0; border-top: 1px solid var(--line-2); }
        .sp-step:first-child { border-top-color: var(--ink); }
        .sp-step:last-child { border-bottom: 1px solid var(--line-2); }
        .sp-step-n { font-family: var(--font-mono); font-weight: 500; font-size: 14px; line-height: 1.9; letter-spacing: .04em; color: var(--red); }
        .sp-step .h3 { margin-bottom: 8px; }

        .sp-cta { display: flex; justify-content: space-between; align-items: center; gap: 32px; padding: clamp(28px, 4vw, 56px); }
        .sp-cta > div { display: flex; flex-direction: column; gap: 12px; max-width: 640px; }
        .sp-next { display: flex; flex-direction: column; gap: 12px; margin-top: clamp(56px, 8vw, 110px); padding-top: 32px; border-top: 1px solid var(--ink); }
        .sp-next-title { display: inline-flex; align-items: center; gap: 16px; font-family: var(--font-display); font-weight: 600; font-size: clamp(40px, 6vw, 88px); letter-spacing: -.05em; line-height: 1; transition: color .4s var(--ease); }
        .sp-next-ico { transition: transform .6s var(--ease); }
        .sp-next:hover .sp-next-title { color: var(--red); }
        .sp-next:hover .sp-next-ico { transform: rotate(45deg); }

        @media (max-width: 1080px) {
          .sp-hero-grid { grid-template-columns: 1fr; }
          .sp-hero-card { max-width: 640px; }
          .sp-offers { grid-template-columns: 1fr 1fr; }
          .sp-proc { grid-template-columns: 1fr; }
          .sp-proc-head { position: static; }
          .sp-cta { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 640px) {
          .sp-offers { grid-template-columns: 1fr; }
          .sp-offer { min-height: 0; }
          .sp-stats { grid-template-columns: 1fr; }
          .sp-stat { border-left: 0; padding-left: 0; border-top: 1px solid var(--line); }
          .sp-step { grid-template-columns: 52px 1fr; }
        }
      `}</style>
    </>
  );
}
