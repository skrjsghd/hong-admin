"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type TableStore, createTableStore } from "./table-store";

export type TableStoreApi = ReturnType<typeof createTableStore>;

export const TableStoreContext = createContext<TableStoreApi | undefined>(
  undefined,
);

export interface TableStoreProviderProps {
  children: ReactNode;
}

export const TableStoreProvider = ({ children }: TableStoreProviderProps) => {
  const storeRef = useRef<TableStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createTableStore();
  }

  return (
    <TableStoreContext.Provider value={storeRef.current}>
      {children}
    </TableStoreContext.Provider>
  );
};

export const useTableStore = <T,>(selector: (store: TableStore) => T): T => {
  const tableStoreContext = useContext(TableStoreContext);

  if (!tableStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(tableStoreContext, selector);
};
