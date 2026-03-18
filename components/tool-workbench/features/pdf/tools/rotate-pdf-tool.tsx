"use client";

import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Locale } from "@/lib/tools";

import { rotatePdf } from "../pdf-core";
import { loadPdfPreviewDocument, type PdfPreviewDocument } from "../pdf-preview";
import { PdfDropzone } from "../components/pdf-dropzone";
import { PdfPageGrid } from "../components/pdf-page-grid";
import { PdfResultPanel } from "../components/pdf-result-panel";
import { t } from "../tool-utils";

type RotatePdfToolProps = {
  locale: Locale;
};

export function RotatePdfTool({ locale }: RotatePdfToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [document, setDocument] = useState<PdfPreviewDocument | null>(null);
  const [rotations, setRotations] = useState<Record<number, number>>({});
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Blob | null>(null);

  useEffect(() => {
    if (!file) {
      setDocument(null);
      setRotations({});
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

  async function handleRotate() {
    if (!file) {
      return;
    }

    setBusy(true);
    try {
      setResult(await rotatePdf(file, rotations));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <PdfDropzone
        accept=".pdf,application/pdf"
        label={t(locale, "上传一个 PDF 文件", "Upload a PDF file")}
        hint={t(locale, "对每一页单独设置旋转角度", "Rotate pages individually and export one PDF")}
        onFiles={(files) => {
          setResult(null);
          setFile(files[0] ?? null);
        }}
      />

      {document ? (
        <Card>
          <CardHeader>{t(locale, "页面旋转", "Page rotation")}</CardHeader>
          <CardContent className="space-y-4">
            <PdfPageGrid
              document={document}
              pageCount={document.numPages}
              mode="rotate"
              pageRotations={rotations}
              onRotate={(pageIndex, delta) =>
                {
                  setResult(null);
                  setRotations((current) => ({
                    ...current,
                    [pageIndex]: (((current[pageIndex] ?? 0) + delta) % 360 + 360) % 360,
                  }));
                }
              }
            />
            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={handleRotate} disabled={busy}>
                {busy ? <LoaderCircle className="size-4 animate-spin" /> : null}
                {t(locale, "导出旋转后的 PDF", "Export rotated PDF")}
              </Button>
            </div>
            {result ? (
              <PdfResultPanel
                locale={locale}
                title={t(locale, "旋转结果已生成", "Rotated PDF is ready")}
                description={t(locale, "先在弹窗里翻页核对方向，再决定导出方式。", "Flip through the rotated pages in the preview before deciding how to export them.")}
                results={[{ blob: result, filename: "rotated.pdf" }]}
              />
            ) : null}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
