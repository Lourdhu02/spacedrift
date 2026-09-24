"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { CONTACT_EMAIL, SERVICES } from "@/lib/services";

const LINKS = [
  { href: "/#process", label: "Process" },
  { href: "/log", label: "Log" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const toggle = (next: boolean) => {
    setOpen(next);
    const lenis = window.__lenis;
    if (next) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = next ? "hidden" : "";
  };

  const onService = pathname.startsWith("/services");

  return (
    <>
      <header className="nav">
        <div className="nav-pill">
          <div className="nav-glass glass" aria-hidden />

          <Link href="/" className="nav-logo" onClick={() => toggle(false)} aria-label="spacedrift home">
            <Mark />
            <span>spacedrift</span>
          </Link>

          <nav className="nav-links" aria-label="Primary">
            <div className="nav-dd">
              <button className={`nav-link${onService ? " on" : ""}`} aria-haspopup="true">
                <span data-scramble>Services</span>
                <ChevronDown size={14} strokeWidth={2} className="nav-chev" />
              </button>
              <div className="dd-panel">
                <div className="dd-inner glass glass-strong">
                  {SERVICES.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className={`dd-item${pathname === `/services/${s.slug}` ? " on" : ""}`}
                      onClick={(e) => e.currentTarget.blur()}
                    >
                      <span className="label">{s.index}</span>
                      <span className="dd-text">
                        <span className="dd-title">{s.title}</span>
                        <span className="dd-desc">{s.short}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={`nav-link${pathname === l.href ? " on" : ""}`}>
                <span data-scramble>{l.label}</span>
              </Link>
            ))}
          </nav>

          <div className="nav-cta">
            <Button href={`mailto:${CONTACT_EMAIL}`} size="sm">
              Start a project
            </Button>
          </div>

          <button
            className="nav-burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => toggle(!open)}
          >
            <span className={open ? "x" : ""} />
          </button>
        </div>
      </header>

      <div className={`mnav${open ? " open" : ""}`} aria-hidden={!open}>
        <div className="mnav-inner container">
          <p className="label">Services</p>
          <ul>
            {SERVICES.map((s, i) => (
              <li key={s.slug} style={{ ["--i" as string]: i }}>
                <Link href={`/services/${s.slug}`} onClick={() => toggle(false)} tabIndex={open ? 0 : -1}>
                  <span className="label">{s.index}</span>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
          <p className="label">Studio</p>
          <ul>
            {LINKS.map((l, i) => (
              <li key={l.href} style={{ ["--i" as string]: i + SERVICES.length }}>
                <Link href={l.href} onClick={() => toggle(false)} tabIndex={open ? 0 : -1}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a className="mnav-mail" href={`mailto:${CONTACT_EMAIL}`} tabIndex={open ? 0 : -1}>
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>

      <style>{`
        .nav {
          position: fixed; top: var(--nav-top); left: 0; right: 0; z-index: 100;
          padding-inline: var(--pad); pointer-events: none;
        }
        .nav-pill {
          position: relative; pointer-events: auto;
          max-width: 1180px; height: var(--nav-h); margin: 0 auto;
          display: flex; align-items: center; gap: 12px;
          padding: 0 9px 0 20px;
        }
        /* frost lives on a sibling layer so the dropdown isn't trapped inside its backdrop */
        .nav-glass {
          position: absolute; inset: 0; z-index: -1;
          background: rgba(255,255,255,.93);
          -webkit-backdrop-filter: blur(18px) saturate(160%); backdrop-filter: blur(18px) saturate(160%);
          box-shadow: inset 0 0 0 1px var(--line-2);
        }
        .nav-glass::before { display: none; }
        .nav-logo { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-display); font-weight: 600; font-size: 18px; letter-spacing: -0.04em; margin-right: auto; }
        .nav-logo svg { transition: transform .6s var(--ease); }
        .nav-logo:hover svg { transform: translateX(3px); }
        .nav-links { display: flex; align-items: center; gap: 0; height: 100%; }
        .nav-link {
          position: relative; display: inline-flex; align-items: center; gap: 6px;
          height: 100%; padding: 0 16px;
          font-size: 14.5px; font-weight: 500; color: var(--text-2);
          transition: color .3s var(--ease);
        }
        .nav-link::after {
          content: ""; position: absolute; left: 16px; right: 16px; bottom: 14px; height: 1.5px;
          background: var(--red); transform: scaleX(0); transform-origin: 0 50%;
          transition: transform .45s var(--ease);
        }
        .nav-link:hover, .nav-dd:focus-within > .nav-link, .nav-dd:hover > .nav-link, .nav-link.on { color: var(--ink); }
        .nav-link:hover::after, .nav-link.on::after, .nav-dd:hover > .nav-link::after { transform: scaleX(1); }
        .nav-chev { transition: transform .4s var(--ease); }
        .nav-dd { position: relative; height: 100%; }
        .nav-dd:hover .nav-chev, .nav-dd:focus-within .nav-chev { transform: rotate(180deg); }
        .dd-panel {
          position: absolute; top: 100%; left: 50%; padding-top: 10px; width: 460px;
          opacity: 0; visibility: hidden; transform: translate(-50%, -8px);
          transition: opacity .3s var(--ease), transform .45s var(--ease), visibility 0s linear .3s;
        }
        .nav-dd:hover .dd-panel, .nav-dd:focus-within .dd-panel {
          opacity: 1; visibility: visible; transform: translate(-50%, 0);
          transition: opacity .3s var(--ease), transform .45s var(--ease), visibility 0s;
        }
        .dd-inner { display: flex; flex-direction: column; background: #fff; box-shadow: inset 0 0 0 1px var(--ink), 8px 8px 0 rgba(10,10,10,.06); }
        .dd-item {
          position: relative; display: flex; gap: 16px; padding: 16px 18px;
          border-top: 1px solid var(--line);
          transition: background-color .3s var(--ease);
        }
        .dd-item:first-child { border-top: 0; }
        .dd-item::before {
          content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--red);
          transform: scaleY(0); transition: transform .4s var(--ease);
        }
        .dd-item:hover, .dd-item.on { background: rgba(10,10,10,.035); }
        .dd-item:hover::before, .dd-item.on::before { transform: scaleY(1); }
        .dd-item .label { padding-top: 3px; }
        .dd-text { display: flex; flex-direction: column; gap: 3px; }
        .dd-title { font-size: 15px; font-weight: 560; color: var(--ink); }
        .dd-desc { font-size: 13px; line-height: 1.45; color: var(--text-3); }
        .nav-cta { margin-left: 10px; }
        .nav-burger { display: none; width: 44px; height: 44px; background: var(--ink); position: relative; }
        .nav-burger span, .nav-burger span::before {
          position: absolute; left: 13px; right: 13px; height: 1.5px; background: #fff;
          transition: transform .45s var(--ease);
        }
        .nav-burger span { top: 18px; }
        .nav-burger span::before { content: ""; left: 0; right: 0; top: 7px; }
        .nav-burger span.x { transform: translateY(3.5px) rotate(45deg); }
        .nav-burger span.x::before { transform: translateY(-7px) rotate(-90deg); }

        .mnav {
          position: fixed; inset: 0; z-index: 90;
          padding-top: calc(var(--nav-space) + 28px);
          background: rgba(255,255,255,.97);
          -webkit-backdrop-filter: blur(20px); backdrop-filter: blur(20px);
          opacity: 0; visibility: hidden;
          transition: opacity .45s var(--ease), visibility 0s linear .45s;
          overflow-y: auto;
        }
        .mnav.open { opacity: 1; visibility: visible; transition: opacity .45s var(--ease), visibility 0s; }
        .mnav-inner { display: flex; flex-direction: column; gap: 14px; padding-bottom: 40px; }
        .mnav ul { display: flex; flex-direction: column; margin-bottom: 18px; border-top: 1px solid var(--ink); }
        .mnav li {
          border-bottom: 1px solid var(--line-2);
          opacity: 0; transform: translateY(18px);
          transition: opacity .5s var(--ease), transform .6s var(--ease);
          transition-delay: calc(var(--i) * 45ms);
        }
        .mnav.open li { opacity: 1; transform: none; transition-delay: calc(80ms + var(--i) * 45ms); }
        .mnav li a {
          display: flex; align-items: baseline; gap: 14px; padding: 14px 0;
          font-family: var(--font-display); font-weight: 600; font-size: clamp(28px, 8vw, 40px); letter-spacing: -0.045em;
        }
        .mnav li a:active { color: var(--red); }
        .mnav-mail { color: var(--text-2); font-size: 15px; }

        @media (max-width: 960px) {
          .nav-links, .nav-cta { display: none; }
          .nav-burger { display: inline-block; }
          .nav-pill { padding: 0 8px 0 18px; }
        }
      `}</style>
    </>
  );
}

function Mark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
      <rect x="0" y="5" width="15" height="15" fill="#0a0a0a" />
      <rect x="13" y="0" width="7" height="7" fill="#e10600" />
    </svg>
  );
}
