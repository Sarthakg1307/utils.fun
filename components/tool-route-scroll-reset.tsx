"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function ToolRouteScrollReset() {
  const pathname = usePathname();
  const previousPathname = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) {
      return;
    }

    if (previousPathname.current && previousPathname.current !== pathname) {
      const frame = window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });

      previousPathname.current = pathname;
      return () => window.cancelAnimationFrame(frame);
    }

    previousPathname.current = pathname;
  }, [pathname]);

  return null;
}
