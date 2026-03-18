import { getDictionary } from "@/lib/i18n";
import type { Locale, Tool } from "@/lib/tools";

export type ToolWorkbenchProps = {
  tool: Tool;
  locale: Locale;
  dict: ReturnType<typeof getDictionary>;
};
