// 05-linkedin-x-threads: three posts, each in three ratios.
//   landscape 1200×627  (LinkedIn link/feed image, 1.91:1)
//   landscape 1600×900  (X in-feed 16:9)
//   portrait  1080×1350 (LinkedIn, Threads and X portrait, 4:5)
// Landscapes are drawn on a 1200px-wide base and scaled; all exports are 4K-class.
import {
  page, field, label, headline, text, hline, bbox, term, termHeight, chips, arc, lockupInline, wordmarkInline,
  inkA, whiteA, INK, WHITE, RED, CONTACT, SERVICES, STATIONS,
} from "../lib/brand.mjs";
import { SCENES, model } from "../lib/ascii.mjs";
import { chrome } from "./common.mjs";

const M = 64;

/* ── 1. launch announcement ────────────────────────────────── */
function launch(W, H) {
  if (W / H < 1) {
    const g = model({ cols: 56, rows: 17 });
    const th = termHeight({ w: W - 160, grid: g, pad: 24, barSize: 17 });
    const body =
      field({ x: 0, y: 0, w: W, h: H, size: 14, seed: 21, clear: [[40, 150, W - 60, H - 250, 60]] }) +
      chrome({ W, H, tl: "spacedrift.in", tr: "Now open", mark: true, bl: "Bengaluru, India", br: "Reply within 24h" }) +
      term({ x: 80, y: 160, w: W - 160, grid: g, label: "model.fit() · epoch 03/40", pad: 24, barSize: 17 }) +
      label({ x: 80, y: 160 + th + 52, size: 20, color: RED, html: "ML &amp; AI engineering studio" }) +
      headline({ x: 76, y: 160 + th + 90, w: 940, size: 104, html: "We turn noise into<br>ML systems *that ship.*" });
    return page({ W, H, body });
  }
  const BH = H * (1200 / W), k = W / 1200;
  const g = model({ cols: 46, rows: Math.round(BH / 34) });
  const tw = 470;
  const inner =
    chrome({ W: 1200, H: BH, M, top: 84, bottom: BH - 70, tl: "spacedrift.in", tr: "Now open · Bengaluru", mark: true, size: 15 }) +
    label({ x: M, y: BH - 50, size: 15, html: "Research Ops · Document AI · RAG MVPs · Annotation · Web · Mobile" }) +
    label({ x: M, y: BH - 50, right: true, size: 15, color: RED, html: "spacedrift.in" }) +
    label({ x: M, y: 124, size: 16, color: RED, html: "ML &amp; AI engineering studio" }) +
    headline({ x: M - 3, y: 156, w: 620, size: 76, html: "We turn noise<br>into ML systems<br>*that ship.*" }) +
    text({ x: M, y: 156 + 76 * 0.94 * 3 + 30, w: 520, cls: "b", style: `font-size:21px;color:${inkA(0.72)}`, html: "Fixed scope. Fixed price. One engineer, accountable end to end." }) +
    term({ x: 1200 - M - tw, y: 116, w: tw, grid: g, label: "model.fit()", pad: 18, barSize: 12, stamp: { d: 10, color: RED } });
  return page({ W, H, body: `<div class="abs" style="left:0;top:0;width:1200px;height:${BH}px;transform:scale(${k});transform-origin:0 0">${inner}</div>` });
}

/* ── 2. a service: RAG & AI MVPs (ink) ─────────────────────── */
function service(W, H) {
  const sv = SERVICES[2];
  if (W / H < 1) {
    const g = SCENES.rag({ cols: 56, rows: 17 });
    const th = termHeight({ w: W - 160, grid: g, pad: 24, barSize: 17 });
    const ty = H - 112 - 40 - th;
    const body =
      field({ x: 0, y: 0, w: W, h: H, size: 14, tone: "white", seed: 22, clear: [[40, 130, W - 60, ty - 100, 60]] }) +
      chrome({ W, H, tl: "spacedrift.in", tr: "Service · 03 / 06", dark: true, bl: "RAG · Agents · Evals", br: "Fixed scope · Fixed price" }) +
      label({ x: 80, y: 168, size: 20, color: RED, html: "RAG &amp; AI MVPs · about three weeks" }) +
      headline({ x: 76, y: 206, w: 940, size: 100, color: WHITE, html: "AI that answers<br>from your data,<br>*not guesses.*" }) +
      term({ x: 80, y: ty, w: W - 160, grid: g, label: sv.cap, pad: 24, barSize: 17, style: `box-shadow:inset 0 0 0 1px ${whiteA(0.2)}` });
    return page({ W, H, bg: INK, body });
  }
  const BH = H * (1200 / W), k = W / 1200;
  const rows = BH > 650 ? 19 : 17;
  const g = SCENES.rag({ cols: 50, rows });
  const tw = 500;
  const inner =
    field({ x: 0, y: 0, w: 1200, h: BH, size: 11, tone: "white", seed: 23, clear: [[M - 20, 100, 600, BH - 190, 50]] }) +
    chrome({ W: 1200, H: BH, M, top: 84, bottom: BH - 70, tl: "spacedrift.in", tr: "Service · 03 / 06", dark: true, size: 15 }) +
    label({ x: M, y: BH - 50, size: 15, color: whiteA(0.62), html: "Fixed scope · Fixed price · 30-day support" }) +
    label({ x: M, y: BH - 50, right: true, size: 15, color: RED, html: "Reply within 24h" }) +
    label({ x: M, y: 124, size: 16, color: RED, html: "RAG &amp; AI MVPs · about three weeks" }) +
    headline({ x: M - 3, y: 158, w: 600, size: 72, color: WHITE, html: "AI that answers<br>from your data,<br>*not guesses.*" }) +
    text({ x: M, y: 158 + 72 * 0.94 * 3 + 28, w: 500, cls: "b", style: `font-size:20px;color:${whiteA(0.72)}`, html: sv.short }) +
    term({ x: 1200 - M - tw, y: 112, w: tw, grid: g, label: sv.cap, pad: 18, barSize: 12, style: `box-shadow:inset 0 0 0 1px ${whiteA(0.22)}` });
  return page({ W, H, bg: INK, body: `<div class="abs" style="left:0;top:0;width:1200px;height:${BH}px;transform:scale(${k});transform-origin:0 0">${inner}</div>` });
}

