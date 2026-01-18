"use client";

import { ViewWrapper } from "@/components/ViewWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Insights() {
  return (
    <ViewWrapper view="insights" className="p-4">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Insights</h1>
          <p className="text-muted-foreground mt-1">
            Analyze your spending patterns and trends
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                No data available yet
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                No data available yet
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              Start adding expenses to see insights
            </p>
          </CardContent>
        </Card>
      </div>
    </ViewWrapper>
  );
}
