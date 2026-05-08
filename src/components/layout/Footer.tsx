"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--line)" }}>
      <style>{`
        .ft-main {
          width: 90%; max-width: 1400px; margin: 0 auto;
          display: grid; grid-template-columns: 2.5fr 1fr 1fr 1.2fr;
          gap: 48px; padding: 80px 0;
        }
        .ft-brand { display: flex; flex-direction: column; gap: 20px; }
        .ft-logo {
          font-family: var(--font-display); font-weight: 800;
          font-size: 18px; letter-spacing: -0.04em; color: var(--ink);
        }
        .ft-tagline { font-size: 14px; color: var(--ink-3); line-height: 1.7; max-width: 320px; }
        .ft-col-title {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--ink-3); margin-bottom: 20px;
        }
        .ft-col ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .ft-col a {
          font-size: 13px; color: var(--ink-2); transition: color var(--t-fast);
          display: inline-flex; align-items: center; gap: 4px;
        }
        .ft-col a:hover { color: var(--ink); }
        .ft-bottom {
          width: 90%; max-width: 1400px; margin: 0 auto;
          display: flex; justify-content: space-between; align-items: center;
          padding: 24px 0; border-top: 1px solid var(--line);
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.04em; color: var(--ink-3);
        }
        @media (max-width: 768px) {
          .ft-main { grid-template-columns: 1fr 1fr; gap: 40px; }
          .ft-brand { grid-column: span 2; }
          .ft-bottom { flex-direction: column; gap: 8px; align-items: flex-start; }
        }
        @media (max-width: 480px) {
          .ft-main { grid-template-columns: 1fr; }
          .ft-brand { grid-column: span 1; }
        }
      `}</style>

      <div className="ft-main">
        <div className="ft-brand">
          <Link href="/" className="ft-logo">SPACEDRIFT</Link>
          <p className="ft-tagline">Engineering project guidance, production-grade data annotation, and high-performance web development from Bengaluru.</p>
        </div>
        <div className="ft-col">
          <p className="ft-col-title">Services</p>
          <ul>
            <li><Link href="/services/engineering-projects">Engineering Projects</Link></li>
            <li><Link href="/services/data-annotation">Data Annotation</Link></li>
            <li><Link href="/services/web-development">Web Development</Link></li>
          </ul>
        </div>
        <div className="ft-col">
          <p className="ft-col-title">Company</p>
          <ul>
            <li><Link href="/about">About</Link></li>
            <li><a href="mailto:contact@spacedrift.in">Contact</a></li>
          </ul>
        </div>
        <div className="ft-col">
          <p className="ft-col-title">Connect</p>
          <ul>
            <li><a href="mailto:contact@spacedrift.in">contact@spacedrift.in <ArrowUpRight size={11} /></a></li>
            <li><a href="https://instagram.com/spacedrift.in" target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={11} /></a></li>
          </ul>
        </div>
      </div>
      <div className="ft-bottom">
        <span>&copy; {new Date().getFullYear()} SpaceDrift. All rights reserved.</span>
        <span>Bengaluru, India</span>
      </div>
    </footer>
  );
}
