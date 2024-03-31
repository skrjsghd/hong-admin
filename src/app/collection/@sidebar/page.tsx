import { getTableInformation } from "@/app/actions";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default async function CollectionSidebarPage({
  searchParams,
}: {
  searchParams: { t: string | undefined };
}) {
  const tableList = await getTableInformation();

  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-bold">Collections: {searchParams.t}</h1>
      <div className="mt-6 space-y-2">
        {tableList.map(({ table_name }) => {
          return (
            <Link
              key={table_name}
              className="flex items-center justify-between rounded-md border border-zinc-300 px-4 py-2 font-medium hover:bg-zinc-100 aria-selected:border-none aria-selected:bg-zinc-900 aria-selected:text-zinc-50"
              href={
                table_name === searchParams.t
                  ? "/collection"
                  : `/collection?t=${table_name}`
              }
              aria-selected={table_name === searchParams.t}
            >
              <span>{table_name}</span>
              <ChevronRightIcon className="size-5 text-zinc-400" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
