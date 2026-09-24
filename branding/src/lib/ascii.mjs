// Static ASCII "terminal" scenes, ported from the site's AsciiScene.tsx and
// extended for the brand kit. Every scene returns a Grid with a tone per cell:
//   "n" normal, "d" dim, "r" red. toHTML() turns it into spans for a <pre>.
// Only glyphs that exist in Geist Mono are used (checked with fontkit).

export const RAMP = " .:-=+*#%@";
const SCRAMBLE = "▓▒░#%&*+=-<>/\\";

export const hash = (x, y, s) => {
  const n = Math.sin(x * 127.1 + y * 311.7 + s * 74.7) * 43758.5453;
  return n - Math.floor(n);
};

export class Grid {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.ch = Array.from({ length: rows }, () => Array(cols).fill(" "));
    this.tone = Array.from({ length: rows }, () => Array(cols).fill("n"));
  }
  set(x, y, c, t) {
    if (y < 0 || y >= this.rows || x < 0 || x >= this.cols) return;
    this.ch[y][x] = c;
    if (t) this.tone[y][x] = t;
  }
  put(x, y, s, t) {
    [...s].forEach((c, i) => { if (c !== "\u0000") this.set(x + i, y, c, t); });
  }
  box(x, y, w, h, t, clear = true) {
    if (clear) for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) this.set(xx, yy, " ", "n");
    this.put(x, y, "┌" + "─".repeat(w - 2) + "┐", t);
    this.put(x, y + h - 1, "└" + "─".repeat(w - 2) + "┘", t);
    for (let yy = y + 1; yy < y + h - 1; yy++) { this.set(x, yy, "│", t); this.set(x + w - 1, yy, "│", t); }
  }
  toHTML() {
    const esc = (c) => (c === "<" ? "&lt;" : c === ">" ? "&gt;" : c === "&" ? "&amp;" : c);
    return this.ch
      .map((row, y) => {
        let out = "", cur = null, buf = "";
        const flush = () => {
          if (buf) {
            // solid runs of █ become one block (no glyph seams at 4K)
            const b = buf.replace(/█+/g, (m) => `<span class="blk">${m}</span>`);
            out += cur === "n" ? b : `<span class="t-${cur}">${b}</span>`;
          }
          buf = "";
        };
        row.forEach((c, x) => {
          const t = c === " " ? cur ?? "n" : this.tone[y][x];
          if (t !== cur) { flush(); cur = t; }
          buf += esc(c);
        });
        flush();
        return out;
      })
      .join("\n");
  }
}

/* ── NOISE: raw data with a labelled bounding box snapping on ── */
export function noise({ cols = 56, rows = 22, t = 2.4, boxes = null } = {}) {
  const g = new Grid(cols, rows);
  const tick = Math.floor(t * 7);
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++) {
      const v = Math.sin(x * 0.28 + t * 1.6) + Math.cos(y * 0.42 - t * 1.1) + hash(x, y, tick) * 1.6;
      const n = Math.max(0, Math.min(0.999, (v + 2) / 5.2));
      g.set(x, y, RAMP[Math.floor(n * RAMP.length)], "d");
    }
  const list = boxes ?? [{ x: Math.round(cols * 0.3), y: Math.round(rows * 0.28), w: Math.round(cols * 0.42), h: Math.round(rows * 0.42), label: "text 0.94" }];
  list.forEach((b, i) => {
    const tone = i === 0 ? "r" : "n";
    g.box(b.x, b.y, b.w, b.h, tone);
    g.put(b.x + 2, b.y, ` ${b.label} `, tone);
  });
  return g;
}

