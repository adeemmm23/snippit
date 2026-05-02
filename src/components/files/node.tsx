import { useDraggable, useDroppable } from "@dnd-kit/react";
import {
  Delete02Icon,
  File01Icon,
  Folder01Icon,
  InputCursorTextIcon,
  MoreVerticalIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFiles } from "@/context/files/files-context";
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
  const { removeItem, renameItem } = useFiles();
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(name);
  const spanRef = useRef<HTMLSpanElement>(null);

  const { isDragging, ref: nodeRef } = useDraggable({
    id: path.join("/"),
    data: {
      path,
      name,
    },
  });

  const { isDropTarget, ref: dropRef } = useDroppable({
    id: path.join("/"),
    data: {
      path,
    },
  });

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
    <div
      ref={(node) => {
        nodeRef(node);
        if (!isFile) dropRef(node);
      }}
      role="button"
      tabIndex={0}
      key={name}
      title={name}
      data-path={path.join("/")}
      className={cn(
        "group/file group/button hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 flex h-9 w-full items-center justify-start gap-2 rounded-md border border-transparent pl-2.5 text-sm font-medium transition-all outline-none select-none",
        isActive &&
          "bg-card/90 hover:bg-card text-card-foreground focus-within:bg-card focus:bg-card",
        !isFile &&
          isDropTarget &&
          !isDragging &&
          "bg-primary/20 border-primary/50",
      )}
      onClick={() => {
        if (!isRenaming) {
          onClick();
        }
      }}
    >
      <HugeiconsIcon
        icon={isFile ? File01Icon : Folder01Icon}
        className="size-4 shrink-0"
      />
      {isRenaming ? (
        <span
          ref={spanRef}
          contentEditable="plaintext-only"
          autoCorrect="off"
          suppressContentEditableWarning
          className="bg-primary/10 focus:bg-primary/20 box-border block min-w-0 flex-1 grow cursor-text overflow-hidden rounded-xs px-0.5 text-start text-ellipsis whitespace-nowrap outline-none"
          onBlur={handleRenameEnd}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
        >
          {name}
        </span>
      ) : (
        <span className="box-border min-w-0 grow overflow-hidden px-0.5 text-start text-ellipsis whitespace-nowrap">
          {name}
        </span>
      )}
      <div className="ml-auto flex size-9 shrink-0 items-center justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger
            onClick={(e) => e.stopPropagation()}
            render={
              <Button
                variant="ghost"
                size="icon-xs"
                className="pointer-events-none shrink-0 opacity-0 group-hover/file:pointer-events-auto group-hover/file:opacity-100"
              >
                <HugeiconsIcon icon={MoreVerticalIcon} className="size-4" />
              </Button>
            }
          />
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
    </div>
  );
}
