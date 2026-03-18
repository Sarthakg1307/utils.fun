"use client";

import { LegacyProxyWorkbench } from "../legacy-proxy";
import type { ToolWorkbenchProps } from "../../types";

export default function DevWorkbench(props: ToolWorkbenchProps) {
  return <LegacyProxyWorkbench {...props} />;
}
