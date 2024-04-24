import { CollectionTableRow } from "./collection-table-row";
import { ColumnInformation } from "@/lib/types";

type CollectionTableProps = {
  columnInformation: ColumnInformation[];
  rows: Record<string, any>[];
};

function CollectionTable({ columnInformation, rows }: CollectionTableProps) {
  if (!rows.length) {
    return (
      <div className="flex aspect-[3/1] flex-col items-center justify-center rounded-lg border bg-muted">
        <span>❌</span>
        <p className="text-muted-foreground">테이블에 데이터가 없습니다</p>
      </div>
    );
  }
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
