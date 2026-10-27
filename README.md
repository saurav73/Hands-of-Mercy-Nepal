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

- Vite + React 18 + TypeScript
- Tailwind CSS + custom UI components
- React Router 7 (client-side routing)
- `@react-three/fiber` / `@react-three/drei` / `@react-three/postprocessing`
  for the 3D hero and section scenes
- Framer Motion animations, Lucide icons
- i18n via a built-in `LanguageContext` (English / Nepali)

## Getting started

```bash
npm install
npm run dev      # start the dev server
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

## Project structure

```
src/
  pages/        # the 9 page components (8 routes + the 404 page)
  components/   # layout, branding, ui primitives, three/ 3D scenes, svg
  data/         # organization data + EN/NE translations
  contexts/     # LanguageContext
  hooks/        # useCountUp (animated stat counters)
  utils/        # cn() class-name helper
  types/        # shared TypeScript types
```

The `@/` prefix maps to `src/` (configured in both `tsconfig.json` paths and
the Vite `resolve.alias` in `vite.config.ts`), so imports like
`@/components/ui/Button` resolve to `src/components/ui/Button`. Use the alias
in new files instead of relative `../../` paths.

## Maintainers

Built and maintained by Saurav (saurav73).
Organization contact: info@handsofmercynepal.org.np
