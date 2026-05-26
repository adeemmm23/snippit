import { create } from "zustand";
import { persist } from "zustand/middleware";

import { extractParts } from "./utils";
import useSettingsStore from "../settings/settings-store";

import { VARIABLE_FORMATS } from "@/constants/files.constants";
import type { Part } from "@/types/editor.types";

type EditorStore = {
  template: string;
  variables: Record<string, string>;
  parts: Part[];
  setTemplate: (template: string) => void;
  setVariable: (name: string, value: string) => void;
  resetVariables: () => void;
};

export const useEditorStore = create<EditorStore>()(
  persist(
    (set, get) => ({
      template: "",
      variables: {},
      parts: [],
      setVariable: (name, value) => {
        set((state) => ({
          variables: {
            ...state.variables,
            [name]: value,
          },
        }));

        // Refresh the template to update the variable values in the parts
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
      setTemplate: (template) => {
        const { label: regexLabel, value: regexValue } = VARIABLE_FORMATS.find(
          (format) =>
            format.label === useSettingsStore.getState().variableFormat,
        )!;

        const { newVariables, newParts } = extractParts({
          template,
          variables: get().variables,
          regexLabel,
          regexValue,
        });

        set({
          template,
          variables: newVariables,
          parts: newParts,
        });
      },
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
