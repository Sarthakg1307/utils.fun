import { siteSettings } from "@/site.config";

const logo =
  siteSettings.logo?.src
    ? {
        src: siteSettings.logo.src,
        alt: siteSettings.logo.alt || `${siteSettings.title} logo`,
        width: siteSettings.logo.width ?? 36,
        height: siteSettings.logo.height ?? 36,
      }
    : null;

export const siteConfig = {
  name: siteSettings.title,
  title: siteSettings.title,
  titleSeparator: siteSettings.titleSeparator,
  description: siteSettings.description,
  url: siteSettings.url,
  logo,
  footerHtml: siteSettings.footerHtml,
  githubUrl: siteSettings.githubUrl,
} as const;

export function buildDocumentTitle(pageTitle?: string) {
  if (!pageTitle || pageTitle === siteConfig.title) {
    return siteConfig.title;
  }

  return `${pageTitle} ${siteConfig.titleSeparator} ${siteConfig.title}`;
}

export function buildAbsoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
