// 03-banners: X header, LinkedIn personal + company, Facebook cover, YouTube channel art.
// Each template is drawn in base CSS px; exports = platform-exact 1x + 4K-class master.
import {
  page, grid, field, label, headline, text, hline, block, bbox, scaled, arc, term, wordmarkInline, lockupInline,
  inkA, whiteA, INK, WHITE, RED, CONTACT,
} from "../lib/brand.mjs";
import { model } from "../lib/ascii.mjs";

const SERVICES_LINE = "Research Ops · Document AI & OCR · RAG & AI MVPs · Data Annotation · Web · Mobile";

/* ── X / Twitter header 1500×500 ───────────────────────────── */
function xHeader() {
  const W = 1500, H = 500, M = 60;
  const body =
    grid({ x: M, w: W - 2 * M, h: H }) +
    field({ x: 0, y: 0, w: W, h: H, size: 13, focal: [[470, 238, 280]], hot: [[372, 150, 196, 176]], redAt: 2, clear: [[790, 110, 660, 300, 110]], seed: 2.3 }) +
    bbox({ x: 372, y: 150, w: 196, h: 176, label: "signal 0.97", color: INK, size: 12 }) +
    label({ x: M, y: 76, size: 14, html: "spacedrift.in", color: INK }) +
    label({ x: M, y: 76, right: true, size: 14, html: "ML &amp; AI studio · Bengaluru, India" }) +
    hline({ x: M, y: 104, w: W - 2 * M, color: inkA(0.14) }) +
    headline({ x: 830, y: 148, w: 620, size: 66, html: "We turn noise<br>into ML systems<br>*that ship.*" }) +
    hline({ x: 830, y: 380, w: W - M - 830, color: inkA(0.14) }) +
    label({ x: 830, y: 398, size: 14, html: arc({ activeColor: INK, color: inkA(0.62) }) }) +
    label({ x: M, y: 398, right: true, size: 14, html: "Reply within 24h", color: RED });
  return { W, H, html: page({ W, H, body }) };
}

/* ── LinkedIn personal banner 1584×396 (ink) ────────────────── */
function linkedinPersonal() {
  const W = 1584, H = 396, M = 56;
  const body =
    grid({ x: M, w: W - 2 * M, h: H, color: whiteA(0.07) }) +
    field({ x: 0, y: 0, w: W, h: H, size: 12, tone: "white", focal: [[560, 151, 260]], hot: [[470, 76, 180, 150]], redAt: 2, clear: [[800, 40, 760, 330, 120]], seed: 4.1, set: " .:-=+░▒" }) +
    bbox({ x: 470, y: 76, w: 180, h: 150, label: "model.fit()", color: WHITE, tagText: INK, size: 11 }) +
    label({ x: 860, y: 58, size: 13, color: whiteA(0.62), html: "Lourdu Raju · Machine Learning Engineer" }) +
    label({ x: M, y: 58, right: true, size: 13, color: WHITE, html: "spacedrift.in" }) +
    headline({ x: 860, y: 102, w: 680, size: 56, color: WHITE, html: "We turn noise into<br>ML systems *that ship.*" }) +
    hline({ x: 860, y: 262, w: W - M - 860, color: whiteA(0.16) }) +
    label({ x: 860, y: 280, size: 12.5, color: whiteA(0.62), html: SERVICES_LINE }) +
    label({ x: 860, y: 306, size: 12.5, color: whiteA(0.62), html: `Fixed scope · Fixed price · <span style="color:${RED}">One engineer, end to end</span>` });
  return { W, H, bg: INK, html: page({ W, H, bg: INK, body }) };
}

