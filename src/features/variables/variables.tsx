import { Delete01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import VariableInput from "./components/variable-input";
import VariablesHeader from "./components/variables-header";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEditorStore } from "@/stores/editor/editor-store";

export default function Variables() {
  const variables = useEditorStore((state) => state.variables);

  const isVariables = Object.keys(variables).length <= 0;

  // TODO: fix layout here
  return (
    <div className="border-border flex h-full min-w-48 grow flex-col gap-2 rounded-md rounded-r-none border border-r-0 py-2">
      {!isVariables ? (
        <>
          <VariablesHeader />
          <ScrollArea className="grow overflow-auto">
            <div className="flex h-full flex-col gap-4 px-2 py-1">
              {Object.keys(variables).map((name, index) => {
                return (
                  <VariableInput
                    key={name}
                    index={index}
                    name={name}
                    value={variables[name]}
                  />
                );
              })}
            </div>
          </ScrollArea>
        </>
      ) : (
        <div className="text-muted-foreground my-auto py-8 text-center">
          <div className="bg-muted mb-4 inline-flex items-center justify-center rounded-sm p-2">
            <HugeiconsIcon icon={Delete01Icon} className="size-5" />
          </div>
          <p className="text-sm">No variables detected</p>
          <p className="mt-2 text-xs">{"Add {Something} to your template"}</p>
          <Button variant="ghost" size="xs" className="mt-4">
            Learn More
          </Button>
        </div>
      )}
    </div>
  );
}
