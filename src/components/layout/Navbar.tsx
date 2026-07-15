"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/services/research-ops", label: "Research Ops" },
  { href: "/services/document-ai", label: "Document AI" },
  { href: "/services/rag-mvp", label: "RAG & AI MVPs" },
  { href: "/services/data-annotation", label: "Data Annotation" },
  { href: "/services/web-development", label: "Web Development" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useGSAP(() => {
    gsap.fromTo(navRef.current, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.1 });
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const menu = mobileRef.current;
    if (!menu) return;
    if (open) {
      gsap.fromTo(menu, { clipPath: "inset(0% 0% 100% 0%)", opacity: 0 }, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 0.5, ease: "expo.out", onStart: () => { menu.style.pointerEvents = "all"; } });
      gsap.fromTo(menu.querySelectorAll("li"), { x: -20, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.06, duration: 0.4, ease: "power3.out", delay: 0.15 });
    } else {
      gsap.to(menu, { clipPath: "inset(0% 0% 100% 0%)", opacity: 0, duration: 0.3, ease: "expo.in", onComplete: () => { menu.style.pointerEvents = "none"; } });
    }
  }, [open]);

  return (
    <>
      <style>{`
        .nav-bar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          height: var(--nav-h); display: flex; align-items: center;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-scrolled {
          background: rgba(6, 6, 6, 0.6);
          backdrop-filter: blur(40px) saturate(180%);
          -webkit-backdrop-filter: blur(40px) saturate(180%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .nav-inner {
          width: 90%; max-width: 1400px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
        }
        .nav-logo {
          font-family: var(--font-mono); font-weight: 500;
          font-size: 13px; letter-spacing: 0.06em; color: var(--ink);
        }
        .nav-links { display: flex; align-items: center; gap: 32px; list-style: none; }
        .nav-link {
          font-family: var(--font-body); font-size: 13px; font-weight: 500;
          color: var(--ink-3); transition: color var(--t-fast);
          position: relative; padding: 4px 0;
        }
        .nav-link:hover { color: var(--ink); }
        .nav-link.active { color: var(--ink); }
        .nav-link.active::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          width: 100%; height: 1px; background: var(--accent);
        }
        .nav-cta {
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 10px 20px; border: 1px solid rgba(255,255,255,0.1);
          color: var(--ink-2); transition: all var(--t-fast);
          background: rgba(255,255,255,0.03);
        }
        .nav-cta:hover { border-color: var(--accent); color: var(--accent); background: rgba(37,99,235,0.05); }
        .nav-hamburger { display: none; background: none; border: none; cursor: pointer; color: var(--ink); }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-hamburger { display: flex; }
        }
        .mobile-menu {
          position: fixed; top: var(--nav-h); left: 0; right: 0; bottom: 0; z-index: 999;
          background: rgba(6, 6, 6, 0.85);
          backdrop-filter: blur(40px) saturate(180%);
          -webkit-backdrop-filter: blur(40px) saturate(180%);
          padding: 40px 0;
        }
        .mobile-menu ul { list-style: none; width: 90%; max-width: 1400px; margin: 0 auto; display: flex; flex-direction: column; gap: 0; }
        .mobile-menu li a {
          display: block; font-family: var(--font-display); font-size: 28px; font-weight: 700;
          letter-spacing: -0.03em; padding: 20px 0; color: var(--ink-2);
          border-bottom: 1px solid var(--line); transition: color var(--t-fast), padding-left var(--t-fast);
        }
        .mobile-menu li a:hover { color: var(--ink); padding-left: 12px; }
        .mobile-menu li:last-child a { border-bottom: none; }
      `}</style>

      <header ref={navRef} className={`nav-bar${scrolled ? " nav-scrolled" : ""}`}>
        <div className="nav-inner">
          <Link href="/" className="nav-logo" onClick={() => setOpen(false)}>spacedrift.in</Link>
          <ul className="nav-links">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={`nav-link${pathname === href || pathname.startsWith(href) ? " active" : ""}`}>{label}</Link>
              </li>
            ))}
            <li><a href="mailto:spacedrift.contact@gmail.com" className="nav-cta">Start a Project</a></li>
          </ul>
          <button onClick={() => setOpen(p => !p)} aria-label="Menu" className="nav-hamburger">
            {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      <div ref={mobileRef} className="mobile-menu" style={{ opacity: 0, pointerEvents: "none", clipPath: "inset(0% 0% 100% 0%)" }}>
        <ul>
          {links.map(({ href, label }) => (<li key={href}><Link href={href} onClick={() => setOpen(false)}>{label}</Link></li>))}
          <li><a href="mailto:spacedrift.contact@gmail.com" onClick={() => setOpen(false)}>spacedrift.contact@gmail.com</a></li>
        </ul>
      </div>
    </>
  );
}
