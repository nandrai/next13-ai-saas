"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { tools } from "@/constants";
import { InputFile } from "@/components/ui/input-file";

export default function HomePage() {
  const router = useRouter();

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Upload your Resume
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Get anonymous using the power of AI
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        <InputFile />
      </div>
    </div>
  );
}
