import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import StationHeader from "@/components/ui/StationHeader";
import DecodeText from "@/components/ui/DecodeText";
import AsciiRule from "@/components/ui/AsciiRule";
import StampCta from "@/components/ui/StampCta";

export const metadata: Metadata = {
  title: "Studio Log",
  description:
    "Working notes from spacedrift.in — sealed engagement writeups, published as they clear client review.",
};

export default function LogPage() {
  return (
    <>
      <StationHeader station="LOG" path="/ log ~ studio-log" />

      <section className="section-pad log-hero">
        <div className="wrap log-hero-inner">
          <p className="eyebrow signal">STUDIO LOG</p>
          <h1 data-reveal>
            <DecodeText>Working notes.</DecodeText>
            <br />
            <span className="ink-mute">Published as they clear review.</span>
          </h1>
          <p className="log-lede" data-reveal>
            Entries land here when the engagement is complete, the client has cleared
            what can be shared, and the numbers have been checked twice. Everything
            below has an entry status. Empty status is not on this page.
          </p>
          <AsciiRule label="LOG BEGINS" />
        </div>
        <style>{`
          .log-hero { padding-top: calc(var(--nav-h) + 64px); }
          .log-hero-inner { display: flex; flex-direction: column; gap: 24px; max-width: 900px; }
          .log-lede { font-size: 16px; color: var(--ink-2); max-width: 640px; }
          .ink-mute { color: var(--ink-3); }
        `}</style>
      </section>

      <section className="section-pad hair">
        <div className="wrap">
          <article className="card recessed brackets log-entry" data-reveal>
            <header className="log-entry-head">
              <p className="mono log-num">LOG 001</p>
              <p className="mono log-status">STATUS · SEALED UNTIL Q1</p>
            </header>

            <h2>
              First engagement writeup <span className="ink-mute">— in review</span>
            </h2>
            <p className="log-body">
              The first published entry is being written. Once the client has signed off
              on what can be shared, this card will resolve into a full engagement
              writeup: problem, approach, decisions we didn&apos;t take, measured outcome,
              and what would be different next time.
            </p>

            <ul className="log-manifest mono">
              <li>[·] problem statement <span className="ink-mute">— drafted</span></li>
              <li>[·] approach diagram <span className="ink-mute">— drafted</span></li>
              <li>[·] measured outcome <span className="ink-mute">— under review</span></li>
              <li>[ ] client sign-off <span className="ink-mute">— pending</span></li>
              <li>[ ] publication <span className="ink-mute">— Q1</span></li>
            </ul>

            <footer className="log-entry-foot">
              <span className="mono log-meta">T + PENDING</span>
              <span className="mono log-meta">CATEGORY · MULTIPLE</span>
              <span className="mono log-meta">VISIBILITY · REDACTED</span>
            </footer>
          </article>

          <article className="log-teaser" data-reveal>
            <p className="mono">
              [ ] LOG 002 — reserved.
              &nbsp;&nbsp;
              [ ] LOG 003 — reserved.
              &nbsp;&nbsp;
              [ ] LOG 004 — reserved.
            </p>
          </article>
        </div>

        <style>{`
          .log-entry { display: flex; flex-direction: column; gap: 18px; padding: 32px 30px; }
          .log-entry-head { display: flex; justify-content: space-between; align-items: center; gap: 16px; }
          .log-num { color: var(--signal); font-weight: 700; letter-spacing: 0.16em; }
          .log-status { color: var(--ink-3); font-size: 11px; letter-spacing: 0.18em; }
          .log-entry h2 { font-size: clamp(22px, 3vw, 32px); }
          .log-body { font-size: 15px; color: var(--ink-2); max-width: 640px; }
          .log-manifest {
            list-style: none; display: flex; flex-direction: column; gap: 8px;
            padding: 16px 18px; border: 1px dashed var(--rule-strong);
            background: var(--paper); font-size: 13px;
            color: var(--ink);
          }
          .log-entry-foot {
            display: flex; flex-wrap: wrap; gap: 16px;
            border-top: 1px solid var(--rule); padding-top: 16px;
            font-size: 10.5px; letter-spacing: 0.16em; color: var(--ink-4);
          }
          .log-teaser {
            margin-top: 24px; padding: 20px 22px;
            border: 1px dashed var(--rule-strong);
            font-size: 12px; color: var(--ink-4); letter-spacing: 0.14em;
          }
        `}</style>
      </section>

      <section className="section-pad hair">
        <div className="wrap log-cta">
          <p className="eyebrow signal">TRANSMIT</p>
          <h2 data-reveal>Want to be in the next entry?</h2>
          <p data-reveal>
            Reach out. If we take on your project, and the outcome is worth documenting
            (and you sign off), it lands here.
          </p>
          <div className="log-cta-actions" data-reveal>
            <StampCta href="mailto:spacedrift.contact@gmail.com" variant="signal">
              TRANSMIT NOW <ArrowUpRight size={14} strokeWidth={2} />
            </StampCta>
          </div>
        </div>
        <style>{`
          .log-cta { display: flex; flex-direction: column; gap: 18px; max-width: 720px; }
          .log-cta h2 { font-size: clamp(28px, 4vw, 48px); }
          .log-cta-actions { margin-top: 8px; }
        `}</style>
      </section>
    </>
  );
}
