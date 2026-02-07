import { useEffect, useState, type ReactNode } from "react";
import { EditorContext } from "./editor-context";

type EditorProviderProps = {
  children: ReactNode;
};

export function EditorProvider({ children }: EditorProviderProps) {
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [template, setTemplate] = useState("");
  const [filePath, setFilePath] = useState<string[]>([]);

  useEffect(() => {
    const regex = /\[([^\]]+)\]/g;
    const matches = template.matchAll(regex);
    const foundVars = new Set<string>();

    for (const match of matches) {
      foundVars.add(match[1]);
    }

    const newVariables: Record<string, string> = {};
    foundVars.forEach((varName) => {
      newVariables[varName] = variables[varName] || "";
    });

    setVariables(newVariables);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template]);

  const value = {
    variables,
    setVariables,
    template,
    setTemplate,
    filePath,
    setFilePath,
  };

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
}
