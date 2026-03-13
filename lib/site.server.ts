import "server-only";

import path from "node:path";
import { promises as fs } from "node:fs";
import { unstable_noStore as noStore } from "next/cache";

import { defaultSiteConfig, normalizeSiteConfig, type SiteConfig } from "@/lib/site";

export function getSiteConfigPath() {
  return process.env.SITE_CONFIG_PATH?.trim() || path.join(process.cwd(), "public", "site-config.json");
}

export async function getSiteConfig(): Promise<SiteConfig> {
  noStore();

  try {
    const file = await fs.readFile(getSiteConfigPath(), "utf8");
    return normalizeSiteConfig(JSON.parse(file) as unknown);
  } catch {
    return defaultSiteConfig;
  }
}
