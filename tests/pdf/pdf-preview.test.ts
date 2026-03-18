import { describe, expect, it, vi } from "vitest";
import { PDFDocument } from "pdf-lib";

const getDocument = vi.fn(async () => ({
  numPages: 4,
}));

vi.mock("pdfjs-dist", () => ({
  GlobalWorkerOptions: { workerSrc: "" },
  getDocument: vi.fn(() => ({
    promise: getDocument(),
  })),
}));

import { getLocalPdfWorkerSrc, getPdfPageCount, loadPdfPreviewDocument } from "@/components/tool-workbench/features/pdf/pdf-preview";

async function createPdfFile(name: string, pageCount: number) {
  const doc = await PDFDocument.create();

  for (let index = 0; index < pageCount; index += 1) {
    doc.addPage([300, 400]);
  }

  return new File([await doc.save()], name, { type: "application/pdf" });
}

describe("pdf preview helpers", () => {
  it("uses a local worker source instead of a remote URL", () => {
    expect(getLocalPdfWorkerSrc()).toContain("pdf.worker.min.mjs");
    expect(getLocalPdfWorkerSrc()).not.toContain("unpkg.com");
  });

  it("loads a preview document through pdfjs", async () => {
    const file = await createPdfFile("preview.pdf", 2);
    const doc = await loadPdfPreviewDocument(file);

    expect(doc.numPages).toBe(4);
    expect(getDocument).toHaveBeenCalledTimes(1);
  });

  it("returns the preview page count", async () => {
    const file = await createPdfFile("count.pdf", 3);

    await expect(getPdfPageCount(file)).resolves.toBe(4);
  });
});
