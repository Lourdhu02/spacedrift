// Renderer.
//   node src/render.mjs --stills 9x16 60 1.2,2.8,12        PNG stills (QA)
//   node src/render.mjs --contact 9x16 60                  1 frame/sec contact sheet
//   node src/render.mjs --video 9x16 60 [--from 0 --to 5]  one MP4
//   node src/render.mjs --all                              every format × cut + covers + SRT
import { createCanvas } from "@napi-rs/canvas";
import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { FPS, cubicIO, rect, INK, RED } from "./core.mjs";
import { layout } from "./layout.mjs";
import { build, find, audioEvents, WIPE } from "./timeline.mjs";
import { chrome } from "./scenes.mjs";
import { synth, writeWav } from "./audio.mjs";

const HERE = path.dirname(new URL(import.meta.url).pathname);
// full ffmpeg (libx264 + aac) from the optional installer package, else system ffmpeg
const FFMPEG = (() => {
  const bundled = path.resolve(HERE, "../node_modules/@ffmpeg-installer/linux-x64/ffmpeg");
  return fs.existsSync(bundled) ? bundled : "ffmpeg";
})();
const OUT = path.resolve(HERE, "../out");
fs.mkdirSync(OUT, { recursive: true });

const name = (cut, fmt) => `spacedrift-launch-${cut}s-${fmt}`;

function drawFrame(ctx, L, tl, gt) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalAlpha = 1;
  const it = find(tl, gt);
  const lt = gt - it.start;
  it.scene.draw(ctx, L, lt, it.dur, it.o);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalAlpha = 1;
  if (it.scene.chrome(lt, it.dur)) chrome(ctx, L, gt, it.scene.dark(lt, it.dur));
  // ink wipe: rises over the outgoing scene, then lifts off the incoming one
  if (it.wipeOut && lt > it.dur - WIPE) {
    const p = cubicIO((lt - (it.dur - WIPE)) / WIPE);
    const y = L.H * (1 - p);
    rect(ctx, 0, y, L.W, L.H - y, INK);
    rect(ctx, 0, y, L.W, 8 * L.u, RED);
  }
  if (it.wipeIn && lt < WIPE) {
    const p = cubicIO(lt / WIPE);
    const h = L.H * (1 - p);
    rect(ctx, 0, 0, L.W, h, INK);
    rect(ctx, 0, h - 8 * L.u, L.W, 8 * L.u, RED);
  }
}

function setup(fmt) {
  const L = layout(fmt);
  const canvas = createCanvas(L.W, L.H);
  const ctx = canvas.getContext("2d");
  return { L, canvas, ctx };
}

function stills(fmt, cut, times, dir = path.join(OUT, "stills")) {
  fs.mkdirSync(dir, { recursive: true });
  const { L, canvas, ctx } = setup(fmt);
  const tl = build(cut);
  const files = [];
  for (const t of times) {
    const t0 = performance.now();
    drawFrame(ctx, L, tl, t);
    const f = path.join(dir, `${name(cut, fmt)}-t${t.toFixed(2)}.png`);
    fs.writeFileSync(f, canvas.toBuffer("image/png"));
    files.push({ f, ms: Math.round(performance.now() - t0) });
  }
  return files;
}

function contact(fmt, cut) {
  const tl = build(cut);
  const { L, canvas, ctx } = setup(fmt);
  const n = Math.ceil(tl.duration);
  const cols = fmt === "16x9" ? 6 : 10;
  const scale = fmt === "16x9" ? 0.16 : 0.14;
  const tw = Math.round(L.W * scale), th = Math.round(L.H * scale);
  const rows = Math.ceil(n / cols);
  const sheet = createCanvas(cols * (tw + 8) + 8, rows * (th + 30) + 8);
  const sc = sheet.getContext("2d");
  sc.fillStyle = "#ffffff";
  sc.fillRect(0, 0, sheet.width, sheet.height);
  for (let i = 0; i < n; i++) {
    const t = Math.min(tl.duration - 1 / FPS, i + 0.5);
    drawFrame(ctx, L, tl, t);
    const x = 8 + (i % cols) * (tw + 8), y = 8 + Math.floor(i / cols) * (th + 30);
    sc.drawImage(canvas, x, y, tw, th);
    sc.fillStyle = "#0a0a0a";
    sc.font = "500 14px 'Geist Mono'";
    sc.fillText(`${t.toFixed(1)}s`, x, y + th + 18);
  }
  const f = path.join(OUT, "qa", `contact-${name(cut, fmt)}.png`);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, sheet.toBuffer("image/png"));
  return f;
}

