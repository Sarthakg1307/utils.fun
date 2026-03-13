"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CategoryIcon, ToolIcon } from "@/components/tool-icon";
import { buildToolPath, type PathPrefix } from "@/lib/locale";
import type { Category, Locale, Tool } from "@/lib/tools";

type Dict = {
  searchPlaceholder: string;
  searchEmpty: string;
};

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
  const deferredQuery = useDeferredValue(query);

  const filteredGroups = useMemo(() => {
    const keyword = deferredQuery.trim().toLowerCase();
    return categories
      .map((category) => {
        const items = tools.filter((tool) => {
          const haystack = [
            tool.title[locale],
            tool.description[locale],
            ...tool.highlights[locale],
            tool.slug,
          ]
            .join(" ")
            .toLowerCase();

          return tool.category === category.slug && (!keyword || haystack.includes(keyword));
        });

        return { category, items };
      })
      .filter((group) => group.items.length > 0);
  }, [categories, deferredQuery, locale, tools]);

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
            <div className="grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
              {items.map((tool) => (
                <Link
                  key={tool.slug}
                  href={buildToolPath(pathPrefix, tool.slug)}
                  className="group block h-full"
                >
                  <Card className="h-full rounded-2xl border-border/70 bg-card/75 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-primary/45 group-hover:bg-accent/20">
                    <CardContent className="flex h-full flex-col gap-3 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-muted/40">
                          <ToolIcon slug={tool.slug} />
                        </div>
                        <div className="min-w-0 flex-1 space-y-1">
                          <h4 className="text-xl font-semibold leading-7 tracking-tight">
                            {tool.title[locale]}
                          </h4>
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
                </Link>
              ))}
            </div>
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
