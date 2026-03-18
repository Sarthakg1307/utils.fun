import { describe, expect, it } from "vitest";

import { featureLoaders, loadFeatureModule } from "@/components/tool-workbench/loaders";

describe("feature loaders", () => {
  it("declares loaders for every feature domain", () => {
    expect(Object.keys(featureLoaders).sort()).toEqual([
      "convert",
      "dev",
      "encrypt",
      "finance",
      "generate",
      "image",
      "pdf",
      "text",
      "time",
    ]);
  });

  it("keeps a dedicated pdf loader separate from current feature loaders", () => {
    expect(featureLoaders.pdf).toBeTypeOf("function");
    expect(featureLoaders.pdf).not.toBe(featureLoaders.generate);
  });

  it("loads a module with a default export for a known feature", async () => {
    const loadedModule = await loadFeatureModule("generate");

    expect(loadedModule).toHaveProperty("default");
    expect(loadedModule.default).toBeTypeOf("function");
  });
});
