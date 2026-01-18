"use client";

import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
import { cn } from "@/lib/utils";

interface NumberKeypadProps {
  onNumberPress: (value: string) => void;
  onDecimalPress: () => void;
  onBackspacePress: () => void;
  className?: string;
}

export function NumberKeypad({
  onNumberPress,
  onDecimalPress,
  onBackspacePress,
  className,
}: NumberKeypadProps) {
  const handleKeyPress = (value: string) => {
    if (value === ".") {
      onDecimalPress();
    } else if (value === "delete") {
      onBackspacePress();
    } else {
      onNumberPress(value);
    }
  };

  return (
    <div className={cn("grid grid-cols-3 gap-3", className)}>
      {/* Row 1: 1, 2, 3 */}
      <Button
        variant="outline"
        className="h-14 text-xl font-medium"
        onClick={() => handleKeyPress("1")}
      >
        1
      </Button>
      <Button
        variant="outline"
        className="h-14 text-xl font-medium"
        onClick={() => handleKeyPress("2")}
      >
        2
      </Button>
      <Button
        variant="outline"
        className="h-14 text-xl font-medium"
        onClick={() => handleKeyPress("3")}
      >
        3
      </Button>

      {/* Row 2: 4, 5, 6 */}
      <Button
        variant="outline"
        className="h-14 text-xl font-medium"
        onClick={() => handleKeyPress("4")}
      >
        4
      </Button>
      <Button
        variant="outline"
        className="h-14 text-xl font-medium"
        onClick={() => handleKeyPress("5")}
      >
        5
      </Button>
      <Button
        variant="outline"
        className="h-14 text-xl font-medium"
        onClick={() => handleKeyPress("6")}
      >
        6
      </Button>

      {/* Row 3: 7, 8, 9 */}
      <Button
        variant="outline"
        className="h-14 text-xl font-medium"
        onClick={() => handleKeyPress("7")}
      >
        7
      </Button>
      <Button
        variant="outline"
        className="h-14 text-xl font-medium"
        onClick={() => handleKeyPress("8")}
      >
        8
      </Button>
      <Button
        variant="outline"
        className="h-14 text-xl font-medium"
        onClick={() => handleKeyPress("9")}
      >
        9
      </Button>

      {/* Row 4: ., 0, backspace */}
      <Button
        variant="outline"
        className="h-14 text-xl font-medium"
        onClick={() => handleKeyPress(".")}
      >
        .
      </Button>
      <Button
        variant="outline"
        className="h-14 text-xl font-medium"
        onClick={() => handleKeyPress("0")}
      >
        0
      </Button>
      <Button
        variant="outline"
        className="h-14 text-xl font-medium"
        onClick={() => handleKeyPress("delete")}
      >
        <Delete className="size-5" />
      </Button>
    </div>
  );
}
