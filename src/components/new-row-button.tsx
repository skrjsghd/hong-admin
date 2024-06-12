"use client";

import { useState } from "react";
import { Button, Icon } from "./ui";
import { ColumnInformation } from "@/lib/types";
import { useSearchParams } from "next/navigation";

type NewRowButtonProps = {
  columnInformation: ColumnInformation[];
};
function NewRowButton({ columnInformation }: NewRowButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const searchParams = useSearchParams();
  const currentTableName = searchParams.get("t");

  return (
    <div>
      <Button size="sm" onClick={() => setShowModal(true)}>
        New Row
      </Button>
      {showModal && (
        <div className="fixed left-0 top-0 z-[9999] h-svh w-screen">
          <div className="relative mx-auto h-full max-w-screen-sm bg-background px-6 pt-4">
            <h1 className="text-2xl font-semibold">{currentTableName}</h1>
            <div className="space-y-4">
              {/* uuid gen */}
              <div></div>

              {/* {columnInformation.map((value) => {
                return (
                  <div key={value.column_name} className="text-sm">
                    <div className="font-medium">{value.column_name}</div>
                    <div className="text-muted-foreground">{value.typname}</div>
                  </div>
                );
              })} */}
            </div>
            <button
              className="absolute right-4 top-4 z-10"
              onClick={() => setShowModal(false)}
            >
              <Icon
                name="XMarkIcon"
                className="h-6 w-6 text-muted-foreground"
              />
            </button>
          </div>
          <div
            className="absolute left-0 top-0 -z-10 h-full w-full bg-black/80"
            onClick={() => setShowModal(false)}
          ></div>
        </div>
      )}
    </div>
  );
}

export { NewRowButton };
