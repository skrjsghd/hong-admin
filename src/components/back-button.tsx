"use client";
import { useRouter } from "next/navigation";
import { Icon } from "./ui";

type BackButtonProps = {
  children: React.ReactNode;
};
function BackButton({ children }: BackButtonProps) {
  const router = useRouter();

  return (
    <button className="flex items-center gap-1" onClick={router.back}>
      <Icon name="ChevronLeftIcon" className="size-5 text-muted-foreground" />
      <span className="line-clamp-1 text-lg font-medium capitalize">
        {children}
      </span>
    </button>
  );
}

export { BackButton };
