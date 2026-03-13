import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ToolRouteScrollReset } from "@/components/tool-route-scroll-reset";
import { ToolSidebar } from "@/components/tool-sidebar";
import { getDictionary } from "@/lib/i18n";
import { getHomePath, type PathPrefix } from "@/lib/locale";
import { type Locale } from "@/lib/tools";

export function ToolLayout({
  locale,
  pathPrefix,
  children,
}: {
  locale: Locale;
  pathPrefix: PathPrefix;
  children: React.ReactNode;
}) {
  const dict = getDictionary(locale);
  const homePath = getHomePath(pathPrefix);

  return (
    <>
      <SiteHeader
        locale={locale}
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
      <ToolRouteScrollReset />
      <main className="mx-auto w-full max-w-7xl px-4 pb-8 pt-6 sm:px-6 lg:px-8 lg:pb-12 lg:pt-8">
        <section className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[260px_minmax(0,1fr)] xl:gap-12">
          <aside className="hidden lg:block lg:border-r lg:border-border/60 lg:pr-8 xl:pr-10">
            <ToolSidebar
              locale={locale}
              pathPrefix={pathPrefix}
              variant="docs"
              className="lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)]"
            />
          </aside>
          <div className="min-w-0 lg:py-2">
            <div className="min-w-0 max-w-4xl">
              {children}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
