"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X, ChevronDown } from "lucide-react";

gsap.registerPlugin();

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  // { href: "/work", label: "Work" },
  // { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services/ml-projects", label: "ML Engineering", num: "01" },
  { href: "/services/websites", label: "Websites", num: "02" },
  { href: "/services/ai-audit", label: "AI Audit", num: "03" },
  { href: "/services/streamlit-apps", label: "Streamlit / Gradio", num: "04" },
  { href: "/services/data-annotation", label: "Data Annotation", num: "05" },
];

export default function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  // ── Entrance
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.1 });
    tl.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "expo.out" },
    ).fromTo(
      ".nav-link-item, .nav-cta-btn",
      { y: -12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.06 },
      "-=0.7",
    );
  }, []);

  // ── Scroll
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // ── Dropdown animation
  useEffect(() => {
    const el = dropRef.current;
    if (!el) return;
    if (dropOpen) {
      gsap.fromTo(
        el,
        { opacity: 0, y: -8, pointerEvents: "none" },
        {
          opacity: 1,
          y: 0,
          pointerEvents: "all",
          duration: 0.3,
          ease: "power3.out",
          onStart: () => {
            el.style.display = "block";
          },
        },
      );
      gsap.fromTo(
        el.querySelectorAll(".drop-item"),
        { x: -12, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.3,
          ease: "power2.out",
          delay: 0.05,
        },
      );
    } else {
      gsap.to(el, {
        opacity: 0,
        y: -6,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          el.style.display = "none";
          el.style.pointerEvents = "none";
        },
      });
    }
  }, [dropOpen]);

  // ── Mobile menu animation
  useEffect(() => {
    const menu = mobileRef.current;
    if (!menu) return;
    if (open) {
      gsap.fromTo(
        menu,
        { clipPath: "inset(0% 0% 100% 0%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 0.55,
          ease: "expo.out",
          onStart: () => {
            menu.style.pointerEvents = "all";
          },
        },
      );
      gsap.fromTo(
        menu.querySelectorAll(".m-link"),
        { x: -24, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 0.45,
          ease: "power3.out",
          delay: 0.15,
        },
      );
    } else {
      gsap.to(menu, {
        clipPath: "inset(0% 0% 100% 0%)",
        opacity: 0,
        duration: 0.35,
        ease: "expo.in",
        onComplete: () => {
          menu.style.pointerEvents = "none";
        },
      });
    }
  }, [open]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
    setDropOpen(false);
  }, [pathname]);

  return (
    <>
      <style>{`
        /* ── Glass ── */
        .nav-glass {
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(24px) saturate(180%) brightness(1.05);
          -webkit-backdrop-filter: blur(24px) saturate(180%) brightness(1.05);
        }
        .nav-glass::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.2) 100%);
          pointer-events: none; z-index: 0;
        }
        .nav-glass::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.08) 20%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.08) 80%, transparent 100%);
          pointer-events: none;
        }
        .nav-transparent { background: transparent; backdrop-filter: none; -webkit-backdrop-filter: none; }

        /* ── Inner ── */
        .nav-inner {
          position: relative; z-index: 1;
          width: 95%; max-width: 1800px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
        }

        /* ── Desktop ── */
        .nav-desk-group { display: flex; align-items: center; gap: 44px; }
        .nav-desk       { display: flex; align-items: center; gap: 36px; list-style: none; }
        .nav-hamburger  { display: none; }

        @media (max-width: 768px) {
          .nav-desk-group { display: none; }
          .nav-hamburger  { display: flex; }
        }

        /* ── Link ── */
        .nav-link-item {
          font-family: var(--font-body); font-size: 13.5px;
          letter-spacing: 0.01em; position: relative; padding-bottom: 3px;
          color: var(--ink-2); transition: color var(--t-fast);
        }
        .nav-link-item:hover { color: var(--ink); }
        .nav-link-item::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          width: 0; height: 1px; background: var(--ink);
          transition: width 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .nav-link-item:hover::after { width: 100%; }
        .nav-link-item.active { color: var(--ink); font-weight: 600; }
        .nav-link-item.active::after { width: 100%; }

        /* ── Services trigger ── */
        .svc-trigger {
          display: flex; align-items: center; gap: 4px;
          font-family: var(--font-body); font-size: 13.5px;
          letter-spacing: 0.01em; color: var(--ink-2);
          background: none; border: none; cursor: pointer;
          padding: 0 0 3px; position: relative;
          transition: color var(--t-fast);
        }
        .svc-trigger:hover { color: var(--ink); }
        .svc-trigger.active { color: var(--ink); font-weight: 600; }
        .svc-trigger::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          width: 0; height: 1px; background: var(--ink);
          transition: width 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .svc-trigger:hover::after,
        .svc-trigger.active::after { width: 100%; }
        .svc-chevron { transition: transform 0.25s ease; }
        .svc-chevron.open { transform: rotate(180deg); }

        /* ── Dropdown ── */
        .svc-dropdown {
          display: none;
          position: absolute;
          top: calc(var(--nav-h) - 12px);
          left: 50%; transform: translateX(-50%);
          width: 280px;
          background: rgba(255,255,255,0.97);
          border: 1px solid var(--line);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 999;
          overflow: hidden;
        }
        .drop-item {
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          border-bottom: 1px solid var(--line);
          transition: background var(--t-fast), padding-left var(--t-fast);
        }
        .drop-item:last-child { border-bottom: none; }
        .drop-item:hover { background: var(--bg-2); padding-left: 26px; }
        .drop-item-left { display: flex; align-items: center; gap: 12px; }
        .drop-num {
          font-family: var(--font-mono); font-size: 9px;
          letter-spacing: 0.12em; color: var(--ink-3);
        }
        .drop-label {
          font-family: var(--font-body); font-size: 13.5px;
          font-weight: 500; color: var(--ink);
        }
        .drop-arrow { color: var(--ink-3); opacity: 0; transition: opacity var(--t-fast); font-size: 12px; }
        .drop-item:hover .drop-arrow { opacity: 1; }

        /* ── CTA ── */
        .nav-cta-btn {
          font-family: var(--font-mono); font-size: 10.5px;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 9px 20px; border: 1px solid var(--ink);
          color: var(--ink); background: transparent; white-space: nowrap;
          position: relative; overflow: hidden;
        }
        .nav-cta-btn::before {
          content: ''; position: absolute; inset: 0;
          background: var(--ink); transform: translateY(101%);
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1); z-index: 0;
        }
        .nav-cta-btn:hover::before { transform: translateY(0); }
        .nav-cta-btn:hover { color: var(--bg); }
        .nav-cta-btn span { position: relative; z-index: 1; }

        /* ── Mobile menu ── */
        .mobile-menu {
          border-bottom: 1px solid var(--line);
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(24px) saturate(160%);
          -webkit-backdrop-filter: blur(24px) saturate(160%);
          position: relative;
        }
        .mobile-menu::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent);
        }

        /* Mobile service sub-links */
        .m-sub-links {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1);
          background: var(--bg-2);
          border-bottom: 1px solid var(--line);
        }
        .m-sub-links.open { max-height: 400px; }
        .m-sub-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 20px; border-bottom: 1px solid var(--line);
          font-family: var(--font-body); font-size: 14px;
          font-weight: 500; color: var(--ink-2);
          transition: color var(--t-fast), padding-left var(--t-fast);
        }
        .m-sub-link:last-child { border-bottom: none; }
        .m-sub-link:hover { color: var(--ink); padding-left: 28px; }
        .m-sub-num {
          font-family: var(--font-mono); font-size: 9px;
          letter-spacing: 0.12em; color: var(--ink-3);
        }
      `}</style>

      {/* ─── Header ─── */}
      <header
        ref={navRef}
        className={scrolled ? "nav-glass" : "nav-transparent"}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: "var(--nav-h)",
          display: "flex",
          alignItems: "center",
          transition: "background 0.5s ease",
        }}
      >
        <div className="nav-inner">
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "17px",
              letterSpacing: "-0.05em",
              color: "var(--ink)",
              position: "relative",
              zIndex: 1,
              flexShrink: 0,
            }}
          >
            SPACE
            <span
              style={{
                WebkitTextStroke: "1px var(--ink)",
                color: "transparent",
              }}
            >
              DRIFT
            </span>
          </Link>

          {/* Desktop group */}
          <div className="nav-desk-group">
            <ul className="nav-desk">
              {links.map(({ href, label }) => {
                const active =
                  pathname === href ||
                  (href === "/services" && pathname.startsWith("/services"));

                // Services — dropdown trigger
                if (href === "/services") {
                  return (
                    <li key={href} style={{ position: "relative" }}>
                      <button
                        className={`svc-trigger nav-link-item${active ? " active" : ""}`}
                        onClick={() => setDropOpen((p) => !p)}
                        onMouseEnter={() => setDropOpen(true)}
                      >
                        {label}
                        <ChevronDown
                          size={13}
                          strokeWidth={2}
                          className={`svc-chevron${dropOpen ? " open" : ""}`}
                        />
                      </button>

                      {/* Dropdown */}
                      <div
                        ref={dropRef}
                        className="svc-dropdown"
                        onMouseLeave={() => setDropOpen(false)}
                      >
                        {/* All services link */}
                        <Link
                          href="/services"
                          className="drop-item"
                          style={{ background: "var(--bg-3)" }}
                        >
                          <div className="drop-item-left">
                            <span className="drop-num">ALL</span>
                            <span
                              className="drop-label"
                              style={{ fontWeight: 700 }}
                            >
                              All Services
                            </span>
                          </div>
                          <span className="drop-arrow">↗</span>
                        </Link>
                        {serviceLinks.map(
                          ({ href: sHref, label: sLabel, num }) => (
                            <Link
                              key={sHref}
                              href={sHref}
                              className="drop-item"
                            >
                              <div className="drop-item-left">
                                <span className="drop-num">{num}</span>
                                <span className="drop-label">{sLabel}</span>
                              </div>
                              <span className="drop-arrow">↗</span>
                            </Link>
                          ),
                        )}
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`nav-link-item${active ? " active" : ""}`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link href="/contact" className="nav-cta-btn">
              <span>CONTACT ↗</span>
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen((p) => !p)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="nav-hamburger"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--ink)",
              padding: "4px",
              lineHeight: 0,
              flexShrink: 0,
            }}
          >
            {open ? (
              <X size={21} strokeWidth={1.5} />
            ) : (
              <Menu size={21} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </header>

      {/* ─── Mobile Menu ─── */}
      <div
        ref={mobileRef}
        className="mobile-menu"
        style={{
          position: "fixed",
          top: "var(--nav-h)",
          left: 0,
          right: 0,
          zIndex: 999,
          opacity: 0,
          pointerEvents: "none",
          clipPath: "inset(0% 0% 100% 0%)",
        }}
      >
        <div
          style={{
            width: "95%",
            margin: "0 auto",
            paddingTop: "16px",
            paddingBottom: "28px",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {links.map(({ href, label }, i) => {
              const active =
                pathname === href ||
                (href === "/services" && pathname.startsWith("/services"));
              const isServices = href === "/services";

              return (
                <li key={href} className="m-link">
                  {isServices ? (
                    // Services — expandable
                    <>
                      <button
                        onClick={() => setDropOpen((p) => !p)}
                        style={{
                          width: "100%",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(22px, 5.5vw, 32px)",
                          fontWeight: 700,
                          letterSpacing: "-0.04em",
                          padding: "14px 0",
                          borderBottom: "1px solid var(--line)",
                          color: active ? "var(--ink)" : "var(--ink-2)",
                          textAlign: "left",
                        }}
                      >
                        <span
                          style={
                            active
                              ? {
                                  textDecoration: "underline",
                                  textDecorationColor: "var(--ink)",
                                  textUnderlineOffset: "5px",
                                }
                              : {}
                          }
                        >
                          {label}
                        </span>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "10px",
                              color: "var(--ink-3)",
                              letterSpacing: "0.12em",
                              fontWeight: 400,
                            }}
                          >
                            0{i + 1}
                          </span>
                          <ChevronDown
                            size={16}
                            strokeWidth={1.5}
                            style={{
                              color: "var(--ink-3)",
                              transform: dropOpen
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              transition: "transform 0.25s ease",
                            }}
                          />
                        </div>
                      </button>

                      {/* Sub-links */}
                      <div className={`m-sub-links${dropOpen ? " open" : ""}`}>
                        <Link
                          href="/services"
                          className="m-sub-link"
                          style={{ fontWeight: 700 }}
                        >
                          <span>All Services</span>
                          <span className="m-sub-num">ALL</span>
                        </Link>
                        {serviceLinks.map(
                          ({ href: sHref, label: sLabel, num }) => (
                            <Link
                              key={sHref}
                              href={sHref}
                              className="m-sub-link"
                            >
                              <span>{sLabel}</span>
                              <span className="m-sub-num">{num}</span>
                            </Link>
                          ),
                        )}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={href}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(22px, 5.5vw, 32px)",
                        fontWeight: 700,
                        letterSpacing: "-0.04em",
                        padding: "14px 0",
                        borderBottom: "1px solid var(--line)",
                        color: active ? "var(--ink)" : "var(--ink-2)",
                      }}
                    >
                      <span
                        style={
                          active
                            ? {
                                textDecoration: "underline",
                                textDecorationColor: "var(--ink)",
                                textUnderlineOffset: "5px",
                              }
                            : {}
                        }
                      >
                        {label}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "10px",
                          color: "var(--ink-3)",
                          letterSpacing: "0.12em",
                          fontWeight: 400,
                        }}
                      >
                        0{i + 1}
                      </span>
                    </Link>
                  )}
                </li>
              );
            })}

            {/* Mobile CTA */}
            <li className="m-link" style={{ marginTop: "20px" }}>
              <Link
                href="/contact"
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "12px 26px",
                  background: "var(--ink)",
                  color: "var(--bg)",
                }}
              >
                Hire Me ↗
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
