import { useState, useEffect } from "react";
import Editor from "./editor";
import Variables from "./variables";

export function SnippetEditor() {
  const [template, setTemplate] = useState(
    "Hello [User], we want to inform you about [Subject]. Your [Status] has been updated.",
  );
  const [variables, setVariables] = useState<Record<string, string>>({});

  // Extract variables from template
  useEffect(() => {
    const regex = /\[([^\]]+)\]/g;
    const matches = template.matchAll(regex);
    const foundVars = new Set<string>();

    for (const match of matches) {
      foundVars.add(match[1]);
    }

    // Initialize new variables with empty values
    const newVariables: Record<string, string> = {};
    foundVars.forEach((varName) => {
      newVariables[varName] = variables[varName] || "";
    });

    setVariables(newVariables);
  }, [template]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Editor
        template={template}
        setTemplate={setTemplate}
        variables={variables}
        setVariables={setVariables}
      />
      <Variables variables={variables} setVariables={setVariables} />
    </div>
  );
}
