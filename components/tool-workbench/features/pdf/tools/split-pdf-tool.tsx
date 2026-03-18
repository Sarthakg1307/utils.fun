"use client";

import { Download, LoaderCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Locale } from "@/lib/tools";

import { parseSplitRanges, splitPdf } from "../pdf-core";
import { loadPdfPreviewDocument, type PdfPreviewDocument } from "../pdf-preview";
import { PdfDropzone } from "../components/pdf-dropzone";
import { PdfPageGrid } from "../components/pdf-page-grid";
import { downloadBlob, downloadBlobsAsZip, t } from "../tool-utils";

type SplitPdfToolProps = {
  locale: Locale;
};

export function SplitPdfTool({ locale }: SplitPdfToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [document, setDocument] = useState<PdfPreviewDocument | null>(null);
  const [rangesInput, setRangesInput] = useState("1-2");
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

  const parsedRanges = useMemo(() => parseSplitRanges(rangesInput), [rangesInput]);
  const highlightedPages = useMemo(
    () =>
      new Set(
        parsedRanges.flatMap(([start, end]) =>
          Array.from({ length: end - start + 1 }, (_, index) => start + index),
        ),
      ),
    [parsedRanges],
  );

  async function handleSplit() {
    if (!file) {
      return;
    }

    setBusy(true);
    try {
      setResult(await splitPdf(file, parsedRanges));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <PdfDropzone
        accept=".pdf,application/pdf"
        label={t(locale, "上传一个 PDF 文件", "Upload a PDF file")}
        hint={t(locale, "输入页码范围后拆成多个文件", "Enter page ranges and split into multiple PDFs")}
        onFiles={(files) => {
          setResult(null);
          setFile(files[0] ?? null);
        }}
      />

      {document ? (
        <Card>
          <CardHeader>{t(locale, "拆分设置", "Split settings")}</CardHeader>
          <CardContent className="space-y-4">
            <Input
              value={rangesInput}
              onChange={(event) => setRangesInput(event.target.value)}
              placeholder="1-3, 5, 8-10"
            />
            <PdfPageGrid
              document={document}
              pageCount={document.numPages}
              highlightedPages={highlightedPages}
            />
            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={handleSplit} disabled={busy || parsedRanges.length === 0}>
                {busy ? <LoaderCircle className="size-4 animate-spin" /> : null}
                {t(locale, "拆分 PDF", "Split PDF")}
              </Button>
              {result?.length === 1 ? (
                <Button type="button" variant="outline" onClick={() => downloadBlob(result[0], "split-part-1.pdf")}>
                  <Download className="size-4" />
                  {t(locale, "下载结果", "Download result")}
                </Button>
              ) : null}
              {result && result.length > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    downloadBlobsAsZip(
                      result,
                      (index) => `split-part-${index + 1}.pdf`,
                      "split-pdf.zip",
                    )
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
