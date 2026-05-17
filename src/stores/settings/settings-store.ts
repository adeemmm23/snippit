import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

import { createHelpersSlice } from "./slices/helper-slice";
import { createThemeSlice } from "./slices/theme-slice";
import { createTooltipsSlice } from "./slices/tooltips-slice";
import { createVariableSlice } from "./slices/variable-slice";

const settingsSlices = [
  createThemeSlice,
  createVariableSlice,
  createTooltipsSlice,
  createHelpersSlice,
] as const;

type UnionToIntersection<T> = (
  T extends unknown ? (arg: T) => void : never
) extends (arg: infer I) => void
  ? I
  : never;

type SettingsStore = UnionToIntersection<
  ReturnType<(typeof settingsSlices)[number]>
>;

const useSettingsStore = create<SettingsStore>()(
  subscribeWithSelector(
    persist(
      (...args) =>
        Object.assign(
          {},
          ...settingsSlices.map((createSlice) => createSlice(...args)),
        ),
      { name: "settings" },
    ),
  ),
);

export default useSettingsStore;
