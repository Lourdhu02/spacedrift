// Shared page shell + visual-language components for every template.
// All sizes are CSS px at the template's base size; render.mjs picks the
// deviceScaleFactor that turns the base size into a 4K-class PNG.
import { fontFaceCSS, SANS, MONO } from "./fonts.mjs";
import { INK, WHITE, RED } from "./logo.mjs";
export { INK, WHITE, RED };
export * from "./logo.mjs";

export const inkA = (a) => `rgba(10,10,10,${a})`;
export const whiteA = (a) => `rgba(255,255,255,${a})`;

export const CONTACT = {
  email: "spacedrift.contact@gmail.com",
  site: "spacedrift.in",
  city: "Bengaluru, India",
  reply: "Reply within 24h",
};

export const SERVICES = [
  { n: "01", title: "Research Ops", lines: ["Experiments your", "reviewers can"], accent: "reproduce.", short: "Reproducible experiment pipelines, dataset curation and baseline replication for PhD scholars and academic labs.", tags: ["PyTorch", "W&B", "Hydra"], scene: "research", cap: "seeds 0·1·2 → same result", hl: "research" },
  { n: "02", title: "Document AI & OCR", lines: ["Documents in."], accent: "Clean data out.", short: "Validated extraction pipelines for invoices, receipts, IDs, forms and Indian-language scripts.", tags: ["OCR", "LayoutLM", "Indic"], scene: "parse", cap: "extract → structured json" },
  { n: "03", title: "RAG & AI MVPs", lines: ["AI that answers", "from your data,"], accent: "not guesses.", short: "Knowledge-base assistants, retrieval systems and small agentic workflows. Fixed scope, about three weeks.", tags: ["RAG", "Agents", "Evals"], scene: "rag", cap: "retrieve → cite → answer" },
  { n: "04", title: "Data Annotation", lines: ["Labels you can"], accent: "actually audit.", short: "Vision, text and audio labels with written guidelines, two-pass QA and agreement reported per label.", tags: ["Vision", "NLP", "Audio"], scene: "annotate", cap: "label → review → agree" },
  { n: "05", title: "Web Development", lines: ["Websites that", "load fast"], accent: "and ship faster.", short: "Fast, accessible marketing sites, product pages and dashboards on Next.js that you fully own.", tags: ["Next.js", "TypeScript", "A11y"], scene: "web", cap: "design → build → deploy" },
  { n: "06", title: "Mobile Apps", lines: ["Android and iOS", "apps"], accent: "that feel native.", short: "Android and iOS apps in Flutter, Kotlin and Swift, with on-device ML and the store release handled.", tags: ["Flutter", "Kotlin", "Swift"], scene: "mobile", cap: "flutter · kotlin · swift" },
];

export const STATIONS = [
  { n: "01", name: "Noise", when: "Day 0", title: "We listen before", accent: "we build.", body: "You bring the problem, the data, the deadline and the constraints. We tell you honestly whether it fits a fixed-scope build.", out: "A clear go / no-go after one call", scene: "noise" },
  { n: "02", name: "Parse", when: "Within 24h", title: "Scope,", accent: "written down.", body: "A fixed-price proposal: deliverables, milestones, assumptions and exclusions. The quoted price is the boundary.", out: "Signed scope and a fixed price", scene: "parse" },
  { n: "03", name: "Model", when: "Build weeks", title: "Build against", accent: "the scope.", body: "Working previews, sample outputs and evaluation numbers at every milestone, while feedback is still cheap.", out: "Weekly previews with real metrics", scene: "model" },
  { n: "04", name: "Ship", when: "Handoff", title: "Hand it over,", accent: "fully.", body: "Source code, documentation and deployment on your own accounts, plus a handoff session and 30 days of support.", out: "Code, docs and 30-day support", scene: "ship" },
];

