export const VARIABLE_FORMATS: { label: string; value: RegExp }[] = [
  { label: "{variable}", value: /\{([a-zA-Z0-9_ ]+)\}/g },
  { label: "{{variable}}", value: /\{\{([a-zA-Z0-9_ ]+)\}\}/g },
  { label: "%variable%", value: /%([a-zA-Z0-9_ ]+)%/g },
  { label: "%%variable%%", value: /%%([a-zA-Z0-9_ ]+)%%/g },
  { label: "<variable>", value: /<([a-zA-Z0-9_ ]+)>/g },
  { label: "((variable))", value: /\(\(([a-zA-Z0-9_ ]+)\)\)/g },
  { label: "[variable]", value: /\[([a-zA-Z0-9_ ]+)\]/g },
  { label: "[[variable]]", value: /\[\[([a-zA-Z0-9_ ]+)\]\]/g },
  { label: "${variable}", value: /\$\{([a-zA-Z0-9_ ]+)\}/g },
];

export const LOCAL_STORAGE_KEY = "files";
