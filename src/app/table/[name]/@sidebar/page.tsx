import { getAllTables } from "@/actions/query";
import { SideTableListItem } from "@/components/_table/side-table-list-menu";
import { Icon } from "@/components/ui";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function TableSidebarPage({
  params,
}: {
  params: { name: string };
}) {
  const session = await auth();
  const tableList = await getAllTables();

  return (
    <aside className="flex min-w-[250px] flex-col divide-y border-r">
      <ul className="flex-1 space-y-2 p-6 pl-4">
        {tableList?.map(({ table_name }) => (
          <SideTableListItem
            key={table_name}
            tableName={table_name}
            currentTable={params.name}
          />
        ))}
      </ul>
      {session && (
        <div className="flex items-center px-6 py-4">
          <Link
            href="/setting"
            className="flex items-center gap-2 rounded-md transition-all"
          >
            <div className="size-9 rounded-full bg-muted"></div>
            <div className="font-medium">{session?.user?.name}</div>
          </Link>
        </div>
      )}
    </aside>
  );
}
