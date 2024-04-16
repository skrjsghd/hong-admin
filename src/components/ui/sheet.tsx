"use client";

import { cn } from "@/lib/utils";
import React, { useEffect } from "react";

interface SheetContextValue {
  sheetRef: React.RefObject<HTMLDialogElement> | null;
  onOpenChange?: (isOpen: boolean) => void;
}
const SheetContext = React.createContext<SheetContextValue>({
  sheetRef: null,
  onOpenChange: () => {},
});

interface SheetProps {
  children?: React.ReactNode;
  open: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}
const Sheet: React.FC<SheetProps> = ({
  children,
  open = false,
  onOpenChange,
}) => {
  const sheetRef = React.useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!open) {
      sheetRef.current?.close();
    }
    sheetRef.current?.addEventListener("close", () => {
      onOpenChange?.(false);
    });
    return () => {
      sheetRef.current?.removeEventListener("close", () => {
        onOpenChange?.(false);
      });
    };
  }, [open]);

  return (
    <SheetContext.Provider
      value={{
        sheetRef,
        onOpenChange,
      }}
    >
      <React.Fragment>{children}</React.Fragment>
    </SheetContext.Provider>
  );
};

interface SheetTriggerProps extends React.HTMLAttributes<HTMLDivElement> {}
const SheetTrigger: React.FC<SheetTriggerProps> = ({ children, ...props }) => {
  const { sheetRef, onOpenChange } = React.useContext(SheetContext);
  const handleOpen = () => {
    if (!sheetRef?.current) return;
    sheetRef.current?.showModal();
    onOpenChange?.(true);
  };
  return (
    <div onClick={handleOpen} {...props}>
      {children}
    </div>
  );
};

interface SheetContentProps
  extends React.DialogHTMLAttributes<HTMLDialogElement> {}
const SheetContent: React.FC<SheetContentProps> = ({ className, ...props }) => {
  const { sheetRef } = React.useContext(SheetContext);
  return (
    <dialog
      ref={sheetRef}
      className={cn(
        "m-0 ml-auto h-dvh max-h-none w-full max-w-md justify-end bg-white p-4 backdrop:bg-black/80 open:animate-slideIn",
        className,
      )}
      {...props}
    ></dialog>
  );
};

interface SheetCloseProps extends React.FormHTMLAttributes<HTMLFormElement> {}
const SheetClose = React.forwardRef<HTMLFormElement, SheetCloseProps>(
  ({ method, ...props }, ref) => {
    return <form ref={ref} method="dialog" {...props} />;
  },
);

export { Sheet, SheetTrigger, SheetContent, SheetClose };
