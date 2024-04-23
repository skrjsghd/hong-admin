import { deepCompare } from "@/lib/utils";
import { createStore } from "zustand/vanilla";

export type CollectionState = {
  open: boolean;
  targetRow: Record<string, any>;
  currentRow: Record<string, any>;
  selectedRowList: Record<string, any>[];
};

export type CollectionActions = {
  setOpen: (value: boolean) => void;
  onClickRow: (rowData: Record<string, any>) => void;
  onBlurRow: () => void;
  onChangeCurrentRow: (row: Record<string, any>) => void;
  selectRow: (row: Record<string, any>) => void;
  unselectRow: (row: Record<string, any>) => void;
  clearSelectedRowList: () => void;
};

export type CollectionStore = CollectionState & CollectionActions;

export const defaultInitState: CollectionState = {
  open: false,
  targetRow: {},
  currentRow: {},
  selectedRowList: [],
};

export const createCollectionStore = (
  initialState: CollectionState = defaultInitState,
) => {
  return createStore<CollectionStore>((set) => ({
    ...initialState,
    setOpen: (value) => set({ open: value }),
    onClickRow: (rowData) => {
      set({ targetRow: rowData, currentRow: rowData, open: true });
    },
    onBlurRow: () => {
      set({ targetRow: {}, currentRow: {}, open: false });
    },
    onChangeCurrentRow: (value) =>
      set((state) => ({
        currentRow: { ...state.currentRow, ...value },
      })),
    selectRow: (row) =>
      set((state) => ({ selectedRowList: [...state.selectedRowList, row] })),
    unselectRow: (row) =>
      set((state) => ({
        selectedRowList: state.selectedRowList.filter(
          (r) => !deepCompare(r, row),
        ),
      })),
    clearSelectedRowList: () => set({ selectedRowList: [] }),
  }));
};
