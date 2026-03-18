import {
  PDFDocument,
  StandardFonts,
  degrees,
  rgb,
  type PDFFont,
  type PDFPage,
} from "pdf-lib";

import { loadPdfPreviewDocument, renderPdfPageToCanvas } from "./pdf-preview";

export type PdfTextWatermarkOptions = {
  text: string;
  opacity?: number;
  fontSize?: number;
  rotation?: number;
  color?: string;
};

export type PdfPageNumberPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type PdfPageNumberOptions = {
  prefix?: string;
  start?: number;
  fontSize?: number;
  position?: PdfPageNumberPosition;
  opacity?: number;
  color?: string;
};

function toPdfBlob(bytes: Uint8Array) {
  const copy = Uint8Array.from(bytes);

  return new Blob([copy.buffer], { type: "application/pdf" });
}

async function loadPdf(file: File) {
  return PDFDocument.load(await file.arrayBuffer());
}

export async function mergePdfs(files: File[]) {
  const merged = await PDFDocument.create();

  for (const file of files) {
    const source = await loadPdf(file);
    const pages = await merged.copyPages(source, source.getPageIndices());

    pages.forEach((page) => merged.addPage(page));
  }

  return toPdfBlob(await merged.save());
}

export async function splitPdf(file: File, ranges: [number, number][]) {
  const source = await loadPdf(file);
  const outputs: Blob[] = [];

  for (const [start, end] of ranges) {
    const splitDocument = await PDFDocument.create();
    const pageIndices = Array.from({ length: end - start + 1 }, (_, offset) => start - 1 + offset);
    const pages = await splitDocument.copyPages(source, pageIndices);

    pages.forEach((page) => splitDocument.addPage(page));
    outputs.push(toPdfBlob(await splitDocument.save()));
  }

  return outputs;
}

export async function rotatePdf(file: File, pageRotations: Record<number, number>) {
  const document = await loadPdf(file);
  const pages = document.getPages();

  for (const [pageIndex, rotation] of Object.entries(pageRotations)) {
    const page = pages[Number(pageIndex)];

    if (!page) {
      continue;
    }

    page.setRotation(degrees(rotation));
  }

  return toPdfBlob(await document.save());
}

export async function removePdfPages(file: File, pageNumbers: number[]) {
  const source = await loadPdf(file);
  const removedPages = new Set(pageNumbers);
  const keptPageIndices = source
    .getPageIndices()
    .filter((pageIndex) => !removedPages.has(pageIndex + 1));
  const output = await PDFDocument.create();
  const copiedPages = await output.copyPages(source, keptPageIndices);

  copiedPages.forEach((page) => output.addPage(page));

  return toPdfBlob(await output.save());
}

export async function reorderPdfPages(file: File, pageNumbers: number[]) {
  const source = await loadPdf(file);
  const sourcePageCount = source.getPageCount();
  const requestedIndices = Array.from(
    new Set(
      pageNumbers
        .map((pageNumber) => pageNumber - 1)
        .filter((pageIndex) => pageIndex >= 0 && pageIndex < sourcePageCount),
    ),
  );
  const remainingIndices = source
    .getPageIndices()
    .filter((pageIndex) => !requestedIndices.includes(pageIndex));
  const output = await PDFDocument.create();
  const copiedPages = await output.copyPages(source, [
    ...requestedIndices,
    ...remainingIndices,
  ]);

  copiedPages.forEach((page) => output.addPage(page));

  return toPdfBlob(await output.save());
}

export async function addPdfTextWatermark(file: File, options: PdfTextWatermarkOptions) {
  const document = await loadPdf(file);
  const font = await document.embedFont(StandardFonts.Helvetica);
  const color = parseRgbColor(options.color ?? "#dc2626");
  const opacity = options.opacity ?? 0.18;
  const rotation = options.rotation ?? 45;

  document.getPages().forEach((page) => {
    const { width, height } = page.getSize();
    const fontSize = options.fontSize ?? Math.max(26, Math.min(width, height) / 7);
    const textWidth = font.widthOfTextAtSize(options.text, fontSize);
    const textHeight = font.heightAtSize(fontSize);

    page.drawText(options.text, {
      x: (width - textWidth) / 2,
      y: (height - textHeight) / 2,
      size: fontSize,
      font,
      rotate: degrees(rotation),
      color,
      opacity,
    });
  });

  return toPdfBlob(await document.save());
}

