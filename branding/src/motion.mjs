#!/usr/bin/env node
// 08-motion: renders frame-by-frame with Playwright and encodes with ffmpeg.
//   npm run motion
// ffmpeg lookup: $FFMPEG → @ffmpeg-installer/linux-x64 (optional dep) → ffmpeg on PATH.
// With H.264 available you get .mp4 (Instagram/LinkedIn/X ready); otherwise VP8 .webm.
import fs from "node:fs";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { launch, TMP } from "./lib/engine.mjs";
import { page, field, label, headline, text, hline, term, termHeight, lockup, lockupInline, markShapes, SCHEMES, inkA, whiteA, INK, WHITE, RED, CONTACT, STATIONS } from "./lib/brand.mjs";
import { SCENES } from "./lib/ascii.mjs";
import { chrome } from "./templates/common.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(HERE, "..", "08-motion");
fs.mkdirSync(OUT, { recursive: true });

function findFFmpeg() {
  const c = [process.env.FFMPEG, path.join(HERE, "node_modules/@ffmpeg-installer/linux-x64/ffmpeg"), "ffmpeg"].filter(Boolean);
  for (const bin of c) {
    const r = spawnSync(bin, ["-hide_banner", "-encoders"], { encoding: "utf8" });
    if (r.status === 0) return { bin, h264: /libx264/.test(r.stdout) };
  }
  return null;
}

const ease = (x) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
const seg = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));

async function encode(ff, frames, { fps, out, W, H }) {
  const args = ff.h264
    ? ["-y", "-f", "image2pipe", "-framerate", String(fps), "-c:v", "png", "-i", "-", "-c:v", "libx264", "-preset", "slow", "-crf", "16", "-pix_fmt", "yuv420p", "-movflags", "+faststart", `${out}.mp4`]
    : ["-y", "-f", "image2pipe", "-framerate", String(fps), "-c:v", "mjpeg", "-i", "-", "-c:v", "libvpx", "-b:v", "12M", `${out}.webm`];
  const p = spawn(ff.bin, args, { stdio: ["pipe", "ignore", "pipe"] });
  let err = "";
  p.stderr.on("data", (d) => (err += d));
  for await (const buf of frames) if (!p.stdin.write(buf)) await new Promise((r) => p.stdin.once("drain", r));
  p.stdin.end();
  const code = await new Promise((r) => p.on("close", r));
  if (code) throw new Error(`ffmpeg failed: ${err.slice(-800)}`);
  return `${out}.${ff.h264 ? "mp4" : "webm"}`;
}

/* ── 1. logo sting, 16:9, 4s ──────────────────────────────── */
function stingHTML() {
  const W = 1920, H = 1080;
  const L = lockup("horizontal", "dark");
  const u = L.u;
  const vbW = L.box.w;
  const k = 1100 / vbW; // lockup width on screen
  const r2 = (n) => Math.round(n * 100) / 100;
  // tag the two squares and the word so the timeline can move them
  const body0 = L.body.replace('<rect ', '<rect id="big" ').replace(/<rect (?!id)/, '<rect id="small" ').replace('<path ', '<path id="word" clip-path="url(#reveal)" ');
  const svg = `<svg class="abs" style="left:${r2((W - vbW * k) / 2)}px;top:${r2(H / 2 - (L.box.h * k) / 2 - 20)}px;overflow:visible" width="${r2(vbW * k)}" height="${r2(L.box.h * k)}" viewBox="0 ${r2(L.box.y)} ${r2(vbW)} ${r2(L.box.h)}">
    <defs><clipPath id="reveal"><rect id="rv" x="0" y="${r2(L.box.y - 10)}" width="0" height="${r2(L.box.h + 20)}"/></clipPath></defs>
    ${body0}</svg>`;
  const body =
    field({ x: 0, y: 0, w: W, h: H, size: 18, tone: "white", seed: 1, focal: [[W / 2, H / 2, 520]], redAt: 0.55 }).replace("<canvas", '<canvas id="f"') +
    svg +
    `<div id="lab" class="abs mono" style="left:0;width:${W}px;top:${H - 150}px;text-align:center;font-size:22px;color:${whiteA(0.62)};opacity:0">spacedrift.in &nbsp;·&nbsp; Noise → Parse → Model → <span style="color:${RED}">Ship</span></div>`;
  const script = `<script>
  window.renderFrame=(t)=>{
    const f=document.getElementById('f');const o=JSON.parse(f.dataset.field);
    const c=Math.min(1,Math.max(0,(t-0.8)/0.7));
    o.seed=1+t*0.9; o.thr=0.40+c*0.65; o.redAt=0.5+c; o.boost=0.35*(1-c);
    f.dataset.field=JSON.stringify(o); drawField(f);
    const e=(x)=>1-Math.pow(1-Math.min(1,Math.max(0,x)),3);
    const a=e((t-1.0)/0.5), b=e((t-1.25)/0.9), u=${u};
    const big=document.getElementById('big'), sm=document.getElementById('small');
    big.setAttribute('transform','translate('+(-4*u*(1-a))+' 0)'); big.style.opacity=a>0?1:0;
    sm.setAttribute('transform','translate('+(9*u*(1-b))+' '+(-7*u*(1-b))+')'); sm.style.opacity=b>0?1:0;
    const w=e((t-1.9)/0.9); document.getElementById('rv').setAttribute('width', w*${r2(vbW)});
    document.getElementById('lab').style.opacity=e((t-3.0)/0.5);
  };</script>`;
  return page({ W, H, bg: INK, body: body + script });
}

