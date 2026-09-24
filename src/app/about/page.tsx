import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import StationHeader from "@/components/ui/StationHeader";
import DecodeText from "@/components/ui/DecodeText";
import AsciiRule from "@/components/ui/AsciiRule";
import StampCta from "@/components/ui/StampCta";

export const metadata: Metadata = {
  title: "About",
  description:
    "spacedrift.in is a boutique ML & AI services studio run by Lourdu Raju, a Machine Learning Engineer, out of Bengaluru. Fixed-scope, direct engineering ownership.",
};

const PRINCIPLES = [
  { n: "01", title: "Quality over volume",     body: "We limit active projects because this is a boutique studio, not a delivery factory. Every accepted engagement gets direct engineering attention. We decline work when the timeline, data, or scope isn't realistic." },
  { n: "02", title: "Written scope, always",   body: "We quote fixed pricing upfront with deliverables, milestones, assumptions, exclusions. You see progress without chasing for updates. If something changes the delivery risk, you hear about it early." },
  { n: "03", title: "Full ownership on exit",  body: "Everything we build for you belongs to you. Source code, datasets, assets, documentation are handed over. We avoid platform lock-in and unnecessary recurring dependencies." },
  { n: "04", title: "Speed without shortcuts", body: "Fast delivery comes from tight scope, prepared inputs, fewer handoffs. We don't compress review, testing, or documentation just to make a deadline look good." },
  { n: "05", title: "Direct signal",           body: "You talk to the person doing the work. That makes technical decisions faster and keeps context from getting diluted between meetings." },
];

const DIFFERENCES = [
  { title: "Direct engineer access", body: "You work with the engineer responsible for the build. Questions are answered with implementation context, not passed through a coordination layer." },
  { title: "Fixed pricing, always",  body: "We quote a fixed price before work begins. No hourly billing surprises and no scope-creep invoices. Changes are re-scoped separately before they start." },
  { title: "Fewer projects, more focus", body: "We cap active work because the studio runs alongside a full-time engineering role. Your project is accepted only when we can give it proper attention." },
  { title: "Zero lock-in", body: "Every deliverable is fully yours: source code, documentation, assets, agreed data outputs. We deploy to your accounts wherever possible." },
  { title: "30-day support included", body: "Post-delivery support for bug fixes, small adjustments, and handoff questions for 30 days. Part of the fixed scope, not an upsell." },
];

