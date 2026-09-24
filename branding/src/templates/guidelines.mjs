// 07-guidelines: brand sheet (4K) + contact sheet of the whole kit.
import path from "node:path";
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import {
  page, label, headline, text, hline, vline, block, grid, lockup, lockupInline, markShapes, SCHEMES, wordmarkInline,
  inkA, whiteA, INK, WHITE, RED, CONTACT,
} from "../lib/brand.mjs";
import { TMP } from "../lib/engine.mjs";
import { logoJobs } from "./logo.mjs";
import { profileJobs } from "./profile.mjs";
import { bannerJobs } from "./banners.mjs";
import { instagramJobs } from "./instagram.mjs";
import { postJobs } from "./posts.mjs";
import { webJobs } from "./web.mjs";

const W = 1920, H = 1200, M = 72;
const COL = (W - 2 * M) / 6;
const cx = (c) => M + c * COL;

/* ── logo construction: the mark on its 20-unit grid ──────── */
function construction(x, y, S) {
  const u = S / 20;
  let s = "";
  // unit grid
  for (let i = 0; i <= 20; i++) {
    s += `<i class="hair" style="left:${x + i * u}px;top:${y}px;width:1px;height:${S}px;color:${inkA(i % 5 ? 0.07 : 0.16)}"></i>`;
    s += `<i class="hair" style="left:${x}px;top:${y + i * u}px;width:${S}px;height:1px;color:${inkA(i % 5 ? 0.07 : 0.16)}"></i>`;
  }
  s += `<svg class="abs" style="left:${x}px;top:${y}px" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">${markShapes(0, 0, u, SCHEMES.light)}</svg>`;
  // dimension labels
  const dim = (lx, ly, t, color = INK) => label({ x: lx, y: ly, size: 13, color, html: t });
  s += dim(x - 46, y + 5 * u + 7.5 * u - 8, "15u");
  s += dim(x + 7.5 * u - 14, y + S + 10, "15u");
  s += dim(x + 13 * u + 2.2 * u, y - 24, "7u", RED);
  s += dim(x + S + 12, y + 3.5 * u - 8, "7u", RED);
  s += dim(x + S + 12, y + 5 * u + 4, "↕ 2u overlap", inkA(0.62));
  s += dim(x + 20 * u - 30, y + S + 10, "20u", inkA(0.62));
  return s;
}

function clearSpace(x, y, w) {
  const L = lockup("horizontal", "light");
  const k = w / (L.box.w + 2 * L.X);
  const X = L.X * k;
  const bw = L.box.w * k, bh = L.box.h * k;
  let s = `<i class="abs" style="display:block;left:${x}px;top:${y}px;width:${bw + 2 * X}px;height:${bh + 2 * X}px;box-shadow:inset 0 0 0 1px ${RED}"></i>`;
  s += `<i class="abs" style="display:block;left:${x + X}px;top:${y + X}px;width:${bw}px;height:${bh}px;box-shadow:inset 0 0 0 1px ${inkA(0.25)}"></i>`;
  s += `<div class="abs" style="left:${x + X}px;top:${y + X}px">${lockupInline("horizontal", "light", { width: bw })}</div>`;
  // X markers
  s += block({ x: x, y: y + X + bh / 2 - 0.5, w: X, h: 1, color: RED });
  s += label({ x: x + X / 2 - 5, y: y + X + bh / 2 - 22, size: 12, color: RED, html: "X" });
  s += block({ x: x + X + bw / 2 - 0.5, y: y, w: 1, h: X, color: RED });
  s += label({ x: x + X + bw / 2 + 6, y: y + X / 2 - 8, size: 12, color: RED, html: "X = 7u (the red square)" });
  return { html: s, h: bh + 2 * X };
}

function swatch(x, y, w, h, bg, name, hex, rgb, role, fg = WHITE, border = false) {
  return (
    `<div class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:${bg};${border ? `box-shadow:inset 0 0 0 1px ${inkA(0.2)};` : ""}"></div>` +
    text({ x: x + 18, y: y + 16, cls: "h", style: `font-size:30px;color:${fg};letter-spacing:-0.03em`, html: name }) +
    label({ x: x + 18, y: y + h - 70, size: 13, color: fg, html: `${hex}<br>RGB ${rgb}<br>${role}`, style: "line-height:1.6" })
  );
}

function miniMark(x, y, S, opts = {}) {
  const { scheme = "light", rotate = 0, sx = 1, swap = false, bg = null } = opts;
  const c = { ...SCHEMES[scheme] };
  if (swap) [c.big, c.small] = [c.small, c.big];
  const u = S / 20;
  const inner = markShapes(0, 0, u, c);
  return `<svg class="abs" style="left:${x}px;top:${y}px;overflow:visible" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">${bg ? `<rect x="${-S * 0.3}" y="${-S * 0.3}" width="${S * 1.6}" height="${S * 1.6}" fill="${bg}"/>` : ""}<g transform="translate(${S / 2} ${S / 2}) rotate(${rotate}) scale(${sx} 1) translate(${-S / 2} ${-S / 2})">${inner}</g></svg>`;
}

