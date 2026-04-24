# Project Standards

This file is the baseline playbook for Payload CMS + Next.js projects that should behave consistently across repos.

## Stack Baseline

- Use TypeScript everywhere.
- Use Next.js App Router.
- Use Payload as the source of truth for admin, schema, auth, and content APIs.
- Use PostgreSQL in production unless there is a strong reason not to.
- Keep storage externalized for media in production.

## Repo Structure

- Keep business schema under `src/collections` and `src/globals`.
- Keep admin and frontend custom components under `src/components`.
- Keep access logic under `src/access` when it grows beyond a single inline function.
- Keep reusable data-fetching utilities under `src/lib`.
- Keep SQL migrations under `src/migrations`.
- Keep project-wide standards and runbooks in root markdown files.

## Naming Rules

- Use kebab-case slugs for Payload collections and globals.
- Use PascalCase for config objects and React components.
- Use descriptive field names that describe intent, not UI labels.
- Prefer `showOnHomepage`, `homepageOrder`, `sectionTitle` style names over generic names like `enabled`, `order`, or `title`.

## Payload Schema Habits

- Prefer small globals over one giant site config global.
- Use globals for singleton content like site shell, SEO, contact settings, and homepage section copy.
- Use collections for repeatable entities like cars, testimonials that need lifecycle/history, media, inventory, or user-managed records.
- Do not use global relationship fields to decide whether a collection document is visible in a section when that visibility belongs to the document itself.
- If a document can be shown or hidden in a section, store that on the document with a boolean field.
- If section order matters, store the order on the document too.
- Preserve old ordering when migrating away from relationship tables.
- Add indexes for booleans and ordering fields that drive frontend listing queries.

## Access Control Rules

- Default to explicit access rules.
- When using Payload Local API with a `user`, always set `overrideAccess: false`.
- Field-level access returns booleans only.
- Collection access can return booleans or query constraints.
- Keep access predictable: public read, authenticated write only when that is intentional.

## Hook Rules

- Always pass `req` to nested Payload operations inside hooks.
- Use `context` flags to prevent infinite loops in hooks.
- Put formatting in `beforeValidate`.
- Put business rules in `beforeChange`.
- Put external side effects in `afterChange`.

## Data Modeling Rules

- Avoid duplicating the same truth in both globals and collections.
- If data is repeated only for presentation, compute or query it instead of storing it twice.
- Use migration-safe changes:
  - add new fields
  - backfill data
  - switch reads to the new model
  - only then remove obsolete fields/tables
- Never drop a table or relation before copying its meaning into the new model.

## Migrations

- Create a new migration for every schema change that affects production data.
- Keep the generated schema snapshot files committed.
- Patch generated migrations when they need data backfills or rollout-safe sequencing.
- Migrations must preserve:
  - values
  - relationships
  - display order
  - default content
- For reversible migrations, make `down` reconstruct enough state to recover the previous model.
- Do not silently lose ordering data when replacing relationship tables with per-document fields.

## Admin Panel Standards

- Replace Payload default branding in every white-label project:
  - browser title suffix
  - logo
  - icon
  - favicon metadata
- Override admin metadata through `admin.meta`, not ad hoc document head hacks:
  - title suffix
  - icon links
  - open graph name/title/description when the admin may be shared internally
- Use `admin.components.graphics.Icon` and `Logo` instead of CSS hacks.
- Keep admin branding backed by project assets in `public/`.
- Prefer one shared canonical brand asset such as `public/favicon.ico` unless the admin explicitly needs separate artwork.
- If the brand name is editable in content, pull it from a global where practical.
- Keep the in-app logo and browser/favicon branding aligned so the old vendor mark is not still visible in one surface.
- Remove Payload naming from visible admin branding in white-label projects unless the user explicitly wants co-branding.
- Put admin-only brand components in a dedicated path such as `src/components/payload/`.
- Keep admin navigation and generated plugin surfaces organized into intentional groups when the default grouping is noisy.
- Set Payload admin i18n intentionally:
  - choose a fallback language
  - declare supported languages explicitly
  - translate collection/global labels and descriptions instead of mixing languages by accident
- Treat admin customization as a first-class deliverable, not a last-mile polish step.

## Payload Admin Customization Checklist

- White-label graphics:
  - custom `admin.components.graphics.Icon`
  - custom `admin.components.graphics.Logo`
  - no visible Payload default mark in sidebar, header, or browser tab
- Metadata:
  - custom `admin.meta.titleSuffix`
  - custom `admin.meta.icons`
  - custom `admin.meta.openGraph` values when relevant
- Localization:
  - chosen `i18n.fallbackLanguage`
  - explicit `i18n.supportedLanguages`
  - translated admin labels, groups, and descriptions