function ff(args, input) {
  const r = spawnSync(FFMPEG, args, { input, maxBuffer: 1 << 26 });
  if (r.error) throw r.error;
  if (r.status !== 0) throw new Error(`ffmpeg failed: ${r.stderr.toString().slice(-2000)}`);
  return r.stderr.toString();
}

/** Synthesize the cut's soundtrack and normalize to -14 LUFS (two-pass loudnorm). */
function soundtrack(cut) {
  const tl = build(cut);
  const raw = path.join(OUT, "audio", `${name(cut, "raw")}.wav`);
  const norm = path.join(OUT, "audio", `spacedrift-launch-${cut}s.wav`);
  fs.mkdirSync(path.dirname(raw), { recursive: true });
  writeWav(raw, synth(audioEvents(tl), tl.duration));
  const pass1 = ff(["-hide_banner", "-i", raw, "-af", "loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json", "-f", "null", "-"]);
  const m = JSON.parse(pass1.slice(pass1.lastIndexOf("{"), pass1.lastIndexOf("}") + 1));
  ff(["-hide_banner", "-y", "-i", raw, "-af",
    `loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=${m.input_i}:measured_TP=${m.input_tp}:measured_LRA=${m.input_lra}:measured_thresh=${m.input_thresh}:offset=${m.target_offset}:linear=true`,
    "-ar", "48000", norm]);
  fs.unlinkSync(raw);
  return norm;
}

async function video(fmt, cut, { from = 0, to = null, wav = null } = {}) {
  const tl = build(cut);
  const { L, canvas, ctx } = setup(fmt);
  const end = to ?? tl.duration;
  const frames = Math.round((end - from) * FPS);
  const out = path.join(OUT, `${name(cut, fmt)}${from || to ? `-${from}-${end}` : ""}.mp4`);
  const audio = wav ?? soundtrack(cut);
  const args = [
    "-hide_banner", "-loglevel", "error", "-y",
    "-f", "rawvideo", "-pix_fmt", "rgba", "-s", `${L.W}x${L.H}`, "-framerate", String(FPS), "-i", "pipe:0",
    "-ss", String(from), "-t", String(end - from), "-i", audio,
    "-map", "0:v", "-map", "1:a",
    "-vf", "scale=flags=lanczos+accurate_rnd+full_chroma_int:out_color_matrix=bt709:out_range=tv,format=yuv420p",
    "-c:v", "libx264", "-preset", "slow", "-tune", "animation", "-crf", "16",
    "-profile:v", "high", "-level", "4.2", "-g", String(FPS * 2), "-bf", "2",
    "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-color_range", "tv",
    "-c:a", "aac", "-b:a", "320k", "-ar", "48000",
    "-movflags", "+faststart", "-shortest", out,
  ];
  const p = spawn(FFMPEG, args, { stdio: ["pipe", "inherit", "inherit"] });
  const done = new Promise((res, rej) => p.on("close", (c) => (c === 0 ? res() : rej(new Error(`ffmpeg exit ${c}`)))));
  const t0 = performance.now();
  for (let f = 0; f < frames; f++) {
    drawFrame(ctx, L, tl, from + f / FPS);
    const px = ctx.getImageData(0, 0, L.W, L.H).data;
    if (!p.stdin.write(Buffer.from(px.buffer, px.byteOffset, px.byteLength))) await new Promise((r) => p.stdin.once("drain", r));
    if (f % 600 === 0) process.stdout.write(`  ${name(cut, fmt)} ${f}/${frames}\n`);
  }
  p.stdin.end();
  await done;
  const secs = ((performance.now() - t0) / 1000).toFixed(0);
  console.log(`✓ ${path.basename(out)}  ${frames} frames in ${secs}s`);
  return out;
}

