// Procedural sound design: a tiny deterministic synth that turns cue events
// into a 48 kHz stereo WAV. No samples, no licensing.
import fs from "node:fs";

export const SR = 48000;

function prng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function synth(events, duration) {
  const n = Math.ceil(duration * SR);
  const L = new Float32Array(n), R = new Float32Array(n);
  const rnd = prng(20260924);

  const add = (i, l, r = l) => { if (i >= 0 && i < n) { L[i] += l; R[i] += r; } };

  for (const e of events) {
    const i0 = Math.floor(e.t * SR);
    const g = e.gain ?? 1;
    switch (e.type) {
      case "kick": {
        // sine with falling pitch, short decay
        let ph = 0;
        const len = 0.22 * SR;
        for (let j = 0; j < len; j++) {
          const x = j / SR;
          const f = 42 + 70 * Math.exp(-x * 38);
          ph += (2 * Math.PI * f) / SR;
          add(i0 + j, Math.sin(ph) * Math.exp(-x * 16) * 0.55 * g);
        }
        break;
      }
      case "hat": {
        let prev = 0;
        const len = 0.035 * SR;
        for (let j = 0; j < len; j++) {
          const w = rnd() * 2 - 1;
          const hp = w - prev; prev = w; // crude high-pass
          const v = hp * Math.exp(-(j / SR) * 120) * 0.07 * g;
          add(i0 + j, v * 0.8, v);
        }
        break;
      }
      case "click": {
        const len = 0.012 * SR;
        const f = 2200 + rnd() * 900;
        for (let j = 0; j < len; j++) add(i0 + j, Math.sin((2 * Math.PI * f * j) / SR) * Math.exp(-(j / SR) * 420) * 0.22 * g);
        break;
      }
      case "tick": {
        const len = 0.05 * SR;
        for (let j = 0; j < len; j++) {
          const x = j / SR;
          add(i0 + j, (Math.sin(2 * Math.PI * 1480 * x) * 0.5 + Math.sin(2 * Math.PI * 2960 * x) * 0.2) * Math.exp(-x * 90) * 0.3 * g);
        }
        break;
      }
      case "glitch": {
        // bit-crushed noise bursts with sample-and-hold, like the glyph scramble
        const len = (e.dur ?? 0.4) * SR;
        let hold = 0, v = 0;
        for (let j = 0; j < len; j++) {
          if (hold-- <= 0) { hold = 20 + Math.floor(rnd() * 180); v = Math.round((rnd() * 2 - 1) * 4) / 4; }
          const gate = Math.floor(j / (0.03 * SR)) % 3 !== 2 ? 1 : 0;
          const env = Math.min(1, j / 400) * Math.min(1, (len - j) / 800);
          const s = v * gate * env * 0.07 * g;
          add(i0 + j, s * (0.6 + 0.4 * Math.sin(j * 0.001)), s * (0.6 + 0.4 * Math.cos(j * 0.001)));
        }
        break;
      }
      case "static": {
        const len = (e.dur ?? 1) * SR;
        let lp = 0;
        for (let j = 0; j < len; j++) {
          const p = j / len;
          lp += ((rnd() * 2 - 1) - lp) * (0.05 + p * 0.6);
          const env = Math.pow(p, 1.6);
          add(i0 + j, lp * env * 0.22 * g, lp * env * 0.2 * g);
        }
        break;
      }
      case "hit": {
        // punchy impact: kick + noise transient
        let ph = 0;
        const len = 0.35 * SR;
        for (let j = 0; j < len; j++) {
          const x = j / SR;
          const f = 48 + 120 * Math.exp(-x * 30);
          ph += (2 * Math.PI * f) / SR;
          const body = Math.sin(ph) * Math.exp(-x * 9) * 0.6;
          const snap = (rnd() * 2 - 1) * Math.exp(-x * 70) * 0.22;
          add(i0 + j, (body + snap) * g);
        }
        break;
      }
      case "bass": {
        let ph = 0;
        const len = 1.6 * SR;
        for (let j = 0; j < len; j++) {
          const x = j / SR;
          ph += (2 * Math.PI * (38 + 18 * Math.exp(-x * 6))) / SR;
          const v = Math.tanh(Math.sin(ph) * 2.2) * Math.exp(-x * 2.2) * 0.5 * g;
          add(i0 + j, v);
        }
        break;
      }
      case "whoosh":
      case "rwhoosh": {
        const len = (e.dur ?? 0.5) * SR;
        let lp = 0;
        for (let j = 0; j < len; j++) {
          let p = j / len;
          if (e.type === "rwhoosh") p = 1 - p;
          const env = Math.sin(Math.PI * Math.min(1, e.type === "rwhoosh" ? 1 - p : p)) ** 2;
          lp += ((rnd() * 2 - 1) - lp) * (0.02 + p * 0.35);
          const pan = e.type === "rwhoosh" ? 1 - p : p;
          add(i0 + j, lp * env * 0.3 * (1 - pan * 0.5) * g, lp * env * 0.3 * (0.5 + pan * 0.5) * g);
        }
        break;
      }
      case "riser": {
        const len = (e.dur ?? 2) * SR;
        let ph = 0, lp = 0;
        for (let j = 0; j < len; j++) {
          const p = j / len;
          ph += (2 * Math.PI * (180 + 900 * p * p)) / SR;
          lp += ((rnd() * 2 - 1) - lp) * (0.02 + p * 0.3);
          const saw = ((ph / (2 * Math.PI)) % 1) * 2 - 1;
          const v = (saw * 0.05 + lp * 0.16) * p * p * g;
          add(i0 + j, v, v * 0.9);
        }
        break;
      }
      case "stamp": {
        let ph = 0;
        const len = 0.3 * SR;
        for (let j = 0; j < len; j++) {
          const x = j / SR;
          ph += (2 * Math.PI * (90 * Math.exp(-x * 12) + 55)) / SR;
          const v = (Math.sin(ph) * 0.5 + (rnd() * 2 - 1) * 0.3 * Math.exp(-x * 50)) * Math.exp(-x * 14) * g;
          add(i0 + j, v);
        }
        break;
      }
      case "chime": {
        // the logo lands: a fifth, soft attack, long tail
        const len = 2.6 * SR;
        const parts = [[659.25, 0.16], [987.77, 0.1], [1318.5, 0.06], [329.63, 0.1]];
        for (let j = 0; j < len; j++) {
          const x = j / SR;
          const env = Math.min(1, x / 0.008) * Math.exp(-x * 1.7);
          let v = 0;
          for (const [f, a] of parts) v += Math.sin(2 * Math.PI * f * x) * a;
          add(i0 + j, v * env * g, v * env * g * 0.94);
        }
        break;
      }
    }
  }
  // gentle master glue: soft clip
  for (let i = 0; i < n; i++) {
    L[i] = Math.tanh(L[i] * 1.2) / 1.2;
    R[i] = Math.tanh(R[i] * 1.2) / 1.2;
  }
  return { L, R, n };
}

export function writeWav(file, { L, R, n }) {
  const buf = Buffer.alloc(44 + n * 4);
  buf.write("RIFF", 0); buf.writeUInt32LE(36 + n * 4, 4); buf.write("WAVE", 8);
  buf.write("fmt ", 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
  buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
  buf.write("data", 36); buf.writeUInt32LE(n * 4, 40);
  for (let i = 0; i < n; i++) {
    buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i])) * 32767), 44 + i * 4);
    buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i])) * 32767), 46 + i * 4);
  }
  fs.writeFileSync(file, buf);
}
