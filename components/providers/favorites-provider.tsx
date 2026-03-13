"use client";

import * as React from "react";

import {
  readFavoriteSlugs,
  TOOL_FAVORITES_STORAGE_KEY,
  writeFavoriteSlugs,
} from "@/lib/tool-favorites";
import { type ToolSlug } from "@/lib/tools";

type FavoritesContextValue = {
  favorites: ToolSlug[];
  hydrated: boolean;
  isFavorite: (slug: ToolSlug) => boolean;
  toggleFavorite: (slug: ToolSlug) => void;
};

const FavoritesContext = React.createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = React.useState<ToolSlug[]>([]);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setFavorites(readFavoriteSlugs(window.localStorage));
    setHydrated(true);

    const handleStorage = (event: StorageEvent) => {
      if (
        event.storageArea !== window.localStorage ||
        (event.key !== null && event.key !== TOOL_FAVORITES_STORAGE_KEY)
      ) {
        return;
      }

      setFavorites(readFavoriteSlugs(window.localStorage));
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const toggleFavorite = (slug: ToolSlug) => {
    setFavorites((current) => {
      const next = current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [slug, ...current];

      writeFavoriteSlugs(window.localStorage, next);

      return next;
    });
  };

  const value: FavoritesContextValue = {
    favorites,
    hydrated,
    isFavorite: (slug) => favorites.includes(slug),
    toggleFavorite,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = React.useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }

  return context;
}