/* ── LinkedIn company cover (4200×700 upload, 1128×191 display) ─ */
function linkedinCompany(W, H) {
  const BW = 1200, k = W / BW, BH = H / k, M = 36;
  const inner =
    grid({ x: M, w: BW - 2 * M, h: BH }) +
    field({ x: 0, y: 0, w: BW, h: BH, size: 9, focal: [[250, 73, 170]], hot: [[196, 38, 108, 70]], redAt: 2, clear: [[420, 20, 760, BH - 40, 90]], seed: 5.2 }) +
    bbox({ x: 196, y: 38, w: 108, h: 70, label: "text 0.94", size: 8 }) +
    label({ x: 437, y: 28, size: 9.5, color: INK, html: "spacedrift · ML &amp; AI studio · Bengaluru" }) +
    label({ x: M, y: 28, right: true, size: 9.5, color: RED, html: "Reply within 24h" }) +
    headline({ x: 437, y: 56, w: 740, size: 44, html: "We turn noise into ML systems <br>*that ship.*" }) +
    hline({ x: 437, y: BH - 40, w: BW - M - 437, color: inkA(0.14) }) +
    label({ x: 437, y: BH - 30, size: 9, html: SERVICES_LINE });
  return page({ W, H, body: scaled(k, BW, BH, inner) });
}

/* ── Facebook page cover 820×312 (centre safe 640×312) ─────── */
function facebook() {
  const W = 820, H = 312, SX = 90, SW = 640; // mobile-safe band
  const body =
    grid({ x: 40, w: W - 80, h: H }) +
    field({ x: 0, y: 0, w: W, h: H, size: 9, set: " .:-=+*", focal: [[708, 72, 70]], clear: [[180, 50, 460, 200, 80]], seed: 6.7 }) +
    label({ x: 0, y: 58, w: W, size: 9.5, color: INK, html: "spacedrift.in · ML &amp; AI studio", style: "text-align:center" }) +
    headline({ x: 0, y: 84, w: W, size: 44, html: "We turn noise into<br>ML systems *that ship.*", style: "text-align:center" }) +
    label({ x: 0, y: 196, w: W, size: 9.5, html: "Fixed scope · Fixed price · One engineer, accountable end to end", style: "text-align:center" }) +
    block({ x: W / 2 - 4, y: 222, w: 8, h: 8, color: RED }) +
    label({ x: 0, y: 240, w: W, size: 9, html: `${CONTACT.email} · Bengaluru, India`, style: "text-align:center" });
  return { W, H, SX, SW, html: page({ W, H, body }) };
}

/* ── YouTube channel art 2560×1440 (safe 1546×423 centred) ─── */
function youtube() {
  const W = 2560, H = 1440;
  const S = { x: (W - 1546) / 2, y: (H - 423) / 2, w: 1546, h: 423 };
  const torus = model({ cols: 60, rows: 24, t: 3.6, labels: false });
  const body =
    grid({ x: 120, w: W - 240, h: H, color: whiteA(0.07) }) +
    field({ x: 0, y: 0, w: W, h: H, size: 18, tone: "white", focal: [[2150, 330, 260]], clear: [[S.x - 40, S.y - 40, S.w + 80, S.h + 80, 200]], seed: 8.4, set: " .:-=+*#%" }) +
    // TV-only corners
    label({ x: 120, y: 110, size: 22, color: whiteA(0.55), html: "Station 01 · Noise" }) +
    label({ x: 120, y: 110, right: true, size: 22, color: whiteA(0.55), html: "Station 02 · Parse" }) +
    label({ x: 120, bottom: 110, size: 22, color: whiteA(0.55), html: "Station 03 · Model" }) +
    label({ x: 120, bottom: 110, right: true, size: 22, color: RED, html: "Station 04 · Ship" }) +
    // safe area content
    `<div class="abs" style="left:${S.x}px;top:${S.y + 18}px">${wordmarkInline(236, "dark", { signature: true })}</div>` +
    headline({ x: S.x, y: S.y + 262, w: 1200, size: 62, color: WHITE, html: "We turn noise into ML systems *that ship.*" }) +
    hline({ x: S.x, y: S.y + S.h - 34, w: S.w, color: whiteA(0.18) }) +
    label({ x: S.x, y: S.y + S.h - 18, size: 17, color: whiteA(0.62), html: SERVICES_LINE }) +
    label({ x: S.x + S.w - 380, y: S.y + 40, w: 380, size: 20, color: whiteA(0.62), html: `ML &amp; AI studio<br>Bengaluru, India<br><span style="color:${RED}">Reply within 24h</span>`, style: "text-align:right;line-height:1.7" });
  return { W, H, S, html: page({ W, H, bg: INK, body }) };
}

