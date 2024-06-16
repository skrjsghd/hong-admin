import { cn } from "@/lib/utils";
import { TableCell } from "../ui";

type TypedTableCellProps = {
  data: any;
};
function TypedTableCell({ data }: TypedTableCellProps) {
  const typeReplacer = () => {
    if (typeof data === "bigint") {
      return data.toString();
    }
    if (data instanceof Date) {
      return data.toISOString();
    }
    if (data === null) {
      return null;
    }
    return String(data);
  };
  const value = typeReplacer();

  return (
    <TableCell className={cn("text-nowrap", !value && "text-muted-foreground")}>
      <span className="line-clamp-1">
        {value === null ? "NULL" : value.slice(0, 100)}
      </span>
    </TableCell>
  );
}

export { TypedTableCell };
