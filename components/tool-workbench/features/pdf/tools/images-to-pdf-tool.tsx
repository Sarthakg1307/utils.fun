"use client";

import { ArrowDown, ArrowUp, LoaderCircle, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Locale } from "@/lib/tools";

import { imagesToPdf } from "../pdf-core";
import { PdfDropzone } from "../components/pdf-dropzone";
import { PdfResultPanel } from "../components/pdf-result-panel";
import { moveItem, t } from "../tool-utils";

type ImagesToPdfToolProps = {
  locale: Locale;
};

type ImageItem = {
  file: File;
  url: string;
};

export function ImagesToPdfTool({ locale }: ImagesToPdfToolProps) {
  const [items, setItems] = useState<ImageItem[]>([]);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Blob | null>(null);
  const itemsRef = useRef<ImageItem[]>([]);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    return () => {
      itemsRef.current.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, []);

  async function handleConvert() {
    if (items.length === 0) {
      return;
    }

    setBusy(true);
    try {
      setResult(await imagesToPdf(items.map((item) => item.file)));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <PdfDropzone
        accept="image/png,image/jpeg"
        multiple
        label={t(locale, "上传多张图片", "Upload multiple images")}
        hint={t(locale, "按顺序合并成一个 PDF 文件", "Arrange them in order and combine into one PDF")}
        onFiles={(files) => {
          setResult(null);
          setItems((current) => [
            ...current,
            ...files.map((file) => ({
              file,
              url: URL.createObjectURL(file),
            })),
          ]);
        }}
      />

      {items.length > 0 ? (
        <Card>
          <CardHeader>{t(locale, "图片顺序", "Image order")}</CardHeader>
          <CardContent className="space-y-3">
            {items.map((item, index) => (
              <div key={`${item.file.name}-${index}`} className="flex items-center gap-3 rounded-xl border border-border/70 px-4 py-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt={item.file.name} className="size-16 rounded-lg border border-border/70 object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{item.file.name}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setResult(null);
                      setItems((current) => moveItem(current, index, -1));
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
                      setItems((current) => moveItem(current, index, 1));
                    }}
                  >
                    <ArrowDown className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setResult(null);
                      setItems((current) => {
                        const item = current[index];

                        if (item) {
                          URL.revokeObjectURL(item.url);
                        }

                        return current.filter((_, itemIndex) => itemIndex !== index);
                      });
                    }}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={handleConvert} disabled={busy || items.length === 0}>
                {busy ? <LoaderCircle className="size-4 animate-spin" /> : null}
                {t(locale, "生成 PDF", "Create PDF")}
              </Button>
            </div>
            {result ? (
              <PdfResultPanel
                locale={locale}
                title={t(locale, "PDF 已生成", "Your PDF is ready")}
                description={t(locale, "先预览合成后的页面顺序，再决定下载或用新标签页继续查看。", "Preview the merged page order first, then download or keep reviewing it in a new tab.")}
                results={[{ blob: result, filename: "images.pdf" }]}
              />
            ) : null}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
