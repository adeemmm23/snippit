export function computeParts(
  template: string,
  variables: Record<string, string>,
) {
  const variableFormat = useSettingsStore.getState().variableFormat;
  const { value: regexValue, label: regexLabel } = VARIABLE_FORMATS.find(
    (f) => f.label === variableFormat,
  )!;

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
    const value = variables[varName] || "";

    newParts.push({
      text: value === "" ? regexLabel.replace("variable", varName) : value,
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

  return newParts;
}
