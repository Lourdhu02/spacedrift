// Scenes. Signature: draw(ctx, L, t, d, o) with t = local seconds, d = scene
// duration. audio(d, o) returns cue events in local time for the synth.
import {
  WHITE, INK, RED, ink, wht, seg, expo, cubicIO, clamp, hash, lerp,
  setFont, measure, rich, decodeSegs, fitSize, rect, strokeRect, hline, vline, mark,
} from "./core.mjs";
import { SCENES, drawGrid, field, COLS, ROWS } from "./ascii.mjs";

const tickOf = (t) => Math.floor(t * 30);

/* ── shared pieces ─────────────────────────────────────────────── */

export function background(ctx, L, t, dark, { fieldAlpha = 1 } = {}) {
  rect(ctx, 0, 0, L.W, L.H, dark ? INK : WHITE);
  // Swiss column guides, aligned to the safe area
  const col = dark ? wht(0.06) : ink(0.05);
  const w = L.cw / L.cols;
  for (let i = 0; i <= L.cols; i++) vline(ctx, L.safe.left + i * w, 0, L.H, col, 1);
  field(ctx, L.W, L.H, t, {
    color: dark ? "255,255,255" : "10,10,10",
    alpha: dark ? [0.05 * fieldAlpha, 0.09 * fieldAlpha] : [0.03 * fieldAlpha, 0.06 * fieldAlpha],
    cell: 22 * L.u,
  });
}

export function chrome(ctx, L, gt, dark) {
  const y = L.safe.top + 22 * L.u;
  setFont(ctx, 21 * L.u, { mono: true, weight: 500 });
  ctx.textAlign = "left";
  // tiny mark + url (mark() changes fillStyle, so set colour after it)
  mark(ctx, L.safe.left, y - 17 * L.u, 20 * L.u, { base: dark ? WHITE : INK });
  ctx.fillStyle = dark ? WHITE : INK;
  ctx.fillText("SPACEDRIFT.IN", L.safe.left + 34 * L.u, y);
  const s = Math.floor(gt);
  const tc = `T+00:${String(s).padStart(2, "0")}`;
  ctx.textAlign = "right";
  ctx.fillStyle = dark ? wht(0.6) : ink(0.55);
  ctx.fillText(tc, L.safe.right, y);
  const blink = Math.floor(gt * 2) % 2 === 0;
  if (blink) rect(ctx, L.safe.right - measure(ctx, tc) - 22 * L.u, y - 12 * L.u, 10 * L.u, 10 * L.u, RED);
  ctx.textAlign = "left";
  hline(ctx, L.safe.left, y + 22 * L.u, L.cw, dark ? wht(0.14) : ink(0.12), Math.max(1, L.u * 1.5));
}

/** Multi-line headline with staggered glyph decode. lines: [[{t,c}]] */
function headline(ctx, L, lines, x, y, size, p, t, { lh = 0.96, align = "left", seed = 1, scramble = RED } = {}) {
  setFont(ctx, size, { weight: 600 });
  const n = lines.length;
  lines.forEach((segs, k) => {
    const pk = seg(p, (k / n) * 0.45, (k / n) * 0.45 + 0.55);
    if (pk <= 0) return;
    const shown = pk >= 1 ? segs : decodeSegs(segs, pk, tickOf(t), seed + k, scramble);
    rich(ctx, shown, x, y + size * 0.8 + k * size * lh, { align });
  });
  return y + size * 0.8 + (n - 1) * size * lh + size * 0.22;
}

function label(ctx, L, str, x, y, { color = RED, size = 22, p = 1, align = "left" } = {}) {
  setFont(ctx, size * L.u, { mono: true, weight: 500 });
  ctx.fillStyle = color;
  ctx.textAlign = align;
  const n = Math.round(clamp(p) * str.length);
  ctx.fillText(str.slice(0, n), x, y);
  ctx.textAlign = "left";
}

/** Ink terminal panel holding an ASCII scene. Returns height. */
function panelHeight(w, u) {
  const fs = (w - 44 * u) / (COLS * 0.6);
  return 64 * u + ROWS * fs * 1.12 + 62 * u;
}
function panel(ctx, L, x, y, w, data, title, caption, t) {
  const u = L.u;
  const h = panelHeight(w, u);
  rect(ctx, x, y, w, h, INK);
  // header: three squares + title
  rect(ctx, x + 22 * u, y + 24 * u, 12 * u, 12 * u, RED);
  rect(ctx, x + 42 * u, y + 24 * u, 12 * u, 12 * u, wht(0.2));
  rect(ctx, x + 62 * u, y + 24 * u, 12 * u, 12 * u, wht(0.2));
  label(ctx, L, title, x + w - 22 * u, y + 37 * u, { color: wht(0.6), size: 19, align: "right" });
  hline(ctx, x + 22 * u, y + 56 * u, w - 44 * u, wht(0.12), Math.max(1, u * 1.5));
  const fs = (w - 44 * u) / (COLS * 0.6);
  drawGrid(ctx, data, x + 22 * u, y + 68 * u, fs, WHITE, RED);
  const fy = y + h - 22 * u;
  hline(ctx, x + 22 * u, fy - 30 * u, w - 44 * u, wht(0.12), Math.max(1, u * 1.5));
  label(ctx, L, caption, x + 22 * u, fy, { color: wht(0.55), size: 18 });
  const on = Math.floor(t * 2) % 2 === 0;
  if (on) rect(ctx, x + w - 92 * u, fy - 12 * u, 10 * u, 10 * u, RED);
  label(ctx, L, "LIVE", x + w - 22 * u, fy, { color: wht(0.55), size: 18, align: "right" });
  return h;
}

