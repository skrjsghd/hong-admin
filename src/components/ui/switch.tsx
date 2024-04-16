import * as React from "react";

import { cn } from "@/lib/utils";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ type, className, ...props }, ref) => (
    <div className="relative">
      <input
        ref={ref}
        type="checkbox"
        className={cn(
          "rounded-full peer inline-flex h-6 w-11 shrink-0 cursor-pointer appearance-none items-center border-2 border-transparent bg-border transition-colors checked:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
      <div
        className={cn(
          "rounded-full pointer-events-none absolute left-0.5 top-0.5 block h-5 w-5 bg-background shadow-lg ring-0 transition-transform peer-checked:translate-x-5",
        )}
      />
    </div>
  ),
);
Switch.displayName = "Switch";

export { Switch };
