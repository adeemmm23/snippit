import { Copy01Icon, Checkmark } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditorStore } from "@/stores/editor/editor-store";
import { cn } from "@/utils/cn";

export function Output() {
  const parts = useEditorStore((state) => state.parts);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (isShortcut: boolean | undefined = false) => {
    const output = parts.map((part) => part.text).join("");
    await navigator.clipboard.writeText(output);

    if (!isShortcut) {
      setCopied(true);
    }

    toast.success("Copied successfully", {
      icon: <HugeiconsIcon icon={Copy01Icon} className="size-4" />,
    });

    if (!isShortcut) {
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // TODO: move copy to its own component
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === "Space" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleCopy(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [handleCopy]);

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleCopy()}
              className="absolute top-2 right-2 z-10"
            >
              <HugeiconsIcon
                icon={copied ? Checkmark : Copy01Icon}
                className="h-4 w-4"
              />
            </Button>
          }
        />
        <TooltipContent side="left">
          <p>Copy output</p>
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <span>+</span>
            <Kbd>Space</Kbd>
          </KbdGroup>
        </TooltipContent>
      </Tooltip>
      <ScrollArea className="border-input focus:ring-ring/50 bg-input/10 dark:bg-input/30 min-h-0 flex-1 overflow-auto rounded-md border shadow-xs transition-all focus:ring-2 focus:outline-none">
        <div className="min-h-full p-3 font-mono text-base whitespace-pre-wrap">
          {parts.map((part, index) => (
            <span
              key={index}
              className={cn(
                part.type == "variable" &&
                  "dark:text-primary text-primary-foreground",
              )}
            >
              {part.text}
            </span>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
