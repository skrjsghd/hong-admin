"use client";

import { connectToDB } from "@/app/actions";
import { useState } from "react";

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
      <input
        type="text"
        name="db-url"
        placeholder="postgres://user:password@host:port/database"
        value={url}
        onChange={handleChangeUrl}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        className="w-full rounded-lg bg-zinc-900 px-3 py-2 font-medium text-zinc-50 hover:opacity-70 disabled:bg-zinc-400"
        onClick={handleSubmit}
        disabled={!url}
      >
        Connect
      </button>
    </div>
  );
}

export { ConnectionForm };
