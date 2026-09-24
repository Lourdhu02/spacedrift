// 04-instagram: launch set, 5-slide carousel, 6 service posts, stories, highlight covers.
// Feed posts are 4:5 (1080×1350). Since 2026 the profile grid previews posts at 3:4,
// which trims ~34px from each side of a 4:5 post, so nothing sits outside x 80..1000.
import {
  page, field, label, headline, text, hline, block, bbox, term, termHeight, chips, arc,
  wordmarkInline, lockupInline, markInline, markShapes, SCHEMES, inkA, whiteA, INK, WHITE, RED, CONTACT, SERVICES, STATIONS,
} from "../lib/brand.mjs";
import { SCENES } from "../lib/ascii.mjs";
import { chrome, redSpan } from "./common.mjs";

const POST = { W: 1080, H: 1350, scale: 3.2 }; // → 3456×4320
const SQUARE = { W: 1080, H: 1080, scale: 32 / 9 }; // → 3840×3840
const TALL = { W: 1080, H: 1440, scale: 2.8 }; // 3:4 → 3024×4032
const STORY = { W: 1080, H: 1920, scale: 2 }; // → 2160×3840
const M = 80;

/* ── launch 01: manifesto (works at 4:5, 1:1, 3:4) ─────────── */
export function launchManifesto(W, H) {
  const bottom = H - 112;
  const hlH = 124 * 0.94 * 3;
  const hy = bottom - 70 - hlH;
  const box = { x: 580, y: 230, w: 300, h: Math.min(320, Math.max(200, hy - 230 - 170)) };
  const body =
    field({ x: 0, y: 0, w: W, h: H, size: 14, focal: [[box.x + box.w / 2, box.y + box.h / 2, 420]], hot: [[box.x, box.y, box.w, box.h]], redAt: 2, clear: [[M, hy - 60, 900, hlH + 60, 120]], seed: 3.3 }) +
    chrome({ W, H, tl: "spacedrift.in", tr: "Launch · 01 / 03", bl: "ML &amp; AI studio", br: "Bengaluru, India", mark: true }) +
    bbox({ x: box.x, y: box.y, w: box.w, h: box.h, label: "signal 0.97", size: 18, weight: 2 }) +
    label({ x: M, y: hy - 52, size: 20, color: RED, html: "Station 01 · Noise → Station 04 · Ship" }) +
    headline({ x: M - 4, y: hy, w: 940, size: 124, html: "We turn noise<br>into ML systems<br>*that ship.*" });
  return page({ W, H, body });
}

/* ── launch 02: the offer ─────────────────────────────────── */
function launchOffer() {
  const { W, H } = POST;
  const rows = [
    ["01", "Fixed scope."],
    ["02", "Fixed price."],
    ["03", "One engineer,<br><b>end to end.</b>"],
  ];
  let y = 176, s = "";
  s += label({ x: M, y: 150, size: 20, color: RED, html: "The offer" });
  y = 196;
  rows.forEach(([n, t], i) => {
    s += hline({ x: M, y, w: W - 2 * M, color: inkA(0.14) });
    s += label({ x: M, y: y + 28, size: 20, html: n });
    s += text({ x: M + 153, y: y + 16, cls: "h", style: "font-size:96px", html: t });
    y += i === 2 ? 212 : 122;
  });
  // stats 2×2 (the only numbers the studio publishes)
  const stats = [
    ["24", "h", "First reply to every inquiry"],
    ["~3", "wk", "Typical AI MVP build"],
    ["30", "d", "Support after every handoff"],
    ["100", "%", "Code and IP handed to you"],
  ];
  const sy = 740, cw = (W - 2 * M) / 2, ch = 230;
  s += hline({ x: M, y: sy - 24, w: W - 2 * M, color: INK, weight: 2 });
  stats.forEach(([v, u, l], i) => {
    const cx = M + (i % 2) * cw, cy = sy + Math.floor(i / 2) * ch;
    if (i % 2) s += `<i class="hair" style="left:${cx}px;top:${cy}px;width:1px;height:${ch - 30}px;color:${inkA(0.14)}"></i>`;
    s += text({ x: cx + (i % 2 ? 36 : 0), y: cy, cls: "h", style: "font-size:120px;letter-spacing:-0.05em", html: `${v}<span style="font-size:52px;letter-spacing:-0.02em;color:${RED};margin-left:6px">${u}</span>` });
    s += label({ x: cx + (i % 2 ? 36 : 0), y: cy + 138, size: 20, html: l });
  });
  const body =
    field({ x: 0, y: 0, w: W, h: 130, size: 14, seed: 7.7 }) +
    chrome({ W, H, tl: "spacedrift.in", tr: "Launch · 02 / 03", bl: "Fixed scope · Fixed price", br: "No surprises" }) +
    s;
  return page({ W, H, body });
}

