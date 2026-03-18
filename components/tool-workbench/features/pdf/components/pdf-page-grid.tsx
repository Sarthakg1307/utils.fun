"use client";

import { PdfThumbnail } from "./pdf-thumbnail";
import type { PdfPreviewDocument } from "../pdf-preview";

type PdfPageGridProps = {
  document: PdfPreviewDocument;
  pageCount: number;
  mode?: "view" | "rotate";
  highlightedPages?: Set<number>;
  pageRotations?: Record<number, number>;
  onRotate?: (pageIndex: number, delta: number) => void;
};

export function PdfPageGrid({
  document,
  pageCount,
  mode = "view",
  highlightedPages,
  pageRotations,
  onRotate,
}: PdfPageGridProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(132px,1fr))] gap-4">
      {Array.from({ length: pageCount }, (_, pageIndex) => {
        const pageNumber = pageIndex + 1;
        const rotation = pageRotations?.[pageIndex] ?? 0;

        return (
          <PdfThumbnail
            key={pageNumber}
            document={document}
            pageNumber={pageNumber}
            rotation={rotation}
            highlight={highlightedPages?.has(pageNumber)}
            mode={mode}
            onRotateLeft={mode === "rotate" ? () => onRotate?.(pageIndex, -90) : undefined}
            onRotateRight={mode === "rotate" ? () => onRotate?.(pageIndex, 90) : undefined}
          />
        );
      })}
    </div>
  );
}
