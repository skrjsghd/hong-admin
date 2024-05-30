import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icon } from "./ui";
import { auth } from "@/lib/auth";

type SideTableListMenuProps = {
  tableList: string[];
  currentTableName?: string;
};
async function SideTableListMenu({
  tableList,
  currentTableName,
}: SideTableListMenuProps) {
  const session = await auth();

  return (
    <aside className="flex min-w-[250px] flex-col divide-y border-r">
      <ul className="flex-1 space-y-2 p-6 pl-4">
        {tableList.map((name) => (
          <SideTableListItem
            key={name}
            tableName={name}
            currentTable={currentTableName}
          />
        ))}
      </ul>
      <div className="flex items-center px-6 py-4">
        <Link
          href="/setting"
          className="flex items-center gap-2 rounded-md transition-all"
        >
          <div className="size-10 rounded-full bg-muted"></div>
          <div className="font-medium">{session?.user?.name}</div>
          <Icon
            name="ChevronDownIcon"
            className="size-4 text-muted-foreground"
          />
        </Link>
      </div>
    </aside>
  );
}

type SideTableListItemProps = {
  tableName: string;
  currentTable?: string;
};
function SideTableListItem({
  tableName,
  currentTable,
}: SideTableListItemProps) {
  const isSelected = currentTable === tableName;
  return (
    <Link
      href={`?t=${tableName}`}
      className={cn(
        "line-clamp-1 flex select-none items-center gap-2 rounded-md px-4 py-2 text-muted-foreground hover:bg-muted",
        isSelected && "bg-muted text-foreground",
      )}
    >
      <Icon
        name="FolderIcon"
        className="size-4"
        variant={isSelected ? "solid" : "outline"}
        strokeWidth={2.5}
      />
      <span className="text-sm font-medium capitalize">{tableName}</span>
    </Link>
  );
}

export { SideTableListMenu };
