"use client";

import { useFormStatus } from "react-dom";
import { Label, Button, Input, Loader, Icon } from "../ui";
import { connectWithURI } from "@/actions/query";
import { toast } from "sonner";
import { useState } from "react";

type ConnectionFormProps = {
  defaultURI?: string | null;
};
function ConnectionForm({ defaultURI }: ConnectionFormProps) {
  const [editable, setEditable] = useState(false);
  const defaultValue = defaultURI || "";

  if (!editable) {
    return (
      <div>
        <Label title="DB URI">
          <div className="flex items-center gap-2">
            <Input defaultValue={defaultValue} type="password" disabled />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setEditable(true)}
            >
              <Icon name="PencilIcon" className="h-5 w-5" />
            </Button>
          </div>
        </Label>
      </div>
    );
  }
  return (
    <form
      className="space-y-16"
      action={async (data) => {
        const uri = data.get("uri");
        if (!uri) return;
        const { success, value } = await connectWithURI(uri.toString());
        if (success) {
          toast.success(value);
          setEditable(false);
        } else {
          toast.error(value);
        }
      }}
    >
      <Label title="DB URI">
        <div className="flex items-center gap-2">
          <Input
            name="uri"
            defaultValue={defaultValue}
            placeholder="postgres://user:1231@localhost:5432/postgres"
          />
        </div>
      </Label>
      <div className="flex flex-col items-stretch space-y-2">
        <ConnectButton />
        {defaultURI && (
          <Button variant="secondary" onClick={() => setEditable(false)}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

function ConnectButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader className="size-4" />}
      Connect
    </Button>
  );
}

export { ConnectionForm };