/* ── launch 03: contact (ink) ─────────────────────────────── */
function launchContact() {
  const { W, H } = POST;
  const body =
    field({ x: 0, y: 0, w: W, h: H, size: 14, tone: "white", clear: [[M, 150, 920, 700, 110], [0, 1000, W, 350, 90]], seed: 9.1 }) +
    chrome({ W, H, tl: "spacedrift.in", tr: "Launch · 03 / 03", dark: true, bottom: 0 }) +
    label({ x: M, y: 168, size: 20, color: RED, html: "Next station" }) +
    headline({ x: M - 4, y: 206, w: 940, size: 116, color: WHITE, html: "Got a problem<br>*worth shipping?*" }) +
    text({ x: M, y: 490, w: 700, cls: "b", style: `font-size:32px;color:${whiteA(0.72)}`, html: "Tell us the problem, the data and the deadline. You get a fixed scope and price, or an honest no." }) +
    `<div class="abs" style="left:${M}px;top:664px;width:${W - 2 * M}px;box-shadow:inset 0 0 0 1px ${whiteA(0.22)};padding:26px 28px;display:flex;justify-content:space-between;align-items:center;background:${INK}">
      <span class="mono-lc" style="font-size:34px;color:#fff"><span style="color:${RED}">&gt;</span> ${CONTACT.email}</span></div>` +
    label({ x: M, y: 790, size: 20, color: whiteA(0.62), html: `Reply within 24h &nbsp;·&nbsp; ${CONTACT.site} &nbsp;·&nbsp; Bengaluru, India` }) +
    `<div class="abs" style="left:${M}px;bottom:86px">${lockupInline("signature", "dark", { width: W - 2 * M })}</div>`;
  return page({ W, H, bg: INK, body });
}

