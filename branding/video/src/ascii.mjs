// ASCII scenes (ported from the site's AsciiScene) + batched glyph rendering.
import { hash, setFont } from "./core.mjs";

export const COLS = 56;
export const ROWS = 22;
const RAMP = " .:-=+*#%@";
const SCRAMBLE = "▓▒░#%&*+=-<>/\\";

const blank = () => Array.from({ length: ROWS }, () => Array(COLS).fill(" "));
const put = (g, x, y, s) => {
  if (y < 0 || y >= ROWS) return;
  for (let i = 0; i < s.length; i++) {
    const cx = x + i;
    if (cx >= 0 && cx < COLS) g[y][cx] = s[i];
  }
};

/* Each scene returns { grid, hot } — hot = Set of "x,y" cells drawn red. */

export function noise(t) {
  const g = blank();
  const hot = new Set();
  const tick = Math.floor(t * 7);
  for (let y = 0; y < ROWS; y++)
    for (let x = 0; x < COLS; x++) {
      const v = Math.sin(x * 0.28 + t * 1.6) + Math.cos(y * 0.42 - t * 1.1) + hash(x, y, tick) * 1.6;
      const n = Math.max(0, Math.min(0.999, (v + 2) / 5.2));
      g[y][x] = RAMP[Math.floor(n * RAMP.length)];
    }
  const box = Math.floor(t / 1.8);
  const bw = 16 + Math.floor(hash(box, 1, 3) * 12);
  const bh = 6 + Math.floor(hash(box, 2, 5) * 5);
  const bx = 3 + Math.floor(hash(box, 3, 7) * (COLS - bw - 6));
  const by = 3 + Math.floor(hash(box, 4, 9) * (ROWS - bh - 5));
  for (let y = by; y < by + bh; y++) for (let x = bx; x < bx + bw; x++) g[y][x] = " ";
  const mark = (x, y, ch) => { if (y >= 0 && y < ROWS && x >= 0 && x < COLS) { g[y][x] = ch; hot.add(`${x},${y}`); } };
  for (let x = bx; x < bx + bw; x++) { mark(x, by, "─"); mark(x, by + bh - 1, "─"); }
  for (let y = by; y < by + bh; y++) { mark(bx, y, "│"); mark(bx + bw - 1, y, "│"); }
  mark(bx, by, "┌"); mark(bx + bw - 1, by, "┐"); mark(bx, by + bh - 1, "└"); mark(bx + bw - 1, by + bh - 1, "┘");
  const labels = ["invoice 0.97", "text 0.94", "face 0.91", "sign 0.98", "table 0.95"];
  const lab = ` ${labels[box % labels.length]} `;
  for (let i = 0; i < lab.length; i++) mark(bx + 2 + i, by, lab[i]);
  return { grid: g, hot };
}

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
export function parse(t, cycle = 7) {
  const g = blank();
  const hot = new Set();
  const p = Math.min(0.999, t / cycle);
  const tick = Math.floor(t * 10);
  const top = Math.floor((ROWS - JSON_LINES.length) / 2) - 1;
  const left = 6;
  const density = Math.max(0, 0.34 - p * 0.9);
  for (let y = 0; y < ROWS; y++)
    for (let x = 0; x < COLS; x++)
      if (hash(x, y, tick) < density) g[y][x] = RAMP[1 + Math.floor(hash(y, x, tick) * 4)];
  JSON_LINES.forEach((line, row) => {
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === " ") continue;
      const lockAt = 0.04 + (i / COLS) * 0.4 + row * 0.018;
      const locked = p >= lockAt;
      g[top + row][left + i] = locked ? ch : SCRAMBLE[Math.floor(hash(i, row, tick) * SCRAMBLE.length)];
      if (!locked) hot.add(`${left + i},${top + row}`);
    }
  });
  const pct = Math.min(100, Math.round((p / 0.62) * 100));
  const bar = `fields ${Math.min(7, Math.floor(pct / 14.3))}/7   ${"█".repeat(Math.round(pct / 5)).padEnd(20, "░")} ${String(pct).padStart(3)}%`;
  put(g, left, ROWS - 2, bar);
  return { grid: g, hot };
}

