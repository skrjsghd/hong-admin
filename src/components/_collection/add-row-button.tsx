"use client";

import { useState } from "react";
import { ColumnInformation, InformationSchemaColumns } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { addRow } from "@/app/actions";
import { InputField } from "./input-field";
import {
  Button,
  Icon,
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "../ui";

type AddRowButtonProps = {
  columnInformation: ColumnInformation[];
};
function AddRowButton({ columnInformation }: AddRowButtonProps) {
  const searchParams = useSearchParams();
  const initialPayload: Record<InformationSchemaColumns["column_name"], any> =
    Object.assign(
      {},
      ...columnInformation.map((col) => ({ [col.column_name]: "" })),
    );
  const [isOpen, setIsOpen] = useState(false);
  const [payload, setPayload] = useState(initialPayload);

  const validatedPayload = () => {
    const info = columnInformation.map((v) => {
      const { column_name } = v;
      const value = payload[column_name];

      if (value) {
        return { [column_name]: value };
      } else {
        if (v.is_nullable === "YES") return;
        if (v.column_default) return;
        return { [column_name]: "" };
      }
    });
    const result = Object.assign({}, ...info);
    return result;
  };

  const handleSubmit = async () => {
    const tableName = searchParams.get("t");
    if (!tableName) return;
    const result = await addRow(tableName, validatedPayload());
    setPayload(initialPayload);
    setIsOpen(false);
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
          {JSON.stringify(validatedPayload())}
          {columnInformation.map((v) => {
            return (
              <InputField
                key={v.column_name}
                columnInformation={v}
                value={payload[v.column_name]}
                onChange={(e) => {
                  setPayload({ ...payload, [v.column_name]: e.target.value });
                }}
              />
            );
          })}
          <div className="flex gap-2 self-end">
            <SheetClose>
              <Button size="sm" variant="outline">
                cancel
              </Button>
            </SheetClose>
            <Button size="sm" onClick={() => setIsOpen(false)}>
              Add
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { AddRowButton };
