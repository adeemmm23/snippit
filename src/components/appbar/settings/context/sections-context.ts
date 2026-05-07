import { createContext, useContext } from "react";

type SectionsContextType = {
  sections: { id: string; title: string; isActive: boolean }[];
  setSections: React.Dispatch<
    React.SetStateAction<{ id: string; title: string; isActive: boolean }[]>
  >;
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
