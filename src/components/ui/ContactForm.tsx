"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

/**
 * ContactForm — the site's single form. Posts to Netlify's
 * `__forms.html` convention. Shows real submission state; never
 * silently claims success.
 */
export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    setErrorMsg("");

    try {
      const formData = new FormData(e.currentTarget);
      const params = new URLSearchParams();
      formData.forEach((value, key) => params.append(key, value.toString()));

      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setState("ok");
      e.currentTarget.reset();
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Unknown failure.");
    }
  };

  return (
    <form className="ctx-form" name="contact" onSubmit={onSubmit} noValidate>
      <input type="hidden" name="form-name" value="contact" />

      <div className="ctx-row">
        <label className="ctx-field">
          <span className="mono ctx-label">01 · IDENTITY</span>
          <input type="text" name="name" placeholder="your name" required autoComplete="name" />
        </label>
        <label className="ctx-field">
          <span className="mono ctx-label">02 · CHANNEL</span>
          <input type="email" name="email" placeholder="you@domain.com" required autoComplete="email" />
        </label>
      </div>

      <label className="ctx-field">
        <span className="mono ctx-label">03 · PAYLOAD</span>
        <textarea name="message" placeholder="describe the project — data, deadline, constraints" rows={4} required />
      </label>

      <div className="ctx-actions">
        <button
          type="submit"
          className={`stamp ${state === "sending" ? "is-sending" : ""}`}
          disabled={state === "sending" || state === "ok"}
        >
          <span className="mono">
            {state === "sending"
              ? "TRANSMITTING…"
              : state === "ok"
                ? "TRANSMISSION RECEIVED"
                : "TRANSMIT"}
          </span>
          {state !== "ok" && <ArrowUpRight size={14} strokeWidth={2} />}
        </button>
        <a href="mailto:spacedrift.contact@gmail.com" className="stamp-ghost">
          <span className="mono">OR EMAIL DIRECT</span>
          <ArrowUpRight size={14} strokeWidth={2} />
        </a>
      </div>

      {state === "ok" && (
        <p className="ctx-msg ctx-msg-ok mono">
          ▚ ACK — expect a reply within 24h at the channel above.
        </p>
      )}
      {state === "error" && (
        <p className="ctx-msg ctx-msg-err mono">
          × Transmission failed ({errorMsg || "unknown"}). Email spacedrift.contact@gmail.com directly.
        </p>
      )}

      <style>{`
        .ctx-form { display: flex; flex-direction: column; gap: 20px; max-width: 640px; }
        .ctx-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .ctx-field { display: flex; flex-direction: column; gap: 6px; }
        .ctx-label {
          font-size: 10.5px; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--ink-4);
        }
        .ctx-actions { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; margin-top: 8px; }
        .stamp:disabled { cursor: default; opacity: 0.85; }
        .is-sending { background: var(--paper-3); color: var(--ink); border-color: var(--ink-3); }
        .ctx-msg {
          font-size: 12px; letter-spacing: 0.1em;
          padding: 12px 14px; border: 1px solid;
        }
        .ctx-msg-ok  { color: var(--ink); border-color: var(--ink); background: var(--paper-2); }
        .ctx-msg-err { color: var(--signal); border-color: var(--signal); background: var(--signal-wash); }
        @media (max-width: 560px) {
          .ctx-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </form>
  );
}
