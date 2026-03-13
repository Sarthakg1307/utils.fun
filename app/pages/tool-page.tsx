import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ToolFavoriteButton } from "@/components/tool-favorite-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToolIcon } from "@/components/tool-icon";
import { ToolWorkbench } from "@/components/tool-workbench";
import { getDictionary } from "@/lib/i18n";
import { getHomePath, type PathPrefix } from "@/lib/locale";
import { getTool, type Locale } from "@/lib/tools";

export function ToolPage({
  locale,
  pathPrefix,
  slug,
}: {
  locale: Locale;
  pathPrefix: PathPrefix;
  slug: string;
}) {
  const dict = getDictionary(locale);
  const tool = getTool(slug);

  if (!tool) {
    return null;
  }

  const homePath = getHomePath(pathPrefix);

  return (
    <div className="min-w-0 space-y-10">
      <section className="space-y-5 border-b border-border/60 pb-8">
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background sm:size-12">
            <ToolIcon slug={tool.slug} className="size-5" />
          </div>
          <div className="min-w-0 flex-1 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <h1 className="min-w-0 flex-1 text-3xl font-semibold tracking-tight sm:text-4xl">
                {tool.title[locale]}
              </h1>
              <ToolFavoriteButton
                slug={tool.slug}
                locale={locale}
                title={tool.title[locale]}
                className="size-10"
              />
            </div>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground">
              {tool.description[locale]}
            </p>
            <div className="flex flex-wrap gap-2">
              {tool.highlights[locale].map((item) => (
                <Badge key={item} variant="outline" className="rounded-full px-2.5 py-0.5">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ToolWorkbench tool={tool} locale={locale} dict={dict} />
      <div className="w-full">
        <Button asChild variant="ghost">
          <Link href={homePath} scroll>
            <ArrowLeft className="size-4" />
            {dict.backHome}
          </Link>
        </Button>
      </div>
    </div>
  );
}
