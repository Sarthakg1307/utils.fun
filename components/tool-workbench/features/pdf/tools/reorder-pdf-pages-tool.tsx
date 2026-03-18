"use client";

import { ArrowDown, ArrowUp, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Locale } from "@/lib/tools";

import { reorderPdfPages } from "../pdf-core";
import { loadPdfPreviewDocument, type PdfPreviewDocument } from "../pdf-preview";
import { PdfDropzone } from "../components/pdf-dropzone";
import { PdfResultPanel } from "../components/pdf-result-panel";
import { PdfThumbnail } from "../components/pdf-thumbnail";
import { moveItem, t } from "../tool-utils";

type ReorderPdfPagesToolProps = {
  locale: Locale;
};

export function ReorderPdfPagesTool({ locale }: ReorderPdfPagesToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [document, setDocument] = useState<PdfPreviewDocument | null>(null);
  const [pageOrder, setPageOrder] = useState<number[]>([]);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Blob | null>(null);

  useEffect(() => {
    if (!file) {
      setDocument(null);
      setPageOrder([]);
      setResult(null);
      return;
    }

    setDocument(null);

    let cancelled = false;
    void loadPdfPreviewDocument(file).then((value) => {
      if (!cancelled) {
        setDocument(value);
        setPageOrder(Array.from({ length: value.numPages }, (_, index) => index + 1));
      }
    });

    return () => {
      cancelled = true;
    };
  }, [file]);

  async function handleExport() {
    if (!file || pageOrder.length === 0) {
      return;
    }

    setBusy(true);
    try {
      setResult(await reorderPdfPages(file, pageOrder));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <PdfDropzone
        accept=".pdf,application/pdf"
        label={t(locale, "上传一个 PDF 文件", "Upload a PDF file")}
        hint={t(locale, "调整页面顺序后导出新的 PDF 文件", "Reorder the pages and export a new PDF")}
        onFiles={(files) => {
          setResult(null);
          setFile(files[0] ?? null);
        }}
      />

      <Card>
        <CardHeader>{t(locale, "调整页面顺序", "Reorder pages")}</CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t(locale, "使用上下按钮重新排列页面，顺序会直接用于导出。", "Use the up and down controls to change page order before export.")}
          </p>
          {document ? (
            <div className="space-y-3">
              {pageOrder.map((pageNumber, index) => (
                <div
                  key={`${pageNumber}-${index}`}
                  className="flex items-center gap-4 rounded-2xl border border-border/70 px-4 py-3"
                >
                  <div className="w-28 shrink-0">
                    <PdfThumbnail document={document} pageNumber={pageNumber} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">
                      {t(locale, "当前第", "Current")} {index + 1} {t(locale, "页", "slot")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t(locale, "原始第", "Original page")} {pageNumber}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setResult(null);
                        setPageOrder((current) => moveItem(current, index, -1));
                      }}
                    >
                      <ArrowUp className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setResult(null);
                        setPageOrder((current) => moveItem(current, index, 1));
                      }}
                    >
                      <ArrowDown className="size-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border/70 bg-muted/20 px-4 py-6 text-sm text-muted-foreground">
              {t(locale, "上传 PDF 后即可调整页面顺序。", "Upload a PDF to start reordering pages.")}
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={handleExport} disabled={busy || !file || pageOrder.length === 0}>
              {busy ? <LoaderCircle className="size-4 animate-spin" /> : null}
              {t(locale, "导出重排后的 PDF", "Export reordered PDF")}
            </Button>
          </div>
          {result ? (
            <PdfResultPanel
              locale={locale}
              title={t(locale, "重排结果已生成", "Reordered PDF is ready")}
              description={t(locale, "先翻页确认顺序是否符合预期，再决定导出方式。", "Flip through the reordered document first, then choose how you want to export it.")}
              results={[{ blob: result, filename: "reordered.pdf" }]}
            />
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
