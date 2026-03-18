# ToolWorkbench Refactor And PDF MVP Design

## Summary

This design refactors the current tool implementation layer from a single large client component into lazy-loaded feature modules, then introduces a first PDF MVP on top of the new structure.

The immediate goals are:

- Split the current `components/tool-workbench.tsx` into maintainable feature-owned modules.
- Keep the existing route structure, SEO behavior, favorites, search, and metadata model unchanged.
- Add a new PDF feature module with a first MVP that works fully in the browser.
- Ensure heavy PDF dependencies are loaded only for PDF tools.

The current `components/tool-workbench.tsx` is a large mixed-responsibility client file containing:

- tool dispatch
- shared UI primitives
- utility helpers
- feature logic for all tools

This refactor separates those responsibilities before adding new PDF functionality.

## Approved Scope

### Refactor scope

- Replace the monolithic `ToolWorkbench` implementation with a thin shell plus feature modules.
- Introduce lazy loading at the feature-module level.
- Extract shared workbench UI and helper logic into dedicated files.
- Preserve current public routing and metadata behavior.

### PDF MVP scope

The first PDF release includes only:

- Merge PDF
- Split PDF
- Rotate PDF
- PDF to Images
- Images to PDF

### Explicit non-goals for this MVP

- PDF protection and unlock
- Signature placement
- Form fill and flatten
- Redaction
- Pipeline workflows
- OCR
- Deep PDF compression or repair claims

## Constraints And Decisions

### Keep current route and metadata model

The existing route pages and layout remain the same. The refactor is internal to the tool implementation layer.

Implications:

- no URL changes
- no route nesting changes
- no SEO path changes
- no changes to `ToolPage` or layout responsibilities beyond the workbench import target

### Keep current tool metadata model

The existing registry and localized content model remain in place:

- `lib/tools/registry.ts`
- `lib/tools/content/*`
- `lib/tools.ts`
- dictionary assembly in `lib/i18n/index.ts`

This keeps homepage, sidebar, search, favorites, and SEO integration stable.

### Use feature-domain lazy loading

Lazy loading happens first by feature domain, not by individual tool.

Why:

- it matches the user request to split by functional area
- it avoids a 55-file migration in the first pass
- it gives most of the bundle-size benefit with lower migration risk
- it still leaves room for finer per-tool splits later

### PDF must be truly local-first

The PDF implementation must not rely on CDN worker fallback. PDF worker code and all required libraries must resolve from local bundled assets only.

## Proposed Architecture

### 1. Thin ToolWorkbench shell

Create a thin entry component that does only:

- receive `tool`, `locale`, and `dict`
- determine the feature domain for the tool slug
- lazy load the corresponding feature module
- render a shared loading and failure fallback

Proposed path:

- `components/tool-workbench/index.tsx`

### 2. Loader map

Add a dedicated loader file that maps tool slugs to feature domains and dynamic imports.

Proposed path:

- `components/tool-workbench/loaders.tsx`

Responsibilities:

- map `ToolSlug -> FeatureDomain`
- expose `loadFeatureModule(domain)`
- centralize lazy-loading logic so it does not remain embedded in a giant switch

### 3. Shared workbench layer

Extract reusable UI primitives and helpers from the current monolith.

Proposed paths:

- `components/tool-workbench/shared/primitives.tsx`
- `components/tool-workbench/shared/fields.tsx`
- `components/tool-workbench/shared/output.tsx`
- `components/tool-workbench/shared/utils.ts`
- `components/tool-workbench/shared/types.ts`

Candidate extracted items:

- `ToolCard`
- `WorkbenchPanel`
- `FormStack`
- `FormGrid`
- `Field`
- `FieldShell`
- `Input`
- `Textarea`
- `NativeSelect`
- `SliderField`
- `OutputArea`
- `ResultActions`
- common clipboard and download helpers
- object URL lifecycle helpers

### 4. Feature modules

Each existing functional area becomes a feature-owned module.

