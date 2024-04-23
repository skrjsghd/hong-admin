"use client";

import { createContext, useContext, useRef } from "react";
import { useStore, type StoreApi } from "zustand";
import { CollectionStore, createCollectionStore } from "./collection-store";

export const CollectionStoreContext =
  createContext<StoreApi<CollectionStore> | null>(null);

export const CollectionStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const storeRef = useRef<StoreApi<CollectionStore>>();
  if (!storeRef.current) {
    storeRef.current = createCollectionStore();
  }

  return (
    <CollectionStoreContext.Provider value={storeRef.current}>
      {children}
    </CollectionStoreContext.Provider>
  );
};

export const useCollectionStore = <T,>(
  selector: (store: CollectionStore) => T,
): T => {
  const collectionStoreContext = useContext(CollectionStoreContext);

  if (!collectionStoreContext) {
    throw new Error(
      `useCollectionStore must be use within CollectionStoreContext`,
    );
  }

  return useStore(collectionStoreContext, selector);
};
