import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

import { createThemeSlice, type ThemeSlice } from "./slices/theme-slice";
import {
  createVariableSlice,
  type VariableSlice,
} from "./slices/variable-slice";

type SettingsStore = ThemeSlice & VariableSlice;

const useSettingsStore = create<SettingsStore>()(
  subscribeWithSelector(
    persist(
      (...args) => ({
        ...createThemeSlice(...args),
        ...createVariableSlice(...args),
      }),
      { name: "settings" },
    ),
  ),
);

export default useSettingsStore;
