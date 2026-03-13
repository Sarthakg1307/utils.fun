import type { CSSProperties } from "react";
import {
  THEME_STYLES,
  THEME_STYLE_STORAGE_KEY,
  type ThemeStyle,
  getThemeStyleClass,
  isThemeStyle,
} from "@/lib/theme-style";

export const THEME_STORAGE_KEY = "theme";
export const THEME_COOKIE_NAME = "utils-theme";
export const THEME_STYLE_COOKIE_NAME = "utils-theme-style";
export const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export type ThemePreference = "light" | "dark" | "system";
export type ThemeMode = "light" | "dark";
export type ThemeMetaDefinition = {
  slot: ThemeMode;
  color: string;
  media?: string;
};

const INACTIVE_THEME_MEDIA = "not all";

export const THEME_STYLE_THEME_COLOR_MAP: Record<ThemeStyle, Record<ThemeMode, string>> = {
  brutalist: {
    light: "oklch(0.9923 0.0104 91.4994)",
    dark: "oklch(0.1649 0.0308 162.2739)",
  },
  twitter: {
    light: "oklch(1.0000 0 0)",
    dark: "oklch(0 0 0)",
  },
  darkmatter: {
    light: "oklch(1.0000 0 0)",
    dark: "oklch(0.1797 0.0043 308.1928)",
  },
  claude: {
    light: "oklch(0.9818 0.0054 95.0986)",
    dark: "oklch(0.2679 0.0036 106.6427)",
  },
  v2: {
    light: "oklch(0.9842 0.0034 247.8575)",
    dark: "oklch(0.2077 0.0398 265.7549)",
  },
  terminal: {
    light: "oklch(0 0 0)",
    dark: "oklch(0 0 0)",
  },
  brownie: {
    light: "oklch(0.9684 0.0160 98.9931)",
    dark: "oklch(0.2672 0.0120 44.5837)",
  },
  designbyte: {
    light: "oklch(0.9940 0 0)",
    dark: "oklch(0 0 0)",
  },
  vercel: {
    light: "oklch(0.9900 0 0)",
    dark: "oklch(0 0 0)",
  },
};

export function normalizeThemePreference(value?: string | null): ThemePreference {
  return value === "light" || value === "dark" || value === "system"
    ? value
    : "system";
}

export function normalizeThemeStyle(value?: string | null): ThemeStyle {
  return value && isThemeStyle(value) ? value : "brutalist";
}

export function resolveThemeMode(
  preference: ThemePreference,
  systemPrefersDark = false,
): ThemeMode {
  if (preference === "light") {
    return "light";
  }

  if (preference === "dark") {
    return "dark";
  }

  return systemPrefersDark ? "dark" : "light";
}

export function getThemeColor(style: ThemeStyle, mode: ThemeMode) {
  return THEME_STYLE_THEME_COLOR_MAP[style][mode];
}

export function getThemeMetaDefinitions(
  preference: ThemePreference,
  style: ThemeStyle,
): ThemeMetaDefinition[] {
  const light = getThemeColor(style, "light");
  const dark = getThemeColor(style, "dark");

  if (preference === "light") {
    return [
      { slot: "light", color: light },
      { slot: "dark", color: dark, media: INACTIVE_THEME_MEDIA },
    ];
  }

  if (preference === "dark") {
    return [
      { slot: "light", color: light, media: INACTIVE_THEME_MEDIA },
      { slot: "dark", color: dark },
    ];
  }

  return [
    { slot: "light", color: light, media: "(prefers-color-scheme: light)" },
    { slot: "dark", color: dark, media: "(prefers-color-scheme: dark)" },
  ];
}

export function getInitialHtmlClassName(
  preference: ThemePreference,
  style: ThemeStyle,
) {
  const classes = ["font-sans"];

  if (preference === "dark") {
    classes.push("dark");
  }

  const styleClass = getThemeStyleClass(style);
  if (styleClass) {
    classes.push(styleClass);
  }

  return classes.join(" ");
}

export function getInitialHtmlStyle(
  preference: ThemePreference,
  mode: ThemeMode,
  backgroundColor: string,
): CSSProperties {
  return {
    colorScheme: preference === "system" ? "light dark" : mode,
    backgroundColor,
    ["--browser-chrome-bg" as string]: backgroundColor,
  } as CSSProperties;
}

export function getInitialBodyStyle(backgroundColor: string): CSSProperties {
  return {
    backgroundColor,
  };
}

function getThemeStyleClassMap() {
  return Object.fromEntries(
    THEME_STYLES.map((style) => [style, getThemeStyleClass(style)]),
  );
}

