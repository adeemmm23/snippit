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
import { useFilesStore } from "@/stores/files/files-store";
import { cn } from "@/utils/cn";

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
  const removeItem = useFilesStore((state) => state.removeItem);
  const renameItem = useFilesStore((state) => state.renameItem);
  const [isRenaming, setIsRenaming] = useState(false);

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

  const handleRenameStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRenaming(true);
  };

  const handleRenameEnd = (newName: string) => {
    renameItem(path, [...path.slice(0, -1), newName]);
    setIsRenaming(false);
  };

  const handleRenameCancel = () => {
    setIsRenaming(false);
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
        "group hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 focus-visible:border-ring focus-visible:ring-ring/50 flex h-9 w-full items-center justify-start gap-2 rounded-md border border-transparent pl-2.5 text-sm font-medium transition-all outline-none select-none focus-visible:ring-[3px]",
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
      <Name
        name={name}
        isRenaming={isRenaming}
        onRenameEnd={handleRenameEnd}
        onRenameCancel={handleRenameCancel}
      />
      <div className="ml-auto flex size-9 shrink-0 items-center justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger
            onClick={(e) => e.stopPropagation()}
            render={
              <Button
                variant="ghost"
                size="icon-xs"
                className="pointer-events-none shrink-0 opacity-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100 data-popup-open:pointer-events-auto data-popup-open:opacity-100"
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

function Name({
  name,
  isRenaming,
  onRenameEnd,
  onRenameCancel,
}: {
  name: string;
  isRenaming: boolean;
  onRenameEnd: (newName: string) => void;
  onRenameCancel: () => void;
}) {
  const [newName, setNewName] = useState(name);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isRenaming && spanRef.current) {
      setNewName(name);
      spanRef.current.textContent = name;
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
  }, [isRenaming, name]);

  const commitRename = () => {
    const nextName = newName.trim();
    if (nextName && nextName !== name) {
      onRenameEnd(nextName);
    } else {
      onRenameCancel();
    }
  };

  const cancelRename = () => {
    setNewName(name);
    if (spanRef.current) {
      spanRef.current.textContent = name;
    }
    onRenameCancel();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commitRename();
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancelRename();
    }
  };

  const handleInput = (e: React.InputEvent<HTMLSpanElement>) => {
    const text = e.currentTarget.textContent || "";
    setNewName(text);
  };

  if (isRenaming)
    return (
      <span
        ref={spanRef}
        contentEditable="plaintext-only"
        autoCorrect="off"
        suppressContentEditableWarning
        className="bg-primary/10 focus:bg-primary/20 box-border block min-w-0 flex-1 grow cursor-text overflow-hidden rounded-xs px-0.5 text-start text-ellipsis whitespace-nowrap outline-none"
        onBlur={cancelRename}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
      >
        {name}
      </span>
    );
  return (
    <span className="box-border min-w-0 grow overflow-hidden px-0.5 text-start text-ellipsis whitespace-nowrap">
      {name}
    </span>
  );
}
