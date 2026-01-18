"use client";

import * as React from "react";
import { useView, type ViewType } from "@/contexts/ViewContext";
import { cn } from "@/lib/utils";

interface ViewContainerProps {
  children: React.ReactNode;
}

export function ViewContainer({ children }: ViewContainerProps) {
  const { currentView, setCurrentView, goToNextView, goToPreviousView } =
    useView();
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNextView();
    }
    if (isRightSwipe) {
      goToPreviousView();
    }
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPreviousView();
      } else if (e.key === "ArrowRight") {
        goToNextView();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextView, goToPreviousView]);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className={cn(
          "h-full w-full transition-transform duration-300 ease-in-out"
        )}
        style={{
          transform: `translateX(0)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
