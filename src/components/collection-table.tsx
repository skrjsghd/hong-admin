"use client";

import { FieldDef } from "pg";
import { CollectionTableRow } from "./collection-table-row";
import { useRef, useState } from "react";
import { updateRow } from "@/app/actions";
import { useSearchParams } from "next/navigation";

type CollectionTableProps = {
  fields: FieldDef[];
  rows: Record<string, any>[];
};

function CollectionTable({ fields, rows }: CollectionTableProps) {
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
    if (!tableName) return;
    await updateRow(tableName, {
      prev: prevRow.current,
      current: currentRow,
    });
    handleCloseModal();
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-zinc-300">
        <table className="w-full divide-y">
          <thead>
            <tr className="divide-x">
              {fields.map((v) => {
                return <th key={v.name}>{v.name}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              return (
                <CollectionTableRow
                  key={crypto.randomUUID()}
                  data={row}
                  onClick={() => handleClickRow(row)}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      {isOpen && (
        <div className="fixed left-0 top-0 flex h-dvh w-dvw flex-row-reverse">
          <div className="flex h-full w-1/3 flex-col justify-between bg-white p-6">
            <div className="flex flex-col gap-6">
              {fields.map((v, i) => {
                const { name, format } = v;
                return (
                  <div key={name} className="space-y-1">
                    <div className="text-xs">{JSON.stringify(v)}</div>
                    <label htmlFor={name}>{name}</label>
                    <input
                      key={name}
                      type="text"
                      name={name}
                      value={currentRow[name]}
                      onChange={handleRowChange}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-6 self-end">
              <button onClick={handleCloseModal}>cancel</button>
              <button data-type="primary" onClick={handleSaveRow}>
                Save
              </button>
            </div>
          </div>
          <div
            className="absolute left-0 top-0 -z-10 h-full w-full bg-black/80"
            onClick={() => setIsOpen(false)}
          ></div>
        </div>
      )}
    </>
  );
}

export { CollectionTable };
