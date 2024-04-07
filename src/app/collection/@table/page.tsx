import { getColumnInformation, getTableDetail } from "@/app/actions";
import { AddRowButton } from "@/components/_collection/add-row-button";
import { CollectionTable } from "@/components/collection-table";

export default async function CollectionTablePage({
  searchParams,
}: {
  searchParams: { t: string | undefined };
}) {
  const [tableDetail, columnInformation] = await Promise.all([
    getTableDetail(searchParams.t),
    getColumnInformation(searchParams.t),
  ]);

  if (!tableDetail || !columnInformation) return null;
  return (
    <div className="flex flex-col">
      <AddRowButton columnInformation={columnInformation} />
      <CollectionTable
        columnInformation={columnInformation}
        rows={tableDetail.rows}
      />
    </div>
  );
}
