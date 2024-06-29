"use client";

import Typography from "@/components/custom/typography";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex gap-1 h-full flex-col items-center justify-center">
      <Typography variant={"subTItle"} className="text-center">
        {error.message ?? "Something went wrong"}
      </Typography>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </Button>
    </main>
  );
}
