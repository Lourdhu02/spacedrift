"use client";

import { useEffect, useRef, useState } from "react";
import type { SceneKind } from "@/lib/services";

type Kind = Exclude<SceneKind, "cycle">;
const ORDER: Kind[] = ["noise", "parse", "model", "ship"];
const CAPTIONS: Record<Kind, string> = {
  noise: "raw input · labelling",
  parse: "extract → structured json",
  model: "model.fit() · epoch 12",
  ship: "deploy → production",
  mobile: "flutter · kotlin · swift",
};

const COLS = 56;
const ROWS = 22;
const RAMP = " .:-=+*#%@";
const SCRAMBLE = "▓▒░#%&*+=-<>/\\";

const hash = (x: number, y: number, s: number) => {
  const n = Math.sin(x * 127.1 + y * 311.7 + s * 74.7) * 43758.5453;
  return n - Math.floor(n);
};

type Grid = string[][];
const blank = (): Grid => Array.from({ length: ROWS }, () => Array(COLS).fill(" "));
const put = (g: Grid, x: number, y: number, s: string) => {
  if (y < 0 || y >= ROWS) return;
  for (let i = 0; i < s.length; i++) {
    const cx = x + i;
    if (cx >= 0 && cx < COLS && s[i] !== "\u0000") g[y][cx] = s[i];
  }
};
const join = (g: Grid) => g.map((r) => r.join("")).join("\n");

/* ── NOISE: raw data, with annotation boxes snapping onto it ─── */
function noise(t: number) {
  const g = blank();
  const tick = Math.floor(t * 7);
  for (let y = 0; y < ROWS; y++)
    for (let x = 0; x < COLS; x++) {
      const v = Math.sin(x * 0.28 + t * 1.6) + Math.cos(y * 0.42 - t * 1.1) + hash(x, y, tick) * 1.6;
      const n = Math.max(0, Math.min(0.999, (v + 2) / 5.2));
      g[y][x] = RAMP[Math.floor(n * RAMP.length)];
    }
  const box = Math.floor(t / 1.8);
  const bw = 14 + Math.floor(hash(box, 1, 3) * 14);
  const bh = 5 + Math.floor(hash(box, 2, 5) * 6);
  const bx = 2 + Math.floor(hash(box, 3, 7) * (COLS - bw - 4));
  const by = 2 + Math.floor(hash(box, 4, 9) * (ROWS - bh - 3));
  for (let y = by; y < by + bh; y++) for (let x = bx; x < bx + bw; x++) g[y][x] = " ";
  put(g, bx, by, "┌" + "─".repeat(bw - 2) + "┐");
  put(g, bx, by + bh - 1, "└" + "─".repeat(bw - 2) + "┘");
  for (let y = by + 1; y < by + bh - 1; y++) { g[y][bx] = "│"; g[y][bx + bw - 1] = "│"; }
  const labels = ["cell 0.97", "text 0.94", "face 0.91", "sign 0.98", "car 0.95"];
  put(g, bx + 2, by, ` ${labels[box % labels.length]} `);
  return join(g);
}

/* ── PARSE: noise locks, character by character, into JSON ──── */
const JSON_LINES = [
  "{",
  '  "doc":        "invoice_2041.pdf",',
  '  "vendor":     "Kaveri Traders",',
  '  "gstin":      "29ABCDE1234F1Z5",',
  '  "date":       "2026-09-14",',
  '  "total":      48210.00,',
  '  "currency":   "INR",',
  '  "confidence": 0.982',
  "}",
];
function parse(t: number) {
  const g = blank();
  const cycle = 7;
  const p = (t % cycle) / cycle;
  const tick = Math.floor(t * 10);
  const top = Math.floor((ROWS - JSON_LINES.length) / 2);
  const left = 6;
  const density = Math.max(0, 0.34 - p * 0.9);
  for (let y = 0; y < ROWS; y++)
    for (let x = 0; x < COLS; x++)
      if (hash(x, y, tick) < density) g[y][x] = RAMP[1 + Math.floor(hash(y, x, tick) * 4)];
  JSON_LINES.forEach((line, row) => {
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === " ") continue;
      const lockAt = 0.06 + (i / COLS) * 0.42 + row * 0.018;
      const dissolveAt = 0.86 + hash(i, row, 1) * 0.12;
      const locked = p >= lockAt && p < dissolveAt;
      g[top + row][left + i] = locked ? ch : SCRAMBLE[Math.floor(hash(i, row, tick) * SCRAMBLE.length)];
    }
  });
  const pct = Math.min(100, Math.round((p / 0.62) * 100));
  put(g, left, ROWS - 2, `fields ${String(Math.min(7, Math.floor(pct / 14.3))).padStart(1)}/7   ${"█".repeat(Math.round(pct / 5)).padEnd(20, "░")} ${String(pct).padStart(3)}%`);
  return join(g);
}

