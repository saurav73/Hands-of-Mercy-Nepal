# Changelog — Hand of Mercy Nepal


## 2026-10-31
- README: structure section now states the src/ totals (39 .tsx files, 5 .ts modules), counted from the tree
- Re-verified: the live-site divergence note still stands (repo holds the previous 3D build; the simplified site deploys separately)

## 2026-10-30
- README: Getting started now states the dev-server port (http://localhost:3000, from vite.config.ts server.port)
- Re-verified: src/pages/ still holds the 9 page components the README describes (8 routes + 404); React Router 7.18 and TypeScript 5.7 match package.json

## 2026-10-29
- README: pinned Tailwind CSS 3.4 and Framer Motion 12 in Tech stack, matching package.json
- Re-verified the structure note: components/ folders (branding, layout, svg, three, ui) and data/ files (organizationData, translations) all present

## 2026-10-28
- README: pinned the stack in Tech to Vite 6, TypeScript 5.7 and React Router 7.18, matching package.json
- Re-verified the route table and structure note: 9 page components, 8 routes + 404, all listed component folders present

## 2026-10-27
- README: corrected the structure note - src/pages/ holds 9 page components (8 routes + the 404 page), not 8

## 2026-10-26
- README: added a deployment warning — this repo holds the previous 3D build, while the live site serves a simplified rewrite deployed separately via the Vercel CLI, so deploying this repo to production would replace the live site; mirrors the existing CI workflow note
- Re-verified the README route table (8 pages + 404) against `src/App.tsx` — still accurate

## 2026-10-25
- Pushed the 2026-10-24 CI fix (2ab1cde) that had never reached origin: the deploy-preview and deploy-production jobs are gone, CI now runs build + typecheck only, so pushes stop failing on the missing Vercel secret
- Re-verified the README route table (8 pages + 404) against `src/App.tsx` and the React Router 7 claim against `package.json` — still accurate; the dead-code flag (`ImpactGlobe3D.tsx`, `FloatingParticles.tsx` unimported) remains pending Saurav's go-ahead

## 2026-10-24
- Re-audited the dead-code flag with finer precision: `ImpactGlobe3D.tsx` and `FloatingParticles.tsx` are genuinely unimported; `Classroom3D.tsx` (which defines its own local `FloatingParticles` helper) is live via `EducationPage.tsx` — so only the two standalone files remain flagged for Saurav's go-ahead to delete; no files touched
- Re-verified the README route table (8 pages + 404) against `src/App.tsx` — all match; no doc changes needed

## 2026-10-23
- Re-verified the README: route table (8 pages + 404) matches `src/pages/`, React Router 7 claim matches `package.json`, `@/` alias claim still matches the Vite/TS config; the 2026-10-22 dead-code flag (`ImpactGlobe3D.tsx`, `FloatingParticles.tsx` still imported by nothing) remains pending Saurav's go-ahead to delete — no changes made


## Unreleased
- Dead-code finding (pending Saurav's go-ahead to delete): `ImpactGlobe3D.tsx` and `FloatingParticles.tsx` in `src/components/three/` are exported but imported by nothing; flag for removal rather than silently deleting

## 2026-10-22
- Verified all src files carry file-header JSDoc (none missing), README route table (8 pages) and `@/` alias claim match `tsconfig.json`/`vite.config.ts`, and index.html title (55 chars) meets the SEO title rule — no changes needed beyond today's Unreleased note

## 2026-10-21

- Docs: file-header JSDoc on the remaining 26 src files — all 12 3D scenes,
  the shared geometries module, the SVG illustration set, all 9 pages,
  `main.tsx`, `types/index.ts`, and `utils/cn.ts` (every src file now has a
  file header).
- Hygiene note: `components/three/ImpactGlobe3D.tsx` and
  `components/three/FloatingParticles.tsx` are currently not imported by any
  page (each scene is wired to its own page); flagged for the next cleanup
  pass, not deleted today.

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
