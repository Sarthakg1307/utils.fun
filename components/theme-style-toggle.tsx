"use client";

import { Check, SwatchBook } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  applyThemeStyle,
  isThemeStyle,
  THEME_STYLES,
  THEME_STYLE_STORAGE_KEY,
  type ThemeStyle,
} from "@/lib/theme-style";
import {
  readClientThemePreference,
  persistThemeStyleCookie,
} from "@/lib/theme-preferences";
import { cn } from "@/lib/utils";

type ThemeStyleOptions = {
  label: string;
  brutalist: string;
  twitter: string;
  darkmatter: string;
  claude: string;
  v2: string;
  terminal: string;
  brownie: string;
  designbyte: string;
  vercel: string;
};

export function ThemeStyleToggle({
  options,
  triggerClassName,
}: {
  options: ThemeStyleOptions;
  triggerClassName?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [style, setStyle] = useState<ThemeStyle>("brutalist");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const { style: storedStyle } = readClientThemePreference();
      const nextStyle = isThemeStyle(storedStyle) ? storedStyle : "brutalist";

      applyThemeStyle(nextStyle);
      setStyle(nextStyle);
      setMounted(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const labels = useMemo(
    () => ({
      brutalist: options.brutalist,
      twitter: options.twitter,
      darkmatter: options.darkmatter,
      claude: options.claude,
      v2: options.v2,
      terminal: options.terminal,
      brownie: options.brownie,
      designbyte: options.designbyte,
      vercel: options.vercel,
    }),
    [
      options.brutalist,
      options.brownie,
      options.claude,
      options.darkmatter,
      options.designbyte,
      options.terminal,
      options.twitter,
      options.v2,
      options.vercel,
    ],
  );

  function onSelect(nextStyle: ThemeStyle) {
    setStyle(nextStyle);
    applyThemeStyle(nextStyle);
    window.localStorage.setItem(THEME_STYLE_STORAGE_KEY, nextStyle);
    persistThemeStyleCookie(nextStyle);
  }

  const trigger = (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={options.label}
      title={options.label}
      className={cn("size-8 sm:size-10", triggerClassName)}
    >
      <SwatchBook className="size-3.5 sm:size-4" />
    </Button>
  );

  if (!mounted) {
    return trigger;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        {THEME_STYLES.map((item) => (
          <DropdownMenuItem
            key={item}
            className="flex items-center justify-between gap-3"
            onClick={() => onSelect(item)}
          >
            <span>{labels[item]}</span>
            {style === item ? <Check className="size-4" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
