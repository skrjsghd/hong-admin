import { twMerge } from "tailwind-merge";

type DrawerProps = {
  isOpen: boolean;
  onClickBackdrop?: () => void;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

function Drawer({
  isOpen,
  onClickBackdrop,
  className,
  children,
  ...props
}: DrawerProps) {
  if (!isOpen) return null;
  return (
    <div
      {...props}
      className={twMerge(
        "fixed left-0 top-0 flex h-dvh w-dvw flex-row-reverse",
        className,
      )}
    >
      <div className="flex h-full w-1/3 flex-col justify-between bg-white p-6">
        {children}
      </div>
      <div
        className="absolute left-0 top-0 -z-10 h-full w-full bg-black/80"
        onClick={onClickBackdrop}
      ></div>
    </div>
  );
}

function DrawerBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={twMerge("flex flex-col gap-6", className)}></div>
  );
}

function DrawerFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={twMerge("flex items-center justify-end gap-6", className)}
    ></div>
  );
}
export { Drawer, DrawerBody, DrawerFooter };
