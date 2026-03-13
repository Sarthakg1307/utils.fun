"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import type { Monaco } from "@monaco-editor/react";

import { cn } from "@/lib/utils";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

function configureMonaco(monaco: Monaco) {
  monaco.editor.defineTheme("utilsfun-light", {
    base: "vs",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#ffffff",
      "editor.foreground": "#11181c",
      "editor.lineHighlightBackground": "#f4f4f5",
      "editor.lineHighlightBorder": "#f4f4f5",
      "editor.selectionBackground": "#d4d4d8",
      "editor.inactiveSelectionBackground": "#e4e4e7",
      "editorIndentGuide.background1": "#e4e4e7",
      "editorIndentGuide.activeBackground1": "#a1a1aa",
      "editorLineNumber.foreground": "#94a3b8",
      "editorLineNumber.activeForeground": "#11181c",
    },
  });

  monaco.editor.defineTheme("utilsfun-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#09090b",
      "editor.foreground": "#f5f5f5",
      "editor.lineHighlightBackground": "#18181b",
      "editor.lineHighlightBorder": "#18181b",
      "editor.selectionBackground": "#3f3f46",
      "editor.inactiveSelectionBackground": "#27272a",
      "editorIndentGuide.background1": "#27272a",
      "editorIndentGuide.activeBackground1": "#52525b",
      "editorLineNumber.foreground": "#64748b",
      "editorLineNumber.activeForeground": "#f5f5f5",
    },
  });
}

type CodeEditorProps = {
  className?: string;
  height?: number;
  language: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  value: string;
};

export function CodeEditor({
  className,
  height = 360,
  language,
  onChange,
  readOnly = false,
  value,
}: CodeEditorProps) {
  const { resolvedTheme } = useTheme();
  const editorRef = useRef<{
    getValue: () => string;
    setValue: (value: string) => void;
  } | null>(null);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) {
      return;
    }

    if (editor.getValue() !== value) {
      editor.setValue(value);
    }
  }, [value]);

  return (
    <div
      className={cn("w-full overflow-hidden rounded-lg border border-border bg-background", className)}
      style={{ minHeight: height }}
    >
      <MonacoEditor
        beforeMount={configureMonaco}
        defaultValue={value}
        height={height}
        width="100%"
        language={language}
        loading={<div className="h-full min-h-40 bg-background" />}
        onMount={(editor) => {
          editorRef.current = editor;
          editor.layout();
        }}
        onChange={(next) => onChange?.(next ?? "")}
        options={{
          automaticLayout: true,
          fontSize: 13,
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
          lineNumbersMinChars: 3,
          minimap: { enabled: false },
          padding: { top: 16, bottom: 16 },
          readOnly,
          roundedSelection: true,
          scrollBeyondLastLine: false,
          scrollbar: {
            alwaysConsumeMouseWheel: false,
            horizontalScrollbarSize: 10,
            verticalScrollbarSize: 10,
          },
          tabSize: 2,
          wordWrap: "on",
        }}
        theme={resolvedTheme === "dark" ? "utilsfun-dark" : "utilsfun-light"}
      />
    </div>
  );
}