/* ── PARSE: invoice noise locking into JSON ─────────────────── */
const JSON_LINES = [
  "{",
  '  "doc":        "invoice_2041.pdf",',
  '  "vendor":     "▓▓▓▓▓▓ Traders",',
  '  "gstin":      "29ABCDE1234F1Z5",',
  '  "date":       "2026-09-14",',
  '  "total":      48210.00,',
  '  "currency":   "INR",',
  '  "confidence": 0.982',
  "}",
];
export function parse({ cols = 56, rows = 22, p = 0.52, t = 3.1, mini = false } = {}) {
  const g = new Grid(cols, rows);
  const LINES = mini ? [JSON_LINES[0], JSON_LINES[2], JSON_LINES[5], JSON_LINES[7], JSON_LINES[8]] : JSON_LINES;
  const RED_ROW = mini ? 3 : 7;
  const tick = Math.floor(t * 10);
  const top = Math.max(mini ? 1 : 1, Math.floor((rows - LINES.length) / 2) - (mini ? 0 : 1));
  const left = Math.max(2, Math.floor((cols - 36) / 2));
  const density = Math.max(0, 0.34 - p * 0.45);
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++)
      if (hash(x, y, tick) < density) g.set(x, y, RAMP[1 + Math.floor(hash(y, x, tick) * 4)], "d");
  LINES.forEach((line, row) => {
    [...line].forEach((ch, i) => {
      if (ch === " ") { g.set(left + i, top + row, " ", "n"); return; }
      const lockAt = 0.06 + (i / 56) * 0.42 + row * 0.018;
      const locked = p >= lockAt;
      const red = row === RED_ROW && i > 16 && locked;
      g.set(left + i, top + row, locked ? ch : SCRAMBLE[Math.floor(hash(i, row, tick) * SCRAMBLE.length)], red ? "r" : locked ? "n" : "d");
    });
  });
  if (mini) return g;
  const pct = Math.min(100, Math.round((p / 0.62) * 100));
  const bar = "█".repeat(Math.round(pct / 5)).padEnd(20, "░");
  g.put(left, rows - 2, `fields ${Math.min(7, Math.floor(pct / 14.3))}/7  `, "d");
  g.put(left + 12, rows - 2, bar, "r");
  g.put(left + 33, rows - 2, `${String(pct).padStart(3)}%`, "n");
  return g;
}

/* ── MODEL: the spinning torus ─────────────────────────────── */
export function model({ cols = 56, rows = 22, t = 3.6, labels = true, aspect = 0.56, scale = 0.5 } = {}) {
  const g = new Grid(cols, rows);
  const z = new Float32Array(cols * rows);
  const A = t * 0.9, B = t * 0.45;
  const cA = Math.cos(A), sA = Math.sin(A), cB = Math.cos(B), sB = Math.sin(B);
  const lum = ".,-~:;=!*#$@";
  for (let j = 0; j < 6.28; j += 0.05) {
    const ct = Math.cos(j), st = Math.sin(j);
    for (let i = 0; i < 6.28; i += 0.012) {
      const sp = Math.sin(i), cp = Math.cos(i);
      const h = ct + 2;
      const D = 1 / (sp * h * sA + st * cA + 5);
      const tt = sp * h * cA - st * sA;
      const x = Math.floor(cols / 2 + cols * scale * D * (cp * h * cB - tt * sB));
      const y = Math.floor(rows / 2 + 1 + rows * aspect * D * (cp * h * sB + tt * cB));
      if (y < 0 || y >= rows || x < 0 || x >= cols) continue;
      const o = x + cols * y;
      const N = Math.floor(8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));
      if (D > z[o]) {
        z[o] = D;
        const idx = N > 0 ? N : 0;
        g.set(x, y, lum[idx], idx >= 11 ? "r" : idx < 3 ? "d" : "n");
      }
    }
  }
  if (labels) {
    const epoch = 1 + (Math.floor(t / 1.4) % 40);
    g.put(1, 0, `epoch ${String(epoch).padStart(2, "0")}/40`, "d");
    const loss = `loss ${(0.9 * Math.exp(-epoch / 9) + 0.04).toFixed(3)}`;
    g.put(cols - loss.length - 1, 0, loss, "r");
  }
  return g;
}

