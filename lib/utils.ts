import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCount(count: number, locale: string) {
  return new Intl.NumberFormat(locale === "en" ? "en-US" : "zh-CN").format(count);
}