/* ── 1 · HOOK ───────────────────────────────────────────────────── */

const HOOK_LINES = {
  portrait: [
    [{ t: "Most AI", c: INK }],
    [{ t: "projects", c: INK }],
    [{ t: "die in the", c: INK }],
    [{ t: "noise.", c: RED }],
  ],
  landscape: [
    [{ t: "Most AI projects", c: INK }],
    [{ t: "die in the ", c: INK }, { t: "noise.", c: RED }],
  ],
};

export const hook = {
  dark: (t, d) => t < d * 0.5,
  chrome: (t, d) => t >= d * 0.5,
  draw(ctx, L, t, d) {
    const k = d / 3;
    const cut = 1.5 * k;
    const cx = L.W / 2, cy = L.portrait ? L.H * 0.47 : L.H / 2;
    if (t < cut) {
      rect(ctx, 0, 0, L.W, L.H, INK);
      // noise floods outward from the cursor
      const diag = Math.hypot(L.W, L.H) * 0.62;
      const r = expo(seg(t, 0.22 * k, 1.42 * k)) * diag;
      const cell = 26 * L.u, cw = cell * 0.6, ch = cell * 1.2;
      setFont(ctx, cell, { mono: true, weight: 400, track: 0 });
      ctx.textBaseline = "top";
      const rows = Math.ceil(L.H / ch), cols = Math.ceil(L.W / cw);
      const tick = Math.floor(t * 24);
      const RAMP = ".:-=+*#%@";
      for (let row = 0; row < rows; row++) {
        let w = "", red = "";
        for (let c = 0; c < cols; c++) {
          const dx = c * cw - cx, dy = row * ch - cy;
          const dist = Math.hypot(dx, dy);
          let g = " ";
          if (dist < r) {
            const v = hash(c, row, tick);
            if (v > 0.25) g = RAMP[Math.floor(v * RAMP.length) % RAMP.length];
          }
          if (g !== " " && r - dist < 90 * L.u) { red += g; w += " "; } else { w += g; red += " "; }
        }
        ctx.fillStyle = wht(0.55);
        ctx.fillText(w, 0, row * ch);
        ctx.fillStyle = RED;
        ctx.fillText(red, 0, row * ch);
      }
      ctx.textBaseline = "alphabetic";
      const blink = t < 0.12 * k || t > 0.22 * k;
      if (blink) rect(ctx, cx - 18 * L.u, cy - 18 * L.u, 36 * L.u, 36 * L.u, RED);
      return;
    }
    background(ctx, L, t, false);
    const lines = L.portrait ? HOOK_LINES.portrait : HOOK_LINES.landscape;
    const maxW = L.cw;
    const size = fitSize(ctx, lines, maxW, (L.portrait ? 210 : 190) * L.u);
    const n = lines.length;
    const blockH = size * 0.96 * (n - 1) + size;
    const top = (L.tall ? L.safe.top + (L.safe.bottom - L.safe.top) * 0.46 : L.H / 2) - blockH / 2;
    label(ctx, L, "WHY AI PROJECTS FAIL", L.safe.left, top - 30 * L.u, { p: seg(t, cut, cut + 0.3 * k) });
    const p = seg(t, cut, cut + 0.75 * k);
    const bottom = headline(ctx, L, lines, L.safe.left, top, size, p, t);
    // underline sweep under "noise."
    const u = seg(t, 2.0 * k, 2.35 * k);
    if (u > 0) {
      setFont(ctx, size, { weight: 600 });
      const last = lines[n - 1];
      const pre = last.slice(0, -1).map((s) => s.t).join("");
      const x0 = L.safe.left + measure(ctx, pre);
      const w = measure(ctx, last[last.length - 1].t) * 0.94;
      rect(ctx, x0, bottom - 2 * L.u, w * expo(u), 12 * L.u, RED);
    }
  },
  audio(d) {
    const k = d / 3;
    return [
      { t: 0, type: "click" },
      { t: 0.22 * k, type: "click" },
      { t: 0.25 * k, type: "static", dur: 1.25 * k },
      { t: 1.5 * k, type: "hit" },
      { t: 1.5 * k, type: "glitch", dur: 0.7 * k },
      { t: 2.0 * k, type: "bass" },
    ];
  },
};

/* ── 2 · PROBLEM ─────────────────────────────────────────────── */

const CARDS = [
  { t: "Loose scope.", n: "01" },
  { t: "Messy data.", n: "02" },
  { t: "Nobody owns the build.", nl: ["Nobody owns", "the build."], n: "03" },
];