/* ── SHIP: lift-off through a star field ───────────────────── */
const ROCKET = [
  "    /\\    ",
  "   /  \\   ",
  "  | [] |  ",
  "  |    |  ",
  "  | sd |  ",
  " /|    |\\ ",
  "/_|____|_\\",
];
const FLAMES = ["  ^^^^^^  ", "  *^*^*^  ", "   :::    ", "   ':'    ", "    .     "];
export function ship({ cols = 56, rows = 22, t = 2.4, p = 0.72, bar = true, top } = {}) {
  const g = new Grid(cols, rows);
  for (let s = 0; s < Math.round(cols * rows * 0.06); s++) {
    const sx = Math.floor(hash(s, 1, 1) * cols);
    const speed = 4 + hash(s, 2, 2) * 12;
    const sy = Math.floor((hash(s, 3, 3) * rows + t * speed) % rows);
    g.set(sx, sy, speed > 12 ? "|" : speed > 8 ? ":" : ".", "d");
  }
  const rx = Math.floor(cols / 2 - ROCKET[0].length / 2);
  const ry = top ?? Math.max(1, Math.floor(rows * 0.14));
  for (let y = ry - 1; y < ry + ROCKET.length + 5; y++) for (let x = rx - 1; x < rx + 11; x++) g.set(x, y, " ", "n");
  ROCKET.forEach((line, i) => g.put(rx, ry + i, line.replace(/ /g, "\u0000"), "n"));
  const tick = Math.floor(t * 12);
  const nf = Math.max(0, Math.min(4, (bar ? rows - 3 : rows) - (ry + ROCKET.length)));
  for (let f = 0; f < nf; f++) {
    const row = FLAMES[Math.min(FLAMES.length - 1, f + (hash(f, tick, 4) > 0.5 ? 1 : 0))];
    g.put(rx, ry + ROCKET.length + f, row.replace(/ /g, "\u0000"), "r");
  }
  if (bar) {
    const n = Math.min(24, cols - 30);
    const y = rows - 2;
    g.put(2, y, "deploy → prod  ", "d");
    g.put(17, y, "█".repeat(Math.round(p * n)).padEnd(n, "░"), "r");
    g.put(18 + n, y, `${String(Math.round(p * 100)).padStart(3)}%`, "n");
  }
  return g;
}

/* ── RESEARCH: seeded training curve ───────────────────────── */
export function research({ cols = 56, rows = 22 } = {}) {
  const g = new Grid(cols, rows);
  const x0 = 7, y0 = 2, w = cols - 15, h = rows - 7;
  g.put(1, y0, "0.9 ┤", "d");
  g.put(1, y0 + Math.floor(h / 2), "0.5 ┤", "d");
  g.put(1, y0 + h, "0.1 ┤", "d");
  for (let y = y0; y <= y0 + h; y++) if (g.ch[y][5] === " ") g.set(5, y, "│", "d");
  g.put(5, y0 + h + 1, "└" + "─".repeat(w) + " epoch", "d");
  // three seeds (dim) + mean (red): all agree, which is the point
  for (let s = 0; s < 4; s++) {
    for (let i = 0; i < w; i++) {
      const e = i / (w - 1);
      const jitter = s < 3 ? (hash(i, s, 9) - 0.5) * 0.07 : 0;
      const v = 0.86 * Math.exp(-e * 3.4) + 0.08 + jitter;
      const y = y0 + Math.round((1 - (v - 0.05) / 0.9) * h);
      if (s < 3) { if (g.ch[y]?.[x0 + i] === " ") g.set(x0 + i, y, "·", "d"); }
      else g.set(x0 + i, y, "*", "r");
    }
  }
  g.put(x0 + 2, rows - 2, "seeds 0,1,2  ·  same config  ·  same result", "n");
  return g;
}

/* ── RAG: query → retrieve → grounded answer ───────────────── */
/* ── RAG: query → retrieve → grounded answer (needs rows ≥ 17) ── */
export function rag({ cols = 56, rows = 17 } = {}) {
  const g = new Grid(cols, rows);
  g.put(2, 0, "> ask", "r");
  g.put(8, 0, '"what is our refund window?"', "n");
  g.put(2, 2, "retrieve  top_k=3", "d");
  const chunks = [
    ["0.91", "policy.pdf      p.3", "r"],
    ["0.84", "faq.md          #12", "n"],
    ["0.77", "terms_v4.pdf    p.9", "n"],
  ];
  chunks.forEach(([s, name, t], i) => {
    const y = 3 + i * 3;
    g.box(2, y, cols - 4, 3, t === "r" ? "r" : "d");
    g.put(4, y + 1, `[${i + 1}]`, t === "r" ? "r" : "d");
    g.put(9, y + 1, name, "n");
    g.put(cols - 14, y + 1, `sim ${s}`, t === "r" ? "r" : "d");
  });
  const a = Math.min(rows - 5, 13);
  g.put(2, a, "answer", "d");
  g.put(2, a + 1, "Refunds within 14 days of delivery,", "n");
  g.put(2, a + 2, "for unused items in original packing", "n");
  g.put(39, a + 2, "[1]", "r");
  g.put(2, rows - 1, "grounded · cited · evaluated", "d");
  return g;
}

