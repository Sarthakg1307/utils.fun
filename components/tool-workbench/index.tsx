"use client";

import { lazy, Suspense } from "react";

import { ToolPageLoading } from "@/components/tool-page-loading";

import { getFeatureDomain } from "./feature-map";
import { featureLoaders } from "./loaders";
import type { ToolWorkbenchProps } from "./types";

const featureWorkbenches = {
  generate: lazy(featureLoaders.generate),
  image: lazy(featureLoaders.image),
  encrypt: lazy(featureLoaders.encrypt),
  time: lazy(featureLoaders.time),
  convert: lazy(featureLoaders.convert),
  finance: lazy(featureLoaders.finance),
  text: lazy(featureLoaders.text),
  dev: lazy(featureLoaders.dev),
  pdf: lazy(featureLoaders.pdf),
};

export function ToolWorkbench({ tool, locale, dict }: ToolWorkbenchProps) {
  const domain = getFeatureDomain(tool.slug);

  if (!domain) {
    return null;
  }

  const FeatureWorkbench = featureWorkbenches[domain];

  return (
    <Suspense fallback={<ToolPageLoading locale={locale} />}>
      <FeatureWorkbench tool={tool} locale={locale} dict={dict} />
    </Suspense>
  );
}
