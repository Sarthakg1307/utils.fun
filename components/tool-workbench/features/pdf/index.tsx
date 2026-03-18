"use client";

import type { ToolWorkbenchProps } from "../../types";
import { MergePdfTool } from "./tools/merge-pdf-tool";
import { SplitPdfTool } from "./tools/split-pdf-tool";
import { RotatePdfTool } from "./tools/rotate-pdf-tool";
import { PdfToImagesTool } from "./tools/pdf-to-images-tool";
import { ImagesToPdfTool } from "./tools/images-to-pdf-tool";

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
    default:
      return null;
  }
}