/* ── 3. how we work: the four stations ─────────────────────── */
function process(W, H) {
  const scenes = [
    (o) => SCENES.noise({ ...o, boxes: [{ x: Math.round(o.cols * 0.2), y: Math.round(o.rows * 0.25), w: Math.round(o.cols * 0.6), h: Math.round(o.rows * 0.5), label: "0.94" }] }),
    (o) => SCENES.parse({ ...o, mini: o.rows < 12 }),
    (o) => SCENES.model({ ...o, labels: false, ...(o.rows < 10 ? { aspect: 0.7, scale: 0.34 } : {}) }),
    (o) => SCENES.ship({ ...o, bar: false, top: o.rows < 10 ? 0 : undefined }),
  ];
  if (W / H < 1) {
    let s = "";
    const y0 = 420, rh = 196;
    STATIONS.forEach((st, i) => {
      const y = y0 + i * rh;
      s += hline({ x: 80, y, w: W - 160, color: i ? inkA(0.14) : INK, weight: i ? 1 : 2 });
      s += label({ x: 80, y: y + 26, size: 20, color: i === 3 ? RED : inkA(0.62), html: `${st.n} · ${st.when}` });
      s += text({ x: 76, y: y + 60, cls: "h", style: "font-size:80px;letter-spacing:-0.045em", html: st.name + (i === 3 ? `<span style="color:${RED}">.</span>` : "") });
      s += label({ x: 80, y: y + 150, w: 460, size: 16, html: st.out });
      const g = scenes[i]({ cols: 48, rows: 8 });
      s += term({ x: W - 80 - 400, y: y + 12, w: 400, grid: g, pad: 12, barSize: 10, label: st.name.toLowerCase(), dots: true });
    });
    const body =
      field({ x: 0, y: 0, w: W, h: 400, size: 14, seed: 24 }) +
      chrome({ W, H, tl: "spacedrift.in", tr: "How we work", bl: "Fixed scope · Fixed price", br: "spacedrift.in" }) +
      label({ x: 80, y: 168, size: 20, color: RED, html: "Four stations, one engineer" }) +
      headline({ x: 76, y: 206, w: 940, size: 92, html: "From noise to<br>*shipped.*" }) +
      s + hline({ x: 80, y: y0 + 4 * rh, w: W - 160, color: inkA(0.14) });
    return page({ W, H, body });
  }
  const BH = H * (1200 / W), k = W / 1200;
  const cw = (1200 - 2 * M - 3 * 16) / 4;
  let s = "";
  const ty = BH > 650 ? 270 : 244;
  STATIONS.forEach((st, i) => {
    const x = M + i * (cw + 16);
    const g = scenes[i]({ cols: 40, rows: 12 });
    s += term({ x, y: ty, w: cw, grid: g, pad: 10, barSize: 9, label: `${st.n} · ${st.name.toLowerCase()}` });
    const by = ty + termHeight({ w: cw, grid: g, pad: 10, barSize: 9 }) + 18;
    s += text({ x: x - 2, y: by, cls: "h", style: "font-size:40px;letter-spacing:-0.04em", html: st.name + (i < 3 ? `<span style="color:${RED}"> →</span>` : `<span style="color:${RED}">.</span>`) });
    s += label({ x, y: by + 50, w: cw, size: 11.5, html: `${st.when}<br>${st.out}`, style: "line-height:1.5" });
  });
  const inner =
    chrome({ W: 1200, H: BH, M, top: 84, bottom: BH - 70, tl: "spacedrift.in", tr: "How we work", mark: true, size: 15 }) +
    label({ x: M, y: BH - 50, size: 15, html: "Fixed scope · Fixed price · One engineer, end to end" }) +
    label({ x: M, y: BH - 50, right: true, size: 15, color: RED, html: "Reply within 24h" }) +
    label({ x: M, y: 118, size: 16, color: RED, html: "Four stations" }) +
    headline({ x: M - 3, y: 150, w: 1000, size: 72, html: "From noise to *shipped.*" }) +
    s;
  return page({ W, H, body: `<div class="abs" style="left:0;top:0;width:1200px;height:${BH}px;transform:scale(${k});transform-origin:0 0">${inner}</div>` });
}

export function postJobs() {
  const jobs = [];
  const FORMATS = [
    { id: "linkedin-1200x627", W: 1200, H: 627, scale: 3.2 },
    { id: "x-1600x900", W: 1600, H: 900, scale: 2.4 },
    { id: "portrait-1080x1350", W: 1080, H: 1350, scale: 3.2 },
  ];
  const POSTS = [["01-launch", launch], ["02-service-rag-mvp", service], ["03-how-we-work", process]];
  for (const [id, fn] of POSTS)
    for (const f of FORMATS)
      jobs.push({ out: `05-linkedin-x-threads/post-${id}-${f.id}.png`, W: f.W, H: f.H, scale: f.scale, html: fn(f.W, f.H), group: "posts" });
  return { jobs };
}
