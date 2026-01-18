"use client";

import { ViewWrapper } from "@/components/ViewWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ArrowLeftRight } from "lucide-react";

export function Add() {
  return (
    <ViewWrapper view="add" className="p-4">
      <div className="mx-auto max-w-2xl space-y-4">
        <div>
          <h1 className="text-2xl font-bold">Add Transaction</h1>
          <p className="text-muted-foreground mt-1">
            Record a new expense, income, or transfer
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardHeader className="text-center">
              <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-destructive/10">
                <Minus className="size-6 text-destructive" />
              </div>
              <CardTitle className="text-base">Expense</CardTitle>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardHeader className="text-center">
              <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10">
                <Plus className="size-6 text-primary" />
              </div>
              <CardTitle className="text-base">Income</CardTitle>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardHeader className="text-center">
              <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-secondary/10">
                <ArrowLeftRight className="size-6 text-secondary-foreground" />
              </div>
              <CardTitle className="text-base">Transfer</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Add</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              Select a transaction type above to get started
            </p>
          </CardContent>
        </Card>
      </div>
    </ViewWrapper>
  );
}
