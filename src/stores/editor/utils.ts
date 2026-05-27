import type { Part } from "@/types/editor.types";

type ExtractPartsParams = {
  template: string;
  variables: Record<string, string>;
  regexLabel: string;
  regexValue: RegExp;
};

type ExtractPartsResult = {
  newVariables: Record<string, string>;
  newParts: Part[];
};

type ExtractPartsFunction = (params: ExtractPartsParams) => ExtractPartsResult;

export const extractParts: ExtractPartsFunction = ({
  template,
  variables,
  regexLabel,
  regexValue,
}) => {
  const newVariables: Record<string, string> = {};
  const newParts: Part[] = [];

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regexValue.exec(template)) !== null) {
    if (match.index > lastIndex) {
      newParts.push({
        type: "text",
        text: template.slice(lastIndex, match.index),
      });
    }

    const variableName = match[1];
    newVariables[variableName] = variables[variableName] || "";
    const variableText =
      newVariables[variableName] == ""
        ? regexLabel.replace("variable", variableName)
        : newVariables[variableName];

    newParts.push({
      type: "variable",
      text: variableText,
    });

    lastIndex = regexValue.lastIndex;
  }

  if (lastIndex < template.length) {
    newParts.push({
      type: "text",
      text: template.slice(lastIndex),
    });
  }

  return { newVariables, newParts };
};
