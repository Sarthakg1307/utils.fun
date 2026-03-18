"use client";

import { LegacyProxyWorkbench } from "../legacy-proxy";
import type { ToolWorkbenchProps } from "../../types";

export default function ConvertWorkbench(props: ToolWorkbenchProps) {
  return <LegacyProxyWorkbench {...props} />;
}
