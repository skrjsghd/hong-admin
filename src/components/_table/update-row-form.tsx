"use client";

import { ColumnInformation } from "@/lib/types";
import { RowField } from "./row-field";
import { useState, useTransition } from "react";
import { useTableStore } from "@/stores/table-store-provider";
import { Button } from "../ui";
import { updateRow } from "@/actions/query";
import { toast } from "sonner";
import { redirect } from "next/navigation";

type UpdateRowFormProps = {
  tableName: string;
  columnInformation: ColumnInformation[];
};
function UpdateRowForm({ tableName, columnInformation }: UpdateRowFormProps) {
  const { currentRow } = useTableStore((state) => state);
  const [isPending, startTransition] = useTransition();
  const [payload, setPayload] = useState<Record<string, any> | null>(
    currentRow,
  );

  const handleSubmit = () => {
    startTransition(async () => {
      if (!payload || !currentRow) return;
      const result = await updateRow(tableName, {
        where: currentRow,
        data: payload,
      });
      if (result) {
        redirect(`/table/${tableName}`);
      } else {
        toast.error("Failed to update row.");
      }
    });
  };

  if (!payload) {
    return null;
  }
  return (
    <div className="relative flex flex-1 flex-col">
      <div className="grid flex-1 grid-cols-[auto_1fr] place-content-start gap-10">
        {columnInformation.map((col) => {
          return (
            <RowField
              key={col.column_name}
              columnInformation={col}
              value={payload[col.column_name]}
              onChangeValue={(v) => {
                setPayload((prev) => {
                  return {
                    ...prev,
                    [col.column_name]: v,
                  };
                });
              }}
            />
          );
        })}
      </div>
      <div className="py-10">
        <Button className="w-full" onClick={handleSubmit} loading={isPending}>
          Update Row
        </Button>
      </div>
    </div>
  );
}

export { UpdateRowForm };
