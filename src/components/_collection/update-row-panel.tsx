"use client";

import { Sheet, SheetContent, SheetClose, Button } from "../ui";
import { InputField } from "./input-field";
import { ColumnInformation } from "@/lib/types";
import { useCollectionStore } from "@/stores/collection-store-provider";
import { updateRow } from "@/app/actions";
import { useSearchParams } from "next/navigation";

type UpdateRowPanelProps = {
  columnInformation: ColumnInformation[];
};
function UpdateRowPanel({ columnInformation }: UpdateRowPanelProps) {
  const {
    open,
    setOpen,
    targetRow,
    currentRow,
    onChangeCurrentRow,
    onBlurRow,
  } = useCollectionStore((state) => state);
  const searchParams = useSearchParams();
  const tableName = searchParams.get("t");

  const handleSaveRow = async () => {
    if (!tableName || !currentRow) return;
    const primaryColumn = columnInformation.find(
      (v) => v.constraint_type === "PRIMARY KEY",
    );
    await updateRow({
      tableName,
      where: {
        [primaryColumn?.column_name || ""]:
          targetRow[primaryColumn?.column_name || ""],
      },
      data: currentRow,
    });
    onBlurRow();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <div className="flex flex-col gap-6 py-6">
          {columnInformation.map((col) => (
            <InputField
              key={col.column_name}
              name={col.column_name}
              columnInformation={col}
              value={currentRow ? currentRow[col.column_name] : ""}
              onValueChange={(value) =>
                onChangeCurrentRow({ [col.column_name]: value })
              }
            />
          ))}
          <div className="flex gap-2 self-end">
            <SheetClose>
              <Button size="sm" variant="outline">
                cancel
              </Button>
            </SheetClose>
            <Button size="sm" onClick={handleSaveRow}>
              Update
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { UpdateRowPanel };
