"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/services";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === "sending") return;
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setState("sending");
    try {
      const body = new URLSearchParams();
      new FormData(form).forEach((v, k) => body.append(k, v.toString()));
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setState("ok");
    } catch {
      setState("error");
    }
  };

  return (
    <form className="cf" name="contact" onSubmit={onSubmit}>
      <input type="hidden" name="form-name" value="contact" />
      <div className="cf-row">
        <label className="field">
          <span className="label">Name</span>
          <input className="input" name="name" placeholder="Ada Lovelace" required autoComplete="name" />
        </label>
        <label className="field">
          <span className="label">Email</span>
          <input className="input" type="email" name="email" placeholder="you@company.com" required autoComplete="email" />
        </label>
      </div>
      <label className="field">
        <span className="label">What are you building?</span>
        <textarea className="input" name="message" rows={5} required placeholder="The problem, the data you have, and when you need it." />
      </label>

      <div className="cf-actions">
        <button type="submit" className="btn btn-primary" disabled={state === "sending" || state === "ok"} data-magnetic>
          <span className="btn-label">
            {state === "sending" ? "Sending…" : state === "ok" ? "Sent. Talk soon." : "Send message"}
          </span>
          <span className="btn-ico" aria-hidden>
            {state === "ok" ? <Check size={18} strokeWidth={2} /> : <ArrowUpRight size={18} strokeWidth={2} />}
          </span>
        </button>
        <p className="small" role="status" aria-live="polite">
          {state === "error" ? (
            <span className="cf-err">
              That didn&apos;t go through. Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> instead.
            </span>
          ) : state === "ok" ? (
            "Expect a reply within 24 hours."
          ) : (
            <>
              or email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </>
          )}
        </p>
      </div>

      <style>{`
        .cf { display: flex; flex-direction: column; gap: 18px; }
        .cf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .cf-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 18px; margin-top: 6px; }
        .cf-actions a { color: var(--text); text-decoration: underline; text-decoration-color: var(--line-2); text-underline-offset: 3px; }
        .cf-err { color: #ffb4a8; }
        .cf .btn:disabled { cursor: default; }
        @media (max-width: 560px) { .cf-row { grid-template-columns: 1fr; } }
      `}</style>
    </form>
  );
}
