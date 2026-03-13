"use client";

import { Monitor, MoonStar, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle({
  options,
  triggerClassName,
}: {
  options: {
    label: string;
    system: string;
    light: string;
    dark: string;
  };
  triggerClassName?: string;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const currentTheme = mounted ? theme ?? "system" : "system";
  const CurrentIcon =
    currentTheme === "light"
      ? SunMedium
      : currentTheme === "dark"
        ? MoonStar
        : Monitor;
  const items = [
    { key: "system", label: options.system, icon: <Monitor className="size-5" /> },
    { key: "light", label: options.light, icon: <SunMedium className="size-5" /> },
    { key: "dark", label: options.dark, icon: <MoonStar className="size-5" /> },
  ] as const;
  const trigger = (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={options.label}
      className={cn("size-8 sm:size-10", triggerClassName)}
    >
      <CurrentIcon className="size-3.5 sm:size-4" />
    </Button>
  );

  if (!mounted) {
    return trigger;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        {items.map((item) => (
          <DropdownMenuItem
            key={item.key}
            className="gap-2"
            onClick={() => setTheme(item.key)}
          >
            {item.icon}
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
