"use client";

import Link from "next/link";
import { Instagram, ArrowUpRight } from "lucide-react";
import React from "react";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services/ml-projects", label: "ML Projects" },
  { href: "/services/websites", label: "Websites" },
  { href: "/services/ai-audit", label: "AI Audit" },
  { href: "/services/streamlit-apps", label: "Streamlit Apps" },
  { href: "/services/data-annotation", label: "Data Annotation" },
];

const WhatsAppIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.29l3-.01a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export default function Footer() {
  return (
    <footer
      style={{ background: "var(--bg)", borderTop: "1px solid var(--line)" }}
    >
      {/* ── Main grid ── */}
      <div className="footer-main">
        {/* Col 1 — Brand */}
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            LOURDU
            <span
              style={{
                WebkitTextStroke: "1.5px var(--ink)",
                color: "transparent",
              }}
            >
              .AI
            </span>
          </Link>
          <p className="footer-tagline">
            ML Engineer · AI Freelancer
            <br />
            Bengaluru, India
          </p>
          <Link href="/contact" className="footer-cta">
            Start a Project <ArrowUpRight size={13} strokeWidth={2} />
          </Link>
        </div>

        {/* Col 2 — Pages */}
        <div className="footer-col">
          <p className="footer-col-label">Pages</p>
          <ul>
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="footer-link">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Services */}
        <div className="footer-col">
          <p className="footer-col-label">Services</p>
          <ul>
            {serviceLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="footer-link">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Connect */}
        <div className="footer-col">
          <p className="footer-col-label">Connect</p>
          <ul>
            <li>
              <Link
                href="https://instagram.com/lourdu_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link footer-social"
              >
                <Instagram size={13} strokeWidth={1.5} />
                @lourdu_ai
              </Link>
            </li>
            <li>
              <Link
                href="https://wa.me/919959594460"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link footer-social"
              >
                <WhatsAppIcon />
                +91 99595 94460
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <span>{`© ${new Date().getFullYear()} LOURDU.AI — All rights reserved.`}</span>
        <span>lourduai.com · Bengaluru, Karnataka, India</span>
      </div>

      <style>{`
        /* ── Layout ── */
        .footer-main {
          width: 95%;
          max-width: 1800px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr 1fr;
          gap: 0;
          border-bottom: 1px solid var(--line);
        }
        .footer-brand {
          padding: 52px 48px 52px 0;
          border-right: 1px solid var(--line);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .footer-col {
          padding: 52px 0 52px 40px;
          border-right: 1px solid var(--line);
        }
        .footer-col:last-child { border-right: none; }

        /* ── Brand ── */
        .footer-logo {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 22px;
          letter-spacing: -0.05em;
          color: var(--ink);
          display: inline-block;
        }
        .footer-tagline {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ink-3);
          line-height: 1.9;
        }
        .footer-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 10.5px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 10px 20px;
          background: var(--ink);
          color: var(--bg);
          transition: opacity var(--t-fast);
          align-self: flex-start;
          margin-top: 8px;
        }
        .footer-cta:hover { opacity: 0.82; }

        /* ── Col label ── */
        .footer-col-label {
          font-family: var(--font-mono);
          font-size: 9.5px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--ink-3);
          margin-bottom: 20px;
        }
        .footer-col ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        /* ── Links ── */
        .footer-link {
          font-family: var(--font-body);
          font-size: 13.5px;
          color: var(--ink-2);
          display: block;
          padding: 6px 0;
          border-bottom: 1px solid var(--line);
          transition: color var(--t-fast);
        }
        .footer-link:hover { color: var(--ink); }
        .footer-social {
          display: flex !important;
          align-items: center;
          gap: 8px;
        }

        /* ── Bottom bar ── */
        .footer-bottom {
          width: 95%;
          max-width: 1800px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 0;
          flex-wrap: wrap;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          color: var(--ink-3);
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .footer-main {
            grid-template-columns: 1fr 1fr;
          }
          .footer-brand {
            padding: 40px 40px 40px 0;
            border-bottom: 1px solid var(--line);
          }
          .footer-col {
            padding: 40px 0 40px 40px;
            border-bottom: 1px solid var(--line);
          }
          .footer-col:nth-child(2) { border-right: none; }
          .footer-col:nth-child(3) { border-right: 1px solid var(--line); }
          .footer-col:last-child   { border-right: none; border-bottom: none; }
          .footer-brand            { grid-column: span 2; border-right: none; }
        }

        @media (max-width: 640px) {
          .footer-main {
            grid-template-columns: 1fr;
          }
          .footer-brand {
            grid-column: span 1;
            padding: 36px 0;
            border-right: none;
          }
          .footer-col {
            padding: 32px 0;
            border-right: none;
            border-bottom: 1px solid var(--line);
          }
          .footer-col:last-child { border-bottom: none; }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}
