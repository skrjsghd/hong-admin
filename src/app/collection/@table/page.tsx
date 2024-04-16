import { getColumnInformation, getTableDetail } from "@/app/actions";
import { AddRowButton } from "@/components/_collection/add-row-button";
import { CollectionTable } from "@/components/collection-table";

export default async function CollectionTablePage({
  searchParams,
}: {
  searchParams: { t: string | undefined };
}) {
  const tableName = searchParams.t;
  const [tableDetail, columnInformation] = await Promise.all([
    getTableDetail(searchParams.t),
    getColumnInformation(searchParams.t),
  ]);

  if (!tableDetail || !columnInformation) return null;
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold capitalize">{tableName}</h1>
        <AddRowButton columnInformation={columnInformation} />
      </div>
      <CollectionTable
        columnInformation={columnInformation}
        rows={tableDetail.rows}
      />
    </div>
  );
}
