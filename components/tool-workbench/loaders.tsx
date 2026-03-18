import type { ComponentType, LazyExoticComponent } from "react";

import type { FeatureDomain } from "./feature-map";
import type { ToolWorkbenchProps } from "./types";

export type FeatureWorkbenchModule = {
  default: ComponentType<ToolWorkbenchProps>;
};

export type FeatureLoader = () => Promise<FeatureWorkbenchModule>;

export const featureLoaders: Record<FeatureDomain, FeatureLoader> = {
  generate: () => import("./features/generate"),
  image: () => import("./features/image"),
  encrypt: () => import("./features/encrypt"),
  time: () => import("./features/time"),
  convert: () => import("./features/convert"),
  finance: () => import("./features/finance"),
  text: () => import("./features/text"),
  dev: () => import("./features/dev"),
  pdf: () => import("./features/pdf"),
};

export function loadFeatureModule(domain: FeatureDomain) {
  return featureLoaders[domain]();
}

export type LazyFeatureWorkbench = LazyExoticComponent<ComponentType<ToolWorkbenchProps>>;
