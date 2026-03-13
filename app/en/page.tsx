import type { Metadata } from "next";

import { HomePage } from "@/app/pages/home-page";
import { getSiteConfig } from "@/lib/site.server";
import { buildAbsoluteUrl, buildDocumentTitle } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();

  return {
    title: {
      absolute: buildDocumentTitle(siteConfig, "Home"),
    },
    alternates: {
      canonical: buildAbsoluteUrl(siteConfig, "/en"),
      languages: {
        "zh-CN": buildAbsoluteUrl(siteConfig, "/"),
      },
    },
  };
}

export default function EnHomePage() {
  return <HomePage locale="en" pathPrefix="/en" />;
}
