import { Copy01Icon, Delete02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Input } from "./input";
import { Output } from "./output";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEditor } from "@/context/editor/editor-context";

export default function Editor() {
  const { setTemplate, parts } = useEditor();
  const [copied, setCopied] = useState(false);

  // Handle copy to clipboard
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

  const handleClear = () => {
    setTemplate("");
  };

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
    <div className="flex h-full flex-col">
      {/* Template Editor */}
      <div className="mb-4 flex min-h-0 flex-1 flex-col">
        <div className="align-center mb-2 flex justify-between gap-2">
          <Label className="px-2">Message Template</Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="gap-2"
          >
            <HugeiconsIcon icon={Delete02Icon} className="h-4 w-4" />
            Clear
          </Button>
        </div>
        <div className="border-input focus:ring-ring/50 bg-input/10 dark:bg-input/30 flex min-h-0 flex-1 overflow-hidden rounded-md border shadow-xs transition-all focus:ring-2 focus:outline-none">
          <ScrollArea className="h-full w-full">
            <Input />
          </ScrollArea>
        </div>
      </div>

      {/* Final Output */}
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="align-center mb-2 flex justify-between gap-2">
          <Label className="px-2">Final Output</Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleCopy()}
            className="gap-2"
          >
            <HugeiconsIcon icon={Copy01Icon} className="h-4 w-4" />
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
        <ScrollArea className="border-input focus:ring-ring/50 bg-input/10 dark:bg-input/30 min-h-0 flex-1 overflow-auto rounded-md border shadow-xs transition-all focus:ring-2 focus:outline-none">
          <Output />
        </ScrollArea>
      </div>
    </div>
  );
}
