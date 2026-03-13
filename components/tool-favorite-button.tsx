"use client";

import { Star } from "lucide-react";

import { useFavorites } from "@/components/providers/favorites-provider";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { type Locale, type ToolSlug } from "@/lib/tools";

export function ToolFavoriteButton({
  slug,
  locale,
  title,
  className,
}: {
  slug: ToolSlug;
  locale: Locale;
  title: string;
  className?: string;
}) {
  const dict = getDictionary(locale);
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(slug);
  const label = favorite
    ? `${dict.removeFavorite}: ${title}`
    : `${dict.addFavorite}: ${title}`;

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={label}
      aria-pressed={favorite}
      title={label}
      className={cn(
        "shrink-0 rounded-xl border border-border/70 bg-background text-muted-foreground shadow-sm transition-[transform,background-color,border-color,color,box-shadow] hover:-translate-y-0.5 hover:border-foreground/15 hover:bg-muted hover:text-foreground hover:[&_svg]:scale-110 focus-visible:ring-2 focus-visible:ring-ring/40",
        favorite && "border-foreground/15 bg-foreground text-background hover:bg-foreground/90 hover:text-background",
        className,
      )}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(slug);
      }}
    >
      <Star className={cn("size-4", favorite && "fill-current")} />
    </Button>
  );
}
