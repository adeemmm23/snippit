import {
  Delete01Icon,
  Loading03Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";

import DateAddon from "./date-addon";
import DurationAddon from "./duration-addon";
import PasswordAddon from "./password-addon";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditor } from "@/context/editor/editor-context";

type MagicType = "date" | "duration" | "password";

export default function Variables() {
  const { variables, setVariable, resetVariables } = useEditor();
  const [magicTypes, setMagicTypes] = useState<
    {
      name: string;
      type: MagicType | null;
      settings?: Record<string, string | number | boolean>;
    }[]
  >([]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "l" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        resetVariables();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [resetVariables]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // enter + meta/ctrl to focus first variable input
      if (e.code === "Enter" && (e.metaKey || e.ctrlKey)) {
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

  useEffect(() => {
    const storedMagicTypes = localStorage.getItem("magicInputs");
    if (storedMagicTypes) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMagicTypes(JSON.parse(storedMagicTypes));
    }
  }, []);

  return (
    <div className="border-border flex h-full min-w-48 grow flex-col gap-2 rounded-md rounded-r-none border border-r-0 p-2">
      <div className="flex items-center justify-between py-2">
        {Object.keys(variables).length > 0 && (
          <>
            <Label className="px-2 text-lg font-medium">Variables</Label>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => resetVariables()}
                    >
                      <HugeiconsIcon icon={Loading03Icon} className="h-4 w-4" />
                    </Button>
                  }
                />
                <TooltipContent side="left">
                  Reset variables
                  <KbdGroup>
                    <Kbd>Ctrl</Kbd>
                    <span>+</span>
                    <Kbd>L</Kbd>
                  </KbdGroup>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button variant="ghost" size="icon" onClick={() => {}}>
                      <HugeiconsIcon
                        icon={InformationCircleIcon}
                        className="h-4 w-4"
                      />
                    </Button>
                  }
                />
                <TooltipContent side="left">
                  Select first variable
                  <KbdGroup>
                    <Kbd>Ctrl</Kbd>
                    <span>+</span>
                    <Kbd>Enter</Kbd>
                  </KbdGroup>
                </TooltipContent>
              </Tooltip>
            </div>
          </>
        )}
      </div>

      {Object.keys(variables).length === 0 ? (
        <div className="text-muted-foreground my-auto py-8 text-center">
          <div className="bg-muted mb-4 inline-flex items-center justify-center rounded-sm p-2">
            <HugeiconsIcon icon={Delete01Icon} className="size-5" />
          </div>
          <p className="text-sm">No variables detected</p>
          <p className="mt-2 text-xs">Add [Something] to your template</p>
          <Button variant="ghost" size="xs" className="mt-4">
            Learn More
          </Button>
        </div>
      ) : (
        <ScrollArea className="grow overflow-auto">
          <div className="flex h-full flex-col gap-4 py-1">
            {Object.keys(variables).map((varName) => {
              let InputAddon: React.ReactNode = null;

              const magicType = magicTypes.find((m) =>
                varName.toLowerCase().includes(m.name.toLowerCase()),
              );

              switch (magicType?.type) {
                case "password":
                  InputAddon = (
                    <PasswordAddon
                      onGenerate={(generatedPassword) => {
                        setVariable(varName, generatedPassword);
                      }}
                      options={magicType.settings}
                    />
                  );
                  break;
                case "date":
                  InputAddon = (
                    <DateAddon
                      onSelect={(formatedDate) => {
                        setVariable(varName, formatedDate);
                      }}
                      // options={magicType.settings}
                    />
                  );
                  break;
                case "duration":
                  InputAddon = (
                    <DurationAddon
                      onSelect={(formatedDuration) => {
                        setVariable(varName, formatedDuration);
                      }}
                      // options={magicType.settings}
                    />
                  );
                  break;
                default:
                  InputAddon = null;
              }
              return (
                <div key={varName} className="flex w-full flex-col gap-1">
                  <Label
                    htmlFor={varName}
                    className="mb-2 flex items-center gap-2 px-2"
                  >
                    {varName}
                  </Label>
                  <InputGroup>
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
                      onChange={(e) => setVariable(varName, e.target.value)}
                      placeholder={`Enter ${varName}...`}
                    />

                    {variables[varName] && (
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => setVariable(varName, "")}
                        >
                          <HugeiconsIcon
                            icon={Delete01Icon}
                            className="size-4"
                          />
                        </InputGroupButton>
                      </InputGroupAddon>
                    )}
                    {InputAddon}
                  </InputGroup>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
