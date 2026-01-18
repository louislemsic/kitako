"use client";

import * as React from "react";
import { useView, type ViewType } from "@/contexts/ViewContext";
import { cn } from "@/lib/utils";

interface ViewWrapperProps {
  view: ViewType;
  children: React.ReactNode;
  className?: string;
}

export function ViewWrapper({ view, children, className }: ViewWrapperProps) {
  const { currentView } = useView();
  const isActive = currentView === view;

  if (!isActive) {
    return null;
  }

  return (
    <div
      className={cn(
        "h-full w-full overflow-y-auto pb-20",
        className
      )}
      data-view={view}
    >
      {children}
    </div>
  );
}