/* ── carousel: one 5400px-wide world, sliced into 5 slides ─── */
function carouselWorld(i) {
  const { W, H } = POST;
  const GW = W * 5;
  const X = (n) => n * W;
  let s = "";
  // continuous noise field that thins out left→right (noise → system)
  s += field({ x: X(i), y: 0, w: W, h: H, ox: X(i), gw: GW, gh: H, size: 16, seed: 1.9, fade: [0.05, 0, 0.8, 0], clear: [[0 - X(i) + 60, 140, 960, 560, 80], [X(1) - X(i) + 60, 140, 960, 510, 60], [X(2) - X(i) + 60, 140, 960, 500, 60], [X(3) - X(i) + 60, 140, 960, 500, 60], [X(0) - X(i) + 60, 700, 960, 480, 40]] });
  // one continuous rule + station markers across all slides
  s += hline({ x: M, y: 112, w: GW - 2 * M, color: inkA(0.14) });
  for (let k = 0; k < 5; k++) {
    s += label({ x: X(k) + M, y: 72, size: 20, color: k === 4 ? WHITE : INK, html: k ? `Station 0${k} · ${STATIONS[k - 1].name}` : "How we work" });
    s += text({ x: X(k) + W - M - 200, y: 72, w: 200, cls: "mono", style: `font-size:20px;text-align:right;color:${k === 4 ? whiteA(0.62) : inkA(0.62)}`, html: `0${k + 1} / 05` });
  }
  // slide 5 is ink: paint it under everything else in the world
  s = block({ x: X(4), y: 0, w: W, h: H, color: INK }) + s;
  // grid per slide
  for (let k = 0; k < 5; k++) for (let c = 0; c <= 6; c++) s += `<i class="hair" style="left:${X(k) + M + ((W - 2 * M) * c) / 6 - (c === 6 ? 1 : 0)}px;top:0;width:1px;height:${H}px;color:${k === 4 ? whiteA(0.07) : inkA(0.06)}"></i>`;

  // slide 1: cover
  s += label({ x: M, y: 168, size: 20, color: RED, html: "A four-station process" });
  s += headline({ x: M - 4, y: 206, w: 940, size: 112, html: "How noise<br>becomes a system<br>*that ships.*" });
  const tableY = 700;
  STATIONS.forEach((st, k) => {
    const y = tableY + k * 104;
    s += hline({ x: M, y, w: W - 2 * M, color: k ? inkA(0.14) : INK, weight: k ? 1 : 2 });
    s += label({ x: M, y: y + 38, size: 20, html: st.n });
    s += text({ x: M + 153, y: y + 22, cls: "h", style: "font-size:56px;letter-spacing:-0.035em", html: st.name });
    s += label({ x: M + 153 * 3 + 2, y: y + 38, size: 20, html: st.when });
    s += text({ x: W - M - 60, y: y + 26, w: 60, cls: "h", style: `font-size:48px;text-align:right;color:${RED}`, html: "→" });
  });
  s += hline({ x: M, y: tableY + 416, w: W - 2 * M, color: inkA(0.14) });
  s += label({ x: M, y: H - 88, size: 20, html: "spacedrift.in" });
  s += label({ x: W - M - 300, y: H - 88, w: 300, size: 20, color: RED, html: "Swipe →", style: "text-align:right" });

  // slides 2-4: stations 01-03 ; slide 5: station 04 on ink
  STATIONS.forEach((st, k) => {
    const x0 = X(k + 1);
    const dark = k === 3;
    const fg = dark ? WHITE : INK;
    const sub = dark ? whiteA(0.72) : inkA(0.72);
    s += label({ x: x0 + M, y: 168, size: 20, color: RED, html: `${st.when}` });
    s += headline({ x: x0 + M - 4, y: 206, w: 940, size: 104, color: fg, html: `${st.title}<br>*${st.accent}*` });
    s += text({ x: x0 + M, y: 434, w: 760, cls: "b", style: `font-size:31px;color:${sub}`, html: st.body });
    const g = SCENES[st.scene]({ cols: 56, rows: dark ? 12 : 14 });
    const ty = dark ? 610 : 624;
    s += term({ x: x0 + M, y: ty, w: W - 2 * M, grid: g, label: `${st.name.toLowerCase()} · station ${st.n}`, pad: 24, barSize: 17, style: dark ? `box-shadow:inset 0 0 0 1px ${whiteA(0.2)}` : "" });
    if (!dark) {
      s += hline({ x: x0 + M, y: H - 112, w: W - 2 * M, color: inkA(0.14) });
      s += label({ x: x0 + M, y: H - 88, size: 20, html: `Output → ${st.out}` });
      s += label({ x: x0 + W - M - 200, y: H - 88, w: 200, size: 20, color: RED, html: "→", style: "text-align:right" });
    } else {
      s += hline({ x: x0 + M, y: 1136, w: W - 2 * M, color: whiteA(0.2) });
      s += text({ x: x0 + M, y: 1162, cls: "h", style: `font-size:46px;color:#fff;letter-spacing:-0.035em`, html: `Start a project <span style="color:${RED}">→</span>` });
      s += label({ x: x0 + M, y: 1230, size: 20, color: whiteA(0.62), html: `${CONTACT.email} · Reply within 24h` });
    }
  });
  return page({ W, H, body: `<div class="abs" style="left:${-X(i)}px;top:0;width:${GW}px;height:${H}px">${s}</div>` });
}

