import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createThemeSlice, type ThemeSlice } from "./slices/theme-slice";

type SettingsStore = ThemeSlice;

const useSettingsStore = create<SettingsStore>()(
  persist(
    (...args) => ({
      ...createThemeSlice(...args),
    }),
    { name: "settings" },
  ),
);

export default useSettingsStore;
