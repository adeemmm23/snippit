"use client";

import { createContext, useContext } from "react";

type EditorContextType = {
  variables: Record<string, string>;
  setVariables: (vars: Record<string, string>) => void;
  template: string;
  setTemplate: (value: string) => void;
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
