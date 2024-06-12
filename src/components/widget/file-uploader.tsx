"use client";

import { formatBytes } from "@/lib/utils";
import { ChangeEvent, useRef, useState } from "react";
import { Icon } from "../ui";
import { toast } from "sonner";

function FileUploader() {
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [base64, setBase64] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      setInputFile(file);
      if (file.type.includes("image")) {
        encodeFile(e.target.files[0]);
      }
    } else {
      setInputFile(null);
    }
  };

  const removeFile = () => {
    setInputFile(null);
    setBase64("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const encodeFile = (file: File | null) => {
    const reader = new FileReader();
    if (!file) return "";
    reader.onload = () => {
      setBase64(reader.result as string);
    };
    reader.onerror = (error) => {
      console.error("Error: ", error);
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(base64);
      toast.success("base64 Copied to clipboard");
    } catch (error) {
      console.error("Error copying text: ", error);
    }
  };

  return (
    <div className="space-y-2">
      <div>
        <div className="flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm shadow-sm">
          {/* File information */}
          {inputFile ? (
            <div>
              <div className="font-medium">{inputFile.name}</div>
              <div className="text-muted-foreground">
                {formatBytes(inputFile.size)}
              </div>
            </div>
          ) : (
            <div className="text-muted-foreground">No file selected</div>
          )}

          {/* upload and function menu */}
          {inputFile ? (
            <ul className="flex items-center gap-3 *:cursor-pointer">
              <Icon
                name="CodeBracketIcon"
                className="h-5 w-5 text-muted-foreground hover:opacity-50"
                variant="outline"
                onClick={copyToClipboard}
              />
              <Icon
                name="TrashIcon"
                className="h-5 w-5 text-destructive hover:opacity-50"
                variant="outline"
                onClick={removeFile}
              />
            </ul>
          ) : (
            <label
              htmlFor="file"
              className="cursor-pointer rounded-sm bg-muted px-2 py-1 text-muted-foreground hover:opacity-50"
            >
              Upload
            </label>
          )}
        </div>
        <input
          ref={inputRef}
          id="file"
          name="file"
          type="file"
          hidden
          onChange={handleFileChange}
        />
      </div>

      {/* Preview */}
      {base64 && (
        <img
          src={base64}
          alt=""
          className="w-full rounded-sm border object-cover"
        />
      )}
    </div>
  );
}

export { FileUploader };