function brandSheet() {
  let s = grid({ x: M, w: W - 2 * M, h: H });
  // header
  s += `<div class="abs" style="left:${M}px;top:48px">${lockupInline("signature", "light", { height: 40 })}</div>`;
  s += label({ x: cx(3), y: 62, size: 15, html: "Brand guidelines · v1.0 · 2026" });
  s += label({ x: M, y: 62, right: true, size: 15, color: RED, html: CONTACT.site });
  s += hline({ x: M, y: 116, w: W - 2 * M, color: INK, weight: 2 });

  // 01 construction
  s += label({ x: M, y: 140, size: 14, color: RED, html: "01 · Mark construction" });
  s += construction(M + 56, 200, 300);
  s += text({ x: cx(0), y: 540, w: COL * 2.8, cls: "b", style: `font-size:17px;color:${inkA(0.72)}`, html: "A 15u ink square with a 7u red square at its top-right corner, offset up and right: the drift. In lockups the ink square equals the ascender height of the wordmark (u = ascender ÷ 15). Square corners only." });
  // clear space
  s += label({ x: M, y: 628, size: 14, color: RED, html: "02 · Clear space &amp; minimum size" });
  const cs = clearSpace(M, 664, 560);
  s += cs.html;
  s += label({ x: M, y: 664 + cs.h + 16, size: 13, html: "Min. size: mark 16px · horizontal lockup 96px wide · wordmark 72px wide" });

  // 03 palette
  s += label({ x: cx(3), y: 140, size: 14, color: RED, html: "03 · Colour: three values, nothing else" });
  const sw = (COL * 3 - 24) / 3;
  s += swatch(cx(3), 176, sw, 250, WHITE, "White", "#FFFFFF", "255 255 255", "Ground · ~70%", INK, true);
  s += swatch(cx(3) + sw + 12, 176, sw, 250, INK, "Ink", "#0A0A0A", "10 10 10", "Type, panels · ~25%");
  s += swatch(cx(3) + 2 * (sw + 12), 176, sw, 250, RED, "Red", "#E10600", "225 6 0", "One accent · ≤5%");
  const steps = [0.06, 0.14, 0.2, 0.4, 0.62, 0.72];
  steps.forEach((a, i) => {
    const w = (COL * 3 - 5 * 8) / 6;
    s += `<div class="abs" style="left:${cx(3) + i * (w + 8)}px;top:440px;width:${w}px;height:40px;background:${inkA(a)}"></div>`;
    s += label({ x: cx(3) + i * (w + 8), y: 488, size: 12, html: `Ink ${Math.round(a * 100)}%` });
  });
  s += label({ x: cx(3), y: 516, size: 12, color: inkA(0.5), html: "Ink at reduced opacity only for secondary text, hairlines (6% grid, 14% rules) and ASCII texture." });

  // 04 type
  s += label({ x: cx(3), y: 560, size: 14, color: RED, html: "04 · Type: Geist + Geist Mono" });
  s += text({ x: cx(3) - 6, y: 588, cls: "h", style: "font-size:150px;letter-spacing:-0.05em;line-height:1", html: "Aa" });
  s += label({ x: cx(3), y: 744, size: 12, html: "Geist 600 · −0.045em · lh 0.94" });
  s += headline({ x: cx(4), y: 600, w: COL * 2, size: 44, html: "We turn noise into<br>ML systems *that ship.*" });
  s += text({ x: cx(4), y: 708, w: COL * 2, cls: "b", style: `font-size:17px;color:${inkA(0.72)}`, html: "Geist 400 for body copy. Fixed scope. Fixed price." });
  s += label({ x: cx(4), y: 764, size: 16, color: INK, html: "Station 01 · Noise → Ship" });
  s += label({ x: cx(3), y: 796, size: 12, html: "Geist Mono 500 · uppercase · +0.06em — labels" });
  s += text({ x: cx(3), y: 822, cls: "mono-lc", style: `font-size:26px;color:${INK}`, html: `. : - = + * # %  ┌─┐│└┘  ▓▒░  <span style="color:${RED}">→</span>` });
  s += label({ x: cx(3), y: 864, size: 12, html: "Geist Mono 400 — ASCII texture and terminal panels" });

  // 05 do / don't
  s += hline({ x: M, y: 912, w: W - 2 * M, color: INK, weight: 2 });
  s += label({ x: M, y: 930, size: 14, color: RED, html: "05 · Do / Don't" });
  const tiles = [
    ["Do", "Ink on white", { scheme: "light" }, WHITE, true],
    ["Do", "White + red on ink", { scheme: "dark" }, INK, true],
    ["Do", "White + ink on red", { scheme: "red" }, RED, true],
    ["Don't", "Rotate or tilt", { rotate: 18 }, WHITE, false],
    ["Don't", "Swap the accent", { swap: true }, WHITE, false],
    ["Don't", "Stretch or squash", { sx: 1.45 }, WHITE, false],
  ];
  tiles.forEach(([k, t, o, bg], i) => {
    const x = cx(i) + (i ? 6 : 0), w = COL - 12, y = 966;
    s += `<div class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:150px;background:${bg};box-shadow:inset 0 0 0 1px ${inkA(0.14)}"></div>`;
    s += miniMark(x + w / 2 - 36, y + 39, 72, o);
    s += label({ x, y: y + 160, size: 12, color: k === "Do" ? INK : RED, html: `${k} · ${t}` });
  });
  s += label({ x: M, y: 1146, size: 13, html: `Never: rounded corners · circles · gradients · other colours · soft or blurred shadows (flat offset “stamp” shadows in ink or red only) · uppercase wordmark` });
  return page({ W, H, body: s });
}

