import { Delete01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useRef } from "react";

import Helper from "./helper";

import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { useEditorStore } from "@/stores/editor/editor-store";

type VariableInputProps = {
  name: string;
  index: number;
  value?: string;
  totalVariables: number;
};

export default function VariableInput({
  name,
  index,
  value,
  totalVariables,
}: VariableInputProps) {
  const setVariable = useEditorStore((state) => state.setVariable);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (index > 0) {
      return;
    }

    const down = (e: KeyboardEvent) => {
      if (e.code === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        ref.current?.focus();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [index]);

  return (
    <div className="flex w-full flex-col gap-1">
      <Label htmlFor={name} className="mb-2 flex items-center gap-2 px-2">
        {name}
      </Label>
      <InputGroup>
        <InputGroupInput
          id={"var" + index}
          ref={ref}
          value={value}
          onKeyDown={(e) => {
            // TODO: think of a way to use Ref instead
            if (e.key === "Enter" || e.key === "ArrowDown") {
              e.preventDefault();
              const nextInput = document.getElementById(
                "var" + ((index + 1) % totalVariables),
              ) as HTMLInputElement;

              if (nextInput) {
                nextInput.focus();
              }
            }
            if (e.key === "ArrowUp") {
              e.preventDefault();
              const prevInput = document.getElementById(
                "var" + ((index - 1 + totalVariables) % totalVariables),
              ) as HTMLInputElement;

              if (prevInput) {
                prevInput.focus();
              }
            }
          }}
          onChange={(e) => setVariable(name, e.target.value)}
          placeholder={`Enter ${name}...`}
        />
        {value && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              variant="ghost"
              size="icon-xs"
              onClick={() => setVariable(name, "")}
            >
              <HugeiconsIcon icon={Delete01Icon} className="size-4" />
            </InputGroupButton>
          </InputGroupAddon>
        )}
        <Helper name={name} onChange={(value) => setVariable(name, value)} />
      </InputGroup>
    </div>
  );
}