export default function AboutPage() {
  return (
    <>
      <StationHeader station="ABOUT" path="/ about ~ operator-log" />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="section-pad about-hero">
        <div className="wrap about-hero-inner">
          <p className="eyebrow signal">OPERATOR&apos;S LOG · ENTRY 00</p>
          <h1 data-reveal>
            <span className="ink-mute">A studio for</span>
            <br />
            <DecodeText>small ML systems</DecodeText>
            <br />
            <span className="ink-mute">that need to</span> <span className="signal-ink">actually ship.</span>
          </h1>
          <p className="about-lede" data-reveal>
            spacedrift.in is a Bengaluru-based ML &amp; AI services studio run by
            <span className="mono"> Lourdu Raju</span>, a Machine Learning Engineer.
            We deliver fixed-scope research ops, document AI, RAG MVPs, data annotation,
            and web development for teams that need practical output — not a long
            agency engagement.
          </p>
          <AsciiRule label="LOG BEGINS" />
        </div>

        <style>{`
          .about-hero { padding-top: calc(var(--nav-h) + 72px); }
          .about-hero-inner { display: flex; flex-direction: column; gap: 32px; max-width: 900px; }
          .ink-mute { color: var(--ink-3); }
          .signal-ink { color: var(--signal); }
          .about-lede { font-size: 17px; color: var(--ink-2); line-height: 1.75; max-width: 720px; }
        `}</style>
      </section>

      {/* ── STORY ──────────────────────────────────────────────── */}
      <section className="section-pad hair">
        <div className="wrap story-grid">
          <div className="sticky-col" data-reveal>
            <p className="eyebrow signal">01 · WHY IT EXISTS</p>
            <h2>Small AI projects need <br /><span className="ink-mute">engineering discipline,</span><br />not agency ceremony.</h2>
          </div>
          <div className="story-col">
            <p data-reveal>
              <strong>Academic researchers need reproducible experiments. Startups need
              working AI MVPs. ML teams need labeled data they can audit.</strong> These
              projects fail when scope is loose and ownership is unclear.
            </p>
            <p data-reveal>
              We keep the model intentionally small. spacedrift.in is an established
              MSME operated alongside a full-time engineering role, so we accept fewer
              projects and define each one before work starts. Fixed scope and fixed
              price are how we protect both quality and availability.
            </p>
            <p data-reveal>
              Clients work directly with the person building the work. That means
              requirements, tradeoffs, and delivery questions stay close to the
              implementation. If a request needs an open-ended retainer or a large team,
              we say so instead of pretending otherwise.
            </p>
            <blockquote className="pull" data-reveal>
              <span className="mono signal-ink">▚ manifest</span>
              <p>Fixed scope. Fixed price. Direct engineering ownership.</p>
            </blockquote>
          </div>
        </div>

        <style>{`
          .story-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 60px; align-items: start; }
          .sticky-col { position: sticky; top: calc(var(--nav-h) + 24px); display: flex; flex-direction: column; gap: 14px; }
          .story-col { display: flex; flex-direction: column; gap: 22px; }
          .story-col p { font-size: 16px; }
          .story-col strong { color: var(--ink); font-weight: 600; }
          .pull {
            border-left: 3px solid var(--signal);
            padding: 20px 24px;
            background: var(--paper-2);
            display: flex; flex-direction: column; gap: 8px;
          }
          .pull .mono { font-size: 10.5px; letter-spacing: 0.18em; text-transform: uppercase; }
          .pull p { font-family: var(--font-mono); font-size: 17px; color: var(--ink); font-weight: 600; }
          @media (max-width: 900px) {
            .story-grid { grid-template-columns: 1fr; gap: 32px; }
            .sticky-col { position: static; }
          }
        `}</style>
      </section>

      {/* ── PRINCIPLES ─────────────────────────────────────────── */}
      <section className="section-pad hair">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <p className="eyebrow signal">02 · PRINCIPLES</p>
            <h2>What drives every decision.</h2>
          </div>
          <div className="prin-grid">
            {PRINCIPLES.map((p) => (
              <div className="card brackets prin" key={p.n} data-reveal>
                <p className="mono prin-num">{p.n} / 05</p>
                <h4>{p.title}</h4>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .prin-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
          .prin { display: flex; flex-direction: column; gap: 10px; min-height: 220px; }
          .prin-num {
            font-size: 10.5px; letter-spacing: 0.18em;
            color: var(--signal); text-transform: uppercase;
          }
          .prin h4 { color: var(--ink); }
          @media (max-width: 900px) { .prin-grid { grid-template-columns: 1fr 1fr; } }
          @media (max-width: 560px) { .prin-grid { grid-template-columns: 1fr; } }
        `}</style>
      </section>

      {/* ── INFO STRIP ─────────────────────────────────────────── */}
      <section className="section-pad-sm hair">
        <div className="wrap">
          <div className="info-strip">
            <Info label="Location" value="Bengaluru, IN" />
            <Info label="Founded" value="2024" />
            <Info label="Response" value="within 24h" />
            <Info label="Contact" value="spacedrift.contact@gmail.com" href="mailto:spacedrift.contact@gmail.com" />
          </div>
        </div>
        <style>{`
          .info-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--rule); border: 1px solid var(--rule); }
          @media (max-width: 720px) { .info-strip { grid-template-columns: 1fr 1fr; } }
          @media (max-width: 420px) { .info-strip { grid-template-columns: 1fr; } }
        `}</style>
      </section>

      {/* ── DIFFERENCES ────────────────────────────────────────── */}
      <section className="section-pad hair">
        <div className="wrap diff-grid">
          <div className="sticky-col" data-reveal>
            <p className="eyebrow signal">03 · DIFFERENCE</p>
            <h2>How we are different.</h2>
            <p className="diff-lede">
              Most agencies are built for volume and retainers. spacedrift.in is
              built for small, well-defined ML, AI, and web deliverables.
            </p>
          </div>
          <ul className="diff-list">
            {DIFFERENCES.map((d, i) => (
              <li className="diff-item" key={d.title} data-reveal>
                <span className="diff-num mono">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h4>{d.title}</h4>
                  <p>{d.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <style>{`
          .diff-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 60px; align-items: start; }
          .diff-lede { font-size: 15px; color: var(--ink-3); margin-top: 14px; max-width: 420px; }
          .diff-list { list-style: none; display: flex; flex-direction: column; }
          .diff-item {
            display: grid; grid-template-columns: 48px 1fr; gap: 20px;
            padding: 26px 0; border-top: 1px solid var(--rule);
          }
          .diff-item:last-child { border-bottom: 1px solid var(--rule); }
          .diff-num { color: var(--signal); font-weight: 700; font-size: 18px; }
          .diff-item h4 { margin-bottom: 6px; }
          .diff-item p { font-size: 14px; }
          @media (max-width: 900px) {
            .diff-grid { grid-template-columns: 1fr; gap: 32px; }
            .sticky-col { position: static; }
          }
        `}</style>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="section-pad hair">
        <div className="wrap about-cta">
          <p className="eyebrow signal">04 · TRANSMIT</p>
          <h2 data-reveal>Let&apos;s work together.</h2>
          <p data-reveal>
            Have a project in mind? Reach out and we&apos;ll respond within 24 hours
            with a clear scope, timeline, and fixed price if it fits. No sales pitch.
          </p>
          <div className="about-cta-actions" data-reveal>
            <StampCta href="mailto:spacedrift.contact@gmail.com" variant="signal">
              TRANSMIT NOW <ArrowUpRight size={14} strokeWidth={2} />
            </StampCta>
            <StampCta href="/" ghost>
              BACK TO STATION 01 <ArrowUpRight size={14} strokeWidth={2} />
            </StampCta>
          </div>
        </div>
        <style>{`
          .about-cta { display: flex; flex-direction: column; gap: 20px; max-width: 720px; }
          .about-cta h2 { font-size: clamp(30px, 4.5vw, 56px); }
          .about-cta-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 12px; }
        `}</style>
      </section>
    </>
  );
}

function Info({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="info-cell">
      <p className="mono info-label">{label}</p>
      <p className="mono info-val">
        {href ? <a href={href}>{value}</a> : value}
      </p>
      <style>{`
        .info-cell { background: var(--paper); padding: 28px 22px; }
        .info-label {
          font-size: 10.5px; letter-spacing: 0.18em;
          color: var(--ink-4); text-transform: uppercase; margin-bottom: 10px;
        }
        .info-val { font-size: 16px; color: var(--ink); font-weight: 600; }
        .info-val a { color: var(--signal); }
        .info-val a:hover { color: var(--signal-2); }
      `}</style>
    </div>
  );
}
