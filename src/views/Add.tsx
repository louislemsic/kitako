"use client";

import * as React from "react";
import { ViewWrapper } from "@/components/ViewWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NumberKeypad } from "@/components/NumberKeypad";
import { AddCategoryModal } from "@/components/AddCategoryModal";
import { useData } from "@/contexts/DataContext";
import {
  Plus,
  UtensilsCrossed,
  Train,
  Coffee,
  ShoppingBag,
  Home,
  Car,
  Plane,
  Gamepad2,
  Music,
  Heart,
  Book,
  Briefcase,
  Gift,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { db } from "@/lib/db";

// Category icon mapping
const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Income: Plus,
  Dining: UtensilsCrossed,
  Transit: Train,
  Coffee: Coffee,
  Shopping: ShoppingBag,
  Home: Home,
  Car: Car,
  Plane: Plane,
  Game: Gamepad2,
  Music: Music,
  Heart: Heart,
  Book: Book,
  Briefcase: Briefcase,
  Gift: Gift,
  Zap: Zap,
  Plus: Plus,
};

// Helper to get icon component from icon name
function getIconFromName(iconName?: string): React.ComponentType<{ className?: string; style?: React.CSSProperties }> {
  if (!iconName) return Plus;
  return CATEGORY_ICONS[iconName] || Plus;
}

