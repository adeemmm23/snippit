import {
  Loading03Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { KbdGroup, Kbd } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditorStore } from "@/stores/editor/editor-store";

export default function VariablesHeader() {
  const resetVariables = useEditorStore((state) => state.resetVariables);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "l" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        resetVariables();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="flex items-center justify-between p-2">
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
    </div>
  );
}
