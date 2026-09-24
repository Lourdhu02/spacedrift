# spacedrift — launch film

A 60-second launch film plus 15s and 6s cutdowns, in three layouts. Every frame is
rendered from code at a true 60 fps, in the brand palette (white `#FFFFFF`, ink
`#0A0A0A`, red `#E10600`) with Geist and Geist Mono. The sound design is synthesized
from the same timeline, so every cue lands on the picture.

## Files (`out/`)

| File | Use it for |
|---|---|
| `spacedrift-launch-60s-9x16.mp4` | Instagram Reels, LinkedIn mobile |
| `spacedrift-launch-60s-4x5.mp4` | Instagram feed, LinkedIn feed (the workhorse) |
| `spacedrift-launch-60s-16x9.mp4` | LinkedIn desktop, website hero, YouTube |
| `spacedrift-launch-15s-*.mp4` | Stories, Reels retention, paid reach |
| `spacedrift-launch-6s-*.mp4` | Bumper ads, story teasers |
| `spacedrift-launch-{60,15,6}s.srt` | Caption files — upload to LinkedIn for accessibility |
| `audio/spacedrift-launch-{60,15,6}s.wav` | Soundtrack stems, normalized to −14 LUFS |
| `covers/cover-hook-*.png` | Thumbnail / Reels cover (the scroll-stopper) |
| `covers/cover-endcard-*.png` | Alternate cover, end card |

Encoding: H.264 High, 60 fps, CRF 16 (visually lossless), yuv420p BT.709, AAC 320 kb/s,
fast-start. 1080×1920, 1080×1350 and 1920×1080.

## The story (60s, 120 BPM — one beat = 0.5s)

| Time | Beat |
|---|---|
| 0:00–0:03 | **Hook.** A red cursor; ASCII noise floods the screen; hard cut to *"Most AI projects die in the noise."* |
| 0:03–0:10 | **Problem.** Loose scope · Messy data · Nobody owns the build — each struck through in red, then *"There's a better way."* |
| 0:10–0:38 | **The four stations.** Noise → Parse → Model → Ship, each with a live ASCII terminal and its "You get" line. |
| 0:38–0:48 | **Services.** The six services build tile by tile, each with a micro-animation. |
| 0:48–0:54 | **Proof.** 24h reply · 3wk MVP · 30d support · 100% code yours. |
| 0:54–1:00 | **Launch.** The logo assembles; *"Now booking."*; email, URL, founder line. The last 2s hold still. |

## Posting notes

- **Instagram:** Reels play 9:16; the layout keeps text out of the bottom ~22% and the
  right-hand icon column. Set `cover-hook-9x16.png` as the cover. Instagram may play
  60 fps back at 30 on some phones; the file is still valid.
- **LinkedIn:** upload the 4:5 file for the feed (it takes the most screen space on
  mobile) and attach the `.srt`. LinkedIn plays 60 fps natively. Most views start muted;
  the story is told entirely in on-screen type.
- **Cutdowns:** run the 15s as the reach piece and pin or link the 60s for people who
  want the full story.

## Regenerate

```bash
cd branding/video
npm install
npm run all                                   # every format × cut, covers, captions
node src/render.mjs --stills 9x16 60 2.8,23   # QA stills at given seconds
node src/render.mjs --video 4x5 60 --from 10 --to 17   # one section
```

Source: `src/scenes.mjs` (all scenes), `src/timeline.mjs` (cut lists), `src/audio.mjs`
(synth), `src/layout.mjs` (per-format safe areas), `src/render.mjs` (encode).
