"use client";
import { useSearchParams } from "next/navigation";
import { Button, Icon, Input } from "./ui";

function TableHeaderMenu() {
  const searchParams = useSearchParams();
  const currentTableName = searchParams.get("t");
  return (
    <header className="grid grid-cols-3 border-b px-6 py-3">
      <ul className="flex items-center gap-4">
        <Button size="sm" variant="outline">
          <Icon name="Bars3BottomLeftIcon" className="size-4" />
          Sort
        </Button>
        <Input className="h-9 w-[200px]" placeholder="search..." />
      </ul>
      <h3 className="flex items-center gap-1.5 place-self-center text-sm">
        <span className="text-muted-foreground">dbname</span>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium">{currentTableName}</span>
      </h3>
      <ul className="flex items-center justify-end gap-4 place-self-end">
        <span className="text-sm text-muted-foreground">1 row(s) selected</span>
        <Button size="sm" variant="secondary">
          <Icon name="TrashIcon" className="size-4" variant="outline" />
          Delete
        </Button>
        <Button size="sm">New Row</Button>
      </ul>
    </header>
  );
}

export { TableHeaderMenu };