/* ── service posts: alternate white (A) / ink (B) ─────────── */
function servicePost(sv, idx) {
  const { W, H } = POST;
  const dark = idx % 2 === 1;
  const fg = dark ? WHITE : INK;
  const g = SCENES[sv.scene]({ cols: 56, rows: 17 });
  const tw = W - 2 * M;
  const th = termHeight({ w: tw, grid: g, pad: 24, barSize: 17 });
  const hlLines = [...sv.lines, `*${sv.accent}*`].join("<br>");
  const nLines = sv.lines.length + 1;
  const hs = nLines >= 3 ? 94 : 104;
  let body = "";
  if (!dark) {
    const ty = 160;
    const ly = ty + th + 56;
    body =
      field({ x: 0, y: 0, w: W, h: H, size: 14, seed: 10 + idx, clear: [[40, ty - 20, W - 60, H - ty - 40, 60]] }) +
      chrome({ W, H, tl: "spacedrift.in", tr: `Service · ${sv.n} / 06`, bl: "", br: "" }) +
      term({ x: M, y: ty, w: tw, grid: g, label: sv.cap, pad: 24, barSize: 17, stamp: { d: 14, color: RED } }) +
      label({ x: M, y: ly, size: 20, color: RED, html: `${sv.n} · ${sv.title}` }) +
      headline({ x: M - 4, y: ly + 38, w: 940, size: hs, html: hlLines }) +
      chips({ x: M, y: H - 96, items: sv.tags, size: 18 }) +
      label({ x: M, y: H - 84, right: true, size: 20, html: "Fixed scope · Fixed price" });
  } else {
    const ty = H - 112 - 36 - th;
    body =
      field({ x: 0, y: 0, w: W, h: H, size: 14, tone: "white", seed: 10 + idx, clear: [[40, 130, W - 60, ty - 110, 60]] }) +
      chrome({ W, H, tl: "spacedrift.in", tr: `Service · ${sv.n} / 06`, dark: true }) +
      label({ x: M, y: 168, size: 20, color: RED, html: `${sv.n} · ${sv.title}` }) +
      headline({ x: M - 4, y: 206, w: 940, size: hs, color: WHITE, html: hlLines }) +
      (206 + hs * 0.94 * nLines + 34 + 90 < ty - 24 ? text({ x: M, y: 206 + hs * 0.94 * nLines + 34, w: 800, cls: "b", style: `font-size:30px;color:${whiteA(0.72)}`, html: sv.short }) : "") +
      term({ x: M, y: ty, w: tw, grid: g, label: sv.cap, pad: 24, barSize: 17, style: `box-shadow:inset 0 0 0 1px ${whiteA(0.2)}` }) +
      chips({ x: M, y: H - 96, items: sv.tags, size: 18, color: whiteA(0.75), line: whiteA(0.22) }) +
      label({ x: M, y: H - 84, right: true, size: 20, color: whiteA(0.62), html: "Fixed scope · Fixed price" });
  }
  return page({ W, H, bg: dark ? INK : WHITE, body });
}

