import { createStore } from "zustand/vanilla";

export type TableState = {
  currentRow: Record<string, string> | null;
};

export type TableActions = {
  setCurrentRow: (row: Record<string, string>) => void;
};

export type TableStore = TableState & TableActions;

export const defaultInitState: TableState = {
  currentRow: null,
};

export const createTableStore = (initState: TableState = defaultInitState) => {
  return createStore<TableStore>()((set) => ({
    ...initState,
    setCurrentRow: (row) =>
      set({
        currentRow: row,
      }),
  }));
};
