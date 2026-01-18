"use client";

import * as React from "react";
import { ViewWrapper } from "@/components/ViewWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from "@/contexts/DataContext";

export function Home() {
  const {
    totalBalance,
    monthlyTotal,
    todayTotal,
    transactions,
    isLoadingAccounts,
  } = useData();

  // Format currency (you can make this configurable later)
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const recentTransactions = transactions.slice(0, 5);

  return (
    <ViewWrapper view="home" className="p-4">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Home</h1>
          <p className="text-muted-foreground mt-1">
            Welcome to Kitako - Your Privacy-First Expense Tracker
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Balance</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingAccounts ? (
                <p className="text-muted-foreground">Loading...</p>
              ) : (
                <p className="text-2xl font-semibold">
                  {formatCurrency(totalBalance)}
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">
                {formatCurrency(monthlyTotal)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Today</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">
                {formatCurrency(todayTotal)}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {recentTransactions.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No transactions yet. Start by adding your first expense!
              </p>
            ) : (
              <div className="space-y-2">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                  >
                    <div>
                      <p className="font-medium">
                        {transaction.name || transaction.type}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                    <p
                      className={`font-semibold ${
                        transaction.type === "expense"
                          ? "text-destructive"
                          : "text-primary"
                      }`}
                    >
                      {transaction.type === "expense" ? "-" : "+"}
                      {formatCurrency(Math.abs(transaction.amount))}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ViewWrapper>
  );
}
