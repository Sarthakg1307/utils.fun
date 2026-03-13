import type { Metadata } from "next";

import { HomePage } from "@/app/pages/home-page";
import { buildAbsoluteUrl, buildDocumentTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: buildDocumentTitle("Home"),
  },
  alternates: {
    canonical: buildAbsoluteUrl("/en"),
    languages: {
      "zh-CN": buildAbsoluteUrl("/"),
    },
  },
};

export default function EnHomePage() {
  return <HomePage locale="en" pathPrefix="/en" />;
}
