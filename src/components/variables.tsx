import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Loading03Icon, Delete01Icon } from "@hugeicons/core-free-icons";
import { useEditor } from "@/context/editor/editor-context";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { useEffect } from "react";
import { ScrollArea } from "./ui/scroll-area";

export default function Variables() {
  const { variables, setVariables } = useEditor();

  // Handle reset variables
  const handleResetVariables = () => {
    const resetVars: Record<string, string> = {};
    Object.keys(variables).forEach((key) => {
      resetVars[key] = "";
    });
    setVariables(resetVars);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // enter + meta/ctrl to focus first variable input
      if (e.key === "m" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        // focus first input
        const firstVarName = Object.keys(variables)[0];
        const firstInput = document.getElementById(
          firstVarName,
        ) as HTMLInputElement | null;
        if (firstInput) {
          firstInput.focus();
        }
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [variables]);
  return (
    <div className="flex h-full min-w-48 grow flex-col gap-2">
      <div className="flex items-center justify-between">
        {Object.keys(variables).length > 0 && (
          <>
            <Label className="px-2 text-lg font-medium">Variables</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetVariables}
              className="h-8 gap-2"
            >
              <HugeiconsIcon icon={Loading03Icon} className="h-4 w-4" />
              Reset
            </Button>
          </>
        )}
      </div>

      {Object.keys(variables).length === 0 ? (
        <div className="text-muted-foreground my-auto py-8 text-center">
          <div className="bg-muted mb-4 inline-flex items-center justify-center rounded-sm p-2">
            <HugeiconsIcon icon={Delete01Icon} className="size-5" />
          </div>
          <p className="text-sm">No variables detected</p>
          <p className="mt-2 text-xs">Add [VariableName] to your template</p>
          <Button variant="ghost" size="xs" className="mt-4">
            Learn More
          </Button>
        </div>
      ) : (
        <ScrollArea className="grow overflow-auto">
          <div className="flex flex-col gap-4 px-1 py-1">
            {Object.keys(variables).map((varName) => (
              <div key={varName}>
                <Label
                  htmlFor={varName}
                  className="mb-2 flex items-center gap-2 px-2"
                >
                  {varName}
                </Label>
                <InputGroup className="w-full">
                  <InputGroupInput
                    id={varName}
                    value={variables[varName]}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const varKeys = Object.keys(variables);
                        const currentIndex = varKeys.indexOf(varName);
                        const nextIndex = (currentIndex + 1) % varKeys.length;
                        const nextVarName = varKeys[nextIndex];
                        const nextInput = document.getElementById(
                          nextVarName,
                        ) as HTMLInputElement;
                        if (nextInput) {
                          nextInput.focus();
                        }
                      }
                    }}
                    onChange={(e) =>
                      setVariables((prev) => ({
                        ...prev,
                        [varName]: e.target.value,
                      }))
                    }
                    placeholder={`Enter ${varName}...`}
                  />
                  {variables[varName] && (
                    <InputGroupAddon align="inline-end" className="pr-1.5">
                      <Button
                        variant={null}
                        size="icon-sm"
                        className="cursor-pointer"
                        onClick={() =>
                          setVariables((prev) => ({
                            ...prev,
                            [varName]: "",
                          }))
                        }
                      >
                        <HugeiconsIcon icon={Delete01Icon} className="size-4" />
                      </Button>
                    </InputGroupAddon>
                  )}
                </InputGroup>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
