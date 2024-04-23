"use client";

import { ColumnInformation } from "@/lib/types";
import { AddRowButton } from "./add-row-button";
import { useSearchParams } from "next/navigation";
import { useCollectionStore } from "@/stores/collection-store-provider";
import { Button, Icon } from "../ui";
import { deleteRow } from "@/app/actions";

type TableMenuBarProps = {
  columnInformation: ColumnInformation[];
};
function TableMenuBar({ columnInformation }: TableMenuBarProps) {
  const { selectedRowList, clearSelectedRowList } = useCollectionStore(
    (state) => state,
  );
  const searchParams = useSearchParams();
  const tableName = searchParams.get("t");

  const handleRemoveRow = async () => {
    try {
      if (!tableName) return;
      const finalCheck = confirm(
        "Are you sure you want to delete the selected rows?",
      );
      if (!finalCheck) return;
      const where = columnInformation.find(
        (v) => v.constraint_type === "PRIMARY KEY",
      );
      if (!where) return;
      selectedRowList.forEach((row) => {
        deleteRow({
          tableName,
          where: { [where.column_name]: row[where.column_name] },
        });
      });
      clearSelectedRowList();
    } catch (e) {
      alert("Failed to delete the selected rows");
    }
  };

  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-lg font-bold capitalize">{tableName}</h1>
      <div className="flex items-center gap-4">
        {!!selectedRowList.length && (
          <span className="text-sm font-medium">
            {selectedRowList.length} Selected
          </span>
        )}
        <Button
          variant="outline"
          disabled={!Boolean(selectedRowList.length)}
          onClick={handleRemoveRow}
        >
          <Icon name="TrashIcon" variant="outline" className="h-4 w-4" />
          Delete
        </Button>
        <AddRowButton columnInformation={columnInformation} />
      </div>
    </div>
  );
}

export { TableMenuBar };