export async function addPdfPageNumbers(file: File, options: PdfPageNumberOptions = {}) {
  const document = await loadPdf(file);
  const font = await document.embedFont(StandardFonts.Helvetica);
  const start = options.start ?? 1;
  const prefix = options.prefix ?? "";
  const fontSize = options.fontSize ?? 12;
  const position = options.position ?? "bottom-center";
  const color = parseRgbColor(options.color ?? "#111827");
  const opacity = options.opacity ?? 0.9;

  document.getPages().forEach((page, pageIndex) => {
    const label = `${prefix}${start + pageIndex}`;
    const { x, y } = getPageNumberPosition({
      page,
      font,
      label,
      fontSize,
      position,
    });

    page.drawText(label, {
      x,
      y,
      size: fontSize,
      font,
      color,
      opacity,
    });
  });

  return toPdfBlob(await document.save());
}

export async function extractPdfText(file: File | Blob) {
  const document = await loadPdfPreviewDocument(file);
  const pages: string[] = [];

  for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
    const page = await document.getPage(pageNumber);
    const content = await page.getTextContent();
    const text = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ")
      .trim();

    pages.push(text);
  }

  return pages.filter(Boolean).join("\n\n");
}

export async function cleanPdfMetadata(file: File | Blob) {
  const document = await PDFDocument.load(await file.arrayBuffer());

  document.setTitle("");
  document.setAuthor("");
  document.setSubject("");
  document.setProducer("");
  document.setCreator("");
  document.setKeywords([]);

  return toPdfBlob(await document.save());
}

export async function imagesToPdf(files: File[]) {
  const document = await PDFDocument.create();

  for (const file of files) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const image =
      file.type === "image/png" ? await document.embedPng(bytes) : await document.embedJpg(bytes);

    const page = document.addPage([image.width, image.height]);
    page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
  }

  return toPdfBlob(await document.save());
}

export async function pdfToImages(file: File, scale = 2) {
  const document = await loadPdfPreviewDocument(file);
  const images: Blob[] = [];

  for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
    const canvas = globalThis.document.createElement("canvas");
    await renderPdfPageToCanvas(document, pageNumber, canvas, scale);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((value) => {
        if (value) {
          resolve(value);
          return;
        }

        reject(new Error("Failed to create PNG blob."));
      }, "image/png");
    });

    images.push(blob);
  }

  return images;
}

export function parseSplitRanges(input: string) {
  return input
    .split(",")
    .map((range) => {
      const parts = range.trim().split("-").map(Number);
      const [start, end] = parts;

      if (Number.isNaN(start)) {
        return null;
      }

      if (parts.length === 1 || Number.isNaN(end)) {
        return [start, start] as [number, number];
      }

      return [start, end] as [number, number];
    })
    .filter((range): range is [number, number] => Boolean(range && range[0] > 0 && range[1] >= range[0]));
}

function parseRgbColor(color: string) {
  const normalized = color.replace("#", "");
  const hex = normalized.length === 3
    ? normalized
        .split("")
        .map((value) => value + value)
        .join("")
    : normalized.padEnd(6, "0").slice(0, 6);

  const red = Number.parseInt(hex.slice(0, 2), 16) / 255;
  const green = Number.parseInt(hex.slice(2, 4), 16) / 255;
  const blue = Number.parseInt(hex.slice(4, 6), 16) / 255;

  return rgb(red, green, blue);
}

function getPageNumberPosition({
  page,
  font,
  label,
  fontSize,
  position,
}: {
  page: PDFPage;
  font: PDFFont;
  label: string;
  fontSize: number;
  position: PdfPageNumberPosition;
}) {
  const margin = 24;
  const { width, height } = page.getSize();
  const textWidth = font.widthOfTextAtSize(label, fontSize);
  const textHeight = font.heightAtSize(fontSize);

  switch (position) {
    case "top-left":
      return { x: margin, y: height - textHeight - margin };
    case "top-center":
      return { x: (width - textWidth) / 2, y: height - textHeight - margin };
    case "top-right":
      return { x: width - textWidth - margin, y: height - textHeight - margin };
    case "bottom-left":
      return { x: margin, y: margin };
    case "bottom-right":
      return { x: width - textWidth - margin, y: margin };
    case "bottom-center":
    default:
      return { x: (width - textWidth) / 2, y: margin };
  }
}
