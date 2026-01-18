"use client";

import { ViewWrapper } from "@/components/ViewWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Settings() {
  return (
    <ViewWrapper view="settings" className="p-4">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your app preferences and data
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Manage your accounts (Savings, Credit Cards, E-Wallets)
            </p>
            <Button variant="outline">Manage Accounts</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Customize your expense categories
            </p>
            <Button variant="outline">Manage Categories</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-muted-foreground mb-2">
                Export or import your data
              </p>
              <div className="flex gap-2">
                <Button variant="outline">Export Data</Button>
                <Button variant="outline">Import Data</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Kitako v0.1.0 - Privacy-First Expense Tracker
            </p>
            <p className="text-muted-foreground mt-2 text-sm">
              All your data is stored locally in your browser. No servers, no
              cloud, complete privacy.
            </p>
          </CardContent>
        </Card>
      </div>
    </ViewWrapper>
  );
}
