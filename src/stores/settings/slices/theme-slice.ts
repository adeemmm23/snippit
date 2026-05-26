import type { StateCreator } from "zustand";

export type Theme = "system" | "light" | "dark";

export type ThemeSlice = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const createThemeSlice: StateCreator<ThemeSlice> = (set) => ({
  theme: "system",
  setTheme: (theme) => set({ theme }),
});
