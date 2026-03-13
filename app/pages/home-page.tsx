import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ToolSidebar } from "@/components/tool-sidebar";
import { ToolExplorer } from "@/components/tool-explorer";
import { getDictionary } from "@/lib/i18n";
import { getHomePath, type PathPrefix } from "@/lib/locale";
import { type Locale } from "@/lib/tools";
import { formatCount } from "@/lib/utils";

export function HomePage({
  locale,
  pathPrefix,
}: {
  locale: Locale;
  pathPrefix: PathPrefix;
}) {
  const dict = getDictionary(locale);
  const homePath = getHomePath(pathPrefix);

  return (
    <>
      <SiteHeader
        locale={locale}
        pathname={homePath}
        homePath={homePath}
        pathPrefix={pathPrefix}
        dict={dict}
        mobileNavigationTitle={dict.categoryNavTitle}
        mobileNavigation={
          <ToolSidebar
            locale={locale}
            pathPrefix={pathPrefix}
            variant="docs"
          />
        }
      />
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
        <section>
          <Card>
            <CardHeader>
              <div className="px-2 pt-1">
                <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
                  {dict.homeTitle}
                </h1>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-5 px-2 pb-2">
                <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  {dict.homeIntro}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <a href={`${homePath}#tools`}>
                      {dict.toolListTitle}
                      <ArrowRight className="size-4" />
                    </a>
                  </Button>
                  <Badge variant="outline">
                    {dict.homeStats.replace(
                      "{count}",
                      formatCount(dict.tools.length, locale),
                    )}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        <section id="tools" className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-tight">
              {dict.toolListTitle}
            </h2>
            <p className="text-muted-foreground">{dict.toolListIntro}</p>
          </div>
          <ToolExplorer
            locale={locale}
            pathPrefix={pathPrefix}
            dict={dict}
            categories={dict.categories}
            tools={dict.tools}
          />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
