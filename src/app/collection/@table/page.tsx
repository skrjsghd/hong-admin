import { getColumnInformation, getTableRows } from "@/app/actions";
import { CollectionTable } from "@/components/_collection/collection-table";
import { TableMenuBar } from "@/components/_collection/table-menu-bar";
import { UpdateRowPanel } from "@/components/_collection/update-row-panel";

export default async function CollectionTablePage({
  searchParams,
}: {
  searchParams: { t: string | undefined };
}) {
  const tableName = searchParams.t;
  const [tableDetail, columnInformation] = await Promise.all([
    getTableRows(tableName),
    getColumnInformation(tableName),
  ]);

  if (!tableDetail || !columnInformation) return null;
  return (
    <div className="flex flex-col">
      <TableMenuBar columnInformation={columnInformation} />
      <CollectionTable
        columnInformation={columnInformation}
        rows={tableDetail.rows}
      />
      <UpdateRowPanel columnInformation={columnInformation} />
    </div>
  );
}
