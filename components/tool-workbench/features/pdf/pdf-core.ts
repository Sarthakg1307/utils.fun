import { PDFDocument, degrees } from "pdf-lib";

import { loadPdfPreviewDocument, renderPdfPageToCanvas } from "./pdf-preview";

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
