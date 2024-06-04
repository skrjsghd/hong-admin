import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icon } from "./ui";
import { getAllTables } from "@/actions/query";

type SideTableListMenuProps = {
  currentTableName?: string;
};
async function SideTableListMenu({ currentTableName }: SideTableListMenuProps) {
  const { success, value } = await getAllTables();

  if (!success) {
    return null;
  }
  return (
    <ul className="flex-1 space-y-2 p-6 pl-4">
      {value.map(({ table_name }) => (
        <SideTableListItem
          key={table_name}
          tableName={table_name}
          currentTable={currentTableName}
        />
      ))}
    </ul>
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
