import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import {
  PdfResultPanel,
  openBlobInNewTab,
} from "@/components/tool-workbench/features/pdf/components/pdf-result-panel";

describe("pdf result panel", () => {
  it("renders preview-first actions for a single pdf result", () => {
    const html = renderToStaticMarkup(
      <PdfResultPanel
        locale="cn"
        title="处理完成"
        results={[
          {
            blob: new Blob(["pdf"], { type: "application/pdf" }),
            filename: "result.pdf",
          },
        ]}
      />,
    );

    expect(html).toContain("实时预览");
    expect(html).toContain("新标签页打开");
    expect(html).toContain("下载结果");
  });

  it("opens blob results in a new tab with a generated object url", () => {
    const createObjectURL = vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:preview");
    const revokeObjectURL = vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => undefined);
    const open = vi.spyOn(window, "open").mockImplementation(() => null);

    openBlobInNewTab(new Blob(["pdf"], { type: "application/pdf" }));

    expect(createObjectURL).toHaveBeenCalledTimes(1);
    expect(open).toHaveBeenCalledWith("blob:preview", "_blank", "noopener,noreferrer");
    expect(revokeObjectURL).not.toHaveBeenCalled();
  });
});
