export const VARIABLE_FORMATS = [
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
