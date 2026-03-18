import type { Locale } from "@/lib/tools";

import JSZip from "jszip";

export function isChineseLocale(locale: Locale) {
  return locale === "cn" || locale === "tw";
}

export function t(locale: Locale, zh: string, en: string) {
  return isChineseLocale(locale) ? zh : en;
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function downloadBlobsAsZip(blobs: Blob[], buildName: (index: number) => string, filename: string) {
  const zip = new JSZip();

  blobs.forEach((blob, index) => {
    zip.file(buildName(index), blob);
  });

  downloadBlob(await zip.generateAsync({ type: "blob" }), filename);
}

export function moveItem<T>(items: T[], from: number, direction: -1 | 1) {
  const to = from + direction;

  if (to < 0 || to >= items.length) {
    return items;
  }

  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);

  return next;
}
