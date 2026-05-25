import { create } from "zustand";
import { persist } from "zustand/middleware";

import useSettingsStore from "../settings/settings-store";

import { VARIABLE_FORMATS } from "@/constants/files.constants";

export type TemplatePart = {
  text: string;
  isVariable: boolean;
  variableName?: string;
};

type EditorStore = {
  variables: Record<string, string>;
  setVariable: (name: string, value: string) => void;
  resetVariables: () => void;
  template: string;
  setTemplate: (template: string) => void;
  parts: TemplatePart[];
};

export const useEditorStore = create<EditorStore>()(
  persist(
    (set, get) => ({
      variables: {},
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
      resetVariables: () => {
        set((state) => {
          const newVariables: Record<string, string> = {};
          Object.keys(state.variables).forEach((key) => {
            newVariables[key] = "";
          });
          return { variables: newVariables };
        });
        get().setTemplate(get().template);
      },
      template: "",
      setTemplate: (template) => {
        const { value: regexValue, label: regexLabel } = VARIABLE_FORMATS.find(
          (format) =>
            format.label === useSettingsStore.getState().variableFormat,
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
    }),
    { name: "editor" },
  ),
);

// Refreshes the template whenever the variable format changes
useSettingsStore.subscribe(
  (state) => state.variableFormat,
  () => {
    const template = useEditorStore.getState().template;
    useEditorStore.getState().setTemplate(template);
  },
);
