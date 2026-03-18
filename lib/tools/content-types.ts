import type { CategorySlug, ToolSlug } from "@/lib/tools/registry";

export type CategoryContent = {
  title: string;
  description: string;
};

export type ToolContent = {
  title: string;
  description: string;
  highlights: string[];
};

export type CategoryContentMap = Partial<Record<CategorySlug, CategoryContent>>;
export type ToolContentMap = Partial<Record<ToolSlug, ToolContent>>;
