import { useState, type ReactNode } from "react";

import { SectionsContext } from "./sections-context";

type SectionsProviderProps = {
  children: ReactNode;
};

export function SectionsProvider({ children }: SectionsProviderProps) {
  const [sections, setSections] = useState<
    { id: string; title: string; isActive: boolean }[]
  >([]);

  const value = {
    sections,
    setSections,
  };

  return (
    <SectionsContext.Provider value={value}>
      {children}
    </SectionsContext.Provider>
  );
}
