import { readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";
import { PDFDocument } from "pdf-lib";

import {
  imagesToPdf,
  mergePdfs,
  parseSplitRanges,
  rotatePdf,
  splitPdf,
} from "@/components/tool-workbench/features/pdf/pdf-core";

async function createPdfFile(name: string, pageCount: number) {
  const doc = await PDFDocument.create();

  for (let index = 0; index < pageCount; index += 1) {
    const page = doc.addPage([300, 400]);
    page.drawText(`Page ${index + 1}`, { x: 24, y: 360 });
  }

  return new File([await doc.save()], name, { type: "application/pdf" });
}

async function getPageCount(blob: Blob) {
  const bytes = await blob.arrayBuffer();
  const doc = await PDFDocument.load(bytes);

  return doc.getPageCount();
}

async function createImageFile(name: string) {
  const bytes = await readFile(path.join(process.cwd(), "public/logo.png"));

  return new File([bytes], name, { type: "image/png" });
}

describe("parseSplitRanges", () => {
  it("parses ranges and single pages", () => {
    expect(parseSplitRanges("1-3, 5, 8-10")).toEqual([
      [1, 3],
      [5, 5],
      [8, 10],
    ]);
  });

  it("drops invalid ranges", () => {
    expect(parseSplitRanges("0-3, 4-2, nope, 7")).toEqual([[7, 7]]);
  });
});

describe("pdf core", () => {
  it("merges multiple PDFs into a single blob", async () => {
    const output = await mergePdfs([
      await createPdfFile("first.pdf", 1),
      await createPdfFile("second.pdf", 2),
    ]);

    expect(output.type).toBe("application/pdf");
    await expect(getPageCount(output)).resolves.toBe(3);
  });

  it("splits a PDF into multiple blobs by range", async () => {
    const source = await createPdfFile("source.pdf", 5);
    const outputs = await splitPdf(source, [
      [1, 2],
      [3, 5],
    ]);

    expect(outputs).toHaveLength(2);
    await expect(getPageCount(outputs[0])).resolves.toBe(2);
    await expect(getPageCount(outputs[1])).resolves.toBe(3);
  });

  it("rotates selected PDF pages", async () => {
    const source = await createPdfFile("source.pdf", 2);
    const output = await rotatePdf(source, { 0: 90, 1: 180 });
    const doc = await PDFDocument.load(await output.arrayBuffer());
    const pages = doc.getPages();

    expect(pages[0]?.getRotation().angle).toBe(90);
    expect(pages[1]?.getRotation().angle).toBe(180);
  });

  it("converts images into a PDF blob", async () => {
    const output = await imagesToPdf([
      await createImageFile("first.png"),
      await createImageFile("second.png"),
    ]);

    expect(output.type).toBe("application/pdf");
    await expect(getPageCount(output)).resolves.toBe(2);
  });
});
