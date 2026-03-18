# ToolWorkbench Refactor And PDF MVP Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the monolithic tool workbench into lazy-loaded feature modules and ship a first local-only PDF MVP with merge, split, rotate, PDF-to-images, and images-to-PDF.

**Architecture:** Replace the current single client implementation file with a thin shell, shared workbench primitives, and feature-owned modules loaded lazily by domain. Introduce a dedicated PDF feature module that loads heavy PDF dependencies only for PDF tools and keeps processing fully local in the browser.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Vitest, pdf-lib, pdfjs-dist, jszip

---

## Naming Assumptions

This plan assumes a dedicated `pdf` category and the following new tool slugs:

- `merge-pdf`
- `split-pdf`
- `rotate-pdf`
- `pdf-to-images`
- `images-to-pdf`

These slugs align the UI category, the feature-domain loader, and the new PDF module.

## Chunk 1: Testing And Workbench Shell Foundation

### Task 1: Add a lightweight test runner for new workbench and PDF logic

**Files:**
- Create: `vitest.config.ts`
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `tests/vitest.setup.ts`

- [ ] **Step 1: Add the failing test command path to the plan**

Run: `npx vitest run`
Expected: FAIL because Vitest is not installed or configured.

- [ ] **Step 2: Add minimal test infrastructure**

Add:
- `vitest` and `jsdom` as dev dependencies
- `test` script in `package.json`
- `vitest.config.ts` with path alias support for `@/`
- `tests/vitest.setup.ts` for shared browser-like setup if needed

- [ ] **Step 3: Run the test command again**

Run: `npm test`
Expected: PASS with zero or no matching tests.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json vitest.config.ts tests/vitest.setup.ts
git commit -m "test: add vitest harness for workbench refactor"
```

### Task 2: Add a tested feature-domain resolver

**Files:**
- Create: `components/tool-workbench/feature-map.ts`
- Create: `tests/tool-workbench/feature-map.test.ts`

- [ ] **Step 1: Write the failing test**

Test behaviors:
- known slugs map to the expected feature domain
- unknown slug falls back safely
- future PDF slugs map to `pdf`

- [ ] **Step 2: Run the test to verify failure**

Run: `npm test -- tests/tool-workbench/feature-map.test.ts`
Expected: FAIL because `feature-map.ts` does not exist.

- [ ] **Step 3: Implement the minimal resolver**

Add:
- `FeatureDomain` type
- `getFeatureDomain(slug)` helper
- grouping arrays or lookup tables for current slugs and future PDF slugs

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- tests/tool-workbench/feature-map.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/tool-workbench/feature-map.ts tests/tool-workbench/feature-map.test.ts
git commit -m "test: cover feature domain resolution"
```

### Task 3: Replace the monolith entrypoint with a thin shell and lazy loaders

**Files:**
- Create: `components/tool-workbench/index.tsx`
- Create: `components/tool-workbench/loaders.tsx`
- Move: `components/tool-workbench.tsx` -> `components/tool-workbench/legacy.tsx`
- Modify: `app/pages/tool-page.tsx`
- Create: `tests/tool-workbench/loaders.test.ts`

- [ ] **Step 1: Write the failing test**

Test behaviors:
- the loader map resolves all current feature domains
- PDF loaders are declared separately from non-PDF loaders

- [ ] **Step 2: Run the test to verify failure**

Run: `npm test -- tests/tool-workbench/loaders.test.ts`
Expected: FAIL because the loader map does not exist.

- [ ] **Step 3: Implement the shell and loader map**

Do:
- move the current file into `components/tool-workbench/legacy.tsx`
- add `components/tool-workbench/index.tsx` as the new shell
- add `components/tool-workbench/loaders.tsx`
- temporarily point each domain loader at a feature module placeholder
- update imports so `@/components/tool-workbench` resolves to the new directory entrypoint

- [ ] **Step 4: Run the targeted tests**

Run: `npm test -- tests/tool-workbench/loaders.test.ts tests/tool-workbench/feature-map.test.ts`
Expected: PASS

- [ ] **Step 5: Run safety verification**

Run: `npm run lint`
Expected: PASS

