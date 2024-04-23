"use client";

import { useState } from "react";
import { ColumnInformation } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { addRow } from "@/app/actions";
import { InputField } from "./input-field";
import { Button, Icon, Sheet, SheetContent, SheetTrigger } from "../ui";

type AddRowButtonProps = {
  columnInformation: ColumnInformation[];
};
function AddRowButton({ columnInformation }: AddRowButtonProps) {
  const searchParams = useSearchParams();
  const initialPayload: Record<string, any> = columnInformation.reduce(
    (acc, col) => ({ ...acc, [col.column_name]: "" }),
    {},
  );
  const [isOpen, setIsOpen] = useState(false);
  const [payload, setPayload] = useState(initialPayload);

  const validPayload = columnInformation.reduce((acc, col) => {
    const { column_name, is_nullable, column_default } = col;
    const value = payload[column_name];

    if (value !== null && value !== undefined && value !== "") {
      return { ...acc, [column_name]: value };
    } else if (is_nullable === "YES" || column_default) {
      return acc;
    } else {
      return { ...acc, [column_name]: "" };
    }
  }, {});

  const handleClose = () => {
    setIsOpen(false);
    setPayload(initialPayload);
  };
  const handleSubmit = async () => {
    const tableName = searchParams.get("t");
    if (!tableName) return;
    const result = await addRow(tableName, validPayload);
    setPayload(initialPayload);
    handleClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Button>
          <Icon name="PlusIcon" className="h-4 w-4" />
          Add Row
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col gap-6">
          {columnInformation.map((col) => {
            return (
              <InputField
                key={col.column_name}
                columnInformation={col}
                value={payload[col.column_name]}
                onValueChange={(v) => {
                  setPayload({ ...payload, [col.column_name]: v });
                }}
              />
            );
          })}
          <div className="flex gap-2 self-end">
            <Button size="sm" variant="outline" onClick={handleClose}>
              cancel
            </Button>
            <Button size="sm" onClick={handleSubmit}>
              Add
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { AddRowButton };
