import { useEffect, useRef } from "react";

import { useEditor } from "@/context/editor/editor-context";

export function Input() {
  const { template, setTemplate } = useEditor();
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

  return (
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
  );
}
