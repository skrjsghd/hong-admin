"use client";

import { CollectionTableRow } from "./collection-table-row";
import { useRef, useState } from "react";
import { updateRow } from "@/app/actions";
import { useSearchParams } from "next/navigation";
import { Drawer, DrawerBody, DrawerFooter } from "./ui/drawer";
import { ColumnInformation } from "@/lib/types";
import { InputField } from "./_collection/input-field";

type CollectionTableProps = {
  columnInformation: ColumnInformation[];
  rows: Record<string, any>[];
};

function CollectionTable({ columnInformation, rows }: CollectionTableProps) {
  const searchParams = useSearchParams();
  const tableName = searchParams.get("t");
  const [isOpen, setIsOpen] = useState(false);
  const prevRow = useRef<Record<string, any>>({});
  const [currentRow, setCurrentRow] = useState<Record<string, any>>({});

  const handleClickRow = (rowData: Record<string, any>) => {
    prevRow.current = rowData;
    setCurrentRow(rowData);
    setIsOpen(true);
  };

  const handleRowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setCurrentRow((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseModal = () => {
    prevRow.current = {};
    setCurrentRow({});
    setIsOpen(false);
  };

  const handleSaveRow = async () => {
    const primaryColumn = columnInformation.find(
      (v) => v.constraint_type === "PRIMARY KEY",
    );
    if (!tableName) return;
    await updateRow({
      tableName,
      where: {
        [primaryColumn?.column_name || ""]:
          prevRow.current[primaryColumn?.column_name || ""],
      },
      data: currentRow,
    });
    handleCloseModal();
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-zinc-300">
        <table className="w-full divide-y">
          <thead>
            <tr className="divide-x">
              {columnInformation.map(({ column_name }) => {
                return <th key={column_name}>{column_name}</th>;
              })}
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((row) => {
              return (
                <CollectionTableRow
                  key={crypto.randomUUID()}
                  data={row}
                  columnInformation={columnInformation}
                  onClick={(newRow) => handleClickRow(newRow)}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <Drawer isOpen={isOpen} onClickBackdrop={() => setIsOpen(false)}>
        <DrawerBody>
          {columnInformation.map((v) => (
            <InputField
              key={v.column_name}
              name={v.column_name}
              columnInformation={v}
              value={currentRow[v.column_name] || ""}
              onChange={handleRowChange}
            />
          ))}
        </DrawerBody>
        <DrawerFooter>
          <button onClick={handleCloseModal}>cancel</button>
          <button data-type="primary" onClick={handleSaveRow}>
            Save
          </button>
        </DrawerFooter>
      </Drawer>
    </>
  );
}

export { CollectionTable };