/* ── WEB: a page wireframe, built from blocks (rows ≥ 16) ─── */
export function web({ cols = 56, rows = 17 } = {}) {
  const g = new Grid(cols, rows);
  g.box(1, 0, cols - 2, rows, "d", true);
  g.put(1, 2, "├" + "─".repeat(cols - 4) + "┤", "d");
  g.put(3, 1, "▓ ▒ ░", "d");
  g.put(10, 1, "https://your-site.in", "n");
  g.put(3, 3, "▀▀▀▀▀▀▀▀", "n");
  g.put(cols - 24, 3, "work  about  contact", "d");
  g.put(3, 5, "██████████████████████", "n");
  g.put(3, 6, "██████████████", "n");
  g.put(17, 6, "████████", "r");
  g.put(3, 8, "▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒", "d");
  g.put(3, 9, "▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒", "d");
  g.put(3, 11, "[ start a project → ]", "r");
  const cw = Math.floor((cols - 8) / 3);
  const cy = rows - 5;
  if (cy >= 12)
    for (let i = 0; i < 3; i++) {
      g.box(3 + i * (cw + 1), cy, cw, 4, "d", true);
      g.put(5 + i * (cw + 1), cy + 1, "░".repeat(cw - 4), "d");
      g.put(5 + i * (cw + 1), cy + 2, "░".repeat(cw - 7), "d");
    }
  return g;
}

/* ── MOBILE: a phone reading a receipt on-device (rows ≥ 16) ── */
export function mobile({ cols = 56, rows = 17 } = {}) {
  const g = new Grid(cols, rows);
  const pw = 22, px = 4;
  g.box(px, 0, pw, rows, "n", true);
  g.put(px + 2, 1, "9:41", "d");
  g.put(px + pw - 6, 1, "▌▌▌", "d");
  g.put(px + Math.floor(pw / 2) - 2, rows - 2, "────", "d");
  for (let y = 3; y < 9; y++)
    for (let x = px + 2; x < px + pw - 2; x++) g.set(x, y, RAMP[1 + Math.floor(hash(x, y, 3) * 3)], "d");
  g.box(px + 4, 3, pw - 8, 6, "r");
  g.put(px + 5, 3, " rcpt ", "r");
  g.put(px + 2, 10, "total  ₹ 1,240", "n");
  g.put(px + 2, 11, "date   14 Sep", "n");
  g.put(px + 2, 13, "[ save → ]", "r");
  const rx = px + pw + 4;
  g.put(rx, 1, "on-device ml", "r");
  g.put(rx, 2, "offline · no upload", "d");
  g.put(rx, 4, "build", "d");
  g.put(rx, 5, "├ flutter  android", "n");
  g.put(rx, 6, "├ flutter  ios", "n");
  g.put(rx, 7, "├ kotlin   android", "n");
  g.put(rx, 8, "└ swift    ios", "n");
  g.put(rx, 10, "release", "d");
  g.put(rx, 11, "play store  ▲", "n");
  g.put(rx, 12, "app store   ▲", "n");
  g.put(rx, 14, "your accounts", "r");
  return g;
}

/* ── ANNOTATE: several labelled boxes over raw pixels ──────── */
export function annotate({ cols = 56, rows = 17 } = {}) {
  const r = rows / 17;
  return noise({
    cols, rows, t: 5.1,
    boxes: [
      { x: 4, y: Math.round(1 * r), w: 21, h: Math.round(7 * r), label: "car 0.95" },
      { x: 30, y: Math.round(3 * r), w: 20, h: Math.round(6 * r), label: "sign 0.98" },
      { x: 10, y: Math.round(10 * r), w: 32, h: Math.max(4, Math.round(5 * r)), label: "text 0.94" },
    ],
  });
}

export const SCENES = { noise, parse, model, ship, research, rag, web, mobile, annotate };
