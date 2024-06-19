import { Button, Icon } from "@/components/ui";
import { NewRowButton } from "./new-row-button";
import { ColumnInformation } from "@/lib/types";

type HeaderTableMenuProps = {
  tableName: string;
  columnInformation: ColumnInformation[];
};
function HeaderTableMenu({
  tableName,
  columnInformation,
}: HeaderTableMenuProps) {
  return (
    <header className="flex items-center justify-between border-b px-4 py-3">
      <ul className="flex items-center gap-2">
        <Button size="sm" variant="outline">
          <Icon name="Bars3BottomLeftIcon" className="size-4" />
          Sort
        </Button>
        <Button size="sm" variant="outline">
          <Icon name="Bars3BottomLeftIcon" className="size-4" />
          Filters
        </Button>
        {/* <Input className="h-9 w-[200px]" placeholder="search..." /> */}
        <NewRowButton
          currentTableName={tableName}
          columnInformation={columnInformation}
        />
      </ul>
      {/* <ul className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            1 row(s) selected
          </span>
          <Button size="sm" variant="secondary">
            <Icon name="TrashIcon" className="size-4" variant="outline" />
            Delete
          </Button>
        </ul> */}
    </header>
  );
}

export { HeaderTableMenu };
