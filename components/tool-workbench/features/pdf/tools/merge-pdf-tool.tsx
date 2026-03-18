"use client";

import { ArrowDown, ArrowUp, LoaderCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Locale } from "@/lib/tools";

import { mergePdfs } from "../pdf-core";
import { getPdfPageCount } from "../pdf-preview";
import { PdfDropzone } from "../components/pdf-dropzone";
import { PdfResultPanel } from "../components/pdf-result-panel";
import { formatBytes, moveItem, t } from "../tool-utils";

type MergePdfToolProps = {
  locale: Locale;
};

type MergeItem = {
  file: File;
  pageCount: number | null;
};

export function MergePdfTool({ locale }: MergePdfToolProps) {
  const [items, setItems] = useState<MergeItem[]>([]);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Blob | null>(null);

  useEffect(() => {
    const pendingItems = items.filter((item) => item.pageCount === null);

    if (pendingItems.length === 0) {
      return;
    }

    let cancelled = false;

    void Promise.all(
      pendingItems.map(async (item) => ({
        key: getMergeItemKey(item.file),
        pageCount: await getPdfPageCount(item.file),
      })),
    ).then((resolvedPageCounts) => {
      if (cancelled) {
        return;
      }

      const pageCountByKey = new Map(
        resolvedPageCounts.map((entry) => [entry.key, entry.pageCount]),
      );

      setItems((current) => {
        let changed = false;

        const nextItems = current.map((item) => {
          if (item.pageCount !== null) {
            return item;
          }

          const pageCount = pageCountByKey.get(getMergeItemKey(item.file));

          if (pageCount === undefined) {
            return item;
          }

          changed = true;

          return {
            ...item,
            pageCount,
          };
        });

        return changed ? nextItems : current;
      });
    });

    return () => {
      cancelled = true;
    };
  }, [items]);

  async function handleMerge() {
    if (items.length < 2) {
      return;
    }

    setBusy(true);
    try {
      setResult(await mergePdfs(items.map((item) => item.file)));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <PdfDropzone
        accept=".pdf,application/pdf"
        multiple
        label={t(locale, "上传多个 PDF 文件", "Upload multiple PDF files")}
        hint={t(locale, "支持拖拽排序后合并为一个文件", "Reorder the files and merge them into one PDF")}
        onFiles={(files) => {
          setResult(null);
          setItems((current) => [
            ...current,
            ...files.map((file) => ({
              file,
              pageCount: null,
            })),
          ]);
        }}
      />

      {items.length > 0 ? (
        <Card>
          <CardHeader>{t(locale, "合并顺序", "Merge order")}</CardHeader>
          <CardContent className="space-y-3">
            {items.map((item, index) => (
              <div key={`${item.file.name}-${index}`} className="flex items-center gap-3 rounded-xl border border-border/70 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{item.file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatBytes(item.file.size)}
                    {item.pageCount ? ` · ${item.pageCount} ${t(locale, "页", "pages")}` : ""}
                  </p>
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
                      setItems((current) =>
                        current.filter((_, itemIndex) => itemIndex !== index),
                      );
                    }}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={handleMerge} disabled={busy || items.length < 2}>
                {busy ? <LoaderCircle className="size-4 animate-spin" /> : null}
                {t(locale, "合并 PDF", "Merge PDF")}
              </Button>
            </div>
            {result ? (
              <PdfResultPanel
                locale={locale}
                title={t(locale, "合并结果已生成", "Merged PDF is ready")}
                description={t(locale, "你可以先预览合并后的文档，再决定打开新标签页还是下载。", "Preview the merged document first, then choose whether to open it in a new tab or download it.")}
                results={[{ blob: result, filename: "merged.pdf" }]}
              />
            ) : null}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

function getMergeItemKey(file: File) {
  return `${file.name}:${file.size}:${file.lastModified}`;
}