/* ── stories (1080×1920). Top and bottom 250px carry no text. ── */
const SAFE_T = 250, SAFE_B = 1920 - 250;
function storyChrome(dark) {
  const { W, H } = STORY;
  return chrome({ W, H, top: SAFE_T + 60, bottom: SAFE_B - 60, dark, size: 22 });
}
function storyLaunch() {
  const { W, H } = STORY;
  const box = { x: 520, y: 470, w: 380, h: 330 };
  const body =
    field({ x: 0, y: 0, w: W, h: H, size: 18, focal: [[710, 630, 520]], hot: [[box.x, box.y, box.w, box.h]], redAt: 2, clear: [[M, 880, 920, 560, 120]], seed: 12.2 }) +
    storyChrome(false) +
    text({ x: M, y: SAFE_T + 8, html: wordmarkInline(40, "light", { signature: true }) }) +
    label({ x: M, y: SAFE_T + 14, right: true, size: 22, html: "ML &amp; AI studio" }) +
    bbox({ x: box.x, y: box.y, w: box.w, h: box.h, label: "signal 0.97", size: 20, weight: 2 }) +
    headline({ x: M - 4, y: 900, w: 940, size: 132, html: "We turn noise<br>into ML<br>systems<br>*that ship.*" }) +
    label({ x: M, y: 1440, size: 22, html: "Fixed scope · Fixed price · One engineer" }) +
    label({ x: M, y: SAFE_B - 40, size: 22, color: RED, html: "↓ spacedrift.in" }) +
    label({ x: M, y: SAFE_B - 40, right: true, size: 22, html: "Bengaluru, India" });
  return page({ W, H, body });
}
function storyProcess() {
  const { W, H } = STORY;
  let s = "";
  const y0 = 470, rh = 270;
  STATIONS.forEach((st, k) => {
    const y = y0 + k * rh;
    s += hline({ x: M, y, w: W - 2 * M, color: k ? whiteA(0.16) : WHITE, weight: k ? 1 : 2 });
    s += label({ x: M, y: y + 34, size: 22, color: k === 3 ? RED : whiteA(0.62), html: `Station ${st.n} · ${st.when}` });
    s += text({ x: M - 4, y: y + 76, cls: "h", style: "font-size:120px;color:#fff;letter-spacing:-0.05em", html: st.name + (k < 3 ? `<span style="color:${RED}"> →</span>` : `<span style="color:${RED}">.</span>`) });
    s += label({ x: M, y: y + 214, size: 22, color: whiteA(0.62), html: `→ ${st.out}` });
  });
  const body =
    field({ x: 0, y: 0, w: W, h: H, size: 18, tone: "white", seed: 13.4, fade: [0, 0, 0, 1], clear: [[M, 440, 920, 1100, 80]] }) +
    storyChrome(true) +
    text({ x: M, y: SAFE_T + 8, html: wordmarkInline(40, "dark", { signature: true }) }) +
    label({ x: M, y: SAFE_T + 14, right: true, size: 22, color: whiteA(0.62), html: "How we work" }) +
    label({ x: M, y: 400, size: 22, color: RED, html: "Noise → Parse → Model → Ship" }) +
    s +
    label({ x: M, y: SAFE_B - 40, size: 22, color: WHITE, html: "spacedrift.in" }) +
    label({ x: M, y: SAFE_B - 40, right: true, size: 22, color: whiteA(0.62), html: "Reply within 24h" });
  return page({ W, H, bg: INK, body });
}
function storyBooking() {
  const { W, H } = STORY;
  const facts = ["Fixed scope, fixed price", "About three weeks to a working MVP", "30 days of support after handoff", "100% of the code and IP is yours"];
  let s = "";
  facts.forEach((f, k) => {
    const y = 1100 + k * 96;
    s += hline({ x: M, y, w: W - 2 * M, color: whiteA(0.35) });
    s += label({ x: M, y: y + 34, size: 24, color: INK, html: `0${k + 1}` });
    s += text({ x: M + 153, y: y + 26, cls: "b", style: "font-size:36px;color:#fff;font-weight:500;letter-spacing:-0.02em", html: f });
  });
  const body =
    chrome({ W, H, top: SAFE_T + 60, bottom: SAFE_B - 60, dark: true, size: 22 }).replaceAll("rgba(255,255,255,0.07)", "rgba(255,255,255,0.12)") +
    text({ x: M, y: SAFE_T + 8, html: wordmarkInline(40, "red", { signature: true }) }) +
    label({ x: M, y: SAFE_T + 14, right: true, size: 22, color: WHITE, html: "Now booking" }) +
    label({ x: M, y: 440, size: 24, color: INK, html: "03 · RAG &amp; AI MVPs" }) +
    headline({ x: M - 4, y: 486, w: 940, size: 136, color: WHITE, html: `An AI MVP<br>in about<br><span style="color:${INK}">three weeks.</span>` }) +
    s + hline({ x: M, y: 1484, w: W - 2 * M, color: whiteA(0.35) }) +
    label({ x: M, y: SAFE_B - 40, size: 22, color: WHITE, html: CONTACT.email }) +
    label({ x: M, y: SAFE_B - 40, right: true, size: 22, color: INK, html: "Reply within 24h" });
  return page({ W, H, bg: RED, body });
}
function storyAsk() {
  const { W, H } = STORY;
  const zone = { x: M, y: 980, w: W - 2 * M, h: 440 };
  const tick = (x, y, dx, dy) => `<i class="abs" style="display:block;left:${x}px;top:${y}px;width:${dx}px;height:${dy}px;background:${INK}"></i>`;
  const L = 36, T = 3;
  const body =
    field({ x: 0, y: 0, w: W, h: H, size: 18, seed: 14.8, clear: [[M, 330, 920, 600, 80], [zone.x + 20, zone.y + 20, zone.w - 40, zone.h - 40, 30]] }) +
    storyChrome(false) +
    text({ x: M, y: SAFE_T + 8, html: wordmarkInline(40, "light", { signature: true }) }) +
    label({ x: M, y: SAFE_T + 14, right: true, size: 22, html: "Ask the engineer" }) +
    label({ x: M, y: 440, size: 24, color: RED, html: "Open questions · Answered in 24h" }) +
    headline({ x: M - 4, y: 486, w: 940, size: 124, html: "What is slowing<br>your ML<br>*project down?*" }) +
    // corner ticks mark the spot for the question sticker
    tick(zone.x, zone.y, L, T) + tick(zone.x, zone.y, T, L) + tick(zone.x + zone.w - L, zone.y, L, T) + tick(zone.x + zone.w - T, zone.y, T, L) +
    tick(zone.x, zone.y + zone.h - T, L, T) + tick(zone.x, zone.y + zone.h - L, T, L) + tick(zone.x + zone.w - L, zone.y + zone.h - T, L, T) + tick(zone.x + zone.w - T, zone.y + zone.h - L, T, L) +
    label({ x: M, y: SAFE_B - 40, size: 22, html: "Lourdu Raju · ML Engineer" }) +
    label({ x: M, y: SAFE_B - 40, right: true, size: 22, color: RED, html: "spacedrift.in" });
  return page({ W, H, body });
}
function storyBlank(dark) {
  const { W, H } = STORY;
  const body =
    field({ x: 0, y: 0, w: W, h: H, size: 18, tone: dark ? "white" : "ink", seed: dark ? 15.5 : 16.1, clear: [[M, SAFE_T + 100, W - 2 * M, SAFE_B - SAFE_T - 200, 140]] }) +
    storyChrome(dark) +
    text({ x: M, y: SAFE_T + 8, html: wordmarkInline(40, dark ? "dark" : "light", { signature: true }) }) +
    label({ x: M, y: SAFE_T + 14, right: true, size: 22, color: dark ? whiteA(0.62) : inkA(0.62), html: "Station 0_ · ____" }) +
    label({ x: M, y: SAFE_B - 40, size: 22, color: dark ? WHITE : INK, html: "spacedrift.in" }) +
    label({ x: M, y: SAFE_B - 40, right: true, size: 22, color: RED, html: "Noise → Parse → Model → Ship" });
  return page({ W, H, bg: dark ? INK : WHITE, body });
}

