"use client";

import { Button } from "@/components/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h2>Something went wrong!</h2>
      <Button onClick={reset} variant="secondary">
        Try again
      </Button>
    </div>
  );
}