/* ── MODEL: the classic spinning torus ───────────────────────── */
function model(t: number) {
  const out = Array(COLS * ROWS).fill(" ");
  const z = new Float32Array(COLS * ROWS);
  const A = t * 0.9, B = t * 0.45;
  const cA = Math.cos(A), sA = Math.sin(A), cB = Math.cos(B), sB = Math.sin(B);
  const lum = ".,-~:;=!*#$@";
  for (let j = 0; j < 6.28; j += 0.07) {
    const ct = Math.cos(j), st = Math.sin(j);
    for (let i = 0; i < 6.28; i += 0.02) {
      const sp = Math.sin(i), cp = Math.cos(i);
      const h = ct + 2;
      const D = 1 / (sp * h * sA + st * cA + 5);
      const tt = sp * h * cA - st * sA;
      const x = Math.floor(COLS / 2 + COLS * 0.4 * D * (cp * h * cB - tt * sB));
      const y = Math.floor(ROWS / 2 + 1 + ROWS * 0.62 * D * (cp * h * sB + tt * cB));
      if (y < 0 || y >= ROWS || x < 0 || x >= COLS) continue;
      const o = x + COLS * y;
      const N = Math.floor(8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));
      if (D > z[o]) { z[o] = D; out[o] = lum[N > 0 ? N : 0]; }
    }
  }
  const g: Grid = Array.from({ length: ROWS }, (_, r) => out.slice(r * COLS, r * COLS + COLS));
  const epoch = 1 + (Math.floor(t / 1.4) % 40);
  const loss = (0.9 * Math.exp(-epoch / 9) + 0.04).toFixed(3);
  put(g, 1, 0, `epoch ${String(epoch).padStart(2, "0")}/40`);
  put(g, COLS - 13, 0, `loss ${loss}`);
  return join(g);
}

/* ── SHIP: lift-off through a star field ─────────────────────── */
const ROCKET = [
  "    /\\    ",
  "   /  \\   ",
  "  | () |  ",
  "  |    |  ",
  "  | sd |  ",
  " /|    |\\ ",
  "/_|____|_\\",
];
const FLAMES = ["  ^^^^^^  ", "  *^*^*^  ", "   :::    ", "   ':'    ", "    .     "];
function ship(t: number) {
  const g = blank();
  for (let s = 0; s < 70; s++) {
    const sx = Math.floor(hash(s, 1, 1) * COLS);
    const speed = 4 + hash(s, 2, 2) * 12;
    const sy = Math.floor((hash(s, 3, 3) * ROWS + t * speed) % ROWS);
    g[sy][sx] = speed > 12 ? "|" : speed > 8 ? ":" : ".";
  }
  const bob = Math.round(Math.sin(t * 2.2) * 0.8);
  const rx = Math.floor(COLS / 2 - ROCKET[0].length / 2);
  const ry = 3 + bob;
  ROCKET.forEach((line, i) => put(g, rx, ry + i, line));
  const tick = Math.floor(t * 12);
  for (let f = 0; f < 4; f++) {
    const row = FLAMES[Math.min(FLAMES.length - 1, f + (hash(f, tick, 4) > 0.5 ? 1 : 0))];
    put(g, rx, ry + ROCKET.length + f, row);
  }
  const p = (t % 6) / 6;
  const pct = Math.round(p * 100);
  put(g, 2, ROWS - 1, `deploy ▸ prod  ${"█".repeat(Math.round(p * 24)).padEnd(24, "░")} ${String(pct).padStart(3)}%`);
  return join(g);
}

/* ── MOBILE: a phone feed scrolling while builds ship to both stores ── */
const PW = 26; // phone width incl. frame
const PX = 3;  // phone x offset
// Only glyphs Geist Mono ships, so every column stays aligned.
const FEED = [
  ["▓▓▓▓ invoice scan", "░░░░░░░░░ 0.98"],
  ["▓▓▓ ask the docs", "░░░░░ 3 sources"],
  ["▓▓▓▓▓ label queue", "░░░░ 128 left"],
  ["▓▓ offline sync", "░░░░░░░ synced"],
];
const fit = (text: string, w: number) => text.slice(0, w).padEnd(w);
function mobile(t: number) {
  const g = blank();
  const inner = PW - 2;
  put(g, PX, 0, "┌" + "─".repeat(inner) + "┐");
  put(g, PX, ROWS - 1, "└" + "─".repeat(inner) + "┘");
  for (let y = 1; y < ROWS - 1; y++) { g[y][PX] = "│"; g[y][PX + PW - 1] = "│"; }
  put(g, PX + 1, 1, fit(" 9:41", inner - 8) + "5G ▓▓▓ ");
  put(g, PX + 1, 2, "─".repeat(inner));

  // scrolling feed of cards between rows 3..ROWS-5
  const top = 3, bottom = ROWS - 5, cardH = 4;
  const off = Math.floor(t * 2.5) % cardH;
  const first = Math.floor(t * 2.5 / cardH);
  for (let k = 0; k < 6; k++) {
    const y0 = top + k * cardH - off;
    const item = FEED[(first + k) % FEED.length];
    const rows = ["┌" + "─".repeat(inner - 4) + "┐", "│ " + fit(item[0], inner - 6) + " │", "│ " + fit(item[1], inner - 6) + " │", "└" + "─".repeat(inner - 4) + "┘"];
    rows.forEach((r, i) => {
      const y = y0 + i;
      if (y >= top && y <= bottom) put(g, PX + 2, y, r);
    });
  }
  put(g, PX + 1, ROWS - 4, "─".repeat(inner));
  const tab = Math.floor(t / 1.6) % 4;
  put(g, PX + 1, ROWS - 3, fit("   " + [0, 1, 2, 3].map((i) => (i === tab ? "▓▓" : "░░")).join("   "), inner));
  put(g, PX + 1, ROWS - 2, fit(" ".repeat(8) + "─".repeat(inner - 16), inner));

  // build log on the right
  const LX = PX + PW + 3;
  const p = (t % 7) / 7;
  const lines: [number, string][] = [
    [0.0, "$ flutter build"],
    [0.12, " > android  apk ✓"],
    [0.24, " > ios      ipa ✓"],
    [0.36, ""],
    [0.4, "frame   16.6 ms"],
    [0.46, "fps     60"],
    [0.52, "jank    0.0 %"],
    [0.58, ""],
    [0.62, "release > stores"],
  ];
  lines.forEach(([at, text], i) => { if (p >= at) put(g, LX, 3 + i, text); });
  if (p >= 0.62) {
    const q = Math.min(1, (p - 0.62) / 0.3);
    put(g, LX, 13, "█".repeat(Math.round(q * 14)).padEnd(14, "░") + " " + String(Math.round(q * 100)).padStart(3) + "%");
  }
  if (p >= 0.94) put(g, LX, 15, "live: play + app store");
  return join(g);
}

