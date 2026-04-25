import { useEditor } from "@/context/editor/editor-context";

export function Output() {
  const { parts } = useEditor();

  return (
    <div className="min-h-full p-3 font-mono text-base whitespace-pre-wrap">
      {parts.map((part, index) => (
        <span
          key={index}
          className={part.isVariable ? "text-primary-foreground" : ""}
        >
          {part.text}
        </span>
      ))}
    </div>
  );
}
