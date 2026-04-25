import { createContext, useContext } from "react";

export type TemplatePart = {
  text: string;
  isVariable: boolean;
  variableName?: string;
};

type EditorContextType = {
  variables: Record<string, string>;
  setVariable: (name: string, value: string) => void;
  resetVariables: () => void;
  template: string;
  setTemplate: (template: string) => void;
  parts: TemplatePart[];
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
