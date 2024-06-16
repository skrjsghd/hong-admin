import { getAllTables } from "@/actions/query";
import { Icon } from "@/components/ui";
import Link from "next/link";

export default async function Page() {
  const tableList = await getAllTables();

  return (
    <main className="flex h-svh flex-col items-center justify-center space-y-2">
      <h1 className="text-3xl font-semibold">Select a table</h1>
      <ul className="flex flex-col space-y-2 p-6 pl-4">
        {tableList?.map(({ table_name }) => {
          return (
            <Link
              key={table_name}
              href={`/table/${table_name}`}
              className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-muted"
            >
              <Icon name="FolderIcon" className="size-4" variant="outline" />
              {table_name}
            </Link>
          );
        })}
      </ul>
    </main>
  );
}
