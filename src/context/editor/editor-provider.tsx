import { useState, type ReactNode } from "react";
import { EditorContext } from "./editor-context";

type EditorProviderProps = {
  children: ReactNode;
};

export function EditorProvider({ children }: EditorProviderProps) {
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [template, setTemplate] = useState("");

  const value = {
    variables,
    setVariables,
    template,
    setTemplate,
  };

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
}