Run: `npm run build`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add app/pages/tool-page.tsx components/tool-workbench/ components/tool-workbench.tsx tests/tool-workbench/loaders.test.ts
git commit -m "refactor: add lazy workbench shell and loaders"
```

## Chunk 2: Shared Extraction And Existing Domain Migration

### Task 4: Extract shared workbench primitives from the legacy file

**Files:**
- Create: `components/tool-workbench/shared/primitives.tsx`
- Create: `components/tool-workbench/shared/fields.tsx`
- Create: `components/tool-workbench/shared/output.tsx`
- Create: `components/tool-workbench/shared/utils.ts`
- Create: `components/tool-workbench/shared/types.ts`
- Modify: `components/tool-workbench/legacy.tsx`

- [ ] **Step 1: Write the failing test**

Create a test that imports the new shared modules and exercises at least one stable utility behavior such as URL download helper or feature-type typing boundary.

- [ ] **Step 2: Run the test to verify failure**

Run: `npm test -- tests/tool-workbench/shared-utils.test.ts`
Expected: FAIL because the shared modules do not exist.

- [ ] **Step 3: Extract the shared code**

Move:
- form wrappers
- card and panel wrappers
- result helpers
- URL lifecycle helpers
- small shared types

Keep behavior identical.

- [ ] **Step 4: Run the targeted test**

Run: `npm test -- tests/tool-workbench/shared-utils.test.ts`
Expected: PASS

- [ ] **Step 5: Run safety verification**

Run: `npm run lint`
Expected: PASS

Run: `npm run build`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add components/tool-workbench/shared/ components/tool-workbench/legacy.tsx tests/tool-workbench/shared-utils.test.ts
git commit -m "refactor: extract shared workbench primitives"
```

### Task 5: Migrate existing tools into feature modules without behavior changes

**Files:**
- Create: `components/tool-workbench/features/generate/index.tsx`
- Create: `components/tool-workbench/features/image/index.tsx`
- Create: `components/tool-workbench/features/encrypt/index.tsx`
- Create: `components/tool-workbench/features/time/index.tsx`
- Create: `components/tool-workbench/features/convert/index.tsx`
- Create: `components/tool-workbench/features/finance/index.tsx`
- Create: `components/tool-workbench/features/text/index.tsx`
- Create: `components/tool-workbench/features/dev/index.tsx`
- Modify: `components/tool-workbench/legacy.tsx`
- Modify: `components/tool-workbench/loaders.tsx`

- [ ] **Step 1: Write the failing test**

Add a test for the feature module contract:
- each current domain exports a default component
- the loader map references only the new module paths

- [ ] **Step 2: Run the test to verify failure**

Run: `npm test -- tests/tool-workbench/feature-modules.test.ts`
Expected: FAIL because the modules do not exist.

- [ ] **Step 3: Migrate domains one by one**

Suggested order:
- finance
- text
- convert
- time
- generate
- encrypt
- image
- dev

For each domain:
- move the tool components and local helpers out of `legacy.tsx`
- reuse shared primitives
- keep prop contract stable

- [ ] **Step 4: Trim or delete legacy-only paths**

Once all domains are migrated:
- remove migrated logic from `legacy.tsx`
- keep only any temporary compatibility code still required

- [ ] **Step 5: Run verification**

Run: `npm test`
Expected: PASS

Run: `npm run lint`
Expected: PASS

Run: `npm run build`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add components/tool-workbench/
git commit -m "refactor: split tool workbench into feature modules"
```

## Chunk 3: PDF MVP

### Task 6: Add PDF dependencies and test the core helper boundary

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `components/tool-workbench/features/pdf/pdf-core.ts`
- Create: `tests/pdf/pdf-core.test.ts`

- [ ] **Step 1: Write the failing tests**

Cover:
- `parseSplitRanges`
- merge returns a PDF blob
- split returns multiple PDF blobs
- images-to-pdf returns a PDF blob

Use in-memory fixtures created in the test itself.

- [ ] **Step 2: Run the test to verify failure**

Run: `npm test -- tests/pdf/pdf-core.test.ts`
Expected: FAIL because PDF dependencies and `pdf-core.ts` do not exist.

- [ ] **Step 3: Add dependencies and minimal implementation**

Add:
- `pdf-lib`
- `pdfjs-dist`
- `jszip`

Implement only the pure helper layer required by the failing tests.

- [ ] **Step 4: Run the targeted test**

Run: `npm test -- tests/pdf/pdf-core.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json components/tool-workbench/features/pdf/pdf-core.ts tests/pdf/pdf-core.test.ts
git commit -m "feat: add tested pdf core helpers"
```

### Task 7: Build PDF preview and reusable PDF UI components

**Files:**
- Create: `components/tool-workbench/features/pdf/pdf-preview.ts`
- Create: `components/tool-workbench/features/pdf/components/pdf-dropzone.tsx`
- Create: `components/tool-workbench/features/pdf/components/pdf-page-grid.tsx`
- Create: `components/tool-workbench/features/pdf/components/pdf-thumbnail.tsx`
- Create: `tests/pdf/pdf-preview.test.ts`

- [ ] **Step 1: Write the failing test**

Cover:
- local worker configuration rejects remote fallback
- preview helpers expose page count and page render entrypoints

- [ ] **Step 2: Run the test to verify failure**

Run: `npm test -- tests/pdf/pdf-preview.test.ts`
Expected: FAIL because preview helpers do not exist.

- [ ] **Step 3: Implement preview and shared PDF UI**

Requirements:
- local-only worker setup
- reusable page-grid rendering
- upload validation
- clean URL and canvas lifecycle handling

- [ ] **Step 4: Run the targeted tests**

Run: `npm test -- tests/pdf/pdf-preview.test.ts tests/pdf/pdf-core.test.ts`
Expected: PASS

- [ ] **Step 5: Run safety verification**

Run: `npm run lint`
Expected: PASS

Run: `npm run build`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add components/tool-workbench/features/pdf/ tests/pdf/pdf-preview.test.ts
git commit -m "feat: add local-only pdf preview infrastructure"
```

