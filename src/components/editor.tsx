import { useState, useRef, useEffect } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Copy01Icon, Delete02Icon } from "@hugeicons/core-free-icons";
import { useEditor } from "@/context/editor/editor-context";

import { toast } from "sonner";
import { ScrollArea } from "./ui/scroll-area";

export default function Editor() {
  const { variables, setVariables, template, setTemplate } = useEditor();
  const [copied, setCopied] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  // Sync the contentEditable div with the template state
  useEffect(() => {
    if (editorRef.current) {
      const currentText = editorRef.current.innerText || "";
      if (currentText !== template) {
        editorRef.current.innerText = template;
      }
    }
  }, [template]);

  // Handle copy to clipboard
  const handleCopy = async (isShortcut: boolean | undefined = false) => {
    const output = generatePreview();
    await navigator.clipboard.writeText(output);
    !isShortcut && setCopied(true);
    toast.success("Copied successfully", {
      icon: <HugeiconsIcon icon={Copy01Icon} className="size-4" />,
    });
    !isShortcut && setTimeout(() => setCopied(false), 2000);
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

  // Handle clear template
  const handleClear = () => {
    setTemplate("");
    setVariables({});
  };

  // Replace variables in template with their values
  const generatePreview = () => {
    let preview = template;
    Object.entries(variables).forEach(([name, value]) => {
      const regex = new RegExp(`\\[${name}\\]`, "g");
      preview = preview.replace(regex, value || `[${name}]`);
    });
    return preview;
  };
  // Render final output with blue highlighted values
  const renderFinalOutput = () => {
    const parts = [];
    const replacements: Array<{
      start: number;
      end: number;
      value: string;
      isFilled: boolean;
    }> = [];

    // Find all variables and their positions
    Object.entries(variables).forEach(([name, value]) => {
      const regex = new RegExp(`\\[${name}\\]`, "g");
      let match;
      while ((match = regex.exec(template)) !== null) {
        replacements.push({
          start: match.index,
          end: match.index + match[0].length,
          value: value || `[${name}]`,
          isFilled: !!value,
        });
      }
    });

    // Sort replacements by position
    replacements.sort((a, b) => a.start - b.start);

    // Build the output with highlighted values
    let lastIndex = 0;
    replacements.forEach((replacement, index) => {
      // Add text before the replacement
      if (replacement.start > lastIndex) {
        parts.push(
          <span key={`text-${index}`}>
            {template.substring(lastIndex, replacement.start)}
          </span>,
        );
      }

      // Add the replacement value or variable name in blue
      parts.push(
        <span key={`value-${index}`} className="text-primary-foreground">
          {replacement.value}
        </span>,
      );

      lastIndex = replacement.end;
    });

    // Add remaining text
    if (lastIndex < template.length) {
      parts.push(
        <span key={`text-remaining`}>{template.substring(lastIndex)}</span>,
      );
    }

    return parts.length > 0 ? parts : generatePreview();
  };

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
            <div
              ref={editorRef}
              contentEditable="plaintext-only"
              onInput={(e) => {
                const text = e.currentTarget.innerText || "";
                setTemplate(text);
              }}
              className="min-h-full p-3 font-mono text-base outline-none"
              suppressContentEditableWarning
            />
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
          <div className="min-h-full p-3 font-mono text-base leading-relaxed whitespace-pre-wrap">
            {renderFinalOutput()}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
