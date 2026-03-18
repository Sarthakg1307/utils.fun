"use client";

import { Download, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Locale } from "@/lib/tools";

import { pdfToImages } from "../pdf-core";
import { loadPdfPreviewDocument, type PdfPreviewDocument } from "../pdf-preview";
import { PdfDropzone } from "../components/pdf-dropzone";
import { PdfPageGrid } from "../components/pdf-page-grid";
import { downloadBlob, downloadBlobsAsZip, t } from "../tool-utils";

type PdfToImagesToolProps = {
  locale: Locale;
};

export function PdfToImagesTool({ locale }: PdfToImagesToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [document, setDocument] = useState<PdfPreviewDocument | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Blob[] | null>(null);

  useEffect(() => {
    if (!file) {
      setDocument(null);
      setResult(null);
      return;
    }

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

  async function handleConvert() {
    if (!file) {
      return;
    }

    setBusy(true);
    try {
      setResult(await pdfToImages(file));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <PdfDropzone
        accept=".pdf,application/pdf"
        label={t(locale, "上传一个 PDF 文件", "Upload a PDF file")}
        hint={t(locale, "把每一页导出成 PNG 图片", "Export every page as a PNG image")}
        onFiles={(files) => {
          setResult(null);
          setFile(files[0] ?? null);
        }}
      />

      {document ? (
        <Card>
          <CardHeader>{t(locale, "页面预览", "Page preview")}</CardHeader>
          <CardContent className="space-y-4">
            <PdfPageGrid document={document} pageCount={document.numPages} />
            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={handleConvert} disabled={busy}>
                {busy ? <LoaderCircle className="size-4 animate-spin" /> : null}
                {t(locale, "导出图片", "Export images")}
              </Button>
              {result?.length === 1 ? (
                <Button type="button" variant="outline" onClick={() => downloadBlob(result[0], "page-1.png")}>
                  <Download className="size-4" />
                  {t(locale, "下载图片", "Download image")}
                </Button>
              ) : null}
              {result && result.length > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    downloadBlobsAsZip(result, (index) => `page-${index + 1}.png`, "pdf-images.zip")
                  }
                >
                  <Download className="size-4" />
                  {t(locale, "下载 ZIP", "Download ZIP")}
                </Button>
              ) : null}
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
