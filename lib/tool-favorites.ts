import { tools, type ToolSlug } from "@/lib/tools";

export const TOOL_FAVORITES_STORAGE_KEY = "utils-tool-favorites";

const toolSlugSet = new Set<ToolSlug>(tools.map((tool) => tool.slug));

export function isToolSlug(value: string): value is ToolSlug {
  return toolSlugSet.has(value as ToolSlug);
}

export function normalizeFavoriteSlugs(value: unknown): ToolSlug[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const seen = new Set<ToolSlug>();
  const favorites: ToolSlug[] = [];

  for (const item of value) {
    if (typeof item !== "string" || !isToolSlug(item) || seen.has(item)) {
      continue;
    }

    seen.add(item);
    favorites.push(item);
  }

  return favorites;
}

export function readFavoriteSlugs(storage?: Storage | null) {
  if (!storage) {
    return [];
  }

  try {
    const raw = storage.getItem(TOOL_FAVORITES_STORAGE_KEY);

    if (!raw) {
      return [];
    }

    return normalizeFavoriteSlugs(JSON.parse(raw));
  } catch {
    return [];
  }
}

export function writeFavoriteSlugs(storage: Storage | null | undefined, favorites: ToolSlug[]) {
  if (!storage) {
    return;
  }

  try {
    storage.setItem(TOOL_FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // Ignore storage errors so the UI remains usable in restricted browsers.
  }
}
