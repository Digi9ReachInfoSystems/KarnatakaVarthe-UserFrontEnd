# Karnataka DIPR Website

Public frontend for the Karnataka Department of Information and Public Relations (DIPR) — React + Vite + styled-components.

## Stack

- React (Vite)
- React Router
- styled-components
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Output: `dist/` (includes `web.config` copy for IIS hosting).

---

## Project review — 28 Jul 2026

Summary of current UI/UX and data behaviour on the public site (`karnatakadipr`).

### Navigation

- Top nav item **Home** (was “Vartha Janapada”); links to `/`
- **March of Karnataka** top-level tab **removed** (route still available)
- Menus: **News**, **Magazines**, **Our Services**, **Media** (dropdowns / mobile accordions)
- Magazines order: before Our Services
- Footer **Guidelines** link removed
- Top-bar **Search** UI commented out (hidden; not deleted)

### Home hero — magazines

- Middle column shows **two** magazine cards side by side:
  - Vartha → `/new-magzinesimages/vartha-july.jpg` → `/magazinesvartha`
  - March → `/new-magzinesimages/march-july.jpg` → `/marchofkarnatakmagzine`
- Cover + light blue footer gradient + primary CTA
- **Mobile (≤450px):** stays **2 columns**; Kannada CTA spacing tightened only on mobile
- **Desktop:** previous larger card spacing/typography preserved

### News data (homepage)

No `magazineType` filter (Vartha `magazine` + March `magazine2` combined):

- State News
- District News
- Articles

Hero **Latest News** (under Live TV) still uses `magazineType="magazine"` unless changed later.

### Reels

- Single active reel card + up/down arrows
- Arrow buttons: no border, black icons
- Card border-radius removed (square)
- Loader: light gray shimmer (not black)

### Section headers (mobile)

Photo Gallery, District News, and Articles headers keep **title + Show more** on one line (same pattern as State News).

### Latest News heading

Grey horizontal gradient bar styling on `#latest-news-heading` panel header.

---

## Key paths

| Area | Path |
|------|------|
| Home / Vartha layout | `src/components-newdesigns/components/varthaJanapada/` |
| Header / nav | `src/components-newdesigns/layout/headertabs/` |
| Footer | `src/components-newdesigns/layout/new-sitefooter/` |
| Language / search bar | `src/components-newdesigns/layout/languagetranslation/` |
| Magazine covers (public) | `public/new-magzinesimages/` |
| News APIs | `src/services/newapis/newapis-services.js` |

## Related apps in monorepo

- `admin-varthaownership/dipradmin` — admin
- `diprnewbackend` — API backend
