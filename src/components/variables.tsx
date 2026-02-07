import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Loading03Icon } from "@hugeicons/core-free-icons";
import { Input } from "./ui/input";
import { useEditor } from "@/context/editor/editor-context";

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
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Label className="text-lg font-semibold">Variables</Label>
        {Object.keys(variables).length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetVariables}
            className="gap-2 h-8"
          >
            <HugeiconsIcon icon={Loading03Icon} className="h-4 w-4" />
            Reset
          </Button>
        )}
      </div>

      {Object.keys(variables).length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p className="text-sm">No variables detected</p>
          <p className="text-xs mt-2">Add [VariableName] to your template</p>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.keys(variables).map((varName) => (
            <div key={varName}>
              <Label htmlFor={varName} className="mb-2 flex items-center gap-2">
                {varName}
              </Label>
              <Input
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
                className="w-full"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