export function Add() {
  const { accounts, categories, addExpense, addGain, refreshCategories } = useData();
  const [amount, setAmount] = React.useState("0.00");
  const [selectedCategory, setSelectedCategory] = React.useState<number | null>(
    null
  );
  const [selectedAccount, setSelectedAccount] = React.useState<number | null>(
    null
  );
  const [selectedDate, setSelectedDate] = React.useState(
    new Date().toISOString().split("T")[0]
  );
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] =
    React.useState(false);

  // Format amount display
  const formatAmount = (value: string): string => {
    // Remove any non-numeric characters except decimal point
    let cleaned = value.replace(/[^\d.]/g, "");
    
    // Handle empty or zero
    if (cleaned === "" || cleaned === "0") {
      return "0.00";
    }
    
    // Handle decimal point
    if (cleaned.includes(".")) {
      const parts = cleaned.split(".");
      // Limit to 2 decimal places
      if (parts[1] && parts[1].length > 2) {
        cleaned = `${parts[0]}.${parts[1].slice(0, 2)}`;
      } else if (parts[1] && parts[1].length === 1) {
        // If only one decimal place, add 0
        cleaned = `${parts[0]}.${parts[1]}0`;
      } else if (parts[1] === "") {
        // If decimal point but no digits after, keep as is
        cleaned = cleaned;
      }
      return cleaned;
    }
    
    // If it's a whole number, return as is (user can add decimal)
    return cleaned;
  };

  const handleNumberPress = (value: string) => {
    setAmount((prev) => {
      const current = prev.replace(/[^\d.]/g, "");
      
      // If current is "0.00" or "0", replace it (but keep decimal structure if needed)
      if (current === "0" || current === "0.00") {
        // If we're adding a number after 0, replace 0
        return formatAmount(value);
      }
      
      // Check if we're at max length (prevent overflow)
      if (current.replace(".", "").length >= 10) {
        return prev;
      }
      
      // Append the number
      return formatAmount(current + value);
    });
  };

  const handleDecimalPress = () => {
    setAmount((prev) => {
      const current = prev.replace(/[^\d.]/g, "");
      if (!current.includes(".")) {
        return current + ".";
      }
      return prev;
    });
  };

  const handleBackspacePress = () => {
    setAmount((prev) => {
      const current = prev.replace(/[^\d.]/g, "");
      if (current.length <= 1) {
        return "0.00";
      }
      const newValue = current.slice(0, -1);
      return formatAmount(newValue);
    });
  };

  const handleAmountInputClick = () => {
    // Focus on a hidden input to trigger mobile keyboard
    const input = document.getElementById("amount-input-hidden");
    if (input) {
      input.focus();
    }
  };

  const handleSubmit = async () => {
    if (!selectedCategory || !selectedAccount || parseFloat(amount) <= 0) {
      return;
    }

    try {
      setIsSubmitting(true);
      const category = categories.find((c) => c.id === selectedCategory);
      const isIncome = category?.name === "Income";

      if (isIncome) {
        // Create a gain (income) transaction
        await addGain({
          account: selectedAccount,
          amount: parseFloat(amount),
          date: new Date(selectedDate),
        });
      } else {
        // Create an expense transaction
        await addExpense({
          name: category?.name || "Expense",
          amount: amount,
          category: category?.name || "",
          date: new Date(selectedDate),
          account: selectedAccount,
        });
      }

      // Reset form
      setAmount("0.00");
      setSelectedCategory(null);
      setSelectedAccount(null);
      setSelectedDate(new Date().toISOString().split("T")[0]);
    } catch (error) {
      console.error("Error adding transaction:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get preset categories (Income, Dining, Transit, Coffee)
  const presetCategories = categories.filter((cat) =>
    ["Income", "Dining", "Transit", "Coffee"].includes(cat.name)
  );

  // Separate Income from other presets for display
  const incomeCategory = categories.find((cat) => cat.name === "Income");
  const otherPresets = presetCategories.filter((cat) => cat.name !== "Income");

  return (
    <ViewWrapper view="add" className="p-4">
      <div className="mx-auto max-w-md space-y-6">
        {/* Title - smaller, centered at top */}
        <h1 className="text-lg font-medium text-center">Add Transaction</h1>

        {/* Amount Display - big, clickable */}
        <div className="text-center py-4">
          <button
            type="button"
            onClick={handleAmountInputClick}
            className="text-6xl font-semibold focus:outline-none hover:opacity-80 transition-opacity"
          >
            ${formatAmount(amount)}
          </button>
          {/* Hidden input for mobile keyboard */}
          <input
            id="amount-input-hidden"
            type="number"
            inputMode="decimal"
            step="0.01"
            value={parseFloat(amount) || 0}
            onChange={(e) => {
              const val = e.target.value;
              setAmount(val === "" ? "0.00" : formatAmount(val));
            }}
            className="absolute opacity-0 pointer-events-none w-0 h-0"
            tabIndex={-1}
            aria-hidden="true"
          />
        </div>

        {/* Number Keypad */}
        <NumberKeypad
          onNumberPress={handleNumberPress}
          onDecimalPress={handleDecimalPress}
          onBackspacePress={handleBackspacePress}
        />

        {/* Categories Section */}
        <div className="space-y-3">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">
            Categories
          </Label>
          <div className="flex items-start gap-3 overflow-x-auto pb-2">
            {/* Add New Category Button */}
            <button
              type="button"
              onClick={() => setIsAddCategoryModalOpen(true)}
              className="flex-shrink-0 flex flex-col items-center gap-1.5"
              aria-label="Add new category"
            >
              <div className="size-16 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center text-muted-foreground/50 hover:border-muted-foreground/50 hover:text-muted-foreground/70 transition-colors">
                <Plus className="size-6" />
              </div>
              <span className="text-xs font-medium text-center max-w-[64px] truncate">
                Add
              </span>
            </button>

          {/* Income Button */}
          {incomeCategory && (
            <button
              type="button"
              onClick={() => setSelectedCategory(incomeCategory.id!)}
              className="flex-shrink-0 flex flex-col items-center gap-1.5"
              aria-label="Income"
            >
              <div
                className={cn(
                  "size-16 rounded-full border-2 flex items-center justify-center transition-colors",
                  selectedCategory === incomeCategory.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                )}
                style={
                  selectedCategory === incomeCategory.id
                    ? { borderColor: incomeCategory.color }
                    : undefined
                }
              >
                <Plus
                  className="size-6"
                  style={{
                    color:
                      selectedCategory === incomeCategory.id
                        ? incomeCategory.color
                        : undefined,
                  }}
                />
              </div>
              <span className="text-xs font-medium text-center max-w-[64px] truncate">
                {incomeCategory.name}
              </span>
            </button>
          )}

          {/* Preset Category Buttons */}
          {otherPresets.map((category) => {
            const Icon = CATEGORY_ICONS[category.name] || Plus;
            const isSelected = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id!)}
                className="flex-shrink-0 flex flex-col items-center gap-1.5"
                aria-label={category.name}
              >
                <div
                  className={cn(
                    "size-16 rounded-full border-2 flex items-center justify-center transition-colors",
                    isSelected
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  )}
                  style={
                    isSelected
                      ? { borderColor: category.color }
                      : undefined
                  }
                >
                  <Icon
                    className="size-6"
                    style={{ color: isSelected ? category.color : undefined }}
                  />
                </div>
                <span className="text-xs font-medium text-center max-w-[64px] truncate">
                  {category.name}
                </span>
              </button>
            );
          })}

          {/* Other Categories (non-presets) */}
          {categories
            .filter(
              (cat) =>
                !["Income", "Dining", "Transit", "Coffee"].includes(cat.name)
            )
            .map((category) => {
              // Get icon from category.icon or fallback to name-based lookup
              const Icon = getIconFromName(category.icon) || CATEGORY_ICONS[category.name] || Plus;
              const isSelected = selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id!)}
                  className="flex-shrink-0 flex flex-col items-center gap-1.5"
                  aria-label={category.name}
                >
                  <div
                    className={cn(
                      "size-16 rounded-full border-2 flex items-center justify-center transition-colors",
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                    style={
                      isSelected
                        ? { borderColor: category.color }
                        : undefined
                    }
                  >
                    <Icon
                      className="size-6"
                      style={{
                        color: isSelected ? category.color : undefined,
                      }}
                    />
                  </div>
                  <span className="text-xs font-medium text-center max-w-[64px] truncate">
                    {category.name}
                  </span>
                </button>
              );
            })}
        </div>
        </div>

        {/* Date Input */}
        <div className="space-y-3">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">
            Date
          </Label>
          <Input
            id="date-input"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Account Selector */}
        <div className="space-y-3">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">
            Account
          </Label>
          <Select
            value={selectedAccount?.toString() || undefined}
            onValueChange={(value) => setSelectedAccount(parseInt(value))}
          >
            <SelectTrigger id="account-select" className="w-full">
              <SelectValue placeholder="Select an account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id!.toString()}>
                  {account.name} ({account.type})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={
            isSubmitting ||
            !selectedCategory ||
            !selectedAccount ||
            parseFloat(amount) <= 0
          }
          className="w-full"
          size="lg"
        >
          {isSubmitting
            ? "Adding..."
            : selectedCategory &&
                categories.find((c) => c.id === selectedCategory)?.name ===
                  "Income"
              ? "Add Income"
              : "Add Expense"}
        </Button>

        {/* Add Category Modal */}
        <AddCategoryModal
          open={isAddCategoryModalOpen}
          onOpenChange={setIsAddCategoryModalOpen}
          onCategoryAdded={refreshCategories}
        />
      </div>
    </ViewWrapper>
  );
}
