import { ArrowUpRight } from "lucide-react";
import StationHeader, { type StationKind } from "@/components/ui/StationHeader";
import DecodeText from "@/components/ui/DecodeText";
import AsciiRule from "@/components/ui/AsciiRule";
import AsciiBar from "@/components/ui/AsciiBar";
import StoryBeat, { type Beat } from "@/components/ui/StoryBeat";
import StampCta from "@/components/ui/StampCta";

export type ServiceData = {
  slug: string;
  station: StationKind;   // header label
  beat: Beat;             // where on the arc this service sits
  index: string;          // "01" .. "05"
  title: string;
  subtitle: string;       // signal-red accent
  lede: string[];
  offers: { label: string; title: string; body: string }[];
  metrics: { value: number; label: string; suffix?: string }[];
  stack: string[];
  process: { num: string; title: string; body: string }[];
  ctaTitle: string;
  ctaBody: string;
};

export default function ServiceStation({ data }: { data: ServiceData }) {
  return (
    <>
      <StationHeader station={data.station} path={`/ services / ${data.slug}`} />

      {/* HERO */}
      <section className="section-pad ss-hero">
        <div className="wrap ss-hero-inner">
          <StoryBeat current={data.beat} suffix={`station · ${data.index} / 05`} />
          <h1 data-reveal>
            {data.title}
            <br />
            <span className="signal-ink">
              <DecodeText>{data.subtitle}</DecodeText>
            </span>
          </h1>
          <div className="ss-lede" data-reveal>
            {data.lede.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="ss-cta" data-reveal>
            <StampCta href="mailto:spacedrift.contact@gmail.com" variant="signal">
              START THIS STATION <ArrowUpRight size={14} strokeWidth={2} />
            </StampCta>
            <StampCta href="/#parse" ghost>
              OTHER STATIONS <ArrowUpRight size={14} strokeWidth={2} />
            </StampCta>
          </div>
          <AsciiRule label={`STATION ${data.index} OPEN`} />
        </div>
        <style>{`
          .ss-hero { padding-top: calc(var(--nav-h) + 64px); }
          .ss-hero-inner { display: flex; flex-direction: column; gap: 32px; max-width: 1080px; }
          .signal-ink { color: var(--signal); }
          .ss-lede { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
          .ss-lede p { font-size: 16px; color: var(--ink-2); }
          .ss-cta { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 4px; }
          @media (max-width: 760px) { .ss-lede { grid-template-columns: 1fr; gap: 20px; } }
        `}</style>
      </section>

      {/* OFFERS */}
      <section className="section-pad hair">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <p className="eyebrow signal">WHAT WE BUILD</p>
            <h2>Deliverables, defined.</h2>
            <p>
              Every engagement lists exactly what you receive and what falls outside
              the scope. Below is the working shape of the deliverables at this station.
            </p>
          </div>
          <div className="ss-offers">
            {data.offers.map((o) => (
              <div className="card brackets ss-offer" key={o.title} data-reveal>
                <p className="mono ss-offer-label">▚ {o.label}</p>
                <h4>{o.title}</h4>
                <p>{o.body}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .ss-offers { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
          .ss-offer { display: flex; flex-direction: column; gap: 10px; min-height: 240px; }
          .ss-offer-label { font-size: 10.5px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--signal); }
          @media (max-width: 900px) { .ss-offers { grid-template-columns: 1fr 1fr; } }
          @media (max-width: 620px) { .ss-offers { grid-template-columns: 1fr; } }
        `}</style>
      </section>

      {/* METRICS */}
      <section className="section-pad-sm hair">
        <div className="wrap ss-metrics-wrap">
          <div className="sec-head" data-reveal>
            <p className="eyebrow signal">READOUT</p>
            <h2>Station targets.</h2>
          </div>
          <div className="ss-metrics card well brackets" data-reveal>
            <p className="mono eyebrow">SYSTEM READOUT · TARGETS</p>
            {data.metrics.map((m) => (
              <AsciiBar key={m.label} value={m.value} label={m.label} suffix={m.suffix ?? "%"} />
            ))}
            <p className="mono ss-metric-note">↳ internal targets, not marketing gloss.</p>
          </div>
        </div>
        <style>{`
          .ss-metrics-wrap { display: grid; grid-template-columns: 1fr 1.4fr; gap: 40px; align-items: start; }
          .ss-metrics { display: flex; flex-direction: column; gap: 0; }
          .ss-metric-note {
            font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase;
            color: var(--ink-4); margin-top: 18px;
          }
          @media (max-width: 920px) { .ss-metrics-wrap { grid-template-columns: 1fr; } }
        `}</style>
      </section>

      {/* STACK */}
      <section className="section-pad hair">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <p className="eyebrow signal">STACK</p>
            <h2>Tools we default to.</h2>
            <p>Documented, inspectable, replaceable. No black boxes, no avoidable lock-in.</p>
          </div>
          <ul className="ss-chips" data-reveal>
            {data.stack.map((t) => (
              <li key={t} className="chip mono">[ {t} ]</li>
            ))}
          </ul>
        </div>
        <style>{`
          .ss-chips { list-style: none; display: flex; flex-wrap: wrap; gap: 8px; }
          .chip {
            padding: 10px 14px; border: 1px solid var(--rule);
            background: var(--paper); color: var(--ink-2);
            font-size: 11.5px; letter-spacing: 0.06em;
            transition: border-color var(--t-fast), color var(--t-fast);
          }
          .chip:hover { border-color: var(--ink); color: var(--ink); }
        `}</style>
      </section>

      {/* PROCESS */}
      <section className="section-pad hair">
        <div className="wrap ss-proc-grid">
          <div className="sticky-col" data-reveal>
            <p className="eyebrow signal">PROCESS</p>
            <h2>How the station runs.</h2>
            <p className="ss-proc-lede">
              Each engagement follows the same four beats. We agree what the system
              should do, what it should refuse, and how success is checked — before
              implementation begins.
            </p>
          </div>
          <ol className="ss-proc-list">
            {data.process.map((s) => (
              <li className="ss-proc-item" key={s.num} data-reveal>
                <span className="mono ss-proc-num">{s.num}</span>
                <div>
                  <h4>{s.title}</h4>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <style>{`
          .ss-proc-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 60px; align-items: start; }
          .sticky-col { position: sticky; top: calc(var(--nav-h) + 24px); }
          .ss-proc-lede { font-size: 15px; color: var(--ink-3); margin-top: 14px; max-width: 420px; }
          .ss-proc-list { list-style: none; display: flex; flex-direction: column; }
          .ss-proc-item {
            display: grid; grid-template-columns: 56px 1fr; gap: 20px;
            padding: 28px 0; border-top: 1px solid var(--rule);
          }
          .ss-proc-item:last-child { border-bottom: 1px solid var(--rule); }
          .ss-proc-num { color: var(--signal); font-weight: 700; font-size: 22px; }
          .ss-proc-item h4 { margin-bottom: 6px; }
          .ss-proc-item p { font-size: 14px; }
          @media (max-width: 920px) {
            .ss-proc-grid { grid-template-columns: 1fr; gap: 32px; }
            .sticky-col { position: static; }
          }
        `}</style>
      </section>

      {/* CTA */}
      <section className="section-pad hair">
        <div className="wrap ss-cta-band">
          <p className="eyebrow signal">TRANSMIT</p>
          <h2 data-reveal>{data.ctaTitle}</h2>
          <p data-reveal>{data.ctaBody}</p>
          <div className="ss-cta-actions" data-reveal>
            <StampCta href="mailto:spacedrift.contact@gmail.com" variant="signal">
              TRANSMIT NOW <ArrowUpRight size={14} strokeWidth={2} />
            </StampCta>
            <StampCta href="/#parse" ghost>
              BACK TO STATIONS <ArrowUpRight size={14} strokeWidth={2} />
            </StampCta>
          </div>
        </div>
        <style>{`
          .ss-cta-band { display: flex; flex-direction: column; gap: 20px; max-width: 720px; }
          .ss-cta-band h2 { font-size: clamp(28px, 4vw, 52px); }
          .ss-cta-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 12px; }
        `}</style>
      </section>
    </>
  );
}
