import { useState, useEffect, useRef } from "react";
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
  const editorRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Save and restore cursor position
  const saveCursorPosition = () => {
    const selection = window.getSelection();
    if (!selection || !editorRef.current || selection.rangeCount === 0)
      return null;

    const range = selection.getRangeAt(0);
    const preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(editorRef.current);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    const start = preSelectionRange.toString().length;

    return { start, end: start + range.toString().length };
  };

  const restoreCursorPosition = (
    position: { start: number; end: number } | null,
  ) => {
    if (!position || !editorRef.current) return;

    const selection = window.getSelection();
    if (!selection) return;

    let charIndex = 0;
    const range = document.createRange();
    range.setStart(editorRef.current, 0);
    range.collapse(true);

    const nodeStack = [editorRef.current];
    let node;
    let foundStart = false;

    while ((node = nodeStack.pop())) {
      if (node.nodeType === Node.TEXT_NODE) {
        const nextCharIndex = charIndex + (node.textContent?.length || 0);
        if (
          !foundStart &&
          position.start >= charIndex &&
          position.start <= nextCharIndex
        ) {
          range.setStart(node, position.start - charIndex);
          foundStart = true;
        }
        if (
          foundStart &&
          position.end >= charIndex &&
          position.end <= nextCharIndex
        ) {
          range.setEnd(node, position.end - charIndex);
          break;
        }
        charIndex = nextCharIndex;
      } else {
        let i = node.childNodes.length;
        while (i--) {
          nodeStack.push(node.childNodes[i]);
        }
      }
    }

    selection.removeAllRanges();
    selection.addRange(range);
  };

  // Handle input and update the editor with styled badges
  const handleEditorInput = () => {
    if (!editorRef.current) return;

    const position = saveCursorPosition();
    const text = editorRef.current.innerText;
    setTemplate(text);

    // Parse and render with badges
    const fragment = document.createDocumentFragment();
    const regex = /\[([^\]]+)\]/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      // Add text before the variable
      if (match.index > lastIndex) {
        fragment.appendChild(
          document.createTextNode(text.substring(lastIndex, match.index)),
        );
      }

      // Create styled span for variable
      const span = document.createElement("span");
      span.className = "bg-blue-100 text-blue-700";
      span.contentEditable = "true";
      span.textContent = match[0];
      fragment.appendChild(span);

      lastIndex = regex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
    }

    // Update DOM
    editorRef.current.innerHTML = "";
    editorRef.current.appendChild(fragment);

    // Restore cursor
    restoreCursorPosition(position);
  };

  // Initialize editor content on mount
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerText !== template) {
      handleEditorInput();
    }
  }, []);

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
              {/*<Textarea
                id="template"
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="min-h-[200px] font-mono text-base mb-6"
                placeholder="Type your message template here..."
              />*/}

              <div
                ref={editorRef}
                id="template-editor"
                className="min-h-[200px] p-4 bg-white rounded-md border font-mono text-base mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                contentEditable={true}
                onInput={handleEditorInput}
                suppressContentEditableWarning={true}
              />

              {/* Preview with Highlights */}
              {/* <div className="mb-4">
                <Label className="text-sm font-semibold mb-2 block">
                  Preview (with highlights)
                </Label>
                <div className="min-h-[80px] p-4 bg-gray-50 rounded-md border text-base leading-relaxed">
                  {renderTemplateWithHighlights()}
                </div>
              </div> */}

              {/* Final Output */}
              {/* <div>
                <Label className="text-sm font-semibold mb-2 block">
                  Final Output
                </Label>
                <div className="min-h-[80px] p-4 bg-white rounded-md border text-base leading-relaxed whitespace-pre-wrap">
                  {renderPreview()}
                </div>
              </div> */}
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
