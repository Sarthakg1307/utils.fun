"use client";

import type { ToolWorkbenchProps } from "../../types";
import { MergePdfTool } from "./tools/merge-pdf-tool";
import { SplitPdfTool } from "./tools/split-pdf-tool";
import { RotatePdfTool } from "./tools/rotate-pdf-tool";
import { PdfToImagesTool } from "./tools/pdf-to-images-tool";
import { ImagesToPdfTool } from "./tools/images-to-pdf-tool";
import { RemovePdfPagesTool } from "./tools/remove-pdf-pages-tool";
import { ReorderPdfPagesTool } from "./tools/reorder-pdf-pages-tool";
import { PdfWatermarkTool } from "./tools/pdf-watermark-tool";
import { PdfPageNumbersTool } from "./tools/pdf-page-numbers-tool";
import { PdfToTextTool } from "./tools/pdf-to-text-tool";
import { PdfMetadataCleanTool } from "./tools/pdf-metadata-clean-tool";

export default function PdfWorkbench(props: ToolWorkbenchProps) {
  switch (props.tool.slug) {
    case "merge-pdf":
      return <MergePdfTool locale={props.locale} />;
    case "split-pdf":
      return <SplitPdfTool locale={props.locale} />;
    case "rotate-pdf":
      return <RotatePdfTool locale={props.locale} />;
    case "pdf-to-images":
      return <PdfToImagesTool locale={props.locale} />;
    case "images-to-pdf":
      return <ImagesToPdfTool locale={props.locale} />;
    case "remove-pdf-pages":
      return <RemovePdfPagesTool locale={props.locale} />;
    case "reorder-pdf-pages":
      return <ReorderPdfPagesTool locale={props.locale} />;
    case "pdf-watermark":
      return <PdfWatermarkTool locale={props.locale} />;
    case "pdf-page-numbers":
      return <PdfPageNumbersTool locale={props.locale} />;
    case "pdf-to-text":
      return <PdfToTextTool locale={props.locale} />;
    case "pdf-metadata-clean":
      return <PdfMetadataCleanTool locale={props.locale} />;
    default:
      return null;
  }
}
