import type { StateCreator } from "zustand";

export type Theme = "system" | "light" | "dark";

export type ThemeSlice = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

// TODO: fix theme state
export const createThemeSlice: StateCreator<ThemeSlice> = (set) => ({
  theme: "light",
  setTheme: (theme) => set({ theme }),
});