/* ── highlight covers: square-only pictograms, centred for the circle crop ── */
const ICONS = {
  // each returns rects in a 20×20 unit box: [x,y,w,h,isAccent]
  services: () => { const r = []; for (let i = 0; i < 6; i++) r.push([(i % 3) * 7.5, 3.75 + Math.floor(i / 3) * 7.5, 5, 5, i === 2]); return r; },
  process: () => [[0, 15, 5, 5], [5, 10, 5, 5], [10, 5, 5, 5], [15, 0, 5, 5, true]],
  work: () => { const t = 1.6, l = 6; return [[0, 0, l, t], [0, 0, t, l], [20 - l, 0, l, t], [20 - t, 0, t, l], [0, 20 - t, l, t], [0, 20 - l, t, l], [20 - l, 20 - t, l, t], [20 - t, 20 - l, t, l], [6.5, 6.5, 7, 7, true]]; },
  about: () => [[0, 5, 15, 15], [13, 0, 7, 7, true]],
  contact: () => { const t = 1.6; return [[0, 3, 20, t], [0, 17 - t, 20, t], [0, 3, t, 14], [20 - t, 3, t, 14], [13, 5.8, 4.2, 4.2, true], [3.4, 10.5, 7, 1.4], [3.4, 13, 4.5, 1.4]]; },
  mobile: () => { const t = 1.6; return [[4.5, 0, 11, t], [4.5, 20 - t, 11, t], [4.5, 0, t, 20], [15.5 - t, 0, t, 20], [7.5, 4, 5, 5, true], [8.5, 16, 3, 1.2]]; },
};
export const HIGHLIGHTS = ["services", "process", "work", "about", "contact", "mobile"];
function highlight(id, dark) {
  const { W, H } = STORY;
  const S = 420, u = S / 20, ox = (W - S) / 2, oy = (H - S) / 2;
  const fg = dark ? WHITE : INK;
  const rects = ICONS[id]().map(([x, y, w, h, a]) => `<rect x="${ox + x * u}" y="${oy + y * u}" width="${w * u}" height="${h * u}" fill="${a ? RED : fg}"/>`).join("");
  const svg = `<svg class="abs" style="left:0;top:0" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${rects}</svg>`;
  return page({ W, H, bg: dark ? INK : WHITE, body: svg });
}

