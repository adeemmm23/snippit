import type { StateCreator } from "zustand";

export type HelperType = "date" | "range" | "password" | "select";

export type Helper = {
  name: string;
  type: HelperType | null;
  options?: Record<string, string | number | boolean | string[]>;
};

export type HelpersSlice = {
  helpers: Helper[];
  addHelper: () => void;
  updateHelper: (index: number, input: Partial<Helper>) => void;
  removeHelper: (index: number) => void;
};

export const createHelpersSlice: StateCreator<HelpersSlice> = (set) => ({
  helpers: [
    { name: "Date", type: "date" },
    {
      name: "Password",
      type: "password",
      options: {
        length: 12,
        lowerCase: true,
        upperCase: true,
        numbers: true,
        specials: true,
      },
    },
    { name: "Range", type: "range" },
  ],
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
