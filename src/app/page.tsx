import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import StationHeader from "@/components/ui/StationHeader";
import DecodeText from "@/components/ui/DecodeText";
import AsciiBar from "@/components/ui/AsciiBar";
import AsciiRule from "@/components/ui/AsciiRule";
import StoryBeat from "@/components/ui/StoryBeat";
import StampCta from "@/components/ui/StampCta";
import ServiceCard from "@/components/services/ServiceCard";
import ContactForm from "@/components/ui/ContactForm";

const SERVICES = [
  {
    num: "01",
    station: "PARSE",
    title: "Research Ops for Academia",
    href: "/services/research-ops",
    desc: "Reproducible experiment pipelines, dataset curation, baseline replication, and publication support for PhD scholars and academic labs.",
  },
  {
    num: "02",
    station: "PARSE",
    title: "Document AI & OCR",
    href: "/services/document-ai",
    desc: "Custom OCR and extraction pipelines for invoices, receipts, IDs, forms, and Indian-language scripts. Validated to agreed accuracy targets.",
  },
  {
    num: "03",
    station: "MODEL",
    title: "RAG & Agentic AI MVPs",
    href: "/services/rag-mvp",
    desc: "Internal knowledge-base chatbots, retrieval-augmented generation systems, and small agentic workflows. Fixed scope, three weeks, working product.",
  },
  {
    num: "04",
    station: "PARSE",
    title: "Data Annotation",
    href: "/services/data-annotation",
    desc: "Labeled datasets for vision, NLP, and audio — with QA protocols, inter-annotator agreement, and an audit trail on every span.",
  },
  {
    num: "05",
    station: "SHIP",
    title: "Web Development",
    href: "/services/web-development",
    desc: "Production websites and marketing sites built for performance and clarity. Next.js, real accessibility, real Lighthouse scores.",
  },
];

const APPROACH = [
  { num: "01", station: "NOISE", title: "Discovery call",  desc: "You explain the requirement, deadline, data, constraints. We ask practical questions and decide whether the work fits fixed-scope delivery." },
  { num: "02", station: "PARSE", title: "Scope & proposal", desc: "Within 24 hours, you receive a fixed-price proposal with deliverables, milestones, assumptions, exclusions. The quoted price is the working boundary." },
  { num: "03", station: "MODEL", title: "Build & review",   desc: "We build against the agreed scope and share regular preview links or sample outputs. Feedback is handled inside milestones, not saved for the end." },
  { num: "04", station: "SHIP",  title: "Deliver & support", desc: "Final delivery: source code, documentation, and a handoff session where relevant. Post-delivery support included for 30 days." },
];