export function instagramJobs() {
  const jobs = [];
  const P = (out, html, f = POST) => jobs.push({ out: `04-instagram/${out}`, W: f.W, H: f.H, scale: f.scale, html, group: "instagram" });
  // launch set
  P("launch/launch-01-manifesto-1080x1350.png", launchManifesto(1080, 1350));
  P("launch/launch-02-offer-1080x1350.png", launchOffer());
  P("launch/launch-03-contact-1080x1350.png", launchContact());
  P("launch/launch-01-manifesto-square-1080x1080.png", launchManifesto(1080, 1080), SQUARE);
  P("launch/launch-01-manifesto-grid-3x4-1080x1440.png", launchManifesto(1080, 1440), TALL);
  // carousel
  ["cover", "noise", "parse", "model", "ship"].forEach((n, i) => P(`carousel/carousel-0${i + 1}-${n}-1080x1350.png`, carouselWorld(i)));
  // services
  SERVICES.forEach((sv, i) => P(`services/service-${sv.n}-${sv.title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")}-1080x1350.png`, servicePost(sv, i)));
  // stories
  P("stories/story-01-launch-1080x1920.png", storyLaunch(), STORY);
  P("stories/story-02-process-1080x1920.png", storyProcess(), STORY);
  P("stories/story-03-now-booking-1080x1920.png", storyBooking(), STORY);
  P("stories/story-04-ask-the-engineer-1080x1920.png", storyAsk(), STORY);
  P("stories/story-05-blank-white-1080x1920.png", storyBlank(false), STORY);
  P("stories/story-06-blank-ink-1080x1920.png", storyBlank(true), STORY);
  // highlights
  HIGHLIGHTS.forEach((h, i) => {
    P(`highlights/highlight-0${i + 1}-${h}-ink-1080x1920.png`, highlight(h, true), STORY);
    P(`highlights/highlight-0${i + 1}-${h}-white-1080x1920.png`, highlight(h, false), STORY);
  });
  return { jobs };
}
