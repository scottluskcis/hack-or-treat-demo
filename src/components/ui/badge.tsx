import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-orange-300/30 bg-orange-300/10 px-2.5 py-1 text-xs font-semibold text-orange-100",
        className,
      )}
      {...props}
    />
  );
}
