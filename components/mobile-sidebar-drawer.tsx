"use client";

import type * as React from "react";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export function MobileSidebarDrawer({
  title,
  triggerLabel,
  children,
}: {
  title: string;
  triggerLabel: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="size-8 shrink-0 rounded-lg lg:hidden sm:size-10"
        onClick={() => setOpen(true)}
        aria-label={triggerLabel}
      >
        <Menu className="size-3.5 sm:size-4" />
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="flex h-dvh w-[85vw] max-w-sm flex-col overflow-hidden p-0">
          <SheetHeader className="border-b px-4 py-3 sm:px-6 sm:py-4">
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
          <div
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onClick={(event) => {
              const target = event.target as HTMLElement;
              if (target.closest("a")) {
                setOpen(false);
              }
            }}
          >
            <div className="h-full px-4 py-4 sm:px-6">{children}</div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
