import { ArrowLeft01Icon, Home02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useFiles } from "@/context/files/files-context";

export default function FolderHeader() {
  const { currentWorkingFolder, setCurrentWorkingFolder, moveItem } =
    useFiles();
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    nodeRef.current?.setAttribute("data-dragover", "true");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    // Only remove hover if leaving the element entirely
    if (e.currentTarget === e.target) {
      // setIsDragOver(false);
      nodeRef.current?.removeAttribute("data-dragover");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // setIsDragOver(false);
    nodeRef.current?.removeAttribute("data-dragover");

    try {
      const draggedPath = JSON.parse(
        e.dataTransfer.getData("application/json"),
      ) as string[];

      // Move the item to the new folder
      const draggedItemName = draggedPath[draggedPath.length - 1];
      const newPath = [...currentWorkingFolder.slice(0, -1), draggedItemName];
      console.log("Moving item from", draggedPath, "to", newPath);
      moveItem(draggedPath, newPath);
    } catch (error) {
      console.error("Failed to parse drag data:", error);
    }
  };
  return (
    <div>
      {currentWorkingFolder.length > 0 ? (
        <div className="flex w-full gap-1">
          <div
            ref={nodeRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDragEnd={handleDragLeave}
            onDragExit={handleDragLeave}
            onDrop={handleDrop}
            role="button"
            className="group/button hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 data-dragover:bg-primary/20 data-dragover:border-primary/50 flex h-9 w-full min-w-0 flex-1 grow items-center justify-start gap-2 rounded-md border border-transparent pl-2.5 text-sm font-medium transition-all outline-none select-none"
            onClick={() => {
              setCurrentWorkingFolder(currentWorkingFolder.slice(0, -1));
            }}
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
            <span className="overflow-hidden text-ellipsis">
              {currentWorkingFolder[currentWorkingFolder.length - 1]}
            </span>
          </div>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setCurrentWorkingFolder([]);
                  }}
                >
                  <HugeiconsIcon icon={Home02Icon} className="size-4" />
                </Button>
              }
            />
            <TooltipContent side="right">
              <p>Go back to Root</p>
            </TooltipContent>
          </Tooltip>
        </div>
      ) : (
        <Button variant="ghost" className="w-full justify-start gap-2">
          <HugeiconsIcon icon={Home02Icon} className="size-4" />
          <span>Root</span>
        </Button>
      )}
    </div>
  );
}
