import { describe, expect, it } from "vitest";

import { getFeatureDomain } from "@/components/tool-workbench/feature-map";

describe("getFeatureDomain", () => {
  it("maps current tool slugs to their feature domains", () => {
    expect(getFeatureDomain("rand-password")).toBe("generate");
    expect(getFeatureDomain("watermark")).toBe("image");
    expect(getFeatureDomain("aes")).toBe("encrypt");
    expect(getFeatureDomain("timestamp")).toBe("time");
    expect(getFeatureDomain("unit-converter")).toBe("convert");
    expect(getFeatureDomain("loan")).toBe("finance");
    expect(getFeatureDomain("trim")).toBe("text");
    expect(getFeatureDomain("sql")).toBe("dev");
  });

  it("maps planned pdf tool slugs to the pdf feature", () => {
    expect(getFeatureDomain("merge-pdf")).toBe("pdf");
    expect(getFeatureDomain("split-pdf")).toBe("pdf");
    expect(getFeatureDomain("rotate-pdf")).toBe("pdf");
    expect(getFeatureDomain("pdf-to-images")).toBe("pdf");
    expect(getFeatureDomain("images-to-pdf")).toBe("pdf");
  });

  it("returns null for an unknown slug", () => {
    expect(getFeatureDomain("missing-tool")).toBeNull();
  });
});
