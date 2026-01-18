"use client";

import { ViewProvider } from "@/contexts/ViewContext";
import { DataProvider } from "@/contexts/DataContext";
import { ViewContainer } from "@/components/ViewContainer";
import { BottomNavBar } from "@/components/BottomNavBar";
import { Home } from "@/views/Home";
import { Transactions } from "@/views/Transactions";
import { Add } from "@/views/Add";
import { Insights } from "@/views/Insights";
import { Settings } from "@/views/Settings";

export default function Page() {
  return (
    <DataProvider>
      <ViewProvider>
        <div className="flex h-screen flex-col overflow-hidden">
          <ViewContainer>
            <Home />
            <Transactions />
            <Add />
            <Insights />
            <Settings />
          </ViewContainer>
          <BottomNavBar />
        </div>
      </ViewProvider>
    </DataProvider>
  );
}
