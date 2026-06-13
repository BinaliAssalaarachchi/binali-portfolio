# Binali Assalaarachchi — Portfolio Specification

Production-ready design system and implementation reference for the luxury-agency personal portfolio.

## Brand Identity

| Token | Value | Usage |
|-------|-------|-------|
| Canvas | `#111111` | Primary dark sections (Hero, Projects, Footer) |
| Shutter | `#000000` | Preloader typography base, button text |
| Accent | `#FF2A2A` | CTAs, About section, active process cards, glow |
| Surface | `#F4F4F4` | Light section backgrounds, primary text on dark |
| Muted | `#D4D4D4` / `rgba(255,255,255,0.6)` | Secondary copy |

**Typography:** Syne (display), Inter (body), JetBrains Mono (metadata labels).

**Motion:** Spring physics (`stiffness: 320–400`, `damping: 22–28`), cinematic easing `[0.22, 1, 0.36, 1]`.

---

## Section Architecture

### 1. Preloader (`Preloader.jsx`)
- Fixed overlay `z-index: 100001`, solid `#FF2A2A`
- Layered "BINALI." — black base + white duplicate
- White layer reveals via `clip-path: inset()` water-fill (1.6s)
- Exit: container `translateY(-100%)`, logo scales to 0.88 and fades (0.85s)

### 2. Hero (`Hero.jsx`)
- `min-h-screen`, parallax grid + radial accents
- Left: status mono label, H1, outlined subheading, intro, pill CTAs
- Right: portrait frame with conic holographic ring + scan line
- Bottom: animated scroll indicator

### 3. About / ID Badge (`About.jsx`)
- Full-width `#FF2A2A` canvas
- Suspended ID card: lanyard, metal clip, `-3deg` tilt, dark card surface
- Editorial "Hello!" narrative + 3 highlight cards
- Floating React / Python / MongoDB logos with hover scale

### 4. Process Timeline (`ProcessTimeline.jsx`)
- White surface + architectural grid
- Scroll-driven SVG S-curve (`pathLength` animation)
- 4 alternating pass cards activate to accent red on scroll threshold

### 5. Projects (`Projects.jsx` + `ProjectModal.jsx`)
- 2-column responsive grid, 8 data-driven projects
- Glassmorphic modal: gallery crossfade, stack tags, contributions, repo link
- Dismiss: Escape, overlay click, Close button

### 6. Skills (`Skills.jsx`)
- Dual grid: 4 skill columns + 3 certificate groups

### 7. Footer (`Footer.jsx`)
- `min-h-[50vh]`, 3-column metadata grid
- Scroll-revealed "binali." signature with hover glow
- Social / email links + credit line

---

## Asset Checklist

Place these in `public/`:

- `/me.jpg` — Hero & ID badge portrait (editorial red studio spec)
- `/projects/*` — Project screenshots per `src/data/projects.js`

---

## Run Locally

```bash
cd Projects/binali-portfolio
npm install
npm run dev
```

Build: `npm run build`
