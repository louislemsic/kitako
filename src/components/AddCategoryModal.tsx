"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { db, type Category } from "@/lib/db";
import {
  BanknoteArrowDown,
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
  type LucideIcon,
} from "lucide-react";

// Available colors for categories
const AVAILABLE_COLORS = [
  "#ef4444", // red
  "#f59e0b", // amber
  "#eab308", // yellow
  "#22c55e", // green
  "#3b82f6", // blue
  "#6366f1", // indigo
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#f97316", // orange
  "#14b8a6", // teal
  "#06b6d4", // cyan
  "#a855f7", // purple
];

// Available icons for categories
const AVAILABLE_ICONS: Array<{
  name: string;
  icon: LucideIcon;
}> = [
  { name: "Income", icon: BanknoteArrowDown },
  { name: "Dining", icon: UtensilsCrossed },
  { name: "Transit", icon: Train },
  { name: "Coffee", icon: Coffee },
  { name: "Shopping", icon: ShoppingBag },
  { name: "Home", icon: Home },
  { name: "Car", icon: Car },
  { name: "Plane", icon: Plane },
  { name: "Game", icon: Gamepad2 },
  { name: "Music", icon: Music },
  { name: "Heart", icon: Heart },
  { name: "Book", icon: Book },
  { name: "Briefcase", icon: Briefcase },
  { name: "Gift", icon: Gift },
  { name: "Zap", icon: Zap },
];

interface AddCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCategoryAdded?: () => void;
}

export function AddCategoryModal({
  open,
  onOpenChange,
  onCategoryAdded,
}: AddCategoryModalProps) {
  const [categoryName, setCategoryName] = React.useState("");
  const [selectedColor, setSelectedColor] = React.useState<string>(
    AVAILABLE_COLORS[0]
  );
  const [selectedIcon, setSelectedIcon] = React.useState<LucideIcon | null>(
    AVAILABLE_ICONS[0].icon
  );
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async () => {
    if (!categoryName.trim() || !selectedIcon) {
      return;
    }

    try {
      setIsSubmitting(true);
      const iconName = AVAILABLE_ICONS.find((i) => i.icon === selectedIcon)?.name || "Plus";
      await db.categories.add({
        name: categoryName.trim(),
        color: selectedColor,
        icon: iconName,
      });

      // Reset form
      setCategoryName("");
      setSelectedColor(AVAILABLE_COLORS[0]);
      setSelectedIcon(AVAILABLE_ICONS[0].icon);
      onOpenChange(false);
      onCategoryAdded?.();
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onOpenChange(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Category</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="space-y-6 py-4">
          {/* Category Name Input */}
          <div className="space-y-2">
            <Label htmlFor="category-name">Label</Label>
            <Input
              id="category-name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              maxLength={20}
            />
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <Label>Color</Label>
            <div className="grid grid-cols-6 gap-3">
              {AVAILABLE_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "size-10 rounded-full border-2 transition-all",
                    selectedColor === color
                      ? "border-foreground scale-110"
                      : "border-border hover:border-foreground/50"
                  )}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Icon Selection */}
          <div className="space-y-3">
            <Label>Icon</Label>
            <div className="grid grid-cols-5 gap-3">
              {AVAILABLE_ICONS.map(({ name, icon: Icon }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setSelectedIcon(Icon)}
                  className={cn(
                    "size-12 rounded-full border-2 flex items-center justify-center transition-all",
                    selectedIcon === Icon
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  )}
                  aria-label={`Select ${name} icon`}
                >
                  <Icon
                    className={cn(
                      "size-5",
                      selectedIcon === Icon && "text-primary"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!categoryName.trim() || !selectedIcon || isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? "Adding..." : "Add"}
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
