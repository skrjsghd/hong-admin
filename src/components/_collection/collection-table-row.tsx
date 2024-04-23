"use client";

import { ColumnInformation } from "@/lib/types";
import { CollectionTableCell } from "./collection-table-cell";
import { Checkbox } from "../ui";
import { useCollectionStore } from "@/stores/collection-store-provider";
import { deepCompare } from "@/lib/utils";

interface CollectionTableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  data: Record<string, string>;
  columnInformation: ColumnInformation[];
}

function CollectionTableRow({
  data,
  columnInformation,
  ...props
}: CollectionTableRowProps) {
  const { selectedRowList, selectRow, unselectRow } = useCollectionStore(
    (state) => state,
  );

  const typeParser = (
    columnName: ColumnInformation["column_name"],
    typcategory: ColumnInformation["typcategory"],
  ) => {
    const value = data[columnName];
    if (typcategory === "D") {
      return new Date(value).toISOString().split(".")[0];
    }
    return value;
  };

  const row: Record<string, any> = Object.fromEntries(
    columnInformation.map((c) => [
      c.column_name,
      typeParser(c.column_name, c.typcategory),
    ]),
  );

  return (
    <tr className="cursor-pointer divide-x hover:bg-muted" {...props}>
      <td
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex items-center justify-center">
          <Checkbox
            checked={selectedRowList.some((r) => deepCompare(r, row))}
            onChange={(e) => {
              if (e.currentTarget.checked) {
                selectRow(row);
              } else {
                unselectRow(row);
              }
            }}
          />
        </div>
      </td>
      {Object.entries(row).map(([k, v]) => (
        <CollectionTableCell key={k} value={v} />
      ))}
    </tr>
  );
}

export { CollectionTableRow };
