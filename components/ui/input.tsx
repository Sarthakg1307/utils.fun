"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input"> & {
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
};

function Input({
  className,
  type,
  isRequired,
  isInvalid,
  errorMessage: _errorMessage,
  required,
  "aria-invalid": ariaInvalid,
  ...props
}: InputProps) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(
        "flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
      required={required ?? isRequired}
      aria-invalid={ariaInvalid ?? (isInvalid ? true : undefined)}
    />
  );
}

export { Input };
