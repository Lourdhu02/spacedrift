// Drawing core: palette, fonts, text, easing, deterministic noise.
import { GlobalFonts } from "@napi-rs/canvas";
import path from "node:path";
import { fileURLToPath } from "node:url";

// geist's package "exports" hides package.json, so resolve the folder directly
const fontDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../node_modules/geist/dist/fonts");
for (const f of ["Regular", "Medium", "SemiBold", "Bold"]) {
  GlobalFonts.registerFromPath(path.join(fontDir, "geist-sans", `Geist-${f}.ttf`), "Geist");
  GlobalFonts.registerFromPath(path.join(fontDir, "geist-mono", `GeistMono-${f}.ttf`), "Geist Mono");
}

export const FPS = 60;
export const BEAT = 0.5; // 120 BPM

export const WHITE = "#ffffff";
export const INK = "#0a0a0a";
export const RED = "#e10600";
export const ink = (a) => `rgba(10,10,10,${a})`;
export const wht = (a) => `rgba(255,255,255,${a})`;

/* ── easing / timing ─────────────────────────────────────────── */
export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const seg = (t, a, b) => clamp((t - a) / (b - a));
export const expo = (x) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));
export const expoIn = (x) => (x <= 0 ? 0 : Math.pow(2, 10 * x - 10));
export const cubicIO = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
export const lerp = (a, b, x) => a + (b - a) * x;

export const hash = (x, y, s = 0) => {
  const n = Math.sin(x * 127.1 + y * 311.7 + s * 74.7) * 43758.5453;
  return n - Math.floor(n);
};

/* ── text ────────────────────────────────────────────────────── */
// Only real cuts are registered (400/500/600/700). The canvas parser also
// misreads odd weights like "560" as a size, so always snap.
const snapWeight = (w) => Math.min(700, Math.max(400, Math.round(w / 100) * 100));

export function setFont(ctx, size, { weight = 600, mono = false, track } = {}) {
  ctx.font = `${snapWeight(weight)} ${size.toFixed(2)}px ${mono ? '"Geist Mono"' : "Geist"}`;
  const em = track ?? (mono ? 0.06 : size >= 64 ? -0.045 : size >= 32 ? -0.03 : -0.01);
  ctx.letterSpacing = `${(em * size).toFixed(2)}px`;
}

export function measure(ctx, str) {
  return ctx.measureText(str).width;
}

/** Draw segments [{t, c}] on one baseline. Returns total width. */
export function rich(ctx, segs, x, y, { align = "left" } = {}) {
  const widths = segs.map((s) => measure(ctx, s.t));
  const total = widths.reduce((a, b) => a + b, 0);
  let cx = align === "center" ? x - total / 2 : align === "right" ? x - total : x;
  ctx.textAlign = "left";
  segs.forEach((s, i) => {
    ctx.fillStyle = s.c;
    ctx.fillText(s.t, cx, y);
    cx += widths[i];
  });
  return total;
}

const SCR = "#%&*+=<>/\\ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";

/**
 * Glyph-scramble decode. Characters lock left→right as p goes 0→1;
 * unlocked characters are random glyphs drawn in `scrambleColor`.
 */
export function decodeSegs(segs, p, tick, seed = 0, scrambleColor = RED) {
  const full = segs.map((s) => s.t).join("");
  const locked = Math.floor(p * (full.length + 0.999));
  const out = [];
  let i = 0;
  for (const s of segs) {
    let a = "", b = "";
    // locked characters are always a prefix, so each segment splits once
    for (const ch of s.t) {
      if (i < locked) a += ch;
      else b += ch === " " ? " " : SCR[Math.floor(hash(i, tick, seed) * SCR.length)];
      i++;
    }
    if (a && !b) out.push({ t: a, c: s.c });
    else if (!a && b) out.push({ t: b, c: scrambleColor });
    else if (a && b) {
      out.push({ t: a, c: s.c });
      out.push({ t: b, c: scrambleColor });
    }
  }
  return out;
}

/** Largest font size (≤ max) at which every line fits in maxW. */
export function fitSize(ctx, lines, maxW, max, opts = {}) {
  setFont(ctx, 100, opts);
  const widest = Math.max(...lines.map((l) => measure(ctx, typeof l === "string" ? l : l.map((s) => s.t).join(""))));
  return Math.min(max, Math.floor((100 * maxW) / widest));
}

/* ── shapes ─────────────────────────────────────────────────── */
export function rect(ctx, x, y, w, h, c) {
  ctx.fillStyle = c;
  ctx.fillRect(x, y, w, h);
}
export function strokeRect(ctx, x, y, w, h, c, lw = 2) {
  ctx.strokeStyle = c;
  ctx.lineWidth = lw;
  ctx.strokeRect(x + lw / 2, y + lw / 2, w - lw, h - lw);
}
export function hline(ctx, x, y, w, c, lw = 2) {
  rect(ctx, x, y - lw / 2, w, lw, c);
}
export function vline(ctx, x, y, h, c, lw = 2) {
  rect(ctx, x - lw / 2, y, lw, h, c);
}

/** The brand mark: ink (or white) 15u square + red 7u square at its top-right. */
export function mark(ctx, x, y, size, { base = INK, accent = RED, drift = 1, slide = 1 } = {}) {
  const u = size / 20;
  const baseX = x + (1 - slide) * -size * 1.2;
  rect(ctx, baseX, y + 5 * u, 15 * u, 15 * u, base);
  const dx = (1 - drift) * size * 1.6, dy = (1 - drift) * -size * 1.6;
  rect(ctx, x + 13 * u + dx, y + dy, 7 * u, 7 * u, accent);
}
