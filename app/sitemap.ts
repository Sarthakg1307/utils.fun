import type { MetadataRoute } from "next";

import { tools } from "@/lib/tools";
import { buildAbsoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: buildAbsoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: buildAbsoluteUrl("/en"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...tools.flatMap((tool) => [
      {
        url: buildAbsoluteUrl(`/${tool.slug}`),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
      {
        url: buildAbsoluteUrl(`/en/${tool.slug}`),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
    ]),
  ];
}
