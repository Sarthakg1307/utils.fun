"use client";

import { Upload } from "lucide-react";
import { useCallback, useRef, useState } from "react";

type PdfDropzoneProps = {
  accept: string;
  label: string;
  hint: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
};

export function PdfDropzone({
  accept,
  label,
  hint,
  multiple = false,
  onFiles,
}: PdfDropzoneProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const emitFiles = useCallback(
    (files: File[]) => {
      if (files.length) {
        onFiles(files);
      }
    },
    [onFiles],
  );

  return (
    <div
      className={[
        "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors",
        dragOver ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/50",
      ].join(" ")}
      onClick={() => inputRef.current?.click()}
      onDragOver={(event) => {
        event.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragOver(false);
        emitFiles(Array.from(event.dataTransfer.files));
      }}
      role="button"
      tabIndex={0}
    >
      <Upload className="mb-4 size-8 text-muted-foreground" />
      <div className="space-y-2">
        <p className="text-lg font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{hint}</p>
      </div>
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        name="pdf-upload"
        accept={accept}
        multiple={multiple}
        onChange={(event) => emitFiles(Array.from(event.target.files ?? []))}
      />
    </div>
  );
}