/* ── page shell ─────────────────────────────────────────────── */
export function page({ W, H, bg = WHITE, body, css = "" }) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
${fontFaceCSS()}
:root{--ink:${INK};--red:${RED};--white:${WHITE}}
*{margin:0;padding:0;box-sizing:border-box;border-radius:0!important}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:${bg}}
body{position:relative;font-family:"${SANS}";color:var(--ink);-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision;font-kerning:normal}
svg{display:block}
.abs{position:absolute}
.mono{font-family:"${MONO}";font-weight:500;text-transform:uppercase;letter-spacing:.06em;line-height:1.3}
.mono-lc{font-family:"${MONO}";font-weight:400;letter-spacing:0;line-height:1.35}
.h{font-weight:600;letter-spacing:-0.045em;line-height:.94;font-feature-settings:"ss01" 0}
.h b{font-weight:600;color:var(--red)}
.b{font-weight:400;letter-spacing:-0.012em;line-height:1.38}
.red{color:var(--red)}
.ink{background:var(--ink);color:#fff}
.hair{position:absolute;background:currentColor}
pre.ascii{font-family:"${MONO}";font-weight:400;white-space:pre;line-height:1.12;letter-spacing:0}
.t-d{opacity:.4}.t-r{color:var(--red)}
.blk{display:inline-block;height:0.98em;vertical-align:-0.16em;background:currentColor;-webkit-text-fill-color:transparent}
.term{position:absolute;background:var(--ink);color:#fff}
.term .bar{display:flex;align-items:center;justify-content:space-between}
.term .dots{display:inline-flex}
.term .dots i{display:block;background:${whiteA(0.16)}}
.term .dots i:first-child{background:var(--red)}
.term .lab{color:${whiteA(0.55)}}
${css}
</style></head><body>${body}
<script>
const H=(x,y,s)=>{const n=Math.sin(x*127.1+y*311.7+s*74.7)*43758.5453;return n-Math.floor(n)};
function drawField(cv){
  const o=JSON.parse(cv.dataset.field);
  const dpr=window.devicePixelRatio||1;
  cv.width=Math.round(o.w*dpr);cv.height=Math.round(o.h*dpr);
  const ctx=cv.getContext("2d");ctx.scale(dpr,dpr);
  ctx.font=o.size+'px "${MONO}"';ctx.textBaseline="top";
  const cw=o.cw,ch=o.ch,set=o.set,thr=o.thr;
  const base=o.tone==="white"?"255,255,255":"10,10,10";
  const tiers=o.alpha;
  const cols=Math.ceil(o.w/cw)+1,rows=Math.ceil(o.h/ch)+1;
  const ox=o.ox||0,oy=o.oy||0;
  const x0=Math.floor(ox/cw),y0=Math.floor(oy/ch);
  for(let yy=0;yy<rows;yy++)for(let xx=0;xx<cols;xx++){
    const ix=x0+xx,iy=y0+yy;
    const X=ix*cw-ox,Y=iy*ch-oy; // canvas coords
    const t=o.seed;
    let v=Math.sin(ix*o.fx+t*3)+Math.cos(iy*o.fy-t*2)+Math.sin((ix+iy)*o.fd+t*4)*.8+(H(ix,iy,t)-.5)*o.jitter;
    let n=(v+2.8)/5.6;
    // global fade (0..1) by position, e.g. texture that thins out toward text
    let f=1;
    if(o.fade){const [ax,ay,bx,by]=o.fade;const gx=(X+ox)/(o.gw||o.w),gy=(Y+oy)/(o.gh||o.h);const p=Math.max(0,Math.min(1,((gx-ax)*(bx-ax)+(gy-ay)*(by-ay))/((bx-ax)**2+(by-ay)**2)));f=1-p;}
    for(const r of (o.clear||[])){const [rx,ry,rw,rh,soft]=r;const dx=Math.max(rx-X,0,X-(rx+rw)),dy=Math.max(ry-Y,0,Y-(ry+rh));const d=Math.hypot(dx,dy);f=Math.min(f,soft?Math.min(1,d/soft):(d>0?1:0));}
    if(f<=0.02)continue;
    n=n*(0.55+0.45*f)+(f-1)*0.25;
    let light=0;
    for(const p of (o.focal||[])){const d=Math.hypot(X+ox-p[0],Y+oy-p[1])/p[2];if(d<1)light=Math.max(light,1-d);}
    let hot=false;
    for(const r of (o.hot||[])){if(X+ox>=r[0]+cw*.7&&X+ox+cw<=r[0]+r[2]-cw*.5&&Y+oy>=r[1]+ch*.3&&Y+oy+ch<=r[1]+r[3]-ch*.3)hot=true;}
    n=Math.min(0.999,n+light*o.boost*f);
    if(hot){const r=H(ix+11,iy+7,t+5);if(r<0.18)continue;n=Math.max(n,thr+(1-thr)*Math.min(.99,r*0.95));}
    if(hot)light=1;
    if(n<thr)continue;
    const k=Math.min(set.length-1,Math.floor(((n-thr)/(1-thr))*set.length*1.001));
    const c=set[k];if(c===" ")continue;
    if(hot){ctx.fillStyle=n>0.8?"rgba(225,6,0,.95)":"rgba(225,6,0,.62)";}
    else if(light>o.redAt){ctx.fillStyle=light>o.redAt+.3?"rgba(225,6,0,.92)":"rgba(225,6,0,.6)";}
    else{const a=tiers[Math.min(tiers.length-1,Math.floor(((n-thr)/(1-thr))*tiers.length))]*(0.35+0.65*f)*(1+light*0.6);ctx.fillStyle="rgba("+base+","+a.toFixed(3)+")";}
    ctx.fillText(c,X,Y);
  }
}
window.__ready=(async()=>{
  await document.fonts.ready;
  await Promise.all([document.fonts.load('600 40px "${SANS}"'),document.fonts.load('400 40px "${MONO}"'),document.fonts.load('500 40px "${MONO}"'),document.fonts.load('400 40px "${SANS}"')]);
  const bad=[...document.fonts].filter(f=>f.status==="error").map(f=>f.family+" "+f.weight);
  if(bad.length)throw new Error("font failed: "+bad.join(", "));
  if(!document.fonts.check('600 40px "${SANS}"')||!document.fonts.check('400 40px "${MONO}"'))throw new Error("Geist not loaded");
  document.querySelectorAll("canvas[data-field]").forEach(drawField);
  return true;
})();
</script></body></html>`;
}

/* ── components ─────────────────────────────────────────────── */
const px = (n) => `${Math.round(n * 100) / 100}px`;

/** Six-column Swiss grid hairlines between x and x+w. */
export function grid({ x, y = 0, w, h, cols = 6, color = inkA(0.06), weight = 1 }) {
  let s = "";
  for (let i = 0; i <= cols; i++) {
    const lx = x + (w * i) / cols - (i === cols ? weight : 0);
    s += `<i class="hair" style="left:${px(lx)};top:${px(y)};width:${weight}px;height:${px(h)};color:${color}"></i>`;
  }
  return s;
}
export const hline = ({ x, y, w, color = inkA(0.14), weight = 1 }) => `<i class="hair" style="left:${px(x)};top:${px(y)};width:${px(w)};height:${weight}px;color:${color}"></i>`;
export const vline = ({ x, y, h, color = inkA(0.14), weight = 1 }) => `<i class="hair" style="left:${px(x)};top:${px(y)};width:${weight}px;height:${px(h)};color:${color}"></i>`;
export const block = ({ x, y, w, h, color = RED, extra = "" }) => `<i class="abs" style="display:block;left:${px(x)};top:${px(y)};width:${px(w)};height:${px(h)};background:${color};${extra}"></i>`;

/** Small registration ticks at the four corners of a frame. */
export function ticks({ x, y, w, h, len = 14, color = inkA(0.35) }) {
  const L = (a, b, ww, hh) => `<i class="hair" style="left:${px(a)};top:${px(b)};width:${px(ww)};height:${px(hh)};color:${color}"></i>`;
  return (
    L(x, y, len, 1) + L(x, y, 1, len) +
    L(x + w - len, y, len, 1) + L(x + w - 1, y, 1, len) +
    L(x, y + h - 1, len, 1) + L(x, y + h - len, 1, len) +
    L(x + w - len, y + h - 1, len, 1) + L(x + w - 1, y + h - len, 1, len)
  );
}

/** Positioned text. style: extra CSS. */
export const text = ({ x, y, w, cls = "", style = "", html, right = false, bottom }) =>
  `<div class="abs ${cls}" style="${right ? `right:${px(x)}` : `left:${px(x)}`};${bottom !== undefined ? `bottom:${px(bottom)}` : `top:${px(y)}`};${w ? `width:${px(w)};` : ""}${style}">${html}</div>`;

/** Mono uppercase label. */
export const label = (o) => text({ ...o, cls: `mono ${o.cls || ""}`, style: `font-size:${px(o.size || 18)};color:${o.color || inkA(0.62)};${o.style || ""}` });

/** Big headline; *word* → red. */
export const hl = (s) => s.replace(/\*([^*]+)\*/g, "<b>$1</b>");
export const headline = (o) =>
  text({ ...o, cls: `h ${o.cls || ""}`, style: `font-size:${px(o.size)};${o.color ? `color:${o.color};` : ""}${o.tracking ? `letter-spacing:${o.tracking}em;` : ""}${o.lh ? `line-height:${o.lh};` : ""}${o.style || ""}`, html: hl(o.html) });

/**
 * ASCII texture field on a canvas.
 * opts: x,y,w,h, set, size (glyph px), focal: [[gx,gy,r]...] in global coords,
 * clear: [[x,y,w,h,soft]] in canvas coords, tone: ink|white, density (0..1), ox/oy global offset.
 */
export function field(o) {
  const size = o.size ?? 14;
  const cfg = {
    w: o.w, h: o.h, ox: o.ox ?? 0, oy: o.oy ?? 0, gw: o.gw, gh: o.gh,
    size, cw: o.cw ?? size * 0.6 * 1.3, ch: o.ch ?? size * 1.3,
    set: o.set ?? " .:-=+*#", thr: o.thr ?? 0.41, seed: o.seed ?? 1.7,
    fx: o.fx ?? 0.11, fy: o.fy ?? 0.13, fd: o.fd ?? 0.05, jitter: o.jitter ?? 0.9,
    tone: o.tone ?? "ink", alpha: o.alpha ?? (o.tone === "white" ? [0.06, 0.09, 0.13, 0.19] : [0.06, 0.09, 0.13, 0.18]), boost: o.boost ?? 0.35,
    focal: o.focal ?? [], hot: o.hot ?? [], redAt: o.redAt ?? 0.38, clear: o.clear ?? [], fade: o.fade,
  };
  return `<canvas class="abs" data-field='${JSON.stringify(cfg)}' style="left:${px(o.x)};top:${px(o.y)};width:${px(o.w)};height:${px(o.h)}"></canvas>`;
}

/**
 * Ink terminal panel with an ASCII scene.
 * grid: a Grid from ascii.mjs. width sets the font size so cols fit exactly.
 */
export function term({ x, y, w, grid: g, label: lab = "", foot = "", pad = 28, barSize = 16, stamp = null, style = "", dots = true, bg = INK }) {
  const inner = w - pad * 2;
  const fs = inner / (g.cols * 0.6);
  const dot = Math.round(barSize * 0.62);
  const bar = `<div class="bar" style="padding-bottom:${px(barSize * 0.9)};margin-bottom:${px(barSize * 1.1)};border-bottom:1px solid ${whiteA(0.14)}">
    ${dots ? `<span class="dots" style="gap:${px(dot * 0.7)}"><i style="width:${px(dot)};height:${px(dot)}"></i><i style="width:${px(dot)};height:${px(dot)}"></i><i style="width:${px(dot)};height:${px(dot)}"></i></span>` : "<span></span>"}
    <span class="mono lab" style="font-size:${px(barSize)}">${lab}</span></div>`;
  const ft = foot ? `<div class="mono lab" style="font-size:${px(barSize)};margin-top:${px(barSize * 1.1)};padding-top:${px(barSize * 0.9)};border-top:1px solid ${whiteA(0.14)};display:flex;justify-content:space-between">${foot}</div>` : "";
  const sh = stamp ? `box-shadow:${px(stamp.d)} ${px(stamp.d)} 0 ${stamp.color};` : "";
  return `<div class="term" style="left:${px(x)};top:${px(y)};width:${px(w)};padding:${px(pad)};background:${bg};${sh}${style}">${bar}<pre class="ascii" style="font-size:${px(fs)}">${g.toHTML()}</pre>${ft}</div>`;
}

/** Terminal height for layout planning. */
export function termHeight({ w, grid: g, pad = 28, barSize = 16, foot = "" }) {
  const fs = (w - pad * 2) / (g.cols * 0.6);
  const barH = barSize * 1.3 + barSize * 0.9 + 1 + barSize * 1.1;
  const footH = foot ? barSize * 1.1 + barSize * 0.9 + 1 + barSize * 1.3 : 0;
  return pad * 2 + barH + g.rows * fs * 1.12 + footH;
}

/** Service tag chips (square, hairline). */
export function chips({ x, y, items, size = 18, color = inkA(0.7), line = inkA(0.2), gap = 10, right = false }) {
  const c = items.map((t) => `<span class="mono" style="display:inline-block;font-size:${px(size)};padding:${px(size * 0.5)} ${px(size * 0.8)};box-shadow:inset 0 0 0 1px ${line};color:${color};margin-right:${px(gap)}">${t}</span>`).join("");
  return text({ x, y, right, html: c, style: "white-space:nowrap" });
}

/** Arc: NOISE → PARSE → MODEL → SHIP, with one stage highlighted. */
export function arc({ active = -1, arrowColor = RED, color = inkA(0.62), activeColor = INK } = {}) {
  return ["Noise", "Parse", "Model", "Ship"]
    .map((s, i) => `<span style="color:${i === active ? activeColor : color}">${s}</span>`)
    .join(` <span style="color:${arrowColor}">→</span> `);
}

/** Labelled bounding box (the annotation motif): hairline frame + solid tag. */
export function bbox({ x, y, w, h, label: lab, color = INK, tagText = WHITE, size = 14, weight = 1.5, corner = 0 }) {
  const L = (a, b, ww, hh) => `<i class="abs" style="display:block;left:${px(a)};top:${px(b)};width:${px(ww)};height:${px(hh)};background:${color}"></i>`;
  let s = L(x, y, w, weight) + L(x, y + h - weight, w, weight) + L(x, y, weight, h) + L(x + w - weight, y, weight, h);
  if (corner) {
    const c = corner;
    s += L(x - c / 2, y - c / 2, c, c) + L(x + w - c / 2, y - c / 2, c, c) + L(x - c / 2, y + h - c / 2, c, c) + L(x + w - c / 2, y + h - c / 2, c, c);
  }
  if (lab) s += `<div class="abs mono" style="left:${px(x)};top:${px(y - size * 1.7)};height:${px(size * 1.7)};padding:0 ${px(size * 0.55)};display:flex;align-items:center;font-size:${px(size)};background:${color};color:${tagText}">${lab}</div>`;
  return s;
}

/** Wrap base-coordinate content so it scales to a different output size. */
export const scaled = (k, w, h, inner) => `<div class="abs" style="left:0;top:0;width:${px(w)};height:${px(h)};transform:scale(${k});transform-origin:0 0">${inner}</div>`;
