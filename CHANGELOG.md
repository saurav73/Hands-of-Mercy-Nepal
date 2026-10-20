# Changelog — Hand of Mercy Nepal

## Unreleased

## 2026-10-20

- Docs: file-header JSDoc on all 9 UI components, the `LanguageContext` i18n
  provider, the `useCountUp` hook, and the `organizationData`/`translations`
  data modules — continues the 2026-10-19 doc pass.
- Verified the README route table against `App.tsx`: all 8 routes + the
  catch-all 404 match exactly.

## 2026-10-19

- Docs: file-header JSDoc on the app root (`App.tsx`), the layout shell
  (`PageLayout`, `Navbar`, `Footer`), and the `Logo` branding component.

## 2026-10-18

- Footer: removed the dead Privacy Policy / Terms of Service links — no such
  routes exist, and they rendered a blank content area.
- Routing: added a catch-all 404 page (`NotFoundPage`) with English/Nepali
  copy, so unknown deep links show a proper page instead of blank content.

## 2026-10-16

- Docs: added JSDoc to the `cn()` class-name helper and to the `useCountUp`
  hook's options interface and function.
- README: documented the `@/` import alias (maps to `src/` via tsconfig paths
  and the Vite `resolve.alias`).

## 2026-10-12

- Cleanup: removed dead placeholder fields from organization data and dropped
  the orphaned `@heyputer/kv.js` lock entry plus the unused
  `@heyputer/puter.js` dependency.
- Contact page: show a placeholder badge on the phone card.
- README: added `src/utils` to the project structure section.

## 2026-09-19

- Added detailed 3D scenes with Environment, Bloom, shadows, and fog; shared
  geometry utilities; design-token fixes; new Contact3D and Gallery3D scenes;
  PageHero, CtaSection, and SectionHeader components.
- Added detailed 3D scenes (Globe, Community, Classroom, Stories, Volunteer)
  and rounded-3xl design across all pages.
- Minimalist redesign: clean white design, 3D scenes integrated, simple
  typography.
- Redesign frontend: premium dark hero, glassmorphism navbar, glow stats,
  card animations, modern footer.
- Initial commit: Hands of Mercy Nepal website with Vite, React, TypeScript,
  Tailwind CSS, and Vercel CI/CD pipeline.