/* ── safe-zone preview overlays (for checking, not for upload) ── */
const zone = (x, y, w, h, t, color = RED, fill = false) =>
  `<div class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;box-shadow:inset 0 0 0 2px ${color};${fill ? `background:${color === RED ? "rgba(225,6,0,.16)" : "rgba(10,10,10,.28)"};` : ""}"><span class="mono" style="position:absolute;left:6px;top:4px;font-size:11px;color:${color};background:#fff;padding:1px 4px">${t}</span></div>`;
function preview(html, overlays) {
  return html.replace("</body>", `${overlays}</body>`);
}

export function bannerJobs() {
  const jobs = [];
  const x = xHeader();
  jobs.push({ out: "03-banners/x-header-1500x500.png", W: x.W, H: x.H, scale: 1, html: x.html });
  jobs.push({ out: "03-banners/x-header-3840x1280.png", W: x.W, H: x.H, scale: 2.56, html: x.html });
  jobs.push({
    out: "03-banners/_safe-zone-previews/x-header-preview.png", W: x.W, H: x.H, scale: 1,
    html: preview(x.html, zone(0, 0, 1500, 60, "may crop (top)", INK, true) + zone(0, 440, 1500, 60, "may crop (bottom)", INK, true) + zone(24, 330, 230, 170, "avatar (desktop + mobile)", RED, true)),
  });

  const lp = linkedinPersonal();
  jobs.push({ out: "03-banners/linkedin-personal-1584x396.png", W: lp.W, H: lp.H, scale: 1, html: lp.html });
  jobs.push({ out: "03-banners/linkedin-personal-3840x960.png", W: lp.W, H: lp.H, scale: 3840 / 1584, html: lp.html });
  jobs.push({
    out: "03-banners/_safe-zone-previews/linkedin-personal-preview.png", W: lp.W, H: lp.H, scale: 1,
    html: preview(lp.html, zone(24, 190, 330, 206, "avatar (desktop)", RED, true) + zone(0, 0, 792, 396, "left half: texture only", WHITE)),
  });

  jobs.push({ out: "03-banners/linkedin-company-1128x191.png", W: 1128, H: 191, scale: 1, html: linkedinCompany(1128, 191) });
  jobs.push({ out: "03-banners/linkedin-company-4200x700.png", W: 1200, H: 200, scale: 3.5, html: linkedinCompany(1200, 200) });
  jobs.push({
    out: "03-banners/_safe-zone-previews/linkedin-company-preview.png", W: 1128, H: 191, scale: 1,
    html: preview(linkedinCompany(1128, 191), zone(16, 111, 140, 80, "logo overlap", RED, true)),
  });

  const fb = facebook();
  jobs.push({ out: "03-banners/facebook-cover-820x312.png", W: fb.W, H: fb.H, scale: 1, html: fb.html });
  jobs.push({ out: "03-banners/facebook-cover-1640x624.png", W: fb.W, H: fb.H, scale: 2, html: fb.html });
  jobs.push({ out: "03-banners/facebook-cover-3840x1461.png", W: fb.W, H: fb.H, scale: 3840 / 820, html: fb.html });
  jobs.push({
    out: "03-banners/_safe-zone-previews/facebook-cover-preview.png", W: fb.W, H: fb.H, scale: 1,
    html: preview(fb.html, zone(0, 0, 90, 312, "mobile crop", INK, true) + zone(730, 0, 90, 312, "mobile crop", INK, true) + zone(16, 222, 176, 90, "profile pic (desktop)", RED, true)),
  });

  const yt = youtube();
  jobs.push({ out: "03-banners/youtube-channel-2560x1440.png", W: yt.W, H: yt.H, scale: 1, html: yt.html });
  jobs.push({ out: "03-banners/youtube-channel-3840x2160.png", W: yt.W, H: yt.H, scale: 1.5, html: yt.html });
  jobs.push({
    out: "03-banners/_safe-zone-previews/youtube-channel-preview.png", W: yt.W, H: yt.H, scale: 0.5,
    html: preview(yt.html, zone(yt.S.x, yt.S.y, yt.S.w, yt.S.h, "safe area 1546×423 (all devices)", RED) + zone(0, yt.S.y, 2560, 423, "desktop 2560×423", WHITE) + zone(352, yt.S.y, 1855, 423, "tablet 1855×423", WHITE)),
  });
  for (const j of jobs) j.group = "banners";
  return { jobs };
}
