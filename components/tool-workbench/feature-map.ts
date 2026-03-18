export type FeatureDomain =
  | "generate"
  | "image"
  | "encrypt"
  | "time"
  | "convert"
  | "finance"
  | "text"
  | "dev"
  | "pdf";

const featureDomainBySlug = new Map<string, FeatureDomain>([
  ["rand-password", "generate"],
  ["qrcode", "generate"],
  ["screen-record", "generate"],
  ["random-number", "generate"],
  ["guid", "generate"],
  ["random-group", "generate"],
  ["watermark", "image"],
  ["image-compress", "image"],
  ["qrcode-decode", "image"],
  ["barcode", "image"],
  ["md5", "encrypt"],
  ["file-md5", "encrypt"],
  ["hmac", "encrypt"],
  ["sha", "encrypt"],
  ["aes", "encrypt"],
  ["rabbit", "encrypt"],
  ["des", "encrypt"],
  ["rc4", "encrypt"],
  ["base64", "encrypt"],
  ["unicode", "encrypt"],
  ["url", "encrypt"],
  ["timestamp", "time"],
  ["calculation", "time"],
  ["world", "time"],
  ["working-day", "time"],
  ["batch-timestamp", "time"],
  ["unit-converter", "convert"],
  ["english-amount", "finance"],
  ["sum-list", "finance"],
  ["loan", "finance"],
  ["rmb", "text"],
  ["text-dedupe", "text"],
  ["emoji-clean", "text"],
  ["id-card-cn", "text"],
  ["simplified-traditional", "text"],
  ["pinyin", "text"],
  ["pluralize", "text"],
  ["english-case", "text"],
  ["cn-en", "text"],
  ["trim", "text"],
  ["regex", "text"],
  ["md-html", "dev"],
  ["json", "dev"],
  ["json-to-types", "dev"],
  ["css", "dev"],
  ["js", "dev"],
  ["html", "dev"],
  ["sql", "dev"],
  ["crontab", "dev"],
  ["naming-converter", "dev"],
  ["color-converter", "dev"],
  ["websocket", "dev"],
  ["go-struct-json", "dev"],
  ["less2css", "dev"],
  ["binary", "dev"],
  ["merge-pdf", "pdf"],
  ["split-pdf", "pdf"],
  ["rotate-pdf", "pdf"],
  ["pdf-to-images", "pdf"],
  ["images-to-pdf", "pdf"],
  ["remove-pdf-pages", "pdf"],
  ["reorder-pdf-pages", "pdf"],
  ["pdf-watermark", "pdf"],
  ["pdf-page-numbers", "pdf"],
  ["pdf-to-text", "pdf"],
  ["pdf-metadata-clean", "pdf"],
]);

export function getFeatureDomain(slug: string): FeatureDomain | null {
  return featureDomainBySlug.get(slug) ?? null;
}
