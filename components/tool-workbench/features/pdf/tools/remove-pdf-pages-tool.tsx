"use client";

import { Download, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Locale } from "@/lib/tools";

import { removePdfPages } from "../pdf-core";
import { loadPdfPreviewDocument, type PdfPreviewDocument } from "../pdf-preview";
import { PdfDropzone } from "../components/pdf-dropzone";
import { PdfPageGrid } from "../components/pdf-page-grid";
import { downloadBlob, t } from "../tool-utils";

type RemovePdfPagesToolProps = {
  locale: Locale;
};

export function RemovePdfPagesTool({ locale }: RemovePdfPagesToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [document, setDocument] = useState<PdfPreviewDocument | null>(null);
  const [removedPages, setRemovedPages] = useState<Set<number>>(new Set());
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Blob | null>(null);

  useEffect(() => {
    if (!file) {
      setDocument(null);
      setRemovedPages(new Set());
      setResult(null);
      return;
    }

    setDocument(null);

    let cancelled = false;
    void loadPdfPreviewDocument(file).then((value) => {
      if (!cancelled) {
        setDocument(value);
        setRemovedPages(new Set());
      }
    });

    return () => {
      cancelled = true;
    };
  }, [file]);

  async function handleExport() {
    if (!file || removedPages.size === 0) {
      return;
    }

    setBusy(true);
    try {
      setResult(await removePdfPages(file, Array.from(removedPages).sort((left, right) => left - right)));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <PdfDropzone
        accept=".pdf,application/pdf"
        label={t(locale, "上传一个 PDF 文件", "Upload a PDF file")}
        hint={t(locale, "选中需要删除的页面后导出新文件", "Select the pages you want to remove and export a new PDF")}
        onFiles={(files) => {
          setResult(null);
          setFile(files[0] ?? null);
        }}
      />

      <Card>
        <CardHeader>{t(locale, "删除选中的页面", "Remove selected pages")}</CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t(locale, "点按缩略图切换删除状态，已标亮的页面会在导出时移除。", "Click a thumbnail to mark it for removal. Highlighted pages will be dropped on export.")}
          </p>
          {document ? (
            <PdfPageGrid
              document={document}
              pageCount={document.numPages}
              mode="select"
              highlightedPages={removedPages}
              onSelect={(pageNumber) => {
                setResult(null);
                setRemovedPages((current) => {
                  const next = new Set(current);

                  if (next.has(pageNumber)) {
                    next.delete(pageNumber);
                  } else {
                    next.add(pageNumber);
                  }

                  return next;
                });
              }}
            />
          ) : (
            <div className="rounded-xl border border-dashed border-border/70 bg-muted/20 px-4 py-6 text-sm text-muted-foreground">
              {t(locale, "上传 PDF 后即可选择要删除的页面。", "Upload a PDF to choose the pages you want to remove.")}
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={handleExport} disabled={busy || !file || removedPages.size === 0}>
              {busy ? <LoaderCircle className="size-4 animate-spin" /> : null}
              {t(locale, "导出删页后的 PDF", "Export trimmed PDF")}
            </Button>
            {result ? (
              <Button type="button" variant="outline" onClick={() => downloadBlob(result, "trimmed.pdf")}>
                <Download className="size-4" />
                {t(locale, "下载结果", "Download result")}
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