/* ── 2. animated story, 9:16, 7s ─────────────────────────── */
function storyShell() {
  const W = 1080, H = 1920, M = 80;
  const body =
    chrome({ W, H, top: 310, bottom: 1610, size: 22 }) +
    `<div class="abs" style="left:${M}px;top:258px">${lockupInline("signature", "light", { height: 40 })}</div>` +
    label({ x: M, y: 272, right: true, size: 22, html: "How we work" }) +
    `<div id="slot" class="abs" style="left:0;top:0;width:${W}px;height:${H}px"></div>` +
    label({ x: M, y: 1636, size: 22, color: INK, html: CONTACT.site }) +
    label({ x: M, y: 1636, right: true, size: 22, color: RED, html: "Reply within 24h" });
  return page({ W, H, body: body + `<script>window.setSlot=(h)=>{document.getElementById('slot').innerHTML=h}</script>` });
}
function storySlot(t) {
  const W = 1080, M = 80, D = 1.6;
  const i = Math.floor(t / D);
  let s = "";
  // four-segment progress bar
  for (let k = 0; k < 4; k++) {
    const w = (W - 2 * M - 3 * 10) / 4, x = M + k * (w + 10);
    const p = k < i ? 1 : k === i ? ease(seg(t, k * D, (k + 1) * D)) : 0;
    s += `<i class="abs" style="display:block;left:${x}px;top:350px;width:${w}px;height:8px;background:${inkA(0.1)}"></i>`;
    s += `<i class="abs" style="display:block;left:${x}px;top:350px;width:${w * p}px;height:8px;background:${k === 3 ? RED : INK}"></i>`;
  }
  if (i < 4) {
    const st = STATIONS[i];
    const lt = t - i * D;
    const g = st.scene === "noise" ? SCENES.noise({ cols: 48, rows: 20, t: 2 + lt * 3 })
      : st.scene === "parse" ? SCENES.parse({ cols: 48, rows: 20, p: Math.min(0.99, lt / D * 1.1), t: lt * 3 })
      : st.scene === "model" ? SCENES.model({ cols: 48, rows: 20, t: 3.2 + lt * 1.6 })
      : SCENES.ship({ cols: 48, rows: 20, t: lt * 2, p: Math.min(1, lt / D) });
    const k = ease(lt / 0.35);
    s += label({ x: M, y: 410, size: 24, color: RED, html: `Station ${st.n} · ${st.name} · ${st.when}` });
    s += headline({ x: M - 4, y: 460 + 30 * (1 - k), w: 920, size: 120, html: `${st.title}<br>*${st.accent}*`, style: `opacity:${k}` });
    s += term({ x: M, y: 780, w: W - 2 * M, grid: g, label: `${st.name.toLowerCase()} · ${st.n}/04`, pad: 26, barSize: 18, stamp: i === 3 ? { d: 14, color: RED } : null });
    s += label({ x: M, y: 1540, size: 22, html: `Output → ${st.out}` });
  } else {
    const k = ease(seg(t, 4 * D, 4 * D + 0.5));
    s += `<div class="abs" style="left:${M}px;top:${830 + 40 * (1 - k)}px;opacity:${k}">${lockupInline("signature", "light", { width: W - 2 * M })}</div>`;
    s += headline({ x: M - 4, y: 460, w: 920, size: 100, html: "We turn noise<br>into ML systems<br>*that ship.*", style: `opacity:${k}` });
    s += label({ x: M, y: 1110, size: 24, html: `Fixed scope · Fixed price · One engineer`, style: `opacity:${k}` });
    s += label({ x: M, y: 1160, size: 24, color: RED, html: CONTACT.email, style: `opacity:${k}` });
  }
  return s;
}

async function main() {
  const ff = findFFmpeg();
  if (!ff) { console.log("No usable ffmpeg found; skipping motion."); return; }
  console.log(`ffmpeg: ${ff.bin} (${ff.h264 ? "H.264" : "VP8 only"})`);
  const browser = await launch();
  const shot = ff.h264 ? { type: "png" } : { type: "jpeg", quality: 92 };

  // sting
  {
    const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 });
    const pg = await ctx.newPage();
    const f = path.join(TMP, "sting.html");
    fs.writeFileSync(f, stingHTML());
    await pg.goto(pathToFileURL(f).href);
    await pg.evaluate(() => window.__ready);
    const fps = 30, n = fps * 4.2;
    async function* frames() { for (let i = 0; i < n; i++) { await pg.evaluate((t) => window.renderFrame(t), i / fps); yield await pg.screenshot(shot); } }
    const out = await encode(ff, frames(), { fps, out: path.join(OUT, "logo-sting-3840x2160"), W: 3840, H: 2160 });
    // poster frame
    await pg.evaluate(() => window.renderFrame(4));
    await pg.screenshot({ path: path.join(OUT, "logo-sting-poster-3840x2160.png") });
    await ctx.close();
    console.log(`  ${path.relative(OUT, out)}`);
  }
  // story
  {
    const ctx = await browser.newContext({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
    const pg = await ctx.newPage();
    const f = path.join(TMP, "story.html");
    fs.writeFileSync(f, storyShell());
    await pg.goto(pathToFileURL(f).href);
    await pg.evaluate(() => window.__ready);
    const fps = 30, n = Math.round(fps * 7.6);
    async function* frames() { for (let i = 0; i < n; i++) { await pg.evaluate((h) => window.setSlot(h), storySlot(i / fps)); yield await pg.screenshot(shot); } }
    const out = await encode(ff, frames(), { fps, out: path.join(OUT, "story-how-we-work-1080x1920"), W: 1080, H: 1920 });
    await ctx.close();
    console.log(`  ${path.relative(OUT, out)}`);
  }
  await browser.close();
}
await main();
