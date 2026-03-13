"use client";

import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  buildPath,
  hasEnglishPath,
  persistLocaleCookie,
  stripEnglishPath,
} from "@/lib/locale";
import type { Locale } from "@/lib/tools";
import { cn } from "@/lib/utils";

export function LocaleToggle({
  locale,
  pathname,
  options,
  triggerClassName,
}: {
  locale: Locale;
  pathname: string;
  options: {
    label: string;
    zh: string;
    en: string;
  };
  triggerClassName?: string;
}) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const items = [
    { key: "zh", label: options.zh, icon: "twemoji:flag-china" },
    { key: "en", label: options.en, icon: "twemoji:flag-united-states" },
  ] as const;
  const current = items.find((item) => item.key === locale) ?? items[0];
  const trigger = (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={options.label}
      className={cn("size-8 sm:size-10", triggerClassName)}
    >
      <Icon icon={current.icon} className="size-4 sm:size-5" />
    </Button>
  );

  if (!mounted) {
    return trigger;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {items.map((item) => (
          <DropdownMenuItem
            key={item.key}
            className="gap-2"
            onClick={() => {
              const nextLocale = item.key as Locale;
              const normalizedPathname = stripEnglishPath(pathname);
              const nextPathname =
                nextLocale === "en"
                  ? hasEnglishPath(pathname)
                    ? pathname
                    : buildPath("/en", normalizedPathname)
                  : normalizedPathname;

              persistLocaleCookie(nextLocale);

              if (nextPathname === pathname) {
                router.refresh();
                return;
              }

              router.push(nextPathname);
            }}
          >
            <Icon icon={item.icon} className="size-5" />
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
