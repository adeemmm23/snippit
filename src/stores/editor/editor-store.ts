import { create } from "zustand";

import { VARIABLE_FORMATS } from "@/lib/const";

export type TemplatePart = {
  text: string;
  isVariable: boolean;
  variableName?: string;
};

type EditorStore = {
  variables: Record<string, string>;
  variableFormat: string;
  setVariableFormat: (variableFormat: string) => void;
  setVariable: (name: string, value: string) => void;
  resetVariables: () => void;
  template: string;
  setTemplate: (template: string) => void;
  parts: TemplatePart[];
};

const defaultVariableFormat = VARIABLE_FORMATS[0].label;

export const useEditorStore = create<EditorStore>((set, get) => ({
  variables: {},
  variableFormat: defaultVariableFormat,
  setVariableFormat: (variableFormat) => {
    set({ variableFormat });
    get().setTemplate(get().template);
  },
  setVariable: (name, value) => {
    console.log("Setting variable", name, "to", value);
    set((state) => ({
      variables: {
        ...state.variables,
        [name]: value,
      },
    }));
    get().setTemplate(get().template);
  },
  resetVariables: () =>
    set((state) => {
      const newVariables: Record<string, string> = {};
      Object.keys(state.variables).forEach((key) => {
        newVariables[key] = "";
      });
      return { variables: newVariables };
    }),
  template: "",
  setTemplate: (template) => {
    const { value: regexValue, label: regexLabel } = VARIABLE_FORMATS.find(
      (format) => format.label === get().variableFormat,
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

      const value = get().variables[varName] || "";
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

    set({
      template,
      variables: newVariables,
      parts: newParts,
    });
  },
  parts: [],
}));
