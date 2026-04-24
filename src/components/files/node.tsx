import {
  File01Icon,
  Folder01Icon,
  MoreVerticalIcon,
  InputCursorTextIcon,
  Delete02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState, useRef, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useEditor } from "@/context/editor/editor-context";
import { cn } from "@/lib/utils";



type NodeProps = {
  name: string;
  isFile: boolean;
  path: string[];
  isActive?: boolean;
  onClick: () => void;
};

export default function Node({
  name,
  isFile,
  onClick,
  isActive,
  path,
}: NodeProps) {
  const { removeItem, renameItem } = useEditor();
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(name);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isRenaming && spanRef.current) {
      spanRef.current.focus();
      // Select all text
      const range = document.createRange();
      range.selectNodeContents(spanRef.current);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, [isRenaming]);

  const handleRenameStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRenaming(true);
    setNewName(name);
  };

  const handleRenameEnd = () => {
    if (newName.trim() && newName !== name) {
      const newPath = [...path];
      newPath[newPath.length - 1] = newName.trim();
      renameItem(path, newPath);
    }
    setIsRenaming(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleRenameEnd();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsRenaming(false);
    }
  };

  const handleInput = (e: React.InputEvent<HTMLSpanElement>) => {
    const text = e.currentTarget.textContent.trim() || "";
    setNewName(text);
  };

  return (
    <Button
      key={name}
      title={name}
      data-path={path.join("/")}
      variant="ghost"
      size="default"
      className={cn(
        "group/file w-full justify-start gap-2 pr-0",
        isActive &&
        "bg-primary/10 hover:bg-primary/20! text-primary-foreground! focus-within:bg-primary/20 focus:bg-primary/20",
      )}
      onClick={() => {
        if (!isRenaming) {
          onClick();
        }
      }}
    >
      <HugeiconsIcon
        icon={isFile ? File01Icon : Folder01Icon}
        className="size-4"
      />
      {isRenaming ? (
        <span
          ref={spanRef}
          contentEditable="plaintext-only"
          suppressContentEditableWarning
          className="bg-primary/10 focus:bg-primary/20 flex-1 cursor-text overflow-hidden rounded px-0.5 text-start text-ellipsis whitespace-nowrap outline-none"
          onBlur={handleRenameEnd}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
        >
          {name}
        </span>
      ) : (
        <span className="overflow-hidden px-0.5 text-ellipsis whitespace-nowrap">
          {name}
        </span>
      )}
      <div className="ml-auto flex size-9 items-center justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon-xs"
              className="pointer-events-none shrink-0 opacity-0 group-hover/file:pointer-events-auto group-hover/file:opacity-100"
            >
              <HugeiconsIcon icon={MoreVerticalIcon} className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleRenameStart}>
                <HugeiconsIcon icon={InputCursorTextIcon} className="size-4" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(path);
                }}
              >
                <HugeiconsIcon icon={Delete02Icon} className="size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Button>
  );
}
