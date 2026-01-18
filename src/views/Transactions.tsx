"use client";

import * as React from "react";
import { ViewWrapper } from "@/components/ViewWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useData } from "@/contexts/DataContext";
import { useView } from "@/contexts/ViewContext";

export function Transactions() {
  const {
    transactions,
    isLoadingTransactions,
    hasMoreTransactions,
    loadTransactions,
    loadMoreTransactions,
    totalTransactions,
  } = useData();
  const { currentView } = useView();

  // Load transactions when this view becomes active
  React.useEffect(() => {
    if (currentView === "transactions" && transactions.length === 0) {
      loadTransactions(1);
    }
  }, [currentView, transactions.length, loadTransactions]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <ViewWrapper view="transactions" className="p-4">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-muted-foreground mt-1">
            View all your expenses, income, and transfers
            {totalTransactions > 0 && (
              <span className="ml-2">({totalTransactions} total)</span>
            )}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingTransactions && transactions.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Loading transactions...
              </p>
            ) : transactions.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No transactions found. Start tracking your expenses!
              </p>
            ) : (
              <div className="space-y-2">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between py-3 border-b last:border-0"
                  >
                    <div className="flex-1">
                      <p className="font-medium">
                        {transaction.name || transaction.type}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                        {transaction.category && (
                          <span className="ml-2">• {transaction.category}</span>
                        )}
                      </p>
                    </div>
                    <p
                      className={`font-semibold ${
                        transaction.type === "expense"
                          ? "text-destructive"
                          : transaction.type === "gain"
                            ? "text-primary"
                            : "text-muted-foreground"
                      }`}
                    >
                      {transaction.type === "expense" ? "-" : "+"}
                      {formatCurrency(Math.abs(transaction.amount))}
                    </p>
                  </div>
                ))}

                {hasMoreTransactions && (
                  <div className="pt-4 text-center">
                    <Button
                      variant="outline"
                      onClick={loadMoreTransactions}
                      disabled={isLoadingTransactions}
                    >
                      {isLoadingTransactions
                        ? "Loading..."
                        : "Load More Transactions"}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ViewWrapper>
  );
}
