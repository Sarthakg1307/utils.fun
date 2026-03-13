export type SiteConfig = {
  title: string;
  titleSeparator: string;
  description: string;
  url: string;
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  } | null;
  footerHtml: string;
  githubUrl: string;
};

export const SITE_CONFIG_PUBLIC_PATH = "/site-config.json";

function buildDefaultFooterHtml(title: string) {
  return `<p>&copy; ${new Date().getFullYear()} ${title}. All rights reserved.</p>`;
}

export const defaultSiteConfig: SiteConfig = {
  title: "Utils.fun",
  titleSeparator: " - ",
  description:
    "A clean online toolbox for development, text, time, image, encoding, and quick generation tasks.",
  url: "https://utils.fun",
  logo: {
    src: "/favicon.ico",
    alt: "Utils.fun logo",
    width: 36,
    height: 36,
  },
  footerHtml: buildDefaultFooterHtml("Utils.fun"),
  githubUrl: "https://github.com/Licoy/utils.fun",
};

export function normalizeSiteConfig(input: unknown): SiteConfig {
  const source = isRecord(input) ? input : {};
  const title = pickString(source.title, defaultSiteConfig.title);
  const titleSeparator = pickString(source.titleSeparator, defaultSiteConfig.titleSeparator);
  const description = pickString(source.description, defaultSiteConfig.description);
  const url = pickString(source.url, defaultSiteConfig.url);
  const footerHtml = pickString(source.footerHtml, buildDefaultFooterHtml(title));
  const githubUrl = pickString(source.githubUrl, defaultSiteConfig.githubUrl);
  const logo = normalizeLogo(source.logo, title);

  return {
    title,
    titleSeparator,
    description,
    url,
    logo,
    footerHtml,
    githubUrl,
  };
}

export function buildDocumentTitle(siteConfig: SiteConfig, pageTitle?: string) {
  if (!pageTitle || pageTitle === siteConfig.title) {
    return siteConfig.title;
  }

  return `${pageTitle} ${siteConfig.titleSeparator} ${siteConfig.title}`;
}

export function buildAbsoluteUrl(siteConfig: SiteConfig, path = "/") {
  return new URL(path, siteConfig.url).toString();
}

function normalizeLogo(input: unknown, title: string): SiteConfig["logo"] {
  if (input === null) {
    return null;
  }

  if (!isRecord(input)) {
    return defaultSiteConfig.logo;
  }

  const src = pickString(input.src, "");

  if (!src) {
    return null;
  }

  return {
    src,
    alt: pickString(input.alt, `${title} logo`),
    width: pickNumber(input.width, defaultSiteConfig.logo?.width ?? 36),
    height: pickNumber(input.height, defaultSiteConfig.logo?.height ?? 36),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function pickString(value: unknown, fallback: string) {
  if (typeof value !== "string") {
    return fallback;
  }

  const normalized = value.trim();
  return normalized || fallback;
}

function pickNumber(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}