export function getThemeBootstrapScript() {
  return `(function(){try{var themeKey=${JSON.stringify(THEME_STORAGE_KEY)};var themeCookie=${JSON.stringify(THEME_COOKIE_NAME)};var styleKey=${JSON.stringify(THEME_STYLE_STORAGE_KEY)};var styleCookie=${JSON.stringify(THEME_STYLE_COOKIE_NAME)};var maxAge=${String(THEME_COOKIE_MAX_AGE)};var inactiveMedia=${JSON.stringify(INACTIVE_THEME_MEDIA)};var styleClassMap=${JSON.stringify(getThemeStyleClassMap())};var themeColorMap=${JSON.stringify(THEME_STYLE_THEME_COLOR_MAP)};var root=document.documentElement;var readCookie=function(name){var match=document.cookie.match(new RegExp('(?:^|; )'+name.replace(/[$()*+.?[\\\\\\]^{|}]/g,'\\\\$&')+'=([^;]*)'));return match?decodeURIComponent(match[1]):null;};var ensureMeta=function(slot){var meta=document.head.querySelector('meta[name="theme-color"][data-theme-color="'+slot+'"]');if(!meta){meta=document.createElement('meta');meta.name='theme-color';meta.setAttribute('data-theme-color',slot);document.head.appendChild(meta);}return meta;};var applyMetaSet=function(theme,style){var colors=themeColorMap[style]||themeColorMap.brutalist;var entries=theme==='light'?[{slot:'light',color:colors.light},{slot:'dark',color:colors.dark,media:inactiveMedia}]:theme==='dark'?[{slot:'light',color:colors.light,media:inactiveMedia},{slot:'dark',color:colors.dark}]:[{slot:'light',color:colors.light,media:'(prefers-color-scheme: light)'},{slot:'dark',color:colors.dark,media:'(prefers-color-scheme: dark)'}];entries.forEach(function(entry){var meta=ensureMeta(entry.slot);meta.setAttribute('content',entry.color);if(entry.media){meta.setAttribute('media',entry.media);}else{meta.removeAttribute('media');}});return colors;};var theme=localStorage.getItem(themeKey)||readCookie(themeCookie)||'system';var style=localStorage.getItem(styleKey)||readCookie(styleCookie)||'brutalist';if(!theme||!/^(light|dark|system)$/.test(theme)){theme='system';}if(!themeColorMap[style]){style='brutalist';}var isDark=theme==='dark'||(theme!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);root.classList.toggle('dark',isDark);Object.keys(styleClassMap).forEach(function(key){var className=styleClassMap[key];if(className){root.classList.remove(className);}});var nextClass=styleClassMap[style];if(nextClass){root.classList.add(nextClass);}root.style.colorScheme=theme==='system'?'light dark':(isDark?'dark':'light');var colors=applyMetaSet(theme,style);var currentColor=colors[isDark?'dark':'light'];root.style.backgroundColor=currentColor;root.style.setProperty('--browser-chrome-bg',currentColor);if(document.body){document.body.style.backgroundColor=currentColor;}document.cookie=themeCookie+'='+encodeURIComponent(theme)+'; Path=/; Max-Age='+maxAge+'; SameSite=Lax';document.cookie=styleCookie+'='+encodeURIComponent(style)+'; Path=/; Max-Age='+maxAge+'; SameSite=Lax';}catch(error){}})();`;
}

export function persistThemePreferenceCookie(theme: ThemePreference) {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${THEME_COOKIE_NAME}=${encodeURIComponent(theme)}; Path=/; Max-Age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function persistThemeStyleCookie(style: ThemeStyle) {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${THEME_STYLE_COOKIE_NAME}=${encodeURIComponent(style)}; Path=/; Max-Age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function readClientThemePreference() {
  if (typeof window === "undefined") {
    return {
      preference: "system" as ThemePreference,
      style: "brutalist" as ThemeStyle,
    };
  }

  const theme = normalizeThemePreference(
    readStorage(THEME_STORAGE_KEY) || readCookie(THEME_COOKIE_NAME),
  );
  const style = normalizeThemeStyle(
    readStorage(THEME_STYLE_STORAGE_KEY) || readCookie(THEME_STYLE_COOKIE_NAME),
  );

  return { preference: theme, style };
}

function readStorage(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function readCookie(name: string) {
  if (typeof document === "undefined") {
    return null;
  }

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${escapeCookieName(name)}=([^;]*)`),
  );

  return match ? decodeURIComponent(match[1]) : null;
}

function escapeCookieName(value: string) {
  return value.replace(/[$()*+.?[\\\]^{|}]/g, "\\$&");
}
