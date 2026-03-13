import type { Locale } from "@/lib/tools";

export const LOCALE_COOKIE_NAME = "utilsfun-locale";

export type PathPrefix = "" | "/en";

export function normalizeLocale(value?: string | null): Locale {
  return value === "en" ? "en" : "zh";
}

export function hasEnglishPath(pathname: string) {
  return pathname === "/en" || pathname.startsWith("/en/");
}

export function stripEnglishPath(pathname: string) {
  if (pathname === "/en") {
    return "/";
  }

  return pathname.replace(/^\/en(?=\/|$)/, "") || "/";
}

export function buildPath(pathPrefix: PathPrefix, pathname: string) {
  const normalizedPath =
    pathname === "/"
      ? ""
      : pathname.startsWith("/")
        ? pathname
        : `/${pathname}`;

  return `${pathPrefix}${normalizedPath}` || "/";
}

export function buildToolPath(pathPrefix: PathPrefix, slug: string) {
  return buildPath(pathPrefix, `/${slug}`);
}

export function getHomePath(pathPrefix: PathPrefix) {
  return pathPrefix || "/";
}

export function persistLocaleCookie(locale: Locale) {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
}
