import { auth } from "@/lib/auth";
import Link from "next/link";
import { Icon } from "./ui";

async function SideUserProfile() {
  const session = await auth();

  return (
    <div className="flex items-center px-6 py-4">
      <Link
        href="/setting"
        className="flex items-center gap-2 rounded-md transition-all"
      >
        <div className="size-10 rounded-full bg-muted"></div>
        <div className="font-medium">{session?.user?.name}</div>
        <Icon name="ChevronDownIcon" className="size-4 text-muted-foreground" />
      </Link>
    </div>
  );
}

export { SideUserProfile };
