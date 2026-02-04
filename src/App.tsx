// import { SnippetEditor } from "@/components/snippet-editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Variables from "./components/variables";
import Editor from "./components/editor";
import { useState, useEffect } from "react";

export default function App() {
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

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVariables(newVariables);
  }, [template]);

  return (
    <div className="min-h-screen bg-background p-4 h-screen">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel
          defaultSize={300}
          minSize={200}
          className="bg-card p-4 border border-border rounded-md  mr-4"
        >
          Files
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          minSize="50%"
          className="bg-card p-4 border border-border rounded-md  mx-4"
        >
          <Editor
            template={template}
            setTemplate={setTemplate}
            variables={variables}
            setVariables={setVariables}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          defaultSize={300}
          minSize={200}
          className="bg-card p-4 border border-border rounded-md  ml-4"
        >
          <Variables variables={variables} setVariables={setVariables} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
