"use client";

import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Locale } from "@/lib/tools";

import { addPdfTextWatermark } from "../pdf-core";
import { loadPdfPreviewDocument, type PdfPreviewDocument } from "../pdf-preview";
import { PdfDropzone } from "../components/pdf-dropzone";
import { PdfPageGrid } from "../components/pdf-page-grid";
import { PdfResultPanel } from "../components/pdf-result-panel";
import { t } from "../tool-utils";

type PdfWatermarkToolProps = {
  locale: Locale;
};

export function PdfWatermarkTool({ locale }: PdfWatermarkToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [document, setDocument] = useState<PdfPreviewDocument | null>(null);
  const [text, setText] = useState("For Internal Review");
  const [fontSize, setFontSize] = useState(48);
  const [opacity, setOpacity] = useState(18);
  const [rotation, setRotation] = useState(45);
  const [color, setColor] = useState("#dc2626");
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

  async function handleExport() {
    if (!file || !text.trim()) {
      return;
    }

    setBusy(true);
    try {
      setResult(
        await addPdfTextWatermark(file, {
          text: text.trim(),
          fontSize,
          opacity: opacity / 100,
          rotation,
          color,
        }),
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <PdfDropzone
        accept=".pdf,application/pdf"
        label={t(locale, "上传一个 PDF 文件", "Upload a PDF file")}
        hint={t(locale, "配置文字水印后导出新的 PDF 文件", "Configure a text watermark and export a new PDF")}
        onFiles={(files) => {
          setResult(null);
          setFile(files[0] ?? null);
        }}
      />

      <Card>
        <CardHeader>{t(locale, "水印文字", "Watermark text")}</CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span>{t(locale, "水印文字", "Watermark text")}</span>
              <Input name="watermark-text" value={text} onChange={(event) => {
                setResult(null);
                setText(event.target.value);
              }} />
            </label>
            <label className="space-y-2 text-sm">
              <span>{t(locale, "文字颜色", "Text color")}</span>
              <Input name="watermark-color" type="color" value={color} onChange={(event) => {
                setResult(null);
                setColor(event.target.value);
              }} />
            </label>
            <label className="space-y-2 text-sm">
              <span>{t(locale, "字号", "Font size")}</span>
              <Input name="watermark-font-size" type="number" min={12} max={120} value={fontSize} onChange={(event) => {
                setResult(null);
                setFontSize(Number(event.target.value) || 48);
              }} />
            </label>
            <label className="space-y-2 text-sm">
              <span>{t(locale, "透明度（%）", "Opacity (%)")}</span>
              <Input name="watermark-opacity" type="number" min={5} max={100} value={opacity} onChange={(event) => {
                setResult(null);
                setOpacity(Number(event.target.value) || 18);
              }} />
            </label>
            <label className="space-y-2 text-sm">
              <span>{t(locale, "旋转角度", "Rotation")}</span>
              <Input name="watermark-rotation" type="number" min={-180} max={180} value={rotation} onChange={(event) => {
                setResult(null);
                setRotation(Number(event.target.value) || 45);
              }} />
            </label>
          </div>
          {document ? (
            <PdfPageGrid document={document} pageCount={document.numPages} />
          ) : (
            <div className="rounded-xl border border-dashed border-border/70 bg-muted/20 px-4 py-6 text-sm text-muted-foreground">
              {t(locale, "上传 PDF 后可查看页面预览。", "Upload a PDF to preview the pages.")}
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={handleExport} disabled={busy || !file || !text.trim()}>
              {busy ? <LoaderCircle className="size-4 animate-spin" /> : null}
              {t(locale, "导出加水印的 PDF", "Export watermarked PDF")}
            </Button>
          </div>
          {result ? (
            <PdfResultPanel
              locale={locale}
              title={t(locale, "水印结果已生成", "Watermarked PDF is ready")}
              description={t(locale, "先看一眼水印密度和位置，再决定是否直接下载。", "Preview the watermark density and placement first, then decide whether to download it.")}
              results={[{ blob: result, filename: "watermarked.pdf" }]}
            />
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