export function model(t) {
  const out = Array(COLS * ROWS).fill(" ");
  const z = new Float32Array(COLS * ROWS);
  const A = t * 0.9, B = t * 0.45;
  const cA = Math.cos(A), sA = Math.sin(A), cB = Math.cos(B), sB = Math.sin(B);
  const lum = ".,-~:;=!*#$@";
  const hot = new Set();
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
  const g = Array.from({ length: ROWS }, (_, r) => out.slice(r * COLS, r * COLS + COLS));
  // brightest highlights go red
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) if (g[y][x] === "@") hot.add(`${x},${y}`);
  const epoch = 1 + (Math.floor(t / 0.35) % 40);
  const loss = (0.9 * Math.exp(-epoch / 9) + 0.04).toFixed(3);
  put(g, 1, 0, `epoch ${String(epoch).padStart(2, "0")}/40`);
  const ls = `loss ${loss}`;
  put(g, COLS - ls.length - 1, 0, ls);
  for (let i = 0; i < ls.length; i++) hot.add(`${COLS - ls.length - 1 + i},0`);
  return { grid: g, hot };
}

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
export function ship(t, cycle = 6) {
  const g = blank();
  const hot = new Set();
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
    for (let i = 0; i < row.length; i++) if (row[i] !== " ") hot.add(`${rx + i},${ry + ROCKET.length + f}`);
  }
  const p = Math.min(1, t / cycle);
  const pct = Math.round(p * 100);
  put(g, 2, ROWS - 1, `deploy > prod  ${"█".repeat(Math.round(p * 24)).padEnd(24, "░")} ${String(pct).padStart(3)}%`);
  return { grid: g, hot };
}

export const SCENES = { noise, parse, model, ship };

/**
 * Draw a character grid with a monospace font, batched per row and colour
 * (one fillText per row per colour) so each frame stays fast.
 */
export function drawGrid(ctx, { grid, hot }, x, y, fs, base, accent, lineH = 1.12) {
  setFont(ctx, fs, { mono: true, weight: 400, track: 0 });
  ctx.textBaseline = "top";
  const rows = grid.length;
  for (let r = 0; r < rows; r++) {
    let a = "", b = "";
    const row = grid[r];
    for (let c = 0; c < row.length; c++) {
      const ch = row[c];
      if (hot && hot.has(`${c},${r}`)) { a += " "; b += ch; } else { a += ch; b += " "; }
    }
    ctx.fillStyle = base;
    ctx.fillText(a, x, y + r * fs * lineH);
    if (b.trim()) {
      ctx.fillStyle = accent;
      ctx.fillText(b, x, y + r * fs * lineH);
    }
  }
  ctx.textBaseline = "alphabetic";
}

/** Full-frame ambient ASCII field. Two alpha passes, one fillText per row per pass. */
export function field(ctx, W, H, t, { color = "10,10,10", alpha = [0.035, 0.07], cell = 22, focus = null, focusColor = "225,6,0" } = {}) {
  const cw = cell * 0.6, ch = cell * 1.25;
  const cols = Math.ceil(W / cw) + 1, rows = Math.ceil(H / ch) + 1;
  const set = " .·:-=+*";
  setFont(ctx, cell, { mono: true, weight: 400, track: 0 });
  ctx.textBaseline = "top";
  const time = t * 0.45;
  for (let r = 0; r < rows; r++) {
    let lo = "", hi = "", fx = "";
    for (let c = 0; c < cols; c++) {
      const v = Math.sin(c * 0.11 + time * 1.3) + Math.cos(r * 0.17 - time) + Math.sin((c + r) * 0.05 + time * 1.7) * 0.8;
      const n = (v + 2.8) / 5.6;
      let g = " ";
      if (n > 0.46) g = set[Math.min(set.length - 1, Math.floor((n - 0.46) * 16))];
      let isF = false;
      if (focus && g !== " ") {
        const dx = c * cw - focus.x, dy = r * ch - focus.y;
        isF = dx * dx + dy * dy < focus.r * focus.r;
      }
      if (isF) { fx += g; lo += " "; hi += " "; }
      else if (n > 0.62) { hi += g; lo += " "; fx += " "; }
      else { lo += g; hi += " "; fx += " "; }
    }
    ctx.fillStyle = `rgba(${color},${alpha[0]})`;
    ctx.fillText(lo, 0, r * ch);
    ctx.fillStyle = `rgba(${color},${alpha[1]})`;
    ctx.fillText(hi, 0, r * ch);
    if (focus && fx.trim()) {
      ctx.fillStyle = `rgba(${focusColor},0.8)`;
      ctx.fillText(fx, 0, r * ch);
    }
  }
  ctx.textBaseline = "alphabetic";
}
