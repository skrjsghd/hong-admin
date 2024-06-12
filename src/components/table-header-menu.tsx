import { cn } from "@/lib/utils";

type TableHeaderMenuProps = {} & React.HTMLAttributes<HTMLElement>;
function TableHeaderMenu({ className, ...props }: TableHeaderMenuProps) {
  return (
    <header
      className={cn("grid grid-cols-3 border-b px-6 py-3", className)}
      {...props}
    ></header>
  );
}

type TableHeaderMenuLeadingProps = {} & React.HTMLAttributes<HTMLUListElement>;
function TableHeaderMenuLeading({
  className,
  ...props
}: TableHeaderMenuLeadingProps) {
  return (
    <ul
      className={cn("order-1 flex items-center gap-4", className)}
      {...props}
    ></ul>
  );
}

type TableHeaderMenuTrailingProps = {} & React.HTMLAttributes<HTMLUListElement>;
function TableHeaderMenuTrailing({
  className,
  ...props
}: TableHeaderMenuTrailingProps) {
  return (
    <ul
      className={cn(
        "order-3 flex items-center justify-end gap-4 place-self-end",
        className,
      )}
      {...props}
    ></ul>
  );
}

type TableHeaderMenuTitleProps = {} & React.HTMLAttributes<HTMLHeadingElement>;
function TableHeaderMenuTitle({
  className,
  ...props
}: TableHeaderMenuTitleProps) {
  return (
    <h3
      className={cn(
        "order-2 flex items-center gap-1.5 place-self-center text-sm",
        className,
      )}
      {...props}
    ></h3>
  );
}

export {
  TableHeaderMenu,
  TableHeaderMenuLeading,
  TableHeaderMenuTrailing,
  TableHeaderMenuTitle,
};
