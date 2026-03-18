"use client";

import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Locale } from "@/lib/tools";

import { cleanPdfMetadata } from "../pdf-core";
import { loadPdfPreviewDocument, type PdfPreviewDocument } from "../pdf-preview";
import { PdfDropzone } from "../components/pdf-dropzone";
import { PdfPageGrid } from "../components/pdf-page-grid";
import { PdfResultPanel } from "../components/pdf-result-panel";
import { t } from "../tool-utils";

type PdfMetadataCleanToolProps = {
  locale: Locale;
};

export function PdfMetadataCleanTool({ locale }: PdfMetadataCleanToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [document, setDocument] = useState<PdfPreviewDocument | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Blob | null>(null);

  useEffect(() => {
    if (!file) {
      setDocument(null);
      setResult(null);
      return;
    }

    setDocument(null);

    let cancelled = false;
    void loadPdfPreviewDocument(file).then((value) => {
      if (!cancelled) {
        setDocument(value);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [file]);

  async function handleClean() {
    if (!file) {
      return;
    }

    setBusy(true);
    try {
      setResult(await cleanPdfMetadata(file));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <PdfDropzone
        accept=".pdf,application/pdf"
        label={t(locale, "上传一个 PDF 文件", "Upload a PDF file")}
        hint={t(locale, "清理常见文档元数据，并在导出前先预览结果。", "Clean common document metadata and preview the result before export.")}
        onFiles={(files) => {
          setResult(null);
          setFile(files[0] ?? null);
        }}
      />

      <Card>
        <CardHeader>{t(locale, "清理常见文档元数据", "Clean common document metadata")}</CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-2xl border border-border/70 bg-muted/20 px-4 py-4 text-sm text-muted-foreground">
            {t(
              locale,
              "当前会清理标题、作者、主题、创建者、生产者和关键词等常见字段。",
              "This pass clears common fields such as title, author, subject, creator, producer, and keywords.",
            )}
          </div>
          {document ? (
            <PdfPageGrid document={document} pageCount={document.numPages} />
          ) : (
            <div className="rounded-xl border border-dashed border-border/70 bg-muted/20 px-4 py-6 text-sm text-muted-foreground">
              {t(locale, "上传 PDF 后可查看页面预览。", "Upload a PDF to preview the pages.")}
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={handleClean} disabled={busy || !file}>
              {busy ? <LoaderCircle className="size-4 animate-spin" /> : null}
              {t(locale, "清理元数据", "Clean metadata")}
            </Button>
          </div>
          {result ? (
            <PdfResultPanel
              locale={locale}
              title={t(locale, "清理后的 PDF 已生成", "Cleaned PDF is ready")}
              description={t(locale, "先预览页面内容是否正常，再决定打开新标签页还是下载。", "Preview the cleaned document first, then choose whether to open it in a new tab or download it.")}
              results={[{ blob: result, filename: "metadata-clean.pdf" }]}
            />
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
