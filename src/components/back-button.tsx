"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/10"
      aria-label="Go back"
    >
      <ArrowLeft className="w-6 h-6" />
    </button>
  );
}