### Task 8: Add the five PDF tools and wire them into the site

**Files:**
- Create: `components/tool-workbench/features/pdf/index.tsx`
- Create: `components/tool-workbench/features/pdf/tools/merge-pdf-tool.tsx`
- Create: `components/tool-workbench/features/pdf/tools/split-pdf-tool.tsx`
- Create: `components/tool-workbench/features/pdf/tools/rotate-pdf-tool.tsx`
- Create: `components/tool-workbench/features/pdf/tools/pdf-to-images-tool.tsx`
- Create: `components/tool-workbench/features/pdf/tools/images-to-pdf-tool.tsx`
- Modify: `components/tool-workbench/loaders.tsx`
- Modify: `lib/tools/registry.ts`
- Modify: `lib/tools/content-types.ts`
- Modify: `lib/tools.ts`
- Modify: `lib/tools/content/cn.ts`
- Modify: `lib/tools/content/en.ts`
- Modify: `lib/tools/content/tw.ts`
- Modify: `lib/tools/content/ja.ts`
- Modify: `lib/tools/content/ko.ts`
- Modify: `lib/tools/content/es.ts`
- Modify: `lib/tools/content/de.ts`
- Modify: `lib/tools/content/ru.ts`
- Modify: `lib/tools/content/ar.ts`
- Modify: `components/tool-icon.tsx`
- Create: `tests/pdf/pdf-module-wiring.test.ts`

- [ ] **Step 1: Write the failing test**

Cover:
- new PDF slugs appear in the registry
- new `pdf` category appears in category metadata
- loader map routes them to the PDF feature module
- localized content exists for all supported locales

- [ ] **Step 2: Run the test to verify failure**

Run: `npm test -- tests/pdf/pdf-module-wiring.test.ts`
Expected: FAIL because the PDF tools are not wired in yet.

- [ ] **Step 3: Implement the five tool views and registration**

Requirements:
- dedicated `pdf` category metadata and icon
- merge UI with reorder support
- split UI with range highlighting
- rotate UI with per-page controls
- PDF-to-images output handling for one file or ZIP
- images-to-PDF order preview and export
- localized titles, descriptions, and highlights for all locales
- icon mapping for each new PDF tool

- [ ] **Step 4: Run verification**

Run: `npm test`
Expected: PASS

Run: `npm run lint`
Expected: PASS

Run: `npm run build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/tool-workbench/ lib/tools/registry.ts lib/tools/content/ components/tool-icon.tsx tests/pdf/pdf-module-wiring.test.ts
git commit -m "feat: add pdf mvp tools"
```

## Chunk 4: Finish And Verify

### Task 9: Final verification and cleanup

**Files:**
- Review only

- [ ] **Step 1: Run full verification**

Run: `npm test`
Expected: PASS

Run: `npm run lint`
Expected: PASS

Run: `npm run build`
Expected: PASS

- [ ] **Step 2: Manual smoke checks**

Verify:
- an existing non-PDF tool still works
- a PDF tool loads only when opened
- all five PDF MVP tools complete their core flow

- [ ] **Step 3: Prepare branch for completion**

Run:

```bash
git status --short
git log --oneline --decorate -5
```

- [ ] **Step 4: Use the branch-finishing workflow**

Follow superpowers:finishing-a-development-branch after all checks are green.
