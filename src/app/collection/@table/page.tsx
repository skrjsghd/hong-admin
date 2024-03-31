import { getTableDetail } from "@/app/actions";
import { CollectionTable } from "@/components/collection-table";

export default async function CollectionTablePage({
  searchParams,
}: {
  searchParams: { t: string | undefined };
}) {
  const tableDetail = await getTableDetail(searchParams.t);

  if (!tableDetail) return null;
  return (
    <CollectionTable fields={tableDetail.fields} rows={tableDetail.rows} />
  );
}
