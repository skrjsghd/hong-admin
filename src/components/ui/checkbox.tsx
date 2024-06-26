import { cn } from "@/lib/utils";
import React from "react";
import { Icon } from ".";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative h-4 w-4 shrink-0 cursor-pointer">
        <input
          type="checkbox"
          className={cn(
            "peer h-full w-full cursor-pointer appearance-none rounded-sm border bg-background checked:border-primary checked:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
          ref={ref}
        />
        <div className="pointer-events-none absolute inset-x-0 left-0 top-0 hidden h-full items-center justify-center peer-checked:flex peer-checked:text-primary-foreground">
          <Icon name="CheckIcon" className="h-3 w-3" variant="outline" />
        </div>
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
