import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import PdfWorkbench from "@/components/tool-workbench/features/pdf";
import { getDictionary } from "@/lib/i18n";
import { getTool } from "@/lib/tools";

const renderCases = [
  ["remove-pdf-pages", "删除选中的页面"],
  ["reorder-pdf-pages", "调整页面顺序"],
  ["pdf-watermark", "水印文字"],
  ["pdf-page-numbers", "页码前缀"],
  ["pdf-to-text", "提取结果"],
  ["pdf-metadata-clean", "清理常见文档元数据"],
] as const;

describe("pdf workbench ui", () => {
  it.each(renderCases)("renders initial controls for %s", (slug, expectedText) => {
    const tool = getTool(slug);

    expect(tool).toBeDefined();

    const html = renderToStaticMarkup(
      <PdfWorkbench
        tool={tool!}
        locale="cn"
        dict={getDictionary("cn")}
      />,
    );

    expect(html).toContain(expectedText);
  });
});
