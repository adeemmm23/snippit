import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Delete02Icon,
  Copy01Icon,
  Loading03Icon,
} from "@hugeicons/core-free-icons";

export function SnippetEditor() {
  const [template, setTemplate] = useState(
    "Hello [User], we want to inform you about [Subject]. Your [Status] has been updated.",
  );
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  // Extract variables from template
  useEffect(() => {
    const regex = /\[([^\]]+)\]/g;
    const matches = template.matchAll(regex);
    const foundVars = new Set<string>();

    for (const match of matches) {
      foundVars.add(match[1]);
    }

    // Initialize new variables with empty values
    const newVariables: Record<string, string> = {};
    foundVars.forEach((varName) => {
      newVariables[varName] = variables[varName] || "";
    });

    setVariables(newVariables);
  }, [template]);

  // Replace variables in template with their values
  const renderPreview = () => {
    let preview = template;
    Object.entries(variables).forEach(([name, value]) => {
      const regex = new RegExp(`\\[${name}\\]`, "g");
      preview = preview.replace(regex, value || `[${name}]`);
    });
    return preview;
  };

  // Handle copy to clipboard
  const handleCopy = async () => {
    const output = renderPreview();
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle clear template
  const handleClear = () => {
    setTemplate("");
    setVariables({});
  };

  // Handle reset variables
  const handleResetVariables = () => {
    const resetVars: Record<string, string> = {};
    Object.keys(variables).forEach((key) => {
      resetVars[key] = "";
    });
    setVariables(resetVars);
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
        <span key={`value-${index}`} className="text-blue-600">
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

    return parts.length > 0 ? parts : renderPreview();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Snippet Editor</h1>
        <p className="text-gray-600 mb-6">
          Create message templates with variables like [User], [Subject], etc.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Combined Editor */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              {/* Header with buttons */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <Label htmlFor="template" className="text-lg font-semibold">
                    Snippet Editor
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Use [VariableName] to create variables
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClear}
                    className="gap-2"
                  >
                    <HugeiconsIcon icon={Delete02Icon} className="h-4 w-4" />
                    Clear
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="gap-2"
                  >
                    <HugeiconsIcon icon={Copy01Icon} className="h-4 w-4" />
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </div>

              {/* Template Editor */}
              <Textarea
                id="template"
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="min-h-50 font-mono text-base mb-6"
                placeholder="Type your message template here..."
              />

              {/* Final Output */}
              <div>
                <Label className="text-sm font-semibold mb-2 block">
                  Final Output
                </Label>
                <div className="min-h-20 p-4 bg-white rounded-md border text-base leading-relaxed whitespace-pre-wrap font-mono">
                  {renderFinalOutput()}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Side - Variable Inputs */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-lg font-semibold">
                  Variables ({Object.keys(variables).length})
                </Label>
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
                  <p className="text-xs mt-2">
                    Add [VariableName] to your template
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.keys(variables).map((varName) => (
                    <div key={varName}>
                      <Label
                        htmlFor={varName}
                        className="mb-2 flex items-center gap-2"
                      >
                        <Badge variant="outline" className="font-mono text-xs">
                          {varName}
                        </Badge>
                      </Label>
                      <Input
                        id={varName}
                        value={variables[varName]}
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
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
