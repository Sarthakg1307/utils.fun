"use client";

import { ToolWorkbench as LegacyToolWorkbench } from "../legacy";
import type { ToolWorkbenchProps } from "../types";

export function LegacyProxyWorkbench(props: ToolWorkbenchProps) {
  return <LegacyToolWorkbench {...props} />;
}
