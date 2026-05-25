import { createContext, useContext } from "react";

export type SectionType = {
  id: string;
  title: string;
};

type SectionsContextType = {
  sections: SectionType[] | null;
  setSections: React.Dispatch<React.SetStateAction<SectionType[] | null>>;
  activeSection: string | null;
  setActiveSection: React.Dispatch<React.SetStateAction<string | null>>;
};

export const SectionsContext = createContext<SectionsContextType | undefined>(
  undefined,
);

export function useSections() {
  const context = useContext(SectionsContext);
  if (!context) {
    throw new Error("useSections must be used within an EditorProvider");
  }
  return context;
}
