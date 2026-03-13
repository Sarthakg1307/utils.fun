"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ToolRouteScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
