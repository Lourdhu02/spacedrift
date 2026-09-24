# spacedrift.in

Marketing site for spacedrift.in — a boutique ML & AI services studio in Bengaluru,
operated as an MSME by Lourdu Raju (Machine Learning Engineer).

The site is a four-station story arc: **Noise → Parse → Model → Ship**. Each
service page is one station enlarged; every section carries a live ASCII
background rendered on canvas.

## Stack

- Next.js 16 (App Router, React 19), TypeScript, Tailwind v4
- `next/font` — Geist + Geist Mono, one family
- Palette: white `#ffffff`, ink `#0a0a0a`, red `#e10600`. No border radius anywhere.
- Lenis smooth scroll driven by the GSAP ticker; GSAP + ScrollTrigger + SplitText for motion
- Frosted white panels (`.glass`) and ink terminal panels (`.term`) for the ASCII scenes
- Canvas ASCII field in ink that turns red around the pointer; per-station scenes (noise, parse, torus, lift-off)
- Everything respects `prefers-reduced-motion` and renders without JavaScript

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Structure

```
src/
  app/
    layout.tsx        fonts, metadata, backdrop, nav, footer, smooth scroll
    template.tsx      page-transition curtain + per-page motion
    globals.css       tokens, type scale, glass, buttons
    page.tsx          home: hero, manifesto, four stations, services, contact
    about/, log/, services/*/
  components/
    ascii/            AsciiScene (live ASCII animations)
    background/       Backdrop (Swiss column grid + ASCII field)
    layout/           Nav, Footer
    motion/           SmoothScroll, PageMotion, PointerFX, Marquee, ScrollProgress
    services/         ServicePage template
    ui/               Button, ContactForm, LocalTime
  lib/services.ts     all service content in one place
```

## Contact

spacedrift.contact@gmail.com — response within 24 hours.
