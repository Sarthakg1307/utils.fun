export const THEME_STYLE_STORAGE_KEY = "utils-theme-style";

export const THEME_STYLES = [
  "brutalist",
  "twitter",
  "darkmatter",
  "claude",
  "v2",
  "terminal",
  "brownie",
  "designbyte",
  "vercel",
] as const;

export type ThemeStyle = (typeof THEME_STYLES)[number];

export const THEME_STYLE_CLASS_MAP: Record<ThemeStyle, string | null> = {
  brutalist: null,
  twitter: "theme-twitter",
  darkmatter: "theme-darkmatter",
  claude: "theme-claude",
  v2: "theme-v2",
  terminal: "theme-terminal",
  brownie: "theme-brownie",
  designbyte: "theme-designbyte",
  vercel: "theme-vercel",
};

const THEME_STYLE_CLASSES = Object.values(THEME_STYLE_CLASS_MAP).filter(
  (value): value is string => Boolean(value),
);

export function isThemeStyle(value: string): value is ThemeStyle {
  return THEME_STYLES.includes(value as ThemeStyle);
}

export function getThemeStyleClass(style: ThemeStyle) {
  return THEME_STYLE_CLASS_MAP[style];
}

export function applyThemeStyle(style: ThemeStyle) {
  const root = document.documentElement;
  root.classList.remove(...THEME_STYLE_CLASSES);
  const className = getThemeStyleClass(style);
  if (className) {
    root.classList.add(className);
  }
}
