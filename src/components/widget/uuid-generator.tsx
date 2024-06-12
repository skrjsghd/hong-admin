"use client";

import { useState } from "react";
import { Button, Icon, Input } from "@/components/ui";

function UUIDGenerator() {
  const [uuid, setUUID] = useState(crypto.randomUUID());

  const refreshUUID = () => {
    const uuid = crypto.randomUUID();
    setUUID(uuid);
  };

  return (
    <div className="flex items-center gap-2">
      <Input type="text" readOnly defaultValue={uuid} className="font-mono" />
      <Button size="icon" onClick={refreshUUID}>
        <Icon name="ArrowPathIcon" className="h-4 w-4" variant="outline" />
      </Button>
    </div>
  );
}

export { UUIDGenerator };