function scopeIllo(ctx, L, x, y, w, h, t) {
  const u = L.u;
  strokeRect(ctx, x, y, w, h * 0.62, INK, 3 * u);
  label(ctx, L, "SCOPE.md", x + 18 * u, y - 14 * u, { color: INK, size: 20 });
  const items = ["- a chatbot", "- maybe OCR", "- also a dashboard", "- and a mobile app?", "- plus the ML model", "- due friday", "- budget: tbd"];
  const shown = Math.min(items.length, Math.floor(t / 0.2) + 1);
  const fs = Math.min(42 * u, w / 22);
  setFont(ctx, fs, { mono: true, weight: 400, track: 0 });
  for (let i = 0; i < shown; i++) {
    const yy = y + 58 * u + i * fs * 1.35;
    const inside = yy < y + h * 0.62 - 12 * u;
    ctx.fillStyle = inside ? INK : RED;
    ctx.fillText(items[i], x + 26 * u, yy);
  }
}

function dataIllo(ctx, L, x, y, w, h, t) {
  const u = L.u;
  const cols = 4, rows = 6;
  const cwid = w / cols, rh = Math.min(h / rows, 118 * u);
  const head = ["id", "vendor", "total", "date"];
  const bad = ["NaN", "null", "??", "#REF!", "—", "N/A"];
  const fs = Math.min(36 * u, cwid / 7.2);
  setFont(ctx, fs, { mono: true, weight: 400, track: 0 });
  for (let r = 0; r <= rows; r++) hline(ctx, x, y + r * rh, w, r === 1 ? INK : ink(0.2), r === 1 ? 3 * u : 1.5 * u);
  for (let c = 0; c <= cols; c++) vline(ctx, x + c * cwid, y, rh * rows, ink(0.2), 1.5 * u);
  const tick = Math.floor(t * 8);
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      let s, col = INK;
      if (r === 0) { s = head[c]; setFont(ctx, fs, { mono: true, weight: 600, track: 0 }); }
      else {
        setFont(ctx, fs, { mono: true, weight: 400, track: 0 });
        const v = hash(r, c, tick);
        if (v < 0.3) { s = bad[Math.floor(hash(c, r, tick) * bad.length)]; col = RED; }
        else s = c === 0 ? String(1000 + Math.floor(v * 9000)) : c === 2 ? (v * 99999).toFixed(0) : c === 3 ? `0${1 + (tick % 9)}/1${r}/2?` : ["Kaveri", "kaveri tr.", "KAVERI", "Kaveri T"][Math.floor(v * 4)];
      }
      ctx.fillStyle = col;
      ctx.fillText(s, x + c * cwid + 14 * u, y + r * rh + rh * 0.64);
    }
}

function ownerIllo(ctx, L, x, y, w, h, t) {
  const u = L.u;
  const bw = Math.min(250 * u, w * 0.36), bh = 86 * u;
  const cx = x + w / 2, cy = y + h / 2;
  const rx = w / 2 - bw / 2, ry = h / 2 - bh / 2 - 10 * u;
  const pts = [
    { x: cx, y: cy - ry, l: "sales" },
    { x: cx + rx, y: cy, l: "PM" },
    { x: cx, y: cy + ry, l: "vendor" },
    { x: cx - rx, y: cy, l: "dev" },
  ];
  // loop path
  ctx.strokeStyle = ink(0.35);
  ctx.lineWidth = 3 * u;
  ctx.setLineDash([10 * u, 10 * u]);
  ctx.beginPath();
  pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
  ctx.closePath();
  ctx.stroke();
  ctx.setLineDash([]);
  for (const p of pts) {
    rect(ctx, p.x - bw / 2, p.y - bh / 2, bw, bh, WHITE);
    strokeRect(ctx, p.x - bw / 2, p.y - bh / 2, bw, bh, INK, 3 * u);
    setFont(ctx, 36 * u, { weight: 600 });
    ctx.fillStyle = INK;
    ctx.textAlign = "center";
    ctx.fillText(p.l, p.x, p.y + 12 * u);
  }
  // token passing around the loop, forever
  const q = (t * 1.6) % 4, i0 = Math.floor(q), f = cubicIO(q - i0);
  const a = pts[i0], b = pts[(i0 + 1) % 4];
  const tx = lerp(a.x, b.x, f), ty = lerp(a.y, b.y, f);
  rect(ctx, tx - 14 * u, ty - 14 * u, 28 * u, 28 * u, RED);
  setFont(ctx, 30 * u, { mono: true, weight: 500, track: 0.02 });
  ctx.fillStyle = RED;
  ctx.fillText("owner: ?", cx, cy + 10 * u);
  ctx.textAlign = "left";
}

