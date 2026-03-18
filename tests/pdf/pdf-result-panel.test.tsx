import { act } from "react";
import { createRoot } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/components/tool-workbench/features/pdf/pdf-preview", () => ({
  loadPdfPreviewDocument: vi.fn(async () => ({ numPages: 2 })),
  renderPdfPageToCanvas: vi.fn(async () => undefined),
}));

import {
  PdfResultPanel,
  openBlobInNewTab,
} from "@/components/tool-workbench/features/pdf/components/pdf-result-panel";
import {
  loadPdfPreviewDocument,
  renderPdfPageToCanvas,
} from "@/components/tool-workbench/features/pdf/pdf-preview";

afterEach(() => {
  document.body.innerHTML = "";
});

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

  it("finishes loading and renders the preview canvas after opening the dialog", async () => {
    const container = document.createElement("div");
    document.body.append(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(
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
    });

    const previewButton = Array.from(container.querySelectorAll("button")).find((element) =>
      element.textContent?.includes("实时预览"),
    );

    expect(previewButton).toBeTruthy();

    await act(async () => {
      previewButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(loadPdfPreviewDocument).toHaveBeenCalledTimes(1);
    expect(renderPdfPageToCanvas).toHaveBeenCalledTimes(1);
    expect(document.querySelector("canvas")).toBeTruthy();
    expect(document.querySelector(".animate-spin")).toBeNull();

    await act(async () => {
      root.unmount();
    });
  });

  it("keeps the preview dialog within the viewport and exposes an internal scroll region", async () => {
    const container = document.createElement("div");
    document.body.append(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(
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
    });

    const previewButton = Array.from(container.querySelectorAll("button")).find((element) =>
      element.textContent?.includes("实时预览"),
    );

    await act(async () => {
      previewButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await Promise.resolve();
      await Promise.resolve();
    });

    const dialog = document.querySelector("[role='dialog']");
    const scrollRegion = document.querySelector("[data-pdf-preview-body='true']");

    expect(dialog?.className).toContain("max-h-[calc(100dvh-2rem)]");
    expect(scrollRegion?.className).toContain("overflow-y-auto");
    expect(scrollRegion?.className).toContain("min-h-0");

    await act(async () => {
      root.unmount();
    });
  });
});
