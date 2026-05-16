import type { StateCreator } from "zustand";

export type TooltipsSlice = {
  tooltipsEnabled: boolean;
  setTooltipsEnabled: (enabled: boolean) => void;
};

export const createTooltipsSlice: StateCreator<TooltipsSlice> = (set) => ({
  tooltipsEnabled: true,
  setTooltipsEnabled: (enabled) => set({ tooltipsEnabled: enabled }),
});