export const problem = {
  dark: () => false,
  chrome: () => true,
  draw(ctx, L, t, d) {
    background(ctx, L, t, false);
    const u = L.u;
    const cardDur = (d - 1) / 3;
    if (t >= d - 1) return collapse(ctx, L, t - (d - 1), 1);
    const i = Math.floor(t / cardDur), tc = t - i * cardDur;
    const card = CARDS[i];
    const lines = (L.portrait && card.nl ? card.nl : [card.t]).map((s) => [{ t: s, c: INK }]);
    const leftW = L.portrait ? L.cw : L.cw * 0.46;
    const size = fitSize(ctx, lines, leftW, (L.portrait ? 150 : 120) * u);
    const top = L.top + (L.tall ? 90 : 40) * u;
    label(ctx, L, `PROBLEM ${card.n} / 03`, L.safe.left, top, { p: seg(tc, 0, 0.25) });
    const hy = top + 24 * u;
    const bottom = headline(ctx, L, lines, L.safe.left, hy, size, seg(tc, 0, 0.45), t, { seed: i * 7 });
    // red strike-through
    const s = expo(seg(tc, cardDur * 0.62, cardDur * 0.78));
    if (s > 0) {
      setFont(ctx, size, { weight: 600 });
      lines.forEach((l, k) => {
        const w = measure(ctx, l[0].t);
        rect(ctx, L.safe.left, hy + size * 0.52 + k * size * 0.96, w * s, 11 * u, RED);
      });
    }
    // illustration area
    let ix, iy, iw, ih;
    if (L.portrait) {
      ix = L.safe.left; iy = bottom + (L.tall ? 90 : 50) * u; iw = L.cw; ih = (L.safe.bottom - iy) - 20 * u;
      ih = Math.min(ih, iw * 0.85);
    } else {
      ix = L.safe.left + L.cw * 0.54; iy = L.top + 60 * u; iw = L.cw * 0.46; ih = L.safe.bottom - iy - 30 * u;
    }
    const appear = expo(seg(tc, 0.15, 0.55));
    ctx.save();
    ctx.globalAlpha = appear;
    ctx.translate(0, (1 - appear) * 40 * u);
    if (i === 0) scopeIllo(ctx, L, ix, iy + 20 * u, iw, ih, tc);
    else if (i === 1) dataIllo(ctx, L, ix, iy, iw, ih, tc);
    else ownerIllo(ctx, L, ix, iy, iw, ih, tc);
    ctx.restore();
  },
  audio(d) {
    const cardDur = (d - 1) / 3;
    const ev = [];
    for (let i = 0; i < 3; i++) {
      const s = i * cardDur;
      ev.push({ t: s, type: "hit" }, { t: s, type: "glitch", dur: 0.4 }, { t: s + cardDur * 0.62, type: "tick" });
      if (i === 0) for (let j = 1; j < 7; j++) ev.push({ t: s + j * 0.2, type: "click", gain: 0.5 });
      if (i === 2) for (let j = 0; j < 3; j++) ev.push({ t: s + 0.3 + j * 0.625, type: "click", gain: 0.6 });
    }
    ev.push({ t: d - 1, type: "rwhoosh", dur: 0.5 }, { t: d - 0.5, type: "hit", gain: 0.7 });
    return ev;
  },
};

function collapse(ctx, L, t, d) {
  const u = L.u;
  const p = cubicIO(seg(t, 0, 0.5));
  const cx = L.W / 2, cy = L.portrait ? L.H * 0.44 : L.H / 2;
  const w0 = L.cw, h0 = L.safe.bottom - L.top;
  const w = lerp(w0, 44 * u, p), h = lerp(h0, 44 * u, p);
  if (p < 1) strokeRect(ctx, cx - w / 2, cy - h / 2, w, h, RED, 6 * u);
  else rect(ctx, cx - 22 * u, cy - 22 * u, 44 * u, 44 * u, RED);
  const q = seg(t, 0.45, 0.85);
  if (q > 0) {
    const lines = [[{ t: "There's a ", c: INK }, { t: "better way.", c: RED }]];
    const size = fitSize(ctx, lines, L.cw, 96 * u);
    headline(ctx, L, lines, cx, cy + 50 * u, size, q, t, { align: "center" });
  }
}

/* ── 3 · STATIONS ───────────────────────────────────────────── */

export const STATIONS = [
  { n: "01", name: "Noise", kind: "noise", title: "We listen before we build.", out: "A clear go / no-go after one call", when: "DAY 0", cap: "RAW INPUT · LABELLING" },
  { n: "02", name: "Parse", kind: "parse", title: "Scope, written down.", out: "Signed scope and a fixed price", when: "WITHIN 24H", cap: "EXTRACT → STRUCTURED JSON" },
  { n: "03", name: "Model", kind: "model", title: "Build against the scope.", out: "Weekly previews with real metrics", when: "BUILD WEEKS", cap: "MODEL.FIT() · EVALS" },
  { n: "04", name: "Ship", kind: "ship", title: "Hand it over, fully.", out: "Code, docs and 30-day support", when: "HANDOFF", cap: "DEPLOY → YOUR ACCOUNTS" },
];

function rail(ctx, L, idx, prog) {
  const u = L.u;
  const y = L.top + 4 * u;
  const gap = 12 * u;
  const w = (L.cw - gap * 3) / 4;
  STATIONS.forEach((s, i) => {
    const x = L.safe.left + i * (w + gap);
    rect(ctx, x, y, w, 8 * u, ink(0.1));
    if (i < idx) rect(ctx, x, y, w, 8 * u, INK);
    if (i === idx) rect(ctx, x, y, w * prog, 8 * u, RED);
    label(ctx, L, `${s.n} ${s.name.toUpperCase()}`, x, y + 36 * u, { color: i === idx ? RED : i < idx ? INK : ink(0.4), size: 18 });
  });
  return y + 60 * u;
}

