import { CollectionTableRow } from "./collection-table-row";
import { ColumnInformation } from "@/lib/types";

type CollectionTableProps = {
  columnInformation: ColumnInformation[];
  rows: Record<string, any>[];
};

function CollectionTable({ columnInformation, rows }: CollectionTableProps) {
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
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export { CollectionTable };
