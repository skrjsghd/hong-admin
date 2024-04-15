"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Drawer, DrawerBody, DrawerFooter } from "../ui/drawer";
import { ColumnInformation, InformationSchemaColumns } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { addRow } from "@/app/actions";
import { InputField } from "./input-field";

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
    <>
      <button
        data-type="primary"
        className="mb-4 self-end"
        onClick={() => setIsOpen(true)}
      >
        <PlusIcon className="size-5" />
        Add Row
      </button>
      <Drawer isOpen={isOpen}>
        <DrawerBody>
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
        </DrawerBody>
        <DrawerFooter>
          <button data-type="outline" onClick={() => setIsOpen(false)}>
            cancel
          </button>
          <button data-type="primary" onClick={handleSubmit}>
            Add
          </button>
        </DrawerFooter>
      </Drawer>
    </>
  );
}

export { AddRowButton };