const RENDER: Record<Kind, (t: number) => string> = { noise, parse, model, ship, mobile };

export default function AsciiScene({
  kind,
  chrome = true,
  label,
}: {
  kind: SceneKind;
  chrome?: boolean;
  label?: string;
}) {
  const preRef = useRef<HTMLPreElement>(null);
  const [active, setActive] = useState(0);
  const current: Kind = kind === "cycle" ? ORDER[active] : kind;
  const currentRef = useRef<Kind>(current);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  useEffect(() => {
    if (kind !== "cycle") return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % ORDER.length), 5200);
    return () => window.clearInterval(id);
  }, [kind]);

  useEffect(() => {
    const pre = preRef.current;
    if (!pre) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let raf = 0, last = 0, onScreen = false;

    const frame = (now: number) => {
      if (!onScreen) return;
      if (now - last > 1000 / 24) {
        last = now;
        pre.textContent = RENDER[currentRef.current]((now - start) / 1000);
      }
      raf = requestAnimationFrame(frame);
    };

    if (reduce) {
      pre.textContent = RENDER[currentRef.current](2.4);
      return;
    }

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (onScreen) raf = requestAnimationFrame(frame);
    });
    io.observe(pre);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="scene">
      {chrome && (
        <div className="scene-bar">
          <span className="scene-dots" aria-hidden>
            <i /><i /><i />
          </span>
          {kind === "cycle" ? (
            <div className="scene-tabs" role="tablist" aria-label="Pipeline stage">
              {ORDER.map((k, i) => (
                <button
                  key={k}
                  role="tab"
                  aria-selected={i === active}
                  className={i === active ? "on" : ""}
                  onClick={() => setActive(i)}
                >
                  {k}
                </button>
              ))}
            </div>
          ) : (
            <span className="label">{label ?? current}</span>
          )}
        </div>
      )}
      <div className="ascii-wrap">
        <pre ref={preRef} className="ascii" aria-hidden suppressHydrationWarning>
          {RENDER[current](2.4)}
        </pre>
      </div>
      {chrome && (
        <div className="scene-foot label">
          <span>{CAPTIONS[current]}</span>
          <span className="scene-live"><span className="dot-live" /> live</span>
        </div>
      )}
      <style>{`
        .scene { display: flex; flex-direction: column; gap: 14px; }
        .scene-bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding-bottom: 12px; border-bottom: 1px solid var(--line); }
        .scene-dots { display: inline-flex; gap: 6px; }
        .scene-dots i { width: 9px; height: 9px; background: var(--line); }
        .scene-dots i:first-child { background: var(--red); }
        .scene-tabs { display: inline-flex; box-shadow: inset 0 0 0 1px var(--line); }
        .scene-tabs button {
          font-family: var(--font-mono); font-size: 11px; letter-spacing: .06em; text-transform: uppercase;
          padding: 7px 10px; color: var(--text-3);
          transition: color .3s var(--ease), background-color .3s var(--ease);
        }
        .scene-tabs button:hover { color: var(--text); }
        .scene-tabs button.on { color: #fff; background: var(--red); }
        .scene-foot { display: flex; justify-content: space-between; gap: 12px; padding-top: 12px; border-top: 1px solid var(--line); }
        .scene-live { display: inline-flex; align-items: center; gap: 8px; }
        @media (max-width: 420px) { .scene-tabs button { padding: 7px 7px; font-size: 10px; } }
      `}</style>
    </div>
  );
}
