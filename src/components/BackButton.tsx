"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.back()}
      aria-label="Go back"
      className="size-10 bg-muted/20 hover:bg-muted/90"
    >
      <ArrowLeft className="size-7" />
    </Button>
  );
}