export const station = {
  dark: () => false,
  chrome: () => true,
  draw(ctx, L, t, d, o) {
    const S = STATIONS[o.i];
    const u = L.u;
    const mode = d >= 4 ? "full" : d >= 1 ? "compact" : "flash";
    background(ctx, L, t, false);
    const railBottom = rail(ctx, L, o.i, seg(t, 0, d));
    const scale = mode === "full" ? 1 : mode === "compact" ? 0.45 : 0.2;
    const tl = (x) => x * scale;

    const leftW = L.portrait ? L.cw : L.cw * 0.44;
    let y = railBottom + (L.tall ? 60 : 30) * u;
    label(ctx, L, `STATION ${S.n} · ${S.when}`, L.safe.left, y, { p: seg(t, 0, tl(0.35)) });
    const nameLines = [[{ t: S.name, c: INK }]];
    const nameSize = fitSize(ctx, nameLines, leftW, (L.portrait ? (L.tall ? 250 : 200) : 210) * u);
    y = headline(ctx, L, nameLines, L.safe.left - nameSize * 0.04, y + 14 * u, nameSize, seg(t, tl(0.08), tl(0.55)), t, { seed: 11 + o.i });

    // flash cuts (0.4s) skip the title and go straight to the live terminal
    if (mode !== "flash") {
      const titleLines = [[{ t: S.title, c: INK }]];
      const tsize = fitSize(ctx, titleLines, leftW, (L.portrait ? 64 : 54) * u);
      y = headline(ctx, L, titleLines, L.safe.left, y + 4 * u, tsize, seg(t, tl(0.45), tl(1.0)), t, { seed: 21 + o.i });
    }

    // panel
    const st = mode === "full" ? t : 3.6 + t; // compact cuts show the finished state
    const data = S.kind === "parse" ? SCENES.parse(st, mode === "full" ? d * 0.8 : 4)
      : S.kind === "ship" ? SCENES.ship(st, mode === "full" ? d * 0.85 : 4)
      : SCENES[S.kind](st);
    const outH = 90 * u;
    let px, py, pw;
    if (L.portrait) {
      const avail = L.safe.bottom - (y + 40 * u) - (mode === "full" ? outH : 0);
      pw = L.cw;
      while (panelHeight(pw, u) > avail && pw > 400 * u) pw -= 20 * u;
      px = L.safe.left + (L.cw - pw) / 2;
      py = y + (L.tall ? 50 : 34) * u;
    } else {
      pw = L.cw * 0.5;
      const avail = L.safe.bottom - railBottom - 40 * u;
      while (panelHeight(pw, u) > avail && pw > 400 * u) pw -= 20 * u;
      px = L.safe.right - pw;
      py = railBottom + 30 * u + (avail - panelHeight(pw, u)) / 2;
    }
    const pin = mode === "flash" ? 1 : expo(seg(t, tl(0.3), tl(0.9)));
    const ph = panelHeight(pw, u);
    ctx.save();
    ctx.translate(0, (1 - pin) * 60 * u);
    panel(ctx, L, px, py, pw, data, `${S.name.toUpperCase()} · STATION ${S.n}`, S.cap, t);
    ctx.restore();

    if (mode !== "full") return;

    // "You get" line
    const g = expo(seg(t, 4.2, 4.7));
    if (g > 0) {
      const gy = L.portrait ? py + ph + 70 * u : y + 70 * u;
      ctx.save();
      ctx.globalAlpha = g;
      ctx.translate(0, (1 - g) * 26 * u);
      label(ctx, L, "YOU GET →", L.safe.left, gy, { color: RED, size: 22 });
      setFont(ctx, (L.portrait ? 46 : 42) * u, { weight: 560 });
      ctx.fillStyle = INK;
      ctx.fillText(S.out, L.safe.left, gy + 54 * u);
      ctx.restore();
    }
    // Parse: fixed-price stamp
    if (S.kind === "parse") {
      const s = seg(t, 5.2, 5.38);
      if (s > 0) {
        const sc = lerp(1.35, 1, expo(s));
        const sw = 330 * u, sh = 92 * u;
        const sx = px + pw - sw - 26 * u, sy = py + 80 * u;
        ctx.save();
        ctx.translate(sx + sw / 2, sy + sh / 2);
        ctx.scale(sc, sc);
        rect(ctx, -sw / 2, -sh / 2, sw, sh, RED);
        setFont(ctx, 40 * u, { mono: true, weight: 600, track: 0.08 });
        ctx.fillStyle = WHITE;
        ctx.textAlign = "center";
        ctx.fillText("FIXED PRICE", 0, 14 * u);
        ctx.textAlign = "left";
        ctx.restore();
      }
    }
  },
  audio(d, o) {
    const full = d >= 4;
    const ev = [{ t: 0, type: "hit" }, { t: 0.05, type: "glitch", dur: full ? 0.5 : 0.2 }];
    if (full) {
      ev.push({ t: 0.45, type: "glitch", dur: 0.5, gain: 0.6 }, { t: 4.2, type: "tick" });
      if (STATIONS[o.i].kind === "parse") ev.push({ t: 5.2, type: "stamp" });
      if (STATIONS[o.i].kind === "ship") ev.push({ t: 1.2, type: "riser", dur: 3.6, gain: 0.5 });
    }
    return ev;
  },
};

