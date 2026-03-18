type PdfJsModule = typeof import("pdfjs-dist");
export type PdfPreviewDocument = import("pdfjs-dist").PDFDocumentProxy;
export type PdfPreviewPage = import("pdfjs-dist").PDFPageProxy;

let pdfJsPromise: Promise<PdfJsModule> | null = null;

export function getLocalPdfWorkerSrc() {
  return new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
}

export async function getPdfJs() {
  if (!pdfJsPromise) {
    pdfJsPromise = import("pdfjs-dist").then((pdfJs) => {
      pdfJs.GlobalWorkerOptions.workerSrc = getLocalPdfWorkerSrc();

      return pdfJs;
    });
  }

  return pdfJsPromise;
}

export async function loadPdfPreviewDocument(file: Blob | File | ArrayBuffer) {
  const pdfJs = await getPdfJs();
  const data = file instanceof ArrayBuffer ? file : await file.arrayBuffer();

  return pdfJs.getDocument({ data }).promise;
}

export async function getPdfPageCount(file: Blob | File | ArrayBuffer) {
  const document = await loadPdfPreviewDocument(file);

  return document.numPages;
}

export async function renderPdfPageToCanvas(
  document: PdfPreviewDocument,
  pageNumber: number,
  canvas: HTMLCanvasElement,
  scale = 1,
  rotation = 0,
) {
  const page = await document.getPage(pageNumber);
  const viewport = page.getViewport({ scale, rotation });
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas 2D context is unavailable.");
  }

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  const renderTask = page.render({ canvasContext: context, viewport } as never);
  await ("promise" in renderTask ? renderTask.promise : renderTask);

  return {
    page,
    viewport,
  };
}
