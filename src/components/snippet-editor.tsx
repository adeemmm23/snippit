import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";

export function SnippetEditor() {
  const [template, setTemplate] = useState(
    "Hello [User], we want to inform you about [Subject]. Your [Status] has been updated.",
  );
  const [variables, setVariables] = useState<Record<string, string>>({});

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

  // Render template with highlighted variables
  const renderTemplateWithHighlights = () => {
    const parts = [];
    const regex = /\[([^\]]+)\]/g;
    let lastIndex = 0;
    let match;

    const text = template;
    while ((match = regex.exec(text)) !== null) {
      // Add text before the variable
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${lastIndex}`}>
            {text.substring(lastIndex, match.index)}
          </span>,
        );
      }

      // Add the variable as a badge
      parts.push(
        <Badge
          key={`var-${match.index}`}
          variant="secondary"
          className="mx-1 bg-blue-100 text-blue-700 hover:bg-blue-200"
        >
          [{match[1]}]
        </Badge>,
      );

      lastIndex = regex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(
        <span key={`text-${lastIndex}`}>{text.substring(lastIndex)}</span>,
      );
    }

    return parts;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Snippet Editor</h1>
        <p className="text-gray-600 mb-6">
          Create message templates with variables like [User], [Subject], etc.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Template Editor */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <Label htmlFor="template" className="text-lg font-semibold mb-2">
                Template Editor
              </Label>
              <p className="text-sm text-gray-500 mb-4">
                Use [VariableName] to create variables
              </p>
              <Textarea
                id="template"
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="min-h-[200px] font-mono text-base"
                placeholder="Type your message template here..."
              />
            </Card>

            {/* Preview with Highlights */}
            <Card className="p-6">
              <Label className="text-lg font-semibold mb-2">
                Template Preview (with highlights)
              </Label>
              <div className="min-h-[100px] p-4 bg-gray-50 rounded-md border text-base leading-relaxed">
                {renderTemplateWithHighlights()}
              </div>
            </Card>

            {/* Final Preview */}
            <Card className="p-6">
              <Label className="text-lg font-semibold mb-2">Final Output</Label>
              <div className="min-h-[100px] p-4 bg-white rounded-md border text-base leading-relaxed whitespace-pre-wrap">
                {renderPreview()}
              </div>
            </Card>
          </div>

          {/* Right Side - Variable Inputs */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <Label className="text-lg font-semibold mb-4">
                Variables ({Object.keys(variables).length})
              </Label>

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