/* ── 4 · SERVICES ───────────────────────────────────────────── */

const SERVICES = [
  { n: "01", t: "Research Ops", k: "research" },
  { n: "02", t: "Document AI & OCR", k: "doc" },
  { n: "03", t: "RAG & AI MVPs", k: "rag" },
  { n: "04", t: "Data Annotation", k: "label" },
  { n: "05", t: "Web Development", k: "web" },
  { n: "06", t: "Mobile Apps", k: "mobile" },
];

function micro(ctx, L, k, x, y, w, h, t, on) {
  const u = L.u;
  const hi = on ? RED : INK;
  setFont(ctx, 22 * u, { mono: true, weight: 400, track: 0 });
  ctx.fillStyle = INK;
  if (k === "research") {
    // loss curve of dots, with a red head
    const n = 22;
    for (let i = 0; i < n; i++) {
      const px = x + (i / (n - 1)) * w;
      const py = y + h * (0.1 + 0.8 * (1 - Math.exp(-i / 5)));
      const head = i === Math.floor((t * 8) % n);
      rect(ctx, px - 4 * u, py - 4 * u, 8 * u, 8 * u, head ? hi : ink(0.5));
    }
  } else if (k === "doc") {
    for (let i = 0; i < 5; i++) rect(ctx, x, y + i * (h / 5), w * (0.5 + hash(i, 2) * 0.5), 8 * u, ink(0.25));
    const sy = y + ((t * 0.9) % 1) * h;
    rect(ctx, x - 6 * u, sy, w + 12 * u, 3 * u, hi);
    ctx.fillStyle = hi;
    ctx.fillText("total 48,210", x, y + h + 26 * u);
  } else if (k === "rag") {
    ctx.fillText("> refund policy?", x, y + 22 * u);
    const lines = ["[1] policy.pdf p4", "[2] faq.md", "[3] #ops thread"];
    const n = Math.floor((t * 3) % 4);
    lines.slice(0, n).forEach((l, i) => { ctx.fillStyle = i === 0 ? hi : ink(0.7); ctx.fillText(l, x, y + 22 * u + (i + 1) * 30 * u); });
  } else if (k === "label") {
    for (let i = 0; i < 40; i++) {
      const px = x + hash(i, 1) * w, py = y + hash(i, 2) * h;
      rect(ctx, px, py, 5 * u, 5 * u, ink(0.35));
    }
    const s = expo(((t * 0.8) % 1) * 2 > 1 ? 1 : ((t * 0.8) % 1) * 2);
    const bw = lerp(w, w * 0.45, s), bh = lerp(h, h * 0.55, s);
    strokeRect(ctx, x + w * 0.3 - bw * 0.3 + w * 0.05, y + h * 0.2, bw, bh, hi, 3 * u);
    ctx.fillStyle = hi;
    ctx.fillText("cell 0.97", x + w * 0.08, y + h * 0.2 - 8 * u);
  } else if (k === "web") {
    strokeRect(ctx, x, y, w, h, INK, 2 * u);
    for (let i = 0; i < 3; i++) rect(ctx, x + 12 * u + i * 16 * u, y + 12 * u, 9 * u, 9 * u, i === 0 ? hi : ink(0.3));
    hline(ctx, x, y + 32 * u, w, ink(0.2), 2 * u);
    const p = (t * 0.7) % 1;
    const barY = y + h - 18 * u;
    rect(ctx, x + 12 * u, barY, (w - 24 * u) * expo(p), 8 * u, hi);
    // label sits between the tab bar and the progress bar; skip it if the tile is too short
    if (h > 96 * u) {
      ctx.fillStyle = INK;
      ctx.fillText("LCP 0.9s", x + 12 * u, Math.min(y + 66 * u, barY - 14 * u));
    }
  } else if (k === "mobile") {
    const pw = Math.min(w * 0.42, h * 0.56), px = x + (w - pw) / 2;
    strokeRect(ctx, px, y, pw, h, INK, 3 * u);
    ctx.save();
    ctx.beginPath();
    ctx.rect(px + 6 * u, y + 18 * u, pw - 12 * u, h - 36 * u);
    ctx.clip();
    const off = (t * 60 * u) % (40 * u);
    for (let i = -1; i < 8; i++) {
      const cy = y + 22 * u + i * 40 * u - off;
      rect(ctx, px + 12 * u, cy, pw - 24 * u, 28 * u, i === 2 ? hi : ink(0.18));
    }
    ctx.restore();
  }
}

