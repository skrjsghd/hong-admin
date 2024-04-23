"use client";

import { CollectionTableRow } from "./collection-table-row";
import { ColumnInformation } from "@/lib/types";
import { useCollectionStore } from "@/stores/collection-store-provider";

type CollectionTableProps = {
  columnInformation: ColumnInformation[];
  rows: Record<string, any>[];
};

function CollectionTable({ columnInformation, rows }: CollectionTableProps) {
  const { onClickRow } = useCollectionStore((state) => state);

  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full divide-y">
        <thead>
          <tr className="divide-x">
            <th></th>
            {columnInformation.map(({ column_name }) => {
              return <th key={column_name}>{column_name}</th>;
            })}
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.map((row) => {
            return (
              <CollectionTableRow
                key={crypto.randomUUID()}
                data={row}
                columnInformation={columnInformation}
                onClick={() => onClickRow(row)}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export { CollectionTable };
