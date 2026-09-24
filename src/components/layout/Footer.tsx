import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * Footer — the closing station-log page. Server component.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="ft">
      <div className="wrap ft-band">
        <div className="ft-marks" aria-hidden>
          <span>END OF TRANSMISSION</span>
          <span className="ft-marks-glyph">
            {"─".repeat(280)}
          </span>
          <span>▚</span>
        </div>
      </div>

      <div className="wrap ft-main">
        <div className="ft-brand">
          <Link href="/" className="ft-logo mono">▚ spacedrift.in</Link>
          <p className="ft-tag">
            Boutique ML &amp; AI services studio. Fixed scope, fixed price, direct
            engineering ownership. Operated out of Bengaluru, India.
          </p>
          <p className="ft-arc mono">NOISE → PARSE → MODEL → SHIP</p>
        </div>

        <div className="ft-col">
          <p className="ft-col-title mono">STATIONS</p>
          <ul>
            <li><Link href="/services/research-ops">Research Ops</Link></li>
            <li><Link href="/services/document-ai">Document AI</Link></li>
            <li><Link href="/services/rag-mvp">RAG &amp; AI MVPs</Link></li>
            <li><Link href="/services/data-annotation">Data Annotation</Link></li>
            <li><Link href="/services/web-development">Web Development</Link></li>
          </ul>
        </div>

        <div className="ft-col">
          <p className="ft-col-title mono">STUDIO</p>
          <ul>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/log">Log</Link></li>
            <li><a href="mailto:spacedrift.contact@gmail.com">Contact</a></li>
          </ul>
        </div>

        <div className="ft-col">
          <p className="ft-col-title mono">TRANSMIT</p>
          <ul>
            <li>
              <a href="mailto:spacedrift.contact@gmail.com" className="ft-mail">
                spacedrift.contact@gmail.com <ArrowUpRight size={12} />
              </a>
            </li>
            <li className="ft-meta">Response · within 24h</li>
            <li className="ft-meta">Location · Bengaluru, IN</li>
          </ul>
        </div>
      </div>

      <div className="wrap ft-base">
        <span>© {year} spacedrift.in · MSME India</span>
        <span className="mono">REV 2.0.0 · BUILT ON PAPER</span>
      </div>

      <style>{`
        .ft {
          position: relative; z-index: 1;
          background: var(--paper);
          border-top: 1px solid var(--rule);
          margin-top: 40px;
        }
        .ft-band { padding: 20px 0 0; overflow: hidden; }
        .ft-marks {
          display: flex; align-items: center; gap: 14px;
          font-family: var(--font-mono); font-size: 10.5px;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--ink-4);
        }
        .ft-marks-glyph {
          flex: 1; overflow: hidden; white-space: nowrap;
          color: var(--ink-4); letter-spacing: 0;
        }
        .ft-main {
          display: grid; grid-template-columns: 2.3fr 1fr 1fr 1.4fr;
          gap: 48px; padding: 60px 0 40px;
        }
        .ft-logo { font-size: 14px; color: var(--ink); }
        .ft-tag { font-size: 14px; color: var(--ink-3); max-width: 360px; margin-top: 14px; }
        .ft-arc {
          margin-top: 22px; font-size: 11px; letter-spacing: 0.24em;
          color: var(--signal); font-weight: 600;
        }
        .ft-col-title {
          font-size: 10.5px; letter-spacing: 0.18em; color: var(--ink-4);
          margin-bottom: 18px;
        }
        .ft-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .ft-col a { font-size: 13px; color: var(--ink-2); }
        .ft-col a:hover { color: var(--ink); }
        .ft-mail { display: inline-flex; align-items: center; gap: 6px; }
        .ft-meta { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-4); font-family: var(--font-mono); }
        .ft-base {
          display: flex; justify-content: space-between; align-items: center;
          padding: 20px 0; border-top: 1px solid var(--rule);
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.1em; color: var(--ink-3);
        }
        @media (max-width: 900px) {
          .ft-main { grid-template-columns: 1fr 1fr; gap: 32px; }
          .ft-brand { grid-column: span 2; }
        }
        @media (max-width: 560px) {
          .ft-main { grid-template-columns: 1fr; }
          .ft-brand { grid-column: span 1; }
          .ft-base { flex-direction: column; gap: 8px; align-items: flex-start; }
        }
      `}</style>
    </footer>
  );
}