/* ── contact sheet ─────────────────────────────────────────── */
const SECTIONS = [
  ["01-logo", "Logo"], ["02-profile", "Profile pictures"], ["03-banners", "Banners"],
  ["04-instagram", "Instagram"], ["05-linkedin-x-threads", "LinkedIn · X · Threads"], ["06-web", "Web"],
];
function skip(out) {
  return /_safe-zone-previews|-1500x500|-1584x396|-1128x191|-820x312|-1640x624|-2560x1440|og-image\.png|favicon-(16|32|48|192)\.png/.test(out)
    || (/02-profile/.test(out) && !/master-4096/.test(out));
}

export async function guidelineJobs({ root }) {
  const jobs = [{ out: "07-guidelines/brand-sheet-3840x2400.png", W, H, scale: 2, html: brandSheet() }];
  // gather every other template at thumbnail scale
  const all = [];
  for (const fn of [logoJobs, profileJobs, bannerJobs, instagramJobs, postJobs, webJobs]) all.push(...(await fn({ root })).jobs);
  const items = all.filter((j) => !skip(j.out));
  const thumbDir = path.join(TMP, "thumbs");
  fs.mkdirSync(thumbDir, { recursive: true });
  const TH = 190; // thumbnail row height (css px)
  items.forEach((j, i) => {
    j.thumb = path.join(thumbDir, `t${i}.png`);
    const s = Math.min(1, (TH * 2.2) / j.H);
    jobs.push({ out: j.thumb, W: j.W, H: j.H, scale: s, transparent: j.transparent, html: j.html });
  });
  // pack
  const CW = 1920, CM = 72, GAP = 16;
  let y = 170, body = "";
  for (const [dir, title] of SECTIONS) {
    const sec = items.filter((j) => j.out.startsWith(dir));
    if (!sec.length) continue;
    body += hline({ x: CM, y, w: CW - 2 * CM, color: INK, weight: 2 });
    body += label({ x: CM, y: y + 16, size: 16, color: RED, html: `${dir.slice(0, 2)} · ${title}` });
    body += label({ x: CM, y: y + 16, right: true, size: 14, html: `${sec.length} shown` });
    y += 56;
    let x = CM;
    const h = dir === "03-banners" ? 150 : dir === "01-logo" ? 110 : TH;
    for (const j of sec) {
      const w = Math.round((h * j.W) / j.H);
      if (x + w > CW - CM) { x = CM; y += h + 44; }
      const bgc = j.transparent ? (/negative/.test(j.out) ? INK : "#FFFFFF") : "transparent";
      body += `<div class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:${bgc};box-shadow:0 0 0 1px ${inkA(0.14)}"><img src="${pathToFileURL(j.thumb)}" style="display:block;width:${w}px;height:${h}px"></div>`;
      body += `<div class="abs mono-lc" style="left:${x}px;top:${y + h + 6}px;width:${Math.max(w, 60)}px;font-size:10px;color:${inkA(0.55)};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${path.basename(j.out, ".png")}</div>`;
      x += w + GAP;
    }
    y += h + 70;
  }
  const CH = Math.ceil(y + 40);
  const head =
    `<div class="abs" style="left:${CM}px;top:52px">${lockupInline("signature", "light", { height: 40 })}</div>` +
    label({ x: CM + 520, y: 66, size: 15, html: "Brand kit · contact sheet" }) +
    label({ x: CM, y: 66, right: true, size: 15, color: RED, html: CONTACT.site }) +
    grid({ x: CM, w: CW - 2 * CM, h: CH });
  jobs.push({ out: `07-guidelines/contact-sheet.png`, W: CW, H: CH, scale: 2, late: true, html: page({ W: CW, H: CH, body: head + body }) });
  for (const j of jobs) j.group = "guidelines";
  return { jobs };
}
