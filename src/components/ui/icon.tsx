import * as Solid from "@heroicons/react/24/solid";
import * as Mini from "@heroicons/react/20/solid";
import * as Outline from "@heroicons/react/24/outline";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconVariants = cva("", {
  variants: {
    variant: {
      solid: "w-6 h-6",
      outline: "w-6 h-6",
      mini: "w-5 h-5",
    },
  },
});

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: keyof typeof Solid;
  variant?: "outline" | "solid" | "mini";
}

/**
 * @name Icon
 * @description It's a wrapper around the icons from Heroicons
 * @link https://heroicons.com/
 */
const Icon: React.FC<IconProps> = ({
  variant = "solid",
  name,
  className,
  ...props
}) => {
  const Component = variant === "solid" ? Solid[name] : Outline[name];
  const classes = cn(iconVariants({ variant, className }));
  if (variant === "mini") {
    const Comp = Mini[name];
    return <Comp className={classes} {...props} />;
  }

  return <Component className={classes} {...props} />;
};
Icon.displayName = "Icon";

export { Icon };
