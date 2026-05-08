import { useState, type ReactNode } from "react";

import { SectionsContext, type SectionType } from "./sections-context";

type SectionsProviderProps = {
  children: ReactNode;
};

export function SectionsProvider({ children }: SectionsProviderProps) {
  const [sections, setSections] = useState<SectionType[] | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const value = {
    sections,
    setSections,
    activeSection,
    setActiveSection,
  };

  return (
    <SectionsContext.Provider value={value}>
      {children}
    </SectionsContext.Provider>
  );
}
