"use client";

import { Home, List, Plus, TrendingUp, Settings } from "lucide-react";
import { useView, type ViewType } from "@/contexts/ViewContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS: Array<{
  id: ViewType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { id: "home", label: "Home", icon: Home },
  { id: "transactions", label: "Transactions", icon: List },
  { id: "add", label: "Add", icon: Plus },
  { id: "insights", label: "Insights", icon: TrendingUp },
  { id: "settings", label: "Settings", icon: Settings },
];

export function BottomNavBar() {
  const { currentView, setCurrentView } = useView();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
      aria-label="Bottom navigation"
    >
      <div className="mx-auto flex max-w-screen-lg items-center justify-around px-2 py-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <Button
              key={item.id}
              variant="ghost"
              size="icon"
              className={cn(
                "flex flex-col gap-1 h-auto py-2 px-4 min-w-0 flex-1",
                isActive && "text-primary"
              )}
              onClick={() => setCurrentView(item.id)}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className={cn(
                  "size-5",
                  isActive && "text-primary"
                )}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
