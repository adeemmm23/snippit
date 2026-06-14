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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  type: "file" | "folder";
  path: string[];
  isActive?: boolean;
  isNew?: boolean;
  onClick: () => void;
};

export default function Node({
  name,
  type,
  onClick,
  isActive,
  path,
}: NodeProps) {
  const removeItem = useFilesStore((state) => state.removeItem);
  const renameItem = useFilesStore((state) => state.renameItem);

  const [isRenaming, setIsRenaming] = useState(false);
  // const [isSelected, setIsSelected] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

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
    renameItem(path, newName);
    setIsRenaming(false);
  };

  const handleRenameCancel = () => {
    setIsRenaming(false);
  };

  const isDraggingOver = type == "folder" && isDropTarget && !isDragging;

  // TODO: check styling
  return (
    <>
      <Button
        variant="ghost"
        nativeButton={false}
        className={cn(
          "group w-full justify-start pr-0",
          isActive && "bg-foreground/5 hover:bg-foreground/10",
          isDraggingOver && "bg-primary/20 border-primary/50",
          isDragging && "opacity-50",
        )}
        render={
          <div
            ref={(node) => {
              nodeRef(node);
              if (type == "folder") dropRef(node);
            }}
            role="button"
            tabIndex={0}
            title={name}
            data-path={path.join("/")}
            // onClick={(e) => {
            //   e.stopPropagation();
            //   setIsSelected((prev) => !prev);
            // }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              if (!isRenaming) {
                onClick();
              }
            }}
          >
            <HugeiconsIcon
              icon={type == "file" ? File01Icon : Folder01Icon}
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
                      <HugeiconsIcon
                        icon={MoreVerticalIcon}
                        className="size-4"
                      />
                    </Button>
                  }
                />
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={handleRenameStart}>
                      <HugeiconsIcon
                        icon={InputCursorTextIcon}
                        className="size-4"
                      />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsOpened(true);
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
        }
      ></Button>
      <Dialog open={isOpened} onOpenChange={setIsOpened}>
        <DialogContent forceOverlayRender className="bg-popover">
          <DialogHeader>
            <DialogTitle>Remove {name}</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {name}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button
              className="relative"
              variant="destructive"
              onClick={() => removeItem(path)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
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