export const services = {
  dark: () => false,
  chrome: () => true,
  draw(ctx, L, t, d) {
    const u = L.u;
    const full = d >= 5;
    background(ctx, L, t, false);
    const lines = [[{ t: "Six things ", c: INK }, { t: "we do well.", c: RED }]];
    const plines = [[{ t: "Six things", c: INK }], [{ t: "we do well.", c: RED }]];
    const use = L.portrait ? plines : lines;
    const size = fitSize(ctx, use, L.portrait ? L.cw : L.cw * 0.9, (L.portrait ? 130 : 110) * u);
    const top = L.top + (L.tall ? 50 : 20) * u;
    label(ctx, L, "SERVICES · FIXED SCOPE", L.safe.left, top, { p: seg(t, 0, 0.3) });
    const bottom = headline(ctx, L, use, L.safe.left, top + 20 * u, size, seg(t, 0, full ? 0.6 : 0.35), t, { seed: 41 });
    const cols = L.portrait ? 2 : 3, rows = 6 / cols;
    const gap = 16 * u;
    const gy = bottom + 36 * u;
    const gh = L.safe.bottom - gy;
    const tw = (L.cw - gap * (cols - 1)) / cols;
    const th = Math.min((gh - gap * (rows - 1)) / rows, tw * 1.05);
    const hIdx = full ? Math.floor(seg(t, 3.2, d - 0.4) * 6 - 1e-9) : -1;
    SERVICES.forEach((s, i) => {
      const a = expo(seg(t, (full ? 0.6 : 0.3) + i * (full ? 0.35 : 0.12), (full ? 1.1 : 0.6) + i * (full ? 0.35 : 0.12)));
      if (a <= 0) return;
      const c = i % cols, r = Math.floor(i / cols);
      const x = L.safe.left + c * (tw + gap), y = gy + r * (th + gap) + (1 - a) * 50 * u;
      const on = i === hIdx;
      rect(ctx, x, y, tw, th, WHITE);
      strokeRect(ctx, x, y, tw, th, on ? INK : ink(0.22), (on ? 3 : 2) * u);
      if (on) rect(ctx, x, y, 14 * u, 14 * u, RED);
      label(ctx, L, s.n, x + 24 * u, y + 44 * u, { color: on ? RED : ink(0.55), size: 20 });
      const ts = Math.min(44 * u, fitSize(ctx, [s.t], tw - 48 * u, 44 * u));
      setFont(ctx, ts, { weight: 600 });
      ctx.fillStyle = INK;
      ctx.fillText(s.t, x + 24 * u, y + 44 * u + ts * 1.25);
      const mx = x + 24 * u, my = y + 44 * u + ts * 1.25 + 34 * u, mw = tw - 48 * u, mh = Math.max(40 * u, y + th - my - 44 * u);
      micro(ctx, L, s.k, mx, my, mw, mh, t + i * 0.37, on);
    });
  },
  audio(d) {
    const full = d >= 5;
    const ev = [{ t: 0, type: "hit" }, { t: 0, type: "glitch", dur: full ? 0.6 : 0.35 }];
    for (let i = 0; i < 6; i++) ev.push({ t: (full ? 0.6 : 0.3) + i * (full ? 0.35 : 0.12), type: "click", gain: 0.7 });
    if (full) for (let i = 0; i < 6; i++) ev.push({ t: 3.2 + i * ((d - 3.6) / 6), type: "tick", gain: 0.6 });
    return ev;
  },
};

/* ── 5 · PROOF ─────────────────────────────────────────────── */

const STATS = [
  { v: 24, u: "h", l: "First reply to every inquiry" },
  { v: 3, u: "wk", l: "Typical AI MVP build" },
  { v: 30, u: "d", l: "Support after every handoff" },
  { v: 100, u: "%", l: "Code and IP handed to you" },
];

export const proof = {
  dark: () => false,
  chrome: () => true,
  draw(ctx, L, t, d) {
    const u = L.u;
    background(ctx, L, t, false);
    const top = L.top + (L.tall ? 60 : 30) * u;
    label(ctx, L, "THE NUMBERS · NO SMALL PRINT", L.safe.left, top, { p: seg(t, 0, 0.3) });
    const cols = L.portrait ? 2 : 4, rows = 4 / cols;
    // landscape: one row, centred in the frame instead of hugging the top
    const gy = L.portrait ? top + 40 * u : L.H / 2 - 190 * u;
    const gh = L.portrait ? (L.safe.bottom - gy) * (L.tall ? 0.86 : 1) : 420 * u;
    const cw = L.cw / cols, rh = gh / rows;
    STATS.forEach((s, i) => {
      const start = 0.35 + i * 0.9;
      const a = expo(seg(t, start, start + 0.4));
      if (a <= 0) return;
      const c = i % cols, r = Math.floor(i / cols);
      const x = L.safe.left + c * cw, y = gy + r * rh;
      hline(ctx, x, y, cw - 14 * u, INK, 3 * u);
      const val = Math.round(s.v * expo(seg(t, start, start + 0.7)));
      const ns = Math.min((L.portrait ? 230 : 190) * u, rh * 0.62);
      setFont(ctx, ns, { weight: 600, track: -0.055 });
      ctx.fillStyle = INK;
      const vx = x, vy = y + 30 * u + ns * 0.86 + (1 - a) * 30 * u;
      ctx.fillText(String(val), vx, vy);
      const w = measure(ctx, String(val));
      setFont(ctx, ns * 0.42, { weight: 600, track: -0.02 });
      ctx.fillStyle = RED;
      ctx.fillText(s.u, vx + w + 6 * u, vy);
      setFont(ctx, (L.portrait ? 30 : 26) * u, { weight: 450 });
      ctx.fillStyle = ink(0.7);
      ctx.fillText(s.l, x, vy + 54 * u);
    });
  },
  audio(d) {
    const ev = [{ t: 0, type: "hit", gain: 0.8 }];
    for (let i = 0; i < 4; i++) {
      const s = 0.35 + i * 0.9;
      for (let j = 0; j < 8; j++) ev.push({ t: s + j * 0.07 * (1 + j * 0.15), type: "click", gain: 0.45 });
    }
    ev.push({ t: d - 2.2, type: "riser", dur: 2.2 });
    return ev;
  },
};

