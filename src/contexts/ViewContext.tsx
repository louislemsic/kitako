"use client";

import * as React from "react";

export type ViewType = "home" | "transactions" | "add" | "insights" | "settings";

interface ViewContextType {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  goToNextView: () => void;
  goToPreviousView: () => void;
}

const ViewContext = React.createContext<ViewContextType | undefined>(undefined);

const VIEW_ORDER: ViewType[] = ["home", "transactions", "add", "insights", "settings"];

export function ViewProvider({ children }: { children: React.ReactNode }) {
  const [currentView, setCurrentView] = React.useState<ViewType>("home");

  const goToNextView = React.useCallback(() => {
    const currentIndex = VIEW_ORDER.indexOf(currentView);
    if (currentIndex < VIEW_ORDER.length - 1) {
      setCurrentView(VIEW_ORDER[currentIndex + 1]);
    }
  }, [currentView]);

  const goToPreviousView = React.useCallback(() => {
    const currentIndex = VIEW_ORDER.indexOf(currentView);
    if (currentIndex > 0) {
      setCurrentView(VIEW_ORDER[currentIndex - 1]);
    }
  }, [currentView]);

  // Sync with URL hash for basic deep linking
  React.useEffect(() => {
    const hash = window.location.hash.slice(1) as ViewType;
    if (hash && VIEW_ORDER.includes(hash)) {
      setCurrentView(hash);
    }
  }, []);

  React.useEffect(() => {
    window.history.replaceState(null, "", `#${currentView}`);
  }, [currentView]);

  return (
    <ViewContext.Provider
      value={{
        currentView,
        setCurrentView,
        goToNextView,
        goToPreviousView,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  const context = React.useContext(ViewContext);
  if (context === undefined) {
    throw new Error("useView must be used within a ViewProvider");
  }
  return context;
}