Proposed paths:

- `components/tool-workbench/features/generate/index.tsx`
- `components/tool-workbench/features/image/index.tsx`
- `components/tool-workbench/features/encrypt/index.tsx`
- `components/tool-workbench/features/time/index.tsx`
- `components/tool-workbench/features/convert/index.tsx`
- `components/tool-workbench/features/finance/index.tsx`
- `components/tool-workbench/features/text/index.tsx`
- `components/tool-workbench/features/dev/index.tsx`
- `components/tool-workbench/features/pdf/index.tsx`

Responsibilities per module:

- receive the existing `tool`, `locale`, and `dict` props
- handle only tools owned by that domain
- reuse shared workbench primitives
- keep domain-specific helpers local to the domain

## PDF Module Design

The PDF domain should be structured more cleanly than the current monolith from the start, because additional PDF tools are expected later.

### Proposed PDF structure

- `components/tool-workbench/features/pdf/index.tsx`
- `components/tool-workbench/features/pdf/pdf-core.ts`
- `components/tool-workbench/features/pdf/pdf-preview.ts`
- `components/tool-workbench/features/pdf/components/pdf-dropzone.tsx`
- `components/tool-workbench/features/pdf/components/pdf-page-grid.tsx`
- `components/tool-workbench/features/pdf/components/pdf-thumbnail.tsx`
- `components/tool-workbench/features/pdf/tools/merge-pdf-tool.tsx`
- `components/tool-workbench/features/pdf/tools/split-pdf-tool.tsx`
- `components/tool-workbench/features/pdf/tools/rotate-pdf-tool.tsx`
- `components/tool-workbench/features/pdf/tools/pdf-to-images-tool.tsx`
- `components/tool-workbench/features/pdf/tools/images-to-pdf-tool.tsx`

### PDF core responsibilities

`pdf-core.ts` should contain browser-only processing functions with no React UI concerns:

- `mergePdfs(files)`
- `splitPdf(file, ranges)`
- `rotatePdf(file, pageRotations)`
- `pdfToImages(file, options?)`
- `imagesToPdf(files, options?)`
- `parseSplitRanges(input)`

Library usage:

- `pdf-lib` for merge, split, rotate, and images-to-pdf
- `pdfjs-dist` for PDF rendering to images and page previews
- `jszip` for packaging multi-image outputs when needed

### PDF preview responsibilities

`pdf-preview.ts` should own preview-only concerns:

- initialize `pdfjs-dist`
- configure a local-only worker source
- load `PDFDocumentProxy`
- expose lightweight helpers for page count and page rendering

This separates processing from preview so future PDF tools can reuse the same preview pipeline.

### PDF UI component responsibilities

Reusable PDF UI components should cover:

- file/image drop areas
- page thumbnail rendering
- page grid layout
- page highlight display for split ranges
- rotation controls
- upload validation and empty states

## User Experience For MVP Tools

### Merge PDF

Flow:

- upload multiple PDF files
- reorder file list
- show compact per-file page count and optional thumbnail strip
- merge to a single downloadable PDF

### Split PDF

Flow:

- upload one PDF
- show page overview
- enter ranges such as `1-3,5,8-10`
- highlight detected ranges
- generate multiple PDFs and package for download when needed

### Rotate PDF

Flow:

- upload one PDF
- show page grid with per-page rotate controls
- export one rotated PDF

### PDF to Images

Flow:

- upload one PDF
- show page count and lightweight preview
- export single-page PNG or multi-page ZIP

### Images to PDF

Flow:

- upload multiple images
- reorder uploaded images
- preview image order
- export one PDF

## Lazy Loading Strategy

### Feature-level lazy loading

The top-level workbench shell lazily loads the selected feature module.

Expected result:

- non-PDF pages no longer ship the PDF stack
- the current all-tools client bundle is reduced
- maintenance improves because code ownership becomes localized

### Secondary lazy loading inside PDF

Within the PDF feature module:

