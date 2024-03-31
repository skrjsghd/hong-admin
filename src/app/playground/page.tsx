"use client";

import { useState } from "react";
import { executeQuery } from "../actions";

export default function PlaygroundPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");

  return (
    <div className="grid h-dvh grid-cols-2">
      <div className="flex flex-col items-start gap-6 p-4">
        <textarea
          className="min-h-80 w-full border p-2"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
        ></textarea>
        <button
          data-type="primary"
          className="w-fit"
          onClick={async () => {
            const result = await executeQuery(query);
            setResult(JSON.stringify(result, null, 2));
          }}
        >
          Execute
        </button>
      </div>
      <div className="overflow-scroll bg-zinc-100 p-4">
        <h1>RESULT:</h1>
        <pre>{result}</pre>
      </div>
    </div>
  );
}
