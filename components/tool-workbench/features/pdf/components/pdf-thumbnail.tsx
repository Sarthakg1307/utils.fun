"use client";

import { LoaderCircle, RotateCcw, RotateCw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { renderPdfPageToCanvas, type PdfPreviewDocument } from "../pdf-preview";

type PdfThumbnailProps = {
  document: PdfPreviewDocument;
  pageNumber: number;
  rotation?: number;
  highlight?: boolean;
  mode?: "view" | "rotate";
  onRotateLeft?: () => void;
  onRotateRight?: () => void;
};

export function PdfThumbnail({
  document,
  pageNumber,
  rotation = 0,
  highlight = false,
  mode = "view",
  onRotateLeft,
  onRotateRight,
}: PdfThumbnailProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [loadedSignature, setLoadedSignature] = useState<string | null>(null);
  const renderSignature = `${getPreviewDocumentId(document)}:${pageNumber}:${rotation}`;
  const loading = !visible || loadedSignature !== renderSignature;

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(root);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !canvasRef.current) {
      return;
    }

    let cancelled = false;

    void renderPdfPageToCanvas(document, pageNumber, canvasRef.current, 0.35, rotation)
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) {
          setLoadedSignature(renderSignature);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [document, pageNumber, renderSignature, rotation, visible]);

  return (
    <div ref={rootRef} className="space-y-2">
      <div
        className={[
          "relative overflow-hidden rounded-xl border bg-card",
          highlight ? "border-primary shadow-[0_0_0_1px_var(--color-primary)]" : "border-border/70",
        ].join(" ")}
      >
        {loading ? (
          <div className="flex aspect-[0.7] items-center justify-center bg-muted/30">
            <LoaderCircle className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : null}
        <canvas
          ref={canvasRef}
          className={loading ? "hidden" : "block h-auto w-full"}
        />
      </div>
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        {mode === "rotate" ? (
          <>
            <button
              type="button"
              onClick={onRotateLeft}
              className="rounded-md p-1 hover:bg-muted"
              aria-label={`Rotate page ${pageNumber} left`}
            >
              <RotateCcw className="size-4" />
            </button>
            <span>{pageNumber}</span>
            <button
              type="button"
              onClick={onRotateRight}
              className="rounded-md p-1 hover:bg-muted"
              aria-label={`Rotate page ${pageNumber} right`}
            >
              <RotateCw className="size-4" />
            </button>
          </>
        ) : (
          <span>{pageNumber}</span>
        )}
      </div>
    </div>
  );
}

const previewDocumentIds = new WeakMap<object, number>();
let nextPreviewDocumentId = 1;

function getPreviewDocumentId(document: PdfPreviewDocument) {
  const cachedId = previewDocumentIds.get(document as object);

  if (cachedId) {
    return cachedId;
  }

  const nextId = nextPreviewDocumentId;
  nextPreviewDocumentId += 1;
  previewDocumentIds.set(document as object, nextId);

  return nextId;
}
