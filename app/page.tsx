import type { Metadata } from "next";

import { HomePage } from "@/app/pages/home-page";
import { getPreferredLocale } from "@/lib/locale-server";
import { buildAbsoluteUrl, buildDocumentTitle } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getPreferredLocale();

  return {
    title: {
      absolute: buildDocumentTitle(locale === "en" ? "Home" : "首页"),
    },
    alternates: {
      canonical: buildAbsoluteUrl("/"),
      languages: {
        en: buildAbsoluteUrl("/en"),
      },
    },
  };
}

export default async function LocalizedHomePage() {
  const locale = await getPreferredLocale();

  return <HomePage locale={locale} pathPrefix="" />;
}
