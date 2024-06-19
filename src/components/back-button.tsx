"use client";
import { useRouter } from "next/navigation";
import { Icon } from "./ui";
import { cn } from "@/lib/utils";

type BackButtonProps = {
  children: React.ReactNode;
  className?: string;
};
function BackButton({ children, className }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      className={cn("flex items-center gap-1", className)}
      onClick={router.back}
    >
      <Icon name="ChevronLeftIcon" className="size-5 text-muted-foreground" />
      <span className="line-clamp-1 text-lg font-medium capitalize">
        {children}
      </span>
    </button>
  );
}

export { BackButton };
