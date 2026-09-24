# spacedrift.in

Marketing site for spacedrift.in — a boutique ML & AI services studio in Bengaluru,
operated as an MSME by Lourdu Raju (Machine Learning Engineer).

The site is a four-station story arc: **Noise → Parse → Model → Ship**. Each
service page is one station enlarged; every section carries a live ASCII
background rendered on canvas.

## Stack

- Next.js 16 (App Router, React 19)
- TypeScript, Tailwind v4 tokens
- `next/font` — Inter + JetBrains Mono
- Custom canvas ASCII field, no third-party motion library
- No smooth-scroll library (native scroll only, `prefers-reduced-motion` respected)

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
    layout.tsx        root layout — fonts, metadata, viewport, JSON-LD
    globals.css       design system (paper-terminal palette, primitives)
    page.tsx          home: full Noise → Parse → Model → Ship arc
    about/            operator's log
    log/              studio log (coming-soon shell)
    services/*/       each service is one station enlarged
    robots.ts, sitemap.ts
  components/
    background/       AsciiField canvas
    layout/           Navbar, Footer
    services/         ServiceStation template + ServiceCard
    system/           RevealBoot (IO-driven reveal)
    ui/               shared primitives (StationHeader, DecodeText, AsciiBar, …)
public/
  favicon-512.png, logo.svg, __forms.html (Netlify)
```

## Contact

spacedrift.contact@gmail.com — response within 24 hours.