/* ── captions (SRT) derived from the timeline ── */
import { STATIONS } from "./scenes.mjs";
function srt(cut) {
  const tl = build(cut);
  const cues = [];
  for (const it of tl.items) {
    const s = it.start, d = it.dur, key = it.scene;
    const scene = Object.entries(SCENE_NAMES).find(([, v]) => v === key)?.[0];
    if (scene === "hook") cues.push([s + d * 0.5, s + d, "Most AI projects die in the noise."]);
    else if (scene === "problem") {
      const c = (d - 1) / 3;
      ["Loose scope.", "Messy data.", "Nobody owns the build."].forEach((t, i) => cues.push([s + i * c, s + (i + 1) * c, t]));
      cues.push([s + d - 1, s + d, "There's a better way."]);
    } else if (scene === "station") {
      const S = STATIONS[it.o.i];
      cues.push([s, s + d, d >= 4 ? `Station ${S.n} · ${S.name}. ${S.title} You get: ${S.out}.` : `${S.name}.`]);
    } else if (scene === "services") cues.push([s, s + d, "Six things we do well: Research Ops, Document AI & OCR, RAG & AI MVPs, Data Annotation, Web Development, Mobile Apps."]);
    else if (scene === "proof") cues.push([s, s + d, "24h first reply. ~3-week AI MVP. 30 days of support. 100% of the code is yours."]);
    else if (scene === "endcard") cues.push([s, s + d, "spacedrift — now booking. Book a scoping call: spacedrift.contact@gmail.com · spacedrift.in"]);
  }
  const ts = (x) => {
    const ms = Math.round(x * 1000);
    const h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, sec = Math.floor(ms / 1000) % 60, r = ms % 1000;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")},${String(r).padStart(3, "0")}`;
  };
  const body = cues.map(([a, b, t], i) => `${i + 1}\n${ts(a)} --> ${ts(b)}\n${t}\n`).join("\n");
  const f = path.join(OUT, `spacedrift-launch-${cut}s.srt`);
  fs.writeFileSync(f, body);
  return f;
}
import * as SCENE_MOD from "./scenes.mjs";
const SCENE_NAMES = {
  hook: SCENE_MOD.hook, problem: SCENE_MOD.problem, station: SCENE_MOD.station,
  services: SCENE_MOD.services, proof: SCENE_MOD.proof, endcard: SCENE_MOD.endcard,
};

/* ── CLI ── */
const [, , mode, fmt, cutArg, list] = process.argv;
const flag = (k) => { const i = process.argv.indexOf(k); return i > 0 ? Number(process.argv[i + 1]) : null; };

if (mode === "--stills") {
  for (const r of stills(fmt, Number(cutArg), list.split(",").map(Number))) console.log(`${r.ms}ms  ${r.f}`);
} else if (mode === "--contact") {
  console.log(contact(fmt, Number(cutArg)));
} else if (mode === "--video") {
  await video(fmt, Number(cutArg), { from: flag("--from") ?? 0, to: flag("--to") });
} else if (mode === "--all") {
  for (const cut of [60, 15, 6]) {
    const wav = soundtrack(cut);
    srt(cut);
    for (const f of ["9x16", "4x5", "16x9"]) await video(f, cut, { wav });
  }
  // covers: the hook headline (scroll-stopper) and the end card
  const coverDir = path.join(OUT, "covers");
  for (const f of ["9x16", "4x5", "16x9"]) {
    const [a, b] = stills(f, 60, [2.9, 59.5], coverDir);
    fs.renameSync(a.f, path.join(coverDir, `cover-hook-${f}.png`));
    fs.renameSync(b.f, path.join(coverDir, `cover-endcard-${f}.png`));
  }
  console.log("done");
} else {
  console.log("usage: --stills <fmt> <cut> <t,t,…> | --contact <fmt> <cut> | --video <fmt> <cut> | --all");
}
