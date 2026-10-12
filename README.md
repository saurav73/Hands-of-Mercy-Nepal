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

## Project structure

```
src/
  pages/        # the 8 route pages
  components/   # layout, branding, ui primitives, three/ 3D scenes, svg
  data/         # organization data + EN/NE translations
  contexts/     # LanguageContext
  hooks/        # useCountUp (animated stat counters)
  utils/        # cn() class-name helper
  types/        # shared TypeScript types
```

## Maintainers

Built and maintained by Saurav (saurav73).
Organization contact: info@handsofmercynepal.org.np
