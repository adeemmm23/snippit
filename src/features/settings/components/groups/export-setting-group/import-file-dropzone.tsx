import { File01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRef, useState } from "react";

import { cn } from "@/utils/cn";

type ImportFileDropzoneProps = {
  file: File | null;
  onFileChange: (file: File | null) => void;
};

export default function ImportFileDropzone({
  file,
  onFileChange,
}: ImportFileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        className={cn(
          "border-input hover:border-primary/60 bg-card flex h-full min-h-36 flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-4 text-center transition select-none",
          isDragging && "border-primary bg-primary/10",
        )}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          const droppedFile = event.dataTransfer.files?.[0] ?? null;
          if (droppedFile) {
            onFileChange(droppedFile);
          }
        }}
      >
        <HugeiconsIcon
          icon={File01Icon}
          className="text-muted-foreground size-6"
        />
        <div className="text-sm font-medium">
          {file ? file.name : "Drop JSON file here"}
        </div>
        <div className="text-muted-foreground text-xs">
          {file
            ? "Drop another file to replace or click to browse"
            : "or click to browse"}
        </div>
      </div>
      <input
        ref={inputRef}
        id="import-file"
        type="file"
        accept="application/json"
        className="hidden"
        onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
      />
    </>
  );
}