- Navigation polish:
  - sensible admin groups for collections/globals
  - sensible admin groups for plugin-generated collections when used
- Live preview:
  - explicit `admin.livePreview.url`
  - explicit `admin.livePreview.globals` / collections scope
  - explicit breakpoints that match real target devices
- Generated code:
  - regenerate and commit the admin import map after changing admin component paths

## Import Map Rules

- Regenerate the Payload import map whenever admin components are added or moved.
- Treat `src/app/(payload)/admin/importMap.js` as generated code and commit it.
- Ensure production build runs import-map generation before boot.
- On Vercel or similar CI, build through the package script, not `next build` directly, if prebuild hooks are required.

## Live Preview Rules

- Use Payload live preview only when the preview route can resolve the exact document or section being edited.
- For global-driven pages, prefer a preview URL that carries the edited global slug or equivalent document context.
- Prefer origin detection from the real admin iframe/referrer over env-guessing for `serverURL`.
- Define explicit preview breakpoints in the admin for the main device targets instead of leaving preview size implicit.
- Keep live preview document-scoped unless there is a clear implementation for composed multi-source pages.
- When previewing a global that renders collection data too, preview only the global slice and merge the stable collection data back in.

## Frontend Data Rules

- Fetch globals and collection lists in a single `Promise.all` block when rendering composite pages.
- Keep frontend list queries driven by collection fields, not by unrelated singleton config.
- Sort section lists by explicit fields like `homepageOrder`, not implicit creation order.
- Use `pagination: false` for finite config-driven lists that must render all records.

## UI Rules

- Preserve the existing design system unless the task is explicitly a redesign.
- Keep section components dumb: pass them prepared data.
- Keep query and shaping logic in `src/lib`, not inside presentational components.
- Avoid hidden dependencies where components know how to query their own CMS data.

## Website Baseline

- Every public site should include baseline legal and utility pages unless there is a documented reason not to:
  - privacy policy
  - terms of use / user agreement
  - 404 / not found page
  - sitemap
  - robots rules
- Legal and utility pages should be linked from obvious public UI, usually the footer and any data-collection form area.
- Every site should ship with brand assets and metadata:
  - favicon
  - open graph metadata
  - page titles and descriptions
- Every site should also include technical SEO basics:
  - canonical URL handling
  - social share image
  - robots directives aligned with the deployment environment
  - structured data where the business/site type clearly benefits from it
- Every site should include baseline trust and contact signals:
  - visible business name
  - phone / email / primary contact method
  - clear location or service-area context when relevant
- Every lead or contact flow should have:
  - a clear success state
  - a failure path that can be debugged
  - delivery to a real operational inbox or notification channel
- If a site collects user details, the form should reference the relevant legal pages near submit.
- If analytics, ads, or tracking are used, add consent handling appropriate to the jurisdiction and traffic profile.
- Every site should meet a minimum accessibility baseline:
  - language set correctly
  - keyboard-accessible navigation and forms
  - meaningful alt text for content images
  - sufficient color contrast for core flows

## Validation Workflow

- After schema changes, run `pnpm run generate:types`.
- After admin component/import path changes, run `pnpm run generate:importmap`.
- After TypeScript changes, run `pnpm exec tsc --noEmit`.
- Before pushing deploy-sensitive changes, run `pnpm build`.
- Treat warnings that imply broken deploy behavior as blockers.

## Deployment Rules

- Production build must run migrations before booting the new code.
- Production build must regenerate the Payload import map before runtime.
- Environment examples must reflect the actual stack in use.
- Never rely on stale generated files in CI.

## Git Workflow

- Make small commits around deployable checkpoints.
- Do not mix unrelated fixes into one commit when a clean boundary exists.
- Never commit local dumps, backups, or machine-specific artifacts.
- Leave unrelated dirty files alone unless the user asked to clean them up.

## Documentation Rules

- Every repo should keep one root standards file like this one.
- When a project-specific rule is discovered through a production bug, add it here.
- Prefer checklists and hard rules over vague advice.
- Document why a pattern exists when it prevents a class of repeat failures.

## Recommended Build Checklist

- Schema changed: `pnpm run generate:types`
- Admin components changed: `pnpm run generate:importmap`
- TypeScript changed: `pnpm exec tsc --noEmit`
- Deploy path changed: `pnpm build`
- Migration added: verify `src/migrations/index.ts` includes it
- White-label project: verify no Payload branding remains visible

## Anti-Patterns To Avoid

- One giant global for the whole site
- Using globals to store per-document visibility state
- Dropping old tables before copying meaning into new fields
- Live preview routes that do not match the edited document source
- Uncommitted generated import maps
- Shipping schema changes without a matching migration
- Letting CI build from direct `next build` when `prebuild` is required
