"use client";

import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import { Icon } from ".";

interface SelectContextProps {
  contextRef: HTMLDivElement | null;
  oepn: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}
const SelectContext = React.createContext<SelectContextProps>({
  contextRef: null,
  oepn: false,
  setOpen: () => {},
  selected: "",
  setSelected: () => {},
  placeholder: "",
});

interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
}
const Select: React.FC<SelectProps> = ({
  className,
  placeholder = "",
  ...props
}) => {
  const selectRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<string>("");

  React.useEffect(() => {
    const handleBlur = (e: MouseEvent) => {
      if (!selectRef.current) return;
      if (selectRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("click", handleBlur);
    return () => {
      document.removeEventListener("click", handleBlur);
    };
  }, []);

  return (
    <SelectContext.Provider
      value={{
        oepn: open,
        setOpen,
        selected,
        setSelected,
        placeholder,
        contextRef: selectRef.current,
      }}
    >
      <div
        ref={selectRef}
        className={cn("group", className)}
        data-state={open ? "open" : "closed"}
        data-value={selected}
        {...props}
      />
    </SelectContext.Provider>
  );
};

interface SelectTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {}
const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, onClick, ...props }, ref) => {
    const { setOpen, placeholder, selected } = React.useContext(SelectContext);

    return (
      <button
        ref={ref}
        className={cn(
          "flex h-10 w-[180px] select-none appearance-none items-center justify-between rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        onClick={(e) => {
          setOpen((prev) => !prev);
          if (onClick) onClick(e);
        }}
        {...props}
      >
        <span
          className={cn(selected ? "text-foreground" : "text-muted-foreground")}
        >
          {selected || placeholder}
        </span>
        <Icon name="ChevronDownIcon" className="pointer-events-none h-4 w-4" />
      </button>
    );
  },
);

interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {}
const SelectContent: React.FC<SelectContentProps> = ({
  className,
  ...props
}) => {
  const { placeholder, setSelected } = React.useContext(SelectContext);
  const contentRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = Array.from(contentRef.current?.children || []) as HTMLElement[];
    const init = els.find((el) => el.hasAttribute("data-value"));
    if (!placeholder && init) setSelected(init.dataset.value || "");
    return;
  }, []);

  return (
    <div
      ref={contentRef}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] translate-y-1 overflow-hidden rounded-md border bg-background p-1 text-foreground shadow-md group-data-[state=closed]:hidden",
        className,
      )}
      {...props}
    ></div>
  );
};

interface SelectOptionProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}
const SelectOption = React.forwardRef<HTMLDivElement, SelectOptionProps>(
  ({ className, children, value, onClick, ...props }, ref) => {
    const { selected, setSelected, setOpen } = React.useContext(SelectContext);
    return (
      <div
        ref={ref}
        data-value={value}
        className={cn(
          "relative flex w-full cursor-default select-none items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-muted focus:bg-muted focus:text-muted-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          className,
        )}
        onClick={(e) => {
          setSelected(value);
          setOpen(false);
          if (onClick) onClick(e);
        }}
        {...props}
      >
        {children}
        {selected === value && (
          <Icon name="CheckIcon" className="pointer-events-none h-4 w-4" />
        )}
      </div>
    );
  },
);

export { Select, SelectTrigger, SelectContent, SelectOption };
