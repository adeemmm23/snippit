import type { StateCreator } from "zustand";

export type MagicType = "date" | "duration" | "password";

export type MagicInput = {
  name: string;
  type: MagicType | null;
  options?: Record<string, string | number | boolean>;
};

export type MagicInputsSlice = {
  magicInputs: MagicInput[];
  setMagicInputs: (inputs: MagicInput[]) => void;
  addMagicInput: () => void;
  updateMagicInput: (index: number, input: Partial<MagicInput>) => void;
  removeMagicInput: (index: number) => void;
};

export const createMagicInputsSlice: StateCreator<MagicInputsSlice> = (set) => ({
  magicInputs: [],
  setMagicInputs: (inputs) => set({ magicInputs: inputs }),
  addMagicInput: () =>
    set((state) => ({
      magicInputs: [...state.magicInputs, { name: "", type: null }],
    })),
  updateMagicInput: (index, input) =>
    set((state) => ({
      magicInputs: state.magicInputs.map((item, i) =>
        i === index ? { ...item, ...input } : item,
      ),
    })),
  removeMagicInput: (index) =>
    set((state) => ({
      magicInputs: state.magicInputs.filter((_, i) => i !== index),
    })),
});
