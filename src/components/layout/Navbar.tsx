"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/services/research-ops", label: "Research Ops" },
  { href: "/services/document-ai", label: "Document AI" },
  { href: "/services/rag-mvp", label: "RAG & MVPs" },
  { href: "/services/data-annotation", label: "Annotation" },
  { href: "/services/web-development", label: "Web" },
  { href: "/log", label: "Log" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const closeMenu = () => setOpen(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href;

  return (
    <>
      <header className={`nav ${scrolled ? "nav-solid" : ""}`}>
        <div className="nav-inner wrap">
          <Link href="/" className="nav-logo" aria-label="spacedrift home">
            <span className="mono">▚ spacedrift.in</span>
          </Link>

          <nav aria-label="Primary" className="nav-links">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`nav-link ${isActive(href) ? "active" : ""}`}
              >
                <span className="mk" aria-hidden>
                  [{isActive(href) ? "×" : " "}]
                </span>
                {label}
              </Link>
            ))}
          </nav>

          <a href="mailto:spacedrift.contact@gmail.com" className="nav-cta mono">
            → Start
          </a>

          <button
            className="nav-burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
          </button>
        </div>
      </header>

      <div
        className="mobile-menu"
        role="dialog"
        aria-hidden={!open}
        data-open={open}
      >
        <ul>
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} onClick={closeMenu}>
                <span className="mk mono" aria-hidden>
                  [{isActive(href) ? "×" : " "}]
                </span>
                {label}
              </Link>
            </li>
          ))}
          <li className="ml-mail">
            <a href="mailto:spacedrift.contact@gmail.com" onClick={closeMenu}>
              → spacedrift.contact@gmail.com
            </a>
          </li>
        </ul>
      </div>

      <style>{`
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 60;
          height: var(--nav-h); display: flex; align-items: center;
          transition: background var(--t-fast), border-color var(--t-fast);
          background: transparent;
          border-bottom: 1px solid transparent;
        }
        .nav-solid {
          background: rgba(244, 241, 234, 0.86);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom-color: var(--rule);
        }
        .nav-inner {
          display: flex; align-items: center; justify-content: space-between;
          gap: 24px;
        }
        .nav-logo {
          font-family: var(--font-mono); font-weight: 600;
          font-size: 13px; letter-spacing: 0.02em; color: var(--ink);
          flex-shrink: 0;
        }
        .nav-links {
          display: flex; align-items: center; gap: 18px;
          margin-left: auto;
        }
        .nav-link {
          font-family: var(--font-mono); font-size: 12px;
          font-weight: 500; letter-spacing: 0.02em;
          color: var(--ink-3);
          padding: 6px 4px;
          display: inline-flex; align-items: center; gap: 4px;
          transition: color var(--t-fast);
        }
        .nav-link .mk { color: var(--ink-4); font-size: 11px; }
        .nav-link:hover { color: var(--ink); }
        .nav-link.active { color: var(--signal); }
        .nav-link.active .mk { color: var(--signal); }
        .nav-cta {
          font-family: var(--font-mono); font-size: 12px;
          padding: 8px 14px; border: 1px solid var(--ink);
          color: var(--ink); background: var(--paper);
          transition: background var(--t-fast), color var(--t-fast);
          margin-left: 12px;
        }
        .nav-cta:hover { background: var(--ink); color: var(--paper); }
        .nav-burger {
          display: none; background: transparent; border: 1px solid var(--rule);
          padding: 8px; color: var(--ink); cursor: pointer;
        }
        .nav-burger:hover { border-color: var(--ink); }
        @media (max-width: 980px) {
          .nav-links, .nav-cta { display: none; }
          .nav-burger { display: inline-flex; }
        }
        .mobile-menu {
          position: fixed; top: var(--nav-h); left: 0; right: 0;
          background: var(--paper);
          border-bottom: 1px solid var(--rule);
          z-index: 55;
          transform: translateY(-8px); opacity: 0; pointer-events: none;
          transition: transform var(--t), opacity var(--t);
        }
        .mobile-menu[data-open="true"] { transform: none; opacity: 1; pointer-events: all; }
        .mobile-menu ul {
          list-style: none; width: 92%; max-width: 1360px;
          margin: 0 auto; padding: 24px 0 32px;
          display: flex; flex-direction: column;
        }
        .mobile-menu li a {
          display: flex; align-items: center; gap: 12px;
          font-family: var(--font-mono); font-size: 22px; font-weight: 600;
          padding: 14px 0; color: var(--ink);
          border-bottom: 1px solid var(--rule);
        }
        .mobile-menu li a:hover { color: var(--signal); }
        .mobile-menu .mk { color: var(--ink-4); font-size: 16px; }
        .ml-mail a {
          font-size: 14px !important; font-weight: 500 !important;
          color: var(--ink-3) !important; border-bottom: 0 !important;
          padding-top: 24px !important;
        }
      `}</style>
    </>
  );
}
