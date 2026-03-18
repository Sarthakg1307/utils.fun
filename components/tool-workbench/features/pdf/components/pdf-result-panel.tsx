"use client";

import { ChevronLeft, ChevronRight, Download, ExternalLink, Eye, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Locale } from "@/lib/tools";

import { loadPdfPreviewDocument, renderPdfPageToCanvas, type PdfPreviewDocument } from "../pdf-preview";
import { downloadBlob, formatBytes, t } from "../tool-utils";

export type PdfResultItem = {
  blob: Blob;
  filename: string;
  label?: string;
};

type PdfResultPanelProps = {
  locale: Locale;
  title: string;
  description?: string;
  results: PdfResultItem[];
};

export function PdfResultPanel({
  locale,
  title,
  description,
  results,
}: PdfResultPanelProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [document, setDocument] = useState<PdfPreviewDocument | null>(null);
  const [loadedResultIndex, setLoadedResultIndex] = useState<number | null>(null);
  const [activePage, setActivePage] = useState(1);
  const [renderedPageKey, setRenderedPageKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const activeResult = results[activeIndex];

    if (!activeResult) {
      return;
    }

    let cancelled = false;

    void loadPdfPreviewDocument(activeResult.blob)
      .then((value) => {
        if (!cancelled) {
          setDocument(value);
          setLoadedResultIndex(activeIndex);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(
            t(
              locale,
              "暂时无法载入 PDF 预览，你仍然可以新标签页打开或下载。",
              "The PDF preview could not be loaded, but you can still open it in a new tab or download it.",
            ),
          );
        }
      })
      .finally(() => {
        return undefined;
      });

    return () => {
      cancelled = true;
    };
  }, [activeIndex, locale, open, results]);

  useEffect(() => {
    if (!open || !document || !canvasRef.current) {
      return;
    }

    let cancelled = false;
    const currentPageKey = `${activeIndex}:${activePage}`;

    void renderPdfPageToCanvas(document, activePage, canvasRef.current, 1.25)
      .catch(() => {
        if (!cancelled) {
          setError(
            t(
              locale,
              "这一页暂时无法渲染，你可以切页或改用新标签页查看。",
              "This page could not be rendered. You can switch pages or open the PDF in a new tab instead.",
            ),
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setRenderedPageKey(currentPageKey);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [activeIndex, activePage, document, locale, open]);

  const activeResult = results[activeIndex];
  const currentPageKey = `${activeIndex}:${activePage}`;
  const isDocumentReady = Boolean(document) && loadedResultIndex === activeIndex;
  const loading = open && !error && (!isDocumentReady || renderedPageKey !== currentPageKey);

  function openPreview(index: number) {
    setActiveIndex(index);
    setActivePage(1);
    setDocument(null);
    setLoadedResultIndex(null);
    setRenderedPageKey(null);
    setError(null);
    setOpen(true);
  }

  function movePage(delta: -1 | 1) {
    setRenderedPageKey(null);
    setError(null);
    setActivePage((current) => {
      const next = current + delta;

      if (!document) {
        return current;
      }

      return Math.min(Math.max(next, 1), document.numPages);
    });
  }

  return (
    <>
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description ? <CardDescription>{description}</CardDescription> : null}
        </CardHeader>
        <CardContent className="space-y-3">
          {results.map((result, index) => (
            <div
              key={`${result.filename}-${index}`}
              className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-background/90 px-4 py-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">{result.label ?? result.filename}</p>
                <p className="text-sm text-muted-foreground">
                  {result.filename} · {formatBytes(result.blob.size)}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => openPreview(index)}
                >
                  <Eye className="size-4" />
                  {t(locale, "实时预览", "Preview now")}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => openBlobInNewTab(result.blob)}
                >
                  <ExternalLink className="size-4" />
                  {t(locale, "新标签页打开", "Open in new tab")}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => downloadBlob(result.blob, result.filename)}
                >
                  <Download className="size-4" />
                  {t(locale, "下载结果", "Download result")}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[min(100%-2rem,72rem)] gap-0 overflow-hidden p-0">
          <DialogHeader className="border-b px-6 py-4">
            <DialogTitle>{activeResult?.label ?? activeResult?.filename ?? title}</DialogTitle>
            <DialogDescription>
              {t(
                locale,
                "预览模式不会自动下载文件，你可以先翻页确认，再决定导出。",
                "Preview mode lets you inspect the result first before downloading it.",
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{activeResult?.filename}</span>
                {document ? (
                  <span>
                    {activePage} / {document.numPages}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => movePage(-1)}
                  disabled={!document || activePage <= 1}
                >
                  <ChevronLeft className="size-4" />
                  {t(locale, "上一页", "Previous")}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => movePage(1)}
                  disabled={!document || activePage >= (document?.numPages ?? 1)}
                >
                  {t(locale, "下一页", "Next")}
                  <ChevronRight className="size-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => activeResult && openBlobInNewTab(activeResult.blob)}
                >
                  <ExternalLink className="size-4" />
                  {t(locale, "新标签页打开", "Open in new tab")}
                </Button>
              </div>
            </div>
            <div className="rounded-2xl border border-border/70 bg-muted/20 p-4">
              {loading ? (
                <div className="flex min-h-[28rem] items-center justify-center text-muted-foreground">
                  <LoaderCircle className="size-5 animate-spin" />
                </div>
              ) : error ? (
                <div className="flex min-h-[20rem] items-center justify-center text-center text-sm text-muted-foreground">
                  {error}
                </div>
              ) : (
                <div className="overflow-auto">
                  <canvas ref={canvasRef} className="mx-auto block h-auto max-w-full rounded-lg bg-white shadow-sm" />
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function openBlobInNewTab(blob: Blob) {
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank", "noopener,noreferrer");
  window.setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 60_000);

  return url;
}
