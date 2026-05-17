import type { StateCreator } from "zustand";

export type HelperType = "date" | "duration" | "password";

export type Helper = {
  name: string;
  type: HelperType | null;
  options?: Record<string, string | number | boolean>;
};

export type HelpersSlice = {
  helpers: Helper[];
  addHelper: () => void;
  updateHelper: (index: number, input: Partial<Helper>) => void;
  removeHelper: (index: number) => void;
};

export const createHelpersSlice: StateCreator<HelpersSlice> = (set) => ({
  helpers: [],
  addHelper: () =>
    set((state) => ({
      helpers: [...state.helpers, { name: "", type: null }],
    })),
  updateHelper: (index, input) =>
    set((state) => ({
      helpers: state.helpers.map((item, i) =>
        i === index ? { ...item, ...input } : item,
      ),
    })),
  removeHelper: (index) =>
    set((state) => ({
      helpers: state.helpers.filter((_, i) => i !== index),
    })),
});