- `pdf-lib`, `pdfjs-dist`, and `jszip` should be loaded only when required
- preview code should initialize only on PDF tools
- ZIP packaging should load only when multi-file image export is needed

## Data Flow

### Existing outer flow remains unchanged

1. route page resolves tool metadata
2. `ToolPage` renders title, description, highlights, and `ToolWorkbench`
3. `ToolWorkbench` renders the tool implementation

### New internal workbench flow

1. `ToolWorkbench` receives `tool`, `locale`, and `dict`
2. it maps `tool.slug` to a feature domain
3. it lazy loads the feature module
4. the feature module dispatches to the specific tool component
5. the tool component uses shared primitives and domain helpers

### New PDF flow

1. PDF tool route opens like any other tool page
2. workbench shell lazy loads the PDF feature module
3. PDF tool component loads preview or processing helpers on demand
4. browser-only processing returns a `Blob` or `Blob[]`
5. download is completed locally through object URLs

## Error Handling

### Workbench shell

- show a local loading state while a feature module loads
- show a controlled error state if lazy import fails
- do not break the surrounding route layout

### PDF tools

- validate file type and selection count before processing
- validate split range syntax before processing
- show per-tool actionable errors for parse or render failure
- handle empty output cases explicitly
- always revoke object URLs on replacement and unmount

### Local-only worker policy

If the PDF worker cannot resolve from local assets, the tool should fail with a clear local error message rather than silently falling back to a CDN.

## Migration Plan

### Milestone 1: shared extraction and shell

- extract shared workbench primitives and helpers
- introduce the new `ToolWorkbench` shell
- add `loaders.tsx`
- migrate one or two low-risk domains first to verify the pattern

Expected outcome:

- behavior remains unchanged
- lazy loading works
- route and metadata behavior remain unchanged

### Milestone 2: full domain migration

- migrate remaining current domains
- remove old embedded implementations from the monolith
- keep all current tools functionally equivalent

Expected outcome:

- `tool-workbench.tsx` is reduced to a thin orchestrator
- feature ownership is cleanly split

### Milestone 3: PDF MVP

- add PDF registry entries
- add localized content entries
- add PDF icons
- implement the five PDF MVP tools
- verify local worker configuration and bundle boundaries

## Testing And Verification

### Static verification

- `npm run lint`
- `npm run build`

### Existing-tool regression checks

For each migrated domain, manually verify at least one or two representative tools:

- page opens
- core action still works
- copy and download actions still work
- no obvious layout or hydration regressions

### PDF MVP checks

Prepare simple local fixtures and verify:

- merge two PDFs
- split one PDF by multiple ranges
- rotate individual pages
- convert a multi-page PDF to ZIP of images
- convert multiple JPG and PNG files into one PDF

### Bundle intent checks

Confirm by build inspection or network inspection that:

- non-PDF tool routes do not eagerly load PDF-heavy dependencies
- PDF dependencies load only when opening PDF tools

## Risks And Mitigations

### Risk: migration introduces broad regressions

Mitigation:

- do equivalent migrations first
- avoid behavior redesign during extraction
- migrate domains incrementally

### Risk: type and prop drift across modules

Mitigation:

- keep the existing `tool`, `locale`, and `dict` contract
- centralize shared types in `shared/types.ts`

### Risk: PDF bundle weight degrades performance

Mitigation:

- isolate PDF into its own lazy feature module
- use secondary dynamic imports for heavy PDF libraries

### Risk: offline guarantee becomes inaccurate

Mitigation:

- disallow CDN worker fallback
- keep all processing in the browser
- fail closed if local worker setup is broken

## Success Criteria

This design is successful when:

- the monolithic workbench is replaced by maintainable feature-owned modules
- feature modules load lazily
- existing tool pages, routes, SEO, and metadata remain stable
- a first PDF MVP ships with the five approved tools
- PDF functionality works fully locally in the browser
- non-PDF pages are not burdened by PDF dependencies
