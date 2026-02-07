import { useState, useRef, useEffect } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Copy01Icon, Delete02Icon } from "@hugeicons/core-free-icons";
import { useEditor } from "@/context/editor/editor-context";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  BreadcrumbPage,
} from "./ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

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
  const handleCopy = async () => {
    const output = generatePreview();
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
        <span key={`value-${index}`} className="text-primary">
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
    <div className="flex flex-col h-full">
      <FilePath />
      {/* Template Editor */}
      <div className="flex-1 flex flex-col mb-4 min-h-0">
        <div className="flex gap-2 align-center justify-between mb-2">
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
        <div
          ref={editorRef}
          contentEditable="plaintext-only"
          onInput={(e) => {
            const text = e.currentTarget.innerText || "";
            setTemplate(text);
          }}
          className="flex-1 font-mono p-3 rounded-md border border-input overflow-auto focus:outline-none focus:ring-2 focus:ring-ring/50  min-h-0 text-base bg-input/10 shadow-xs dark:bg-input/30 transition-all"
          suppressContentEditableWarning
        />
      </div>

      {/* Final Output */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex gap-2 align-center justify-between mb-2">
          <Label className="px-2">Final Output</Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="gap-2"
          >
            <HugeiconsIcon icon={Copy01Icon} className="h-4 w-4" />
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
        <div className="flex-1 p-4 dark:bg-input/30 rounded-md border border-input text-base leading-relaxed whitespace-pre-wrap font-mono shadow-xs overflow-auto min-h-0">
          {renderFinalOutput()}
        </div>
      </div>
    </div>
  );
}

export function FilePath() {
  const { filePath } = useEditor();
  const { fileName, folderName, rest } = filePath.reduce(
    (acc, segment, index) => {
      if (index === filePath.length - 1) {
        acc.fileName = segment;
      } else if (index === filePath.length - 2) {
        acc.folderName = segment;
      } else {
        acc.rest.push(segment);
      }
      return acc;
    },
    { fileName: "", folderName: "", rest: [] as string[] },
  );
  return (
    <Breadcrumb className="h-9 flex items-center px-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink className="select-none">Root</BreadcrumbLink>
        </BreadcrumbItem>
        {rest.length != 0 && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button size="icon-sm" variant="ghost">
                    <BreadcrumbEllipsis />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-50">
                  <DropdownMenuGroup>
                    {rest.map((segment, index) => (
                      <DropdownMenuItem key={index}>{segment}</DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}
        {folderName != "" && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="select-none">
                {folderName}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="select-none">
            {fileName != "" ? filePath[filePath.length - 1] : "New Snippet"}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
