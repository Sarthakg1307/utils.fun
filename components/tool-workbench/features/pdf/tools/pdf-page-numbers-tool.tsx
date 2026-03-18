"use client";

import { Download, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Locale } from "@/lib/tools";

import {
  addPdfPageNumbers,
  type PdfPageNumberPosition,
} from "../pdf-core";
import { loadPdfPreviewDocument, type PdfPreviewDocument } from "../pdf-preview";
import { PdfDropzone } from "../components/pdf-dropzone";
import { PdfPageGrid } from "../components/pdf-page-grid";
import { downloadBlob, t } from "../tool-utils";

type PdfPageNumbersToolProps = {
  locale: Locale;
};

const positionOptions: Array<{
  value: PdfPageNumberPosition;
  zh: string;
  en: string;
}> = [
  { value: "top-left", zh: "顶部左侧", en: "Top left" },
  { value: "top-center", zh: "顶部居中", en: "Top center" },
  { value: "top-right", zh: "顶部右侧", en: "Top right" },
  { value: "bottom-left", zh: "底部左侧", en: "Bottom left" },
  { value: "bottom-center", zh: "底部居中", en: "Bottom center" },
  { value: "bottom-right", zh: "底部右侧", en: "Bottom right" },
];

export function PdfPageNumbersTool({ locale }: PdfPageNumbersToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [document, setDocument] = useState<PdfPreviewDocument | null>(null);
  const [prefix, setPrefix] = useState("Pg ");
  const [start, setStart] = useState(1);
  const [fontSize, setFontSize] = useState(12);
  const [position, setPosition] = useState<PdfPageNumberPosition>("bottom-center");
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
    if (!file) {
      return;
    }

    setBusy(true);
    try {
      setResult(
        await addPdfPageNumbers(file, {
          prefix,
          start,
          fontSize,
          position,
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
        hint={t(locale, "配置页码样式后导出新的 PDF 文件", "Configure page-number settings and export a new PDF")}
        onFiles={(files) => {
          setResult(null);
          setFile(files[0] ?? null);
        }}
      />

      <Card>
        <CardHeader>{t(locale, "页码前缀", "Page-number prefix")}</CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span>{t(locale, "页码前缀", "Page-number prefix")}</span>
              <Input value={prefix} onChange={(event) => {
                setResult(null);
                setPrefix(event.target.value);
              }} />
            </label>
            <label className="space-y-2 text-sm">
              <span>{t(locale, "起始页码", "Start number")}</span>
              <Input type="number" min={1} value={start} onChange={(event) => {
                setResult(null);
                setStart(Number(event.target.value) || 1);
              }} />
            </label>
            <label className="space-y-2 text-sm">
              <span>{t(locale, "字号", "Font size")}</span>
              <Input type="number" min={8} max={48} value={fontSize} onChange={(event) => {
                setResult(null);
                setFontSize(Number(event.target.value) || 12);
              }} />
            </label>
            <label className="space-y-2 text-sm">
              <span>{t(locale, "显示位置", "Position")}</span>
              <Select value={position} onValueChange={(value) => {
                setResult(null);
                setPosition(value as PdfPageNumberPosition);
              }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {positionOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {t(locale, option.zh, option.en)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            <Button type="button" onClick={handleExport} disabled={busy || !file}>
              {busy ? <LoaderCircle className="size-4 animate-spin" /> : null}
              {t(locale, "导出带页码的 PDF", "Export numbered PDF")}
            </Button>
            {result ? (
              <Button type="button" variant="outline" onClick={() => downloadBlob(result, "page-numbers.pdf")}>
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
