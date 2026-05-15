import { useEffect, useState, type ReactNode } from "react";

import { EditorContext, type TemplatePart } from "./editor-context";

import { VARIABLE_FORMATS } from "@/lib/const";
import useSettingsStore from "@/stores/settings/settings-store";

type EditorProviderProps = {
  children: ReactNode;
};

export function EditorProvider({ children }: EditorProviderProps) {
  const variableFormat = useSettingsStore((state) => state.variableFormat);

  const [variables, setVariables] = useState<Record<string, string>>({});
  const [template, setTemplate] = useState("");
  const [parts, setParts] = useState<TemplatePart[]>([]);

  const setVariable = (name: string, value: string) => {
    setVariables((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetVariables = () => {
    const newVariables: Record<string, string> = {};
    Object.keys(variables).forEach((key) => {
      newVariables[key] = "";
    });
    setVariables(newVariables);
  };

  useEffect(() => {
    const { value: regexValue, label: regexLabel } = VARIABLE_FORMATS.find(
      (format) => format.label === variableFormat,
    )!;

    const foundVars = new Set<string>();
    const newVariables: Record<string, string> = {};
    const newParts: TemplatePart[] = [];

    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regexValue.exec(template)) !== null) {
      if (match.index > lastIndex) {
        newParts.push({
          text: template.slice(lastIndex, match.index),
          isVariable: false,
        });
      }

      const varName = match[1];
      foundVars.add(varName);

      const value = variables[varName] || "";
      newVariables[varName] = value;

      newParts.push({
        text: value == "" ? regexLabel.replace("variable", varName) : value,
        isVariable: true,
        variableName: varName,
      });

      lastIndex = regexValue.lastIndex;
    }

    if (lastIndex < template.length) {
      newParts.push({
        text: template.slice(lastIndex),
        isVariable: false,
      });
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParts(newParts);

    const same = JSON.stringify(newVariables) === JSON.stringify(variables);

    if (!same) {
      setVariables(newVariables);
    }
  }, [template, variables, variableFormat]);

  const value = {
    variables,
    setVariable,
    resetVariables,
    template,
    setTemplate,
    parts,
  };

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
}
