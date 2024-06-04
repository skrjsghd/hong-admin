"use client";

import Link from "next/link";
import { Icon, IconProps } from "../ui";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type SettingMenuLabelProps = {
  title: string;
  icon?: IconProps["name"];
  children: React.ReactNode;
};
function SettingMenuLabel({ title, icon, children }: SettingMenuLabelProps) {
  return (
    <div>
      <div className="flex items-center gap-1 font-medium text-muted-foreground">
        {icon && <Icon name={icon} className="size-5" />}
        <span>{title}</span>
      </div>
      <ul className="ml-5 mt-2 space-y-2">{children}</ul>
    </div>
  );
}

type SettingMenuItemProps = {
  href: string;
  children: React.ReactNode;
};
function SettingMenuItem({ href, children }: SettingMenuItemProps) {
  const pathname = usePathname();
  const isCurrent = href === pathname;
  return (
    <Link
      className={cn(
        "flex items-center gap-2 rounded-md px-1.5 py-1 capitalize hover:bg-muted",
        isCurrent && "bg-muted",
      )}
      href={href}
    >
      {children}
    </Link>
  );
}

export { SettingMenuLabel, SettingMenuItem };
