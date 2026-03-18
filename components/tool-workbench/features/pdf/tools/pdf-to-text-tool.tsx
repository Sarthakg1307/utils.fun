"use client";

import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { Locale } from "@/lib/tools";

import { extractPdfText } from "../pdf-core";
import { loadPdfPreviewDocument, type PdfPreviewDocument } from "../pdf-preview";
import { PdfDropzone } from "../components/pdf-dropzone";
import { PdfPageGrid } from "../components/pdf-page-grid";
import { t } from "../tool-utils";

type PdfToTextToolProps = {
  locale: Locale;
};

export function PdfToTextTool({ locale }: PdfToTextToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [document, setDocument] = useState<PdfPreviewDocument | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    if (!file) {
      setDocument(null);
      setResult("");
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

  async function handleExtract() {
    if (!file) {
      return;
    }

    setBusy(true);
    try {
      setResult(await extractPdfText(file));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <PdfDropzone
        accept=".pdf,application/pdf"
        label={t(locale, "上传一个 PDF 文件", "Upload a PDF file")}
        hint={t(locale, "提取 PDF 内的可读文本，适合先浏览页面再导出文字。", "Extract readable text from a PDF after previewing the pages.")}
        onFiles={(files) => {
          setResult("");
          setFile(files[0] ?? null);
        }}
      />

      <Card>
        <CardHeader>{t(locale, "提取结果", "Extracted text")}</CardHeader>
        <CardContent className="space-y-4">
          {document ? (
            <PdfPageGrid document={document} pageCount={document.numPages} />
          ) : (
            <div className="rounded-xl border border-dashed border-border/70 bg-muted/20 px-4 py-6 text-sm text-muted-foreground">
              {t(locale, "上传 PDF 后可查看页面预览。", "Upload a PDF to preview the pages.")}
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={handleExtract} disabled={busy || !file}>
              {busy ? <LoaderCircle className="size-4 animate-spin" /> : null}
              {t(locale, "提取文本", "Extract text")}
            </Button>
          </div>
          <Textarea
            name="pdf-text-output"
            value={result}
            readOnly
            className="min-h-72 font-mono"
            placeholder={t(locale, "提取后的文字会显示在这里。", "Extracted text will appear here.")}
          />
        </CardContent>
      </Card>
    </div>
  );
}
