import { getTableColumnInformation, getTableData } from "@/actions/query";
import { HeaderTableMenu } from "@/components/_table/header-table-menu";
import { MainTable } from "@/components/_table/main-table";
import { SideTableMenu } from "@/components/_table/side-table-menu";

export default async function TableDetailPage({
  params,
}: {
  params: { name: string };
}) {
  const tableName = params.name;
  const [tableData, columnInformation] = await Promise.all([
    getTableData(tableName),
    getTableColumnInformation(tableName),
  ]);

  return (
    <div className="flex h-svh">
      <SideTableMenu tableName={tableName} />
      <main className="flex flex-1 flex-col overflow-hidden">
        <HeaderTableMenu
          tableName={tableName}
          columnInformation={columnInformation}
        />
        {tableData.rows.length > 0 ? (
          <MainTable tableName={tableName} data={tableData} />
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center">
            <span className="text-lg text-muted-foreground">No data found</span>
          </div>
        )}
      </main>
    </div>
  );
}
