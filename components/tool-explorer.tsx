"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";

import { useFavorites } from "@/components/providers/favorites-provider";
import { ToolFavoriteButton } from "@/components/tool-favorite-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CategoryIcon, ToolIcon } from "@/components/tool-icon";
import { buildToolPath, type PathPrefix } from "@/lib/locale";
import type { Category, Locale, Tool } from "@/lib/tools";

type Dict = {
  searchPlaceholder: string;
  searchEmpty: string;
  myFavorites: string;
};

function ToolGrid({
  items,
  locale,
  pathPrefix,
}: {
  items: Tool[];
  locale: Locale;
  pathPrefix: PathPrefix;
}) {
  return (
    <div className="grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((tool) => (
        <Card
          key={tool.slug}
          className="group relative h-full rounded-2xl border-border/70 bg-card/75 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/45 hover:bg-accent/20"
        >
          <Link
            href={buildToolPath(pathPrefix, tool.slug)}
            scroll
            aria-label={tool.title[locale]}
            className="absolute inset-0 z-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          <CardContent className="pointer-events-none relative z-10 flex h-full flex-col gap-3 p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-muted/40">
                <ToolIcon slug={tool.slug} />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="min-w-0 flex-1 text-xl font-semibold leading-7 tracking-tight">
                    {tool.title[locale]}
                  </h4>
                  <ToolFavoriteButton
                    slug={tool.slug}
                    locale={locale}
                    title={tool.title[locale]}
                    className="pointer-events-auto -mr-2 -mt-1 size-9"
                  />
                </div>
              </div>
            </div>
            <p className="line-clamp-2 text-sm leading-5 text-muted-foreground">
              {tool.description[locale]}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {tool.highlights[locale].slice(0, 3).map((item) => (
                <Badge key={item} variant="outline" className="rounded-full px-2.5 py-0.5">
                  {item}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ToolExplorer({
  locale,
  pathPrefix,
  dict,
  categories,
  tools,
}: {
  locale: Locale;
  pathPrefix: PathPrefix;
  dict: Dict;
  categories: Category[];
  tools: Tool[];
}) {
  const [query, setQuery] = useState("");
  const { favorites, hydrated } = useFavorites();
  const deferredQuery = useDeferredValue(query);

  const { favoriteItems, filteredGroups } = useMemo(() => {
    const keyword = deferredQuery.trim().toLowerCase();
    const matchesQuery = (tool: Tool) => {
      const haystack = [
        tool.title[locale],
        tool.description[locale],
        ...tool.highlights[locale],
        tool.slug,
      ]
        .join(" ")
        .toLowerCase();

      return !keyword || haystack.includes(keyword);
    };

    const toolMap = new Map(tools.map((tool) => [tool.slug, tool]));
    const favoriteItems = favorites
      .map((slug) => toolMap.get(slug))
      .filter((tool): tool is Tool => Boolean(tool))
      .filter(matchesQuery);

    const filteredGroups = categories
      .map((category) => {
        const items = tools.filter(
          (tool) => tool.category === category.slug && matchesQuery(tool),
        );

        return { category, items };
      })
      .filter((group) => group.items.length > 0);

    return { favoriteItems, filteredGroups };
  }, [categories, deferredQuery, favorites, locale, tools]);

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={dict.searchPlaceholder}
          className="pl-9"
        />
      </div>
      {hydrated && favoriteItems.length > 0 ? (
        <section className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0 space-y-1.5">
              <h3 className="text-2xl font-semibold tracking-tight">{dict.myFavorites}</h3>
            </div>
            <Badge variant="outline" className="w-fit rounded-full px-3 py-1">
              {favoriteItems.length}
            </Badge>
          </div>
          <ToolGrid items={favoriteItems} locale={locale} pathPrefix={pathPrefix} />
        </section>
      ) : null}
      {filteredGroups.length ? (
        filteredGroups.map(({ category, items }) => (
          <section key={category.slug} className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0 space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <CategoryIcon slug={category.slug} className="size-6" />
                  <h3 className="text-2xl font-semibold tracking-tight">{category.title[locale]}</h3>
                </div>
                <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
                  {category.description[locale]}
                </p>
              </div>
              <Badge variant="outline" className="w-fit rounded-full px-3 py-1">
                {items.length}
              </Badge>
            </div>
            <ToolGrid items={items} locale={locale} pathPrefix={pathPrefix} />
          </section>
        ))
      ) : (
        <Card>
          <CardContent>
            <div className="flex min-h-32 items-center justify-center text-sm text-muted-foreground">
              {dict.searchEmpty}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
