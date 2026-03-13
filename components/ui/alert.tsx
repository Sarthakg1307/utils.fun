"use client";

import * as React from "react";
import { AlertCircle, CheckCircle2, TriangleAlert } from "lucide-react";

import { cn } from "@/lib/utils";

type AlertTone = "default" | "success" | "warning" | "danger";

const toneStyles: Record<AlertTone, { wrap: string; icon: React.ElementType }> = {
  default: {
    wrap: "border-border bg-card text-card-foreground",
    icon: AlertCircle,
  },
  success: {
    wrap: "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100",
    icon: CheckCircle2,
  },
  warning: {
    wrap: "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100",
    icon: TriangleAlert,
  },
  danger: {
    wrap: "border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950/40 dark:text-red-100",
    icon: AlertCircle,
  },
};

function Alert({
  className,
  tone = "default",
  title,
  description,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  tone?: AlertTone;
  title?: React.ReactNode;
  description?: React.ReactNode;
}) {
  const Icon = toneStyles[tone].icon;

  return (
    <div
      role="alert"
      className={cn("relative w-full rounded-lg border p-4", toneStyles[tone].wrap, className)}
      {...props}
    >
      <div className="flex gap-3">
        <Icon className="mt-0.5 size-4 shrink-0" />
        <div className="min-w-0 space-y-1">
          {title ? <div className="text-sm font-medium">{title}</div> : null}
          {description ? <div className="text-sm opacity-90">{description}</div> : null}
          {children}
        </div>
      </div>
    </div>
  );
}

export { Alert };
