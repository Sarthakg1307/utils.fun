import { describe, expect, it } from "vitest";

import { getFeatureDomain } from "@/components/tool-workbench/feature-map";
import { locales } from "@/lib/i18n";
import { categories, getTool } from "@/lib/tools";

const pdfToolSlugs = [
  "merge-pdf",
  "split-pdf",
  "rotate-pdf",
  "pdf-to-images",
  "images-to-pdf",
  "remove-pdf-pages",
  "reorder-pdf-pages",
  "pdf-watermark",
  "pdf-page-numbers",
] as const;

describe("pdf module wiring", () => {
  it("registers a dedicated pdf category", () => {
    expect(categories.some((category) => category.slug === "pdf")).toBe(true);
  });

  it("routes all pdf tools to the pdf feature domain", () => {
    pdfToolSlugs.forEach((slug) => {
      expect(getFeatureDomain(slug)).toBe("pdf");
    });
  });

  it("registers all pdf tools with localized titles and descriptions", () => {
    pdfToolSlugs.forEach((slug) => {
      const tool = getTool(slug);

      expect(tool).toBeDefined();
      expect(tool?.category).toBe("pdf");

      locales.forEach((locale) => {
        expect(tool?.title[locale]).toBeTruthy();
        expect(tool?.description[locale]).toBeTruthy();
        expect(tool?.highlights[locale]?.length).toBeGreaterThan(0);
      });
    });
  });
});