export default function HomePage() {
  return (
    <>
      <StationHeader station="NOISE" path="/ home ~ transmission-open" />

      {/* ── HERO · NOISE ────────────────────────────────────────── */}
      <section className="hero section-pad">
        <div className="wrap hero-inner">
          <StoryBeat current="NOISE" suffix="acquiring signal" />
          <h1 className="hero-h1" data-reveal>
            <span className="hero-line">We build useful ML,</span>
            <br />
            <span className="hero-line">AI &amp; web <span className="signal-ink">systems</span></span>
            <br />
            <span className="hero-line hero-line-mute">out of the noise.</span>
          </h1>

          <div className="hero-body">
            <p data-reveal>
              spacedrift.in is a boutique ML &amp; AI services studio in Bengaluru.
              We ship fixed-scope research ops, document AI, RAG MVPs, data annotation,
              and web development — moving your project through four stations:
              <span className="mono signal-ink"> noise → parse → model → ship</span>.
            </p>

            <ul className="hero-meta mono" data-reveal>
              <li><span className="mk">◐</span> Bengaluru, IN</li>
              <li><span className="mk">◐</span> 5 core services</li>
              <li><span className="mk">◐</span> 24h response</li>
              <li><span className="mk">◐</span> MSME · reg. 2024</li>
            </ul>

            <div className="hero-cta" data-reveal>
              <StampCta href="mailto:spacedrift.contact@gmail.com" variant="signal">
                START A PROJECT <ArrowUpRight size={14} strokeWidth={2} />
              </StampCta>
              <StampCta href="/about" ghost>
                READ THE MANIFEST <ArrowUpRight size={14} strokeWidth={2} />
              </StampCta>
            </div>
          </div>

          <AsciiRule label="STATION 01 OPEN" />
        </div>

        <style>{`
          .hero { min-height: calc(100dvh - var(--nav-h)); display: flex; align-items: flex-end; padding-top: calc(var(--nav-h) + 64px); }
          .hero-inner { display: flex; flex-direction: column; gap: 48px; }
          .hero-h1 { color: var(--ink); }
          .hero-line { display: inline; }
          .hero-line-mute { color: var(--ink-3); }
          .signal-ink { color: var(--signal); }
          .hero-body { display: flex; flex-direction: column; gap: 28px; max-width: 720px; }
          .hero-body p { font-size: 17px; line-height: 1.7; color: var(--ink-2); }
          .hero-meta {
            display: flex; flex-wrap: wrap; gap: 22px;
            font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase;
            color: var(--ink-3);
          }
          .hero-meta li { list-style: none; display: inline-flex; align-items: center; gap: 6px; }
          .hero-meta .mk { color: var(--signal); }
          .hero-cta { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 8px; }
        `}</style>
      </section>

      {/* ── PARSE · services ───────────────────────────────────── */}
      <section className="section-pad hair" id="parse">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <StoryBeat current="PARSE" suffix="resolving structure" />
            <h2>
              <DecodeText>Five stations.</DecodeText>
              <br />
              <span className="ink-mute">Clear deliverables.</span>
            </h2>
            <p>
              We take on work where the output can be defined, built, tested, and handed over.
              No open-ended retainers, no vague transformation work, no generalist agency layers.
            </p>
          </div>

          <div className="grid-svc">
            {SERVICES.map((s) => (
              <ServiceCard key={s.num} {...s} />
            ))}

            <div className="card recessed brackets svc-why" data-reveal>
              <div>
                <span className="mono eyebrow signal">WHY US</span>
                <h3>Direct access. No middlemen.</h3>
                <p>
                  You work directly with the engineer building your project. No account managers,
                  outsourcing chains, or handoff gaps. Decisions land faster, requirements stay
                  clearer, and delivery is easier to verify.
                </p>
              </div>
              <p className="mono svc-why-quote">▚ &nbsp;fixed scope · fixed price · direct engineering ownership</p>
            </div>
          </div>
        </div>

        <style>{`
          .ink-mute { color: var(--ink-3); }
          .grid-svc {
            display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;
            margin-top: 12px;
          }
          .svc-why {
            grid-column: span 3;
            display: flex; justify-content: space-between; align-items: flex-end;
            gap: 40px;
          }
          .svc-why h3 { margin: 12px 0 10px; }
          .svc-why p { max-width: 560px; }
          .svc-why-quote {
            font-size: 11.5px; letter-spacing: 0.16em; text-transform: uppercase;
            color: var(--signal); align-self: flex-end; text-align: right;
            max-width: 260px; line-height: 1.6;
          }
          @media (max-width: 980px) {
            .grid-svc { grid-template-columns: repeat(2, 1fr); }
            .svc-why { grid-column: span 2; flex-direction: column; align-items: flex-start; }
            .svc-why-quote { text-align: left; max-width: none; }
          }
          @media (max-width: 620px) {
            .grid-svc { grid-template-columns: 1fr; }
            .svc-why { grid-column: span 1; }
          }
        `}</style>
      </section>

      {/* ── MODEL · approach + stats ───────────────────────────── */}
      <section className="section-pad hair" id="model">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <StoryBeat current="MODEL" suffix="fitting your problem" />
            <h2>How we work.</h2>
            <p>
              Every engagement starts with a written scope and ends with a usable handoff.
              You know what is included, what is not, and when each milestone is due.
            </p>
          </div>

          <div className="approach-grid">
            <div className="approach-list">
              {APPROACH.map((a) => (
                <div className="approach-item" key={a.num} data-reveal>
                  <div className="approach-num">{a.num}</div>
                  <div>
                    <p className="mono approach-station">→ {a.station}</p>
                    <h4>{a.title}</h4>
                    <p>{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <aside className="stats card well brackets" data-reveal>
              <p className="mono eyebrow">SYSTEM READOUT · LIVE</p>
              <AsciiBar value={100} label="24h Response window" suffix="%" />
              <AsciiBar value={90}  label="5–10d Median web delivery" suffix="%" />
              <AsciiBar value={97}  label="97% Document-AI accuracy floor" suffix="%" />
              <AsciiBar value={0}   label="0% Vendor lock-in on delivered work" suffix="%" />
              <p className="mono stats-note">
                ↳ metrics track internal targets; not marketing gloss.
              </p>
            </aside>
          </div>
        </div>

        <style>{`
          .approach-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 40px; align-items: start; }
          .approach-list { display: flex; flex-direction: column; }
          .approach-item {
            display: grid; grid-template-columns: 60px 1fr; gap: 20px;
            padding: 28px 0; border-top: 1px solid var(--rule);
          }
          .approach-item:last-child { border-bottom: 1px solid var(--rule); }
          .approach-num {
            font-family: var(--font-mono); font-weight: 700; font-size: 26px;
            color: var(--signal);
          }
          .approach-station {
            font-size: 10.5px; letter-spacing: 0.18em;
            color: var(--ink-4); margin-bottom: 4px;
          }
          .approach-item h4 { margin-bottom: 6px; }
          .approach-item p { font-size: 14px; }
          .stats { position: sticky; top: calc(var(--nav-h) + 20px); }
          .stats-note {
            margin-top: 20px; font-size: 10.5px; letter-spacing: 0.14em;
            text-transform: uppercase; color: var(--ink-4);
          }
          @media (max-width: 920px) {
            .approach-grid { grid-template-columns: 1fr; }
            .stats { position: static; }
          }
        `}</style>
      </section>

      {/* ── SHIP · CTA + form ──────────────────────────────────── */}
      <section className="section-pad hair" id="ship">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <StoryBeat current="SHIP" suffix="payload committed" />
            <h2>
              <DecodeText>Have a project?</DecodeText>
              <br />
              <span className="ink-mute">Transmit the details.</span>
            </h2>
            <p>
              Tell us what you need. We respond within 24 hours with a clear scope,
              timeline, and fixed price if the project is a fit. No sales pitch.
            </p>
          </div>

          <div className="ship-grid">
            <ContactForm />

            <aside className="ship-side card recessed brackets" data-reveal>
              <p className="mono eyebrow signal">TRANSMISSION FIELD</p>
              <h4 className="ship-side-h">What to include</h4>
              <ul className="ship-checklist">
                <li><span className="mono">[✓]</span> the problem in one paragraph</li>
                <li><span className="mono">[✓]</span> data — what exists, where it lives</li>
                <li><span className="mono">[✓]</span> a rough deadline or milestone</li>
                <li><span className="mono">[✓]</span> constraints (budget range, hosting, compliance)</li>
                <li><span className="mono">[·]</span> optional: links, screenshots, sample docs</li>
              </ul>
              <AsciiRule label="END OF FORM" glyph="─" />
              <Link href="/log" className="mono ship-side-log">
                → open studio log
              </Link>
            </aside>
          </div>
        </div>

        <style>{`
          .ship-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 40px; align-items: start; }
          .ship-side { display: flex; flex-direction: column; gap: 14px; }
          .ship-side-h { margin-top: 4px; }
          .ship-checklist {
            list-style: none; display: flex; flex-direction: column; gap: 10px;
            font-size: 14px; color: var(--ink-2);
          }
          .ship-checklist .mono { color: var(--signal); margin-right: 8px; }
          .ship-side-log {
            font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase;
            color: var(--ink); border-bottom: 1px solid var(--ink);
            padding-bottom: 4px; align-self: flex-start;
          }
          .ship-side-log:hover { color: var(--signal); border-color: var(--signal); }
          @media (max-width: 920px) {
            .ship-grid { grid-template-columns: 1fr; }
          }
        `}</style>
      </section>
    </>
  );
}
