"use client";

import { connectToDB } from "@/actions/query";
import { useState } from "react";
import { Button, Input } from "./ui";

function ConnectionForm() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError("");
    }
    setUrl(e.currentTarget.value);
  };
  const handleSubmit = async () => {
    // 추후 env 업데이트 하는 방식으로 구현
    const result = await connectToDB();
    if (result?.error) {
      setError(result.error);
      setUrl("");
    }
  };

  return (
    <div className="mx-auto flex h-full max-w-md flex-col items-center justify-center gap-4">
      <Input
        type="text"
        name="db-url"
        placeholder="postgres://user:password@host:port/database"
        value={url}
        onChange={handleChangeUrl}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button className="w-full" onClick={handleSubmit} disabled={!url}>
        Connect
      </Button>
    </div>
  );
}

export { ConnectionForm };
