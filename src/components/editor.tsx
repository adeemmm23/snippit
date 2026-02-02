import { useState } from "react";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Copy01Icon, Delete02Icon } from "@hugeicons/core-free-icons";

type EditorProps = {
  template: string;
  setTemplate: (value: string) => void;
  variables: Record<string, string>;
  setVariables: (vars: Record<string, string>) => void;
};

export default function Editor({
  template,
  setTemplate,
  variables,
  setVariables,
}: EditorProps) {
  const [copied, setCopied] = useState(false);

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
    <div className="lg:col-span-2">
      <Card className="p-6">
        <Label className="text-lg font-semibold">Editor</Label>
        {/* Template Editor */}
        <div>
          <div className="flex gap-2 align-center justify-between mb-2">
            <Label>Message Template</Label>
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
          <Textarea
            id="template"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="min-h-50 font-mono mb-6"
            placeholder="Type your message template here..."
          />
        </div>

        {/* Final Output */}
        <div>
          <div className="flex gap-2 align-center justify-between mb-2">
            <Label>Final Output</Label>
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
          <div className="min-h-20 p-4 bg-foreground/5 rounded-md border text-sm leading-relaxed whitespace-pre-wrap font-mono">
            {renderFinalOutput()}
          </div>
        </div>
      </Card>
    </div>
  );
}
