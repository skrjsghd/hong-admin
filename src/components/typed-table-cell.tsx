import { TableCell } from "./ui";

type TypedTableCellProps = {
  data: any;
};
function TypedTableCell({ data }: TypedTableCellProps) {
  return <TableCell className="text-nowrap">{typeReplacer(data)}</TableCell>;
}

function typeReplacer(value: any) {
  if (typeof value === "bigint") {
    return value.toString();
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (value === null) {
    return <span className="text-muted-foreground opacity-50">NULL</span>;
  }
  return value;
}

export { TypedTableCell };
