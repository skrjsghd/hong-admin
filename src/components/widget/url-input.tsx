"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui";
import { SiteMetadata, getSiteMetadata } from "@/actions/widget";

function URLInput() {
  const [url, setURL] = useState("");
  const [metadata, setMetadata] = useState<SiteMetadata>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      getMetadata();
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [url]);

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setURL(value);
  };

  // scrape the opengraph data
  const getMetadata = async () => {
    let newURL = url.trim();
    // if no protocol is provided, add https
    if (!newURL.startsWith("http")) {
      newURL = `https://${newURL}`;
    }
    const res = await getSiteMetadata(newURL);
    setMetadata(res);
  };

  return (
    <div className="gap-2 space-y-3">
      <div className="flex items-center gap-2">
        <Input
          type="url"
          placeholder="https://"
          value={url}
          onChange={handleURLChange}
        />
      </div>
      {!!metadata && !!url && (
        <a href={url} target="_blank" className="block">
          <div className="flex items-center gap-3 rounded-md bg-muted px-4 py-3">
            <div className="flex-1 text-sm">
              {metadata.title && (
                <h2 className="font-medium">{metadata.title}</h2>
              )}
              {metadata.description && (
                <p className="line-clamp-2 text-muted-foreground">
                  {metadata.description}
                </p>
              )}
            </div>
            {metadata.image && (
              <img
                src={metadata.image}
                alt={"og"}
                className="aspect-[4/3] w-1/5 rounded-md object-cover"
              />
            )}
          </div>
        </a>
      )}
    </div>
  );
}

export { URLInput };
