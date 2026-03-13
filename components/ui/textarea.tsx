"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type TextareaProps = React.ComponentProps<"textarea"> & {
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
};

function Textarea({
  className,
  isRequired,
  isInvalid,
  errorMessage: _errorMessage,
  required,
  "aria-invalid": ariaInvalid,
  ...props
}: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-24 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
      required={required ?? isRequired}
      aria-invalid={ariaInvalid ?? (isInvalid ? true : undefined)}
    />
  );
}

export { Textarea };
