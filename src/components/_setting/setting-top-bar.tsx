"use client";

import { usePathname } from "next/navigation";

function SettingTopBar() {
  const pathname = usePathname();
  const lastPathname = pathname.split("/").findLast((path) => path);

  return (
    <div className="border-b py-2 text-center text-sm font-medium capitalize text-muted-foreground">
      {lastPathname}
    </div>
  );
}

export { SettingTopBar };
