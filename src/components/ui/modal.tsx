import { cn } from "@/lib/utils";
import { Icon } from ".";

type ModalProps = {
  show: boolean;
  onClose: () => void;
  hideCloseButton?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;
function Modal({
  show,
  children,
  onClose,
  hideCloseButton = false,
  className,
  ...props
}: ModalProps) {
  if (!show) return null;
  return (
    <div className="fixed left-0 top-0 z-[9999] h-svh w-screen">
      <div
        className={cn(
          "relative mx-auto h-full max-w-screen-sm bg-background",
          className,
        )}
        {...props}
      >
        {children}
        {!hideCloseButton && (
          <button className="absolute right-4 top-4 z-10" onClick={onClose}>
            <Icon name="XMarkIcon" className="h-6 w-6 text-muted-foreground" />
          </button>
        )}
      </div>
      <div
        className="absolute left-0 top-0 -z-10 h-full w-full bg-black/80"
        onClick={onClose}
      ></div>
    </div>
  );
}

export { Modal };
