import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React from "react";

const labelVariants = cva("flex gap-2", {
  variants: {
    side: {
      top: "flex-col",
      left: "flex-row",
      right: "flex-row-reverse",
    },
  },
  defaultVariants: {
    side: "top",
  },
});

const LABEL_SIDES = ["top", "left", "right"] as const;

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  title: string;
  description?: string;
  side?: (typeof LABEL_SIDES)[number];
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, title, description, side, ...props }, ref) => {
    return (
      <label
        className={cn(labelVariants({ side, className }))}
        ref={ref}
        {...props}
      >
        <div className="max-w-40 space-y-1 whitespace-pre-wrap leading-none">
          <div className="text-sm font-medium">{title}</div>
          {description && (
            <div className="text-sm text-muted-foreground">{description}</div>
          )}
        </div>
        {children}
      </label>
    );
  },
);
Label.displayName = "Label";

export { Label };
