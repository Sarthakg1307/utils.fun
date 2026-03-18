import { readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it, vi } from "vitest";
import { PDFDocument } from "pdf-lib";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

import {
  addPdfPageNumbers,
  addPdfTextWatermark,
  cleanPdfMetadata,
  extractPdfText,
  imagesToPdf,
  mergePdfs,
  parseSplitRanges,
  removePdfPages,
  reorderPdfPages,
  rotatePdf,
  splitPdf,
} from "@/components/tool-workbench/features/pdf/pdf-core";

vi.spyOn(console, "warn").mockImplementation(() => undefined);

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

async function getPageText(blob: Blob, pageNumber: number) {
  const loadingTask = getDocument({
    data: new Uint8Array(await blob.arrayBuffer()),
    disableWorker: true,
  });
  const document = await loadingTask.promise;
  const page = await document.getPage(pageNumber);
  const content = await page.getTextContent();

  return content.items
    .map((item) => ("str" in item ? item.str : ""))
    .join(" ");
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

  it("removes selected pages from a PDF", async () => {
    const source = await createPdfFile("source.pdf", 4);
    const output = await removePdfPages(source, [2, 4]);

    await expect(getPageCount(output)).resolves.toBe(2);
    await expect(getPageText(output, 1)).resolves.toContain("Page 1");
    await expect(getPageText(output, 2)).resolves.toContain("Page 3");
  });

  it("reorders PDF pages into the requested order", async () => {
    const source = await createPdfFile("source.pdf", 3);
    const output = await reorderPdfPages(source, [3, 1, 2]);

    await expect(getPageCount(output)).resolves.toBe(3);
    await expect(getPageText(output, 1)).resolves.toContain("Page 3");
    await expect(getPageText(output, 2)).resolves.toContain("Page 1");
    await expect(getPageText(output, 3)).resolves.toContain("Page 2");
  });

  it("adds a text watermark to every PDF page", async () => {
    const source = await createPdfFile("source.pdf", 2);
    const output = await addPdfTextWatermark(source, {
      text: "CONFIDENTIAL",
    });

    await expect(getPageCount(output)).resolves.toBe(2);
    await expect(getPageText(output, 1)).resolves.toContain("CONFIDENTIAL");
    await expect(getPageText(output, 2)).resolves.toContain("CONFIDENTIAL");
  });

  it("adds page numbers with a configurable prefix and start value", async () => {
    const source = await createPdfFile("source.pdf", 2);
    const output = await addPdfPageNumbers(source, {
      prefix: "Pg ",
      start: 3,
      position: "bottom-right",
    });

    await expect(getPageText(output, 1)).resolves.toContain("Pg 3");
    await expect(getPageText(output, 2)).resolves.toContain("Pg 4");
  });

  it("extracts readable text from all PDF pages", async () => {
    const source = await createPdfFile("source.pdf", 2);

    await expect(extractPdfText(source)).resolves.toContain("Page 1");
    await expect(extractPdfText(source)).resolves.toContain("Page 2");
  });

  it("cleans common metadata fields from a PDF", async () => {
    const doc = await PDFDocument.create();
    doc.addPage([300, 400]);
    doc.setTitle("Secret Plan");
    doc.setAuthor("Codex");
    doc.setSubject("Top Secret");
    const source = new File([await doc.save()], "metadata.pdf", { type: "application/pdf" });
    const output = await cleanPdfMetadata(source);
    const cleaned = await PDFDocument.load(await output.arrayBuffer());

    expect(cleaned.getTitle()).toBe("");
    expect(cleaned.getAuthor()).toBe("");
    expect(cleaned.getSubject()).toBe("");
  });
});
