"use client";

import { createContext, useContext } from "react";

type EditorContextType = {
  variables: Record<string, string>;
  setVariables: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  template: string;
  setTemplate: React.Dispatch<React.SetStateAction<string>>;
};

export const EditorContext = createContext<EditorContextType | undefined>(
  undefined,
);

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor must be used within an EditorProvider");
  }
  return context;
}
