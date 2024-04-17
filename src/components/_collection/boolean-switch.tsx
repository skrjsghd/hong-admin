import * as React from "react";

import { cn } from "@/lib/utils";

interface BooleanSwitchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const BooleanSwitch = React.forwardRef<HTMLInputElement, BooleanSwitchProps>(
  ({ type, className, ...props }, ref) => (
    <div className="relative text-xs font-medium">
      <input
        ref={ref}
        type="checkbox"
        className={cn(
          "peer inline-flex h-6 w-[100px] shrink-0 cursor-pointer appearance-none items-center rounded-full border-2 border-transparent bg-border transition-colors checked:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
      <div
        className={cn(
          "pointer-events-none absolute left-0.5 top-0.5 flex h-5 w-12 items-center justify-center rounded-full bg-background shadow-lg ring-0 transition-transform before:[content:'FALSE'] peer-checked:translate-x-full peer-checked:before:[content:'TRUE']",
        )}
      ></div>
    </div>
  ),
);
BooleanSwitch.displayName = "BooleanSwitch";

export { BooleanSwitch };
