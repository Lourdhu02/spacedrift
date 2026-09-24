import Link from "next/link";
import Button from "@/components/ui/Button";
import HideOnHome from "@/components/layout/HideOnHome";
import { CONTACT_EMAIL, SERVICES } from "@/lib/services";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="ft">
      <div className="container">
        <HideOnHome>
          <div className="ft-top">
            <div className="ft-cta">
              <p className="label label-accent">Next station</p>
              <h2 className="display-2">
                Got a problem <span className="grad-text">worth shipping?</span>
              </h2>
            </div>
            <div className="ft-cta-actions">
              <Button href={`mailto:${CONTACT_EMAIL}`}>Start a project</Button>
              <p className="small">Reply within 24 hours. Fixed scope and price if it fits.</p>
            </div>
          </div>
        </HideOnHome>

        <div className="ft-grid">
          <div className="ft-col">
            <p className="label">Services</p>
            <ul>
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="ft-col">
            <p className="label">Studio</p>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/#process">Process</Link></li>
              <li><Link href="/log">Log</Link></li>
            </ul>
          </div>
          <div className="ft-col">
            <p className="label">Contact</p>
            <ul>
              <li><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
              <li className="muted">Bengaluru, India</li>
              <li className="muted">MSME · est. 2024</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="ft-mark" aria-hidden>
        <span>spacedrift</span>
      </div>

      <div className="container ft-base">
        <span>© {year} spacedrift.in</span>
        <span>Noise → Parse → Model → Ship</span>
      </div>

      <style>{`
        .ft { position: relative; z-index: 1; padding-top: clamp(80px, 11vw, 150px); overflow: hidden; }
        .ft::before {
          content: ""; position: absolute; left: var(--pad); right: var(--pad); top: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--line-2), transparent);
        }
        .ft-top { display: grid; grid-template-columns: 1.4fr 1fr; gap: 40px; align-items: end; padding-bottom: clamp(56px, 7vw, 96px); }
        .ft-cta { display: flex; flex-direction: column; gap: 20px; }
        .ft-cta-actions { display: flex; flex-direction: column; align-items: flex-start; gap: 16px; }
        .ft-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; padding: 40px 0; border-top: 1px solid var(--line); }
        .ft-col { display: flex; flex-direction: column; gap: 18px; }
        .ft-col ul { display: flex; flex-direction: column; gap: 10px; }
        .ft-col a { color: var(--text-2); font-size: 15.5px; transition: color .3s var(--ease); }
        .ft-col a:hover { color: var(--text); }
        .ft-col li.muted { font-size: 15.5px; }
        .ft-mark {
          display: flex; justify-content: center;
          font-family: var(--font-display); font-weight: 700;
          font-size: 20vw; line-height: .78; letter-spacing: -0.05em;
          margin-top: 24px; margin-bottom: -2.2vw;
          user-select: none; white-space: nowrap;
        }
        .ft-mark span {
          background: linear-gradient(180deg, rgba(255,255,255,.16), rgba(255,255,255,0) 85%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .ft-base {
          position: relative; display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap;
          padding-block: 22px; border-top: 1px solid var(--line);
          font-family: var(--font-mono); font-size: 12px; letter-spacing: .06em; color: var(--text-3);
        }
        @media (max-width: 860px) {
          .ft-top { grid-template-columns: 1fr; }
          .ft-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 520px) { .ft-grid { grid-template-columns: 1fr; } }
      `}</style>
    </footer>
  );
}
