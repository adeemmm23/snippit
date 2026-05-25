import type { StateCreator } from "zustand";

import { VARIABLE_FORMATS } from "@/constants/files.constants";

export type VariableSlice = {
  variableFormat: string;
  setVariableFormat: (theme: string) => void;
};

const defaultValue = VARIABLE_FORMATS[0].label;

export const createVariableSlice: StateCreator<VariableSlice> = (set) => ({
  variableFormat: defaultValue,
  setVariableFormat: (variableFormat) => set({ variableFormat }),
});
