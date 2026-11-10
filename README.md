# Hand of Mercy Nepal

Official website for **Hands of Mercy Nepal** — a community initiative of the
Jyoti Great Commission Fellowship in Bungamati, Lalitpur, providing free tuition
and holistic educational support to children in Nepal.

**Live site:** https://handofmercy.vercel.app

## What it is

A bilingual (English / Nepali) public website covering the organization's
mission, free-tuition programs, impact stories, photo gallery, volunteer
sign-ups, and contact information.

## Pages

| Route            | Page         |
|------------------|--------------|
| `/`              | Home         |
| `/about`         | About        |
| `/education`     | Education    |
| `/impact`        | Impact       |
| `/stories`       | Stories      |
| `/gallery`       | Gallery      |
| `/get-involved`  | Get Involved |
| `/contact`       | Contact      |
| `*`              | 404 Not Found (English / Nepali) |

## Tech stack

- Vite 6 + React 18 + TypeScript 5.7
- Tailwind CSS 3.4 + custom UI components
- React Router 7.18 (client-side routing)
- `@react-three/fiber` / `@react-three/drei` / `@react-three/postprocessing`
  for the 3D hero and section scenes
- Framer Motion 12 animations, Lucide icons
- i18n via a built-in `LanguageContext` (English / Nepali) — 175 keys in each locale with full EN/NE parity, verified 2026-11-10, counted from `src/data/translations.ts`

## Getting started

```bash
npm install
npm run dev      # start the dev server on http://localhost:3000 (vite.config.ts server.port)
npm run build    # type-check + production build (outputs to dist/)
npm run preview  # preview the production build
```

Requires Node.js 18+.

## Deployment

Hosted on Vercel. `vercel.json` rewrites all routes to `index.html` so
client-side routing works on deep links.

> **Note on the live site:** this repo holds the previous build (Vite + React
> with 3D scenes). The live site at handofmercy.vercel.app currently serves a
> simplified rewrite that is deployed separately from another source via the
> Vercel CLI — it is NOT deployed from this repo. Do not deploy this repo to
> production expecting to update the live site; doing so would replace the
> simplified live site with this older build. See the note in
> `.github/workflows/deploy.yml` for the same warning on the CI side.

CI (`.github/workflows/deploy.yml`) builds and type-checks every push to `main`
(Node 20, `npm ci`, `tsc --noEmit`, `npm run build`); it has no deploy jobs —
they were removed 2026-10-24 because no Vercel project is linked to this repo,
so the workflow never touches the live site.

## Project structure

```
src/
  pages/        # the 9 page components: About, Contact, Education, Gallery, GetInvolved, Home, Impact, Stories (8 routes) + NotFound (the 404 page)
  components/   # layout, branding, ui primitives, three/ 3D scenes, svg
  data/         # organization data + EN/NE translations
  contexts/     # LanguageContext
  hooks/        # useCountUp (animated stat counters)
  utils/        # cn() class-name helper
  types/        # shared TypeScript types
  main.tsx      # app entry point: mounts `App` in StrictMode inside `LanguageProvider`
  index.css     # Tailwind directives + global styles (Plus Jakarta Sans, smooth scroll)
```

In total, `src/` holds 39 `.tsx` files (pages + components) and 5 `.ts` modules, counted from the tree.
`vite.config.ts` maps the `@` import alias to `./src` (used by 62 imports across `src/`, counted from the tree), and pins the dev server to port 3000.

`App.tsx` declares 9 routes: the 8 pages plus a `*` catch-all to `NotFoundPage`, all inside the shared `PageLayout`, counted from `src/App.tsx`.

The 5 `.ts` modules are `data/organizationData.ts`, `data/translations.ts`, `hooks/useCountUp.ts`, `types/index.ts`, and `utils/cn.ts`; `components/` holds 5 groups: `branding`, `layout`, `svg`, `three`, and `ui`.

Within `components/`, `three/` holds 13 files (12 3D scenes plus `geometries.tsx`) and `ui/` holds 9 primitives (`Badge`, `Button`, `Container`, `CtaSection`, `Modal`, `PageHero`, `PlaceholderNotice`, `ScrollReveal`, `SectionHeader`), counted from `src/components/`. The full group breakdown is 27 files: `branding` 1, `layout` 3, `svg` 1, `three` 13, `ui` 9.

The `@/` prefix maps to `src/` (configured in both `tsconfig.json` paths and
the Vite `resolve.alias` in `vite.config.ts`), so imports like
`@/components/ui/Button` resolve to `src/components/ui/Button`. Use the alias
in new files instead of relative `../../` paths.

## Maintainers

Built and maintained by Saurav (saurav73).
Organization contact: info@handsofmercynepal.org.np
