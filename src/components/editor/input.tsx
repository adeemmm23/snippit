import { Delete02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditor } from "@/context/editor/editor-context";

export function Input() {
  const { template, setTemplate } = useEditor();
  const editorRef = useRef<HTMLDivElement>(null);

  const handleClear = () => {
    setTemplate("");
  };
  // Sync the contentEditable div with the template state
  useEffect(() => {
    if (editorRef.current) {
      const currentText = editorRef.current.innerText || "";
      if (currentText !== template) {
        editorRef.current.innerText = template;
      }
    }
  }, [template]);

  return (
    <div className="relative mb-4 flex min-h-0 flex-1 flex-col">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleClear()}
              className="absolute top-2 right-2 z-10"
            >
              <HugeiconsIcon icon={Delete02Icon} className="h-4 w-4" />
            </Button>
          }
        />
        <TooltipContent side="left">
          <p>Clear text zone</p>
        </TooltipContent>
      </Tooltip>
      <div className="border-input focus:ring-ring/50 bg-input/10 dark:bg-input/30 flex min-h-0 flex-1 overflow-hidden rounded-md border shadow-xs transition-all focus:ring-2 focus:outline-none">
        <ScrollArea className="h-full w-full">
          <div
            ref={editorRef}
            contentEditable="plaintext-only"
            onInput={(e) => {
              const text = e.currentTarget.innerText || "";
              setTemplate(text);
            }}
            onPaste={(e) => {
              e.preventDefault();
              const text = e.clipboardData.getData("text/plain");
              document.execCommand("insertText", false, text);
            }}
            className="min-h-full p-3 font-mono text-base outline-none"
            suppressContentEditableWarning
          />
        </ScrollArea>
      </div>
    </div>
  );
}
