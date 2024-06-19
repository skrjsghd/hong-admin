"use client";

import { useState, useTransition } from "react";
import { Button, Modal } from "../ui";
import { ColumnInformation } from "@/lib/types";
import { addRow } from "@/actions/query";
import { RowField } from "./row-field";

const isRequired = (column: ColumnInformation) => {
  if (column.is_nullable === "NO" && column.column_default === null) {
    return true;
  } else {
    return false;
  }
};

type NewRowButtonProps = {
  currentTableName: string;
  columnInformation: ColumnInformation[];
};
function NewRowButton({
  currentTableName,
  columnInformation,
}: NewRowButtonProps) {
  const initialPayload = columnInformation.reduce((acc, value) => {
    if (isRequired(value)) {
      return { ...acc, [value.column_name]: "" };
    }
    return acc;
  }, {});

  const [showModal, setShowModal] = useState(false);
  const [payload, setPayload] = useState<Record<string, any>>(initialPayload);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      const { success } = await addRow(currentTableName || "", payload);
      if (success) {
        handleCloseModal();
      } else {
        alert("Failed to add row");
      }
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPayload(initialPayload);
  };

  const disableSubmit = columnInformation.some((value) => {
    const { column_name } = value;
    return isRequired(value) && !payload[column_name];
  });

  return (
    <div>
      <Button size="sm" onClick={() => setShowModal(true)}>
        New Row
      </Button>
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        hideCloseButton
        className="grid grid-rows-[auto_1fr_auto] overflow-hidden"
      >
        <h1 className="p-4 text-xl font-semibold">{currentTableName}</h1>
        <div className="grid w-full grid-cols-[auto_1fr] place-content-start gap-x-10 gap-y-6 overflow-y-scroll p-6 pb-20">
          {columnInformation.map((value) => {
            return (
              <RowField
                key={value.column_name}
                columnInformation={value}
                value={payload[value.column_name]}
                onChangeValue={(v) => {
                  setPayload((prev) => {
                    return {
                      ...prev,
                      [value.column_name]: v,
                    };
                  });
                }}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-end gap-3 border-t bg-background px-6 py-4">
          <Button variant="outline" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={disableSubmit}
            loading={isPending}
          >
            Add Row
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export { NewRowButton };
