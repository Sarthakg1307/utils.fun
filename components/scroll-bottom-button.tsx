"use client";

import { ChevronsDown } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export function ScrollBottomButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      const distanceFromBottom = scrollHeight - viewportHeight - scrollTop;
      const hasOverflow = scrollHeight > viewportHeight + 160;

      setVisible(hasOverflow && scrollTop > 240 && distanceFromBottom > 240);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6">
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Scroll to bottom"
        title="Scroll to bottom"
        className="pointer-events-auto size-11 rounded-full shadow-lg backdrop-blur"
        onClick={() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }}
      >
        <ChevronsDown className="size-4" />
      </Button>
    </div>
  );
}