/* ── 6 · END CARD ───────────────────────────────────────────── */

export const endcard = {
  dark: () => true,
  chrome: () => true,
  draw(ctx, L, t, d) {
    const u = L.u;
    const k = Math.min(1, d / 6);
    background(ctx, L, t, true, { fieldAlpha: 0.8 });
    const ms = (L.portrait ? 170 : 150) * u;
    let x = L.safe.left, y;
    if (L.tall) y = L.safe.top + 260 * u;
    else if (L.portrait) y = L.top + 90 * u;
    else y = L.top + 110 * u;
    const slide = expo(seg(t, 0.12 * k, 0.6 * k));
    const drift = expo(seg(t, 0.55 * k, 1.0 * k));
    if (slide > 0) mark(ctx, x, y, ms, { base: WHITE, accent: RED, slide, drift });
    // wordmark types on next to the mark
    const word = "spacedrift";
    const n = Math.round(seg(t, 0.9 * k, 1.45 * k) * word.length);
    const ws = ms * 0.78;
    setFont(ctx, ws, { weight: 600, track: -0.05 });
    ctx.fillStyle = WHITE;
    const wx = x + ms * 1.18, wy = y + ms * 0.93;
    ctx.fillText(word.slice(0, n), wx, wy);
    if (n === word.length) {
      const w = measure(ctx, word);
      rect(ctx, wx + w + 4 * u, wy - ws * 0.14, ws * 0.14, ws * 0.14, RED);
    }
    // headline
    const lines = [[{ t: "Now ", c: WHITE }, { t: "booking.", c: RED }]];
    const hs = fitSize(ctx, lines, L.cw, (L.portrait ? 190 : 170) * u);
    const hy = y + ms + (L.tall ? 170 : L.portrait ? 90 : 80) * u;
    const bottom = headline(ctx, L, lines, L.safe.left, hy, hs, seg(t, 1.6 * k, 2.1 * k), t, { seed: 77, scramble: RED });
    const c = expo(seg(t, 2.1 * k, 2.6 * k));
    if (c > 0) {
      ctx.save();
      ctx.globalAlpha = c;
      ctx.translate(0, (1 - c) * 24 * u);
      const ls = (L.portrait ? 44 : 40) * u;
      setFont(ctx, ls, { weight: 560 });
      ctx.fillStyle = WHITE;
      let yy = bottom + (L.tall ? 60 : 36) * u;
      ctx.fillText("Book a scoping call →", L.safe.left, yy);
      yy += ls * 1.5;
      setFont(ctx, (L.portrait ? 34 : 30) * u, { mono: true, weight: 500, track: 0 });
      ctx.fillStyle = RED;
      ctx.fillText("spacedrift.contact@gmail.com", L.safe.left, yy);
      yy += 56 * u;
      ctx.fillStyle = WHITE;
      ctx.fillText("spacedrift.in", L.safe.left, yy);
      ctx.restore();
    }
    const f = expo(seg(t, 2.5 * k, 3.0 * k));
    if (f > 0) {
      const fy = L.safe.bottom - 10 * u;
      hline(ctx, L.safe.left, fy - 48 * u, L.cw, wht(0.2), Math.max(1, 1.5 * u));
      ctx.save();
      ctx.globalAlpha = f;
      label(ctx, L, "LOURDU RAJU · ML ENGINEER · BENGALURU", L.safe.left, fy, { color: wht(0.62), size: L.portrait ? 22 : 20 });
      label(ctx, L, "REPLY IN 24H", L.safe.right, fy, { color: RED, size: L.portrait ? 22 : 20, align: "right" });
      ctx.restore();
    }
  },
  audio(d) {
    const k = Math.min(1, d / 6);
    const ev = [{ t: 0, type: "hit" }, { t: 0.12 * k, type: "whoosh", dur: 0.45 * k }, { t: 1.0 * k, type: "chime" }];
    for (let i = 0; i < 10; i++) ev.push({ t: 0.9 * k + i * (0.55 * k / 10), type: "click", gain: 0.5 });
    ev.push({ t: 1.6 * k, type: "glitch", dur: 0.5 * k, gain: 0.6 }, { t: 2.1 * k, type: "hit", gain: 0.5 });
    return ev;
  },
};
