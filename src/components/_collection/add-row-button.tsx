"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Drawer, DrawerBody, DrawerFooter } from "../ui/drawer";
import { ColumnInformation, InformationSchemaColumns } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { addRow } from "@/app/actions";

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

  const handleSubmit = async () => {
    const tableName = searchParams.get("t");
    if (!tableName) return;
    const result = await addRow(tableName, payload);
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
      <Drawer isOpen={isOpen} onClickBackdrop={() => setIsOpen(false)}>
        <DrawerBody>
          {JSON.stringify(payload)}
          {columnInformation.map((col) => {
            const {
              column_name,
              typname,
              typcategory,
              is_nullable,
              column_default,
            } = col;
            return (
              <label key={column_name} className="grid grid-cols-5">
                <div className="col-span-1">
                  <div>{column_name}</div>
                  <div>{typname}</div>
                </div>
                <input
                  className="col-span-4"
                  type={typcategory === "N" ? "number" : "text"}
                  placeholder={
                    column_default
                      ? column_default
                      : is_nullable === "YES"
                        ? "NULL"
                        : ""
                  }
                  value={payload[column_name]}
                  onChange={(e) => {
                    setPayload({ ...payload, [column_name]: e.target.value });
                  }}
                />
              </label>
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
