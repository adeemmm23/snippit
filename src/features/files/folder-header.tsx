import { useDroppable } from "@dnd-kit/react";
import { ArrowLeft01Icon, Home02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { cn } from "@/utils/cn";
import { useFilesStore } from "@/stores/files/files-store";

export default function FolderHeader() {
  const currentWorkingFolder = useFilesStore(
    (state) => state.currentWorkingFolder,
  );
  const setCurrentWorkingFolder = useFilesStore(
    (state) => state.setCurrentWorkingFolder,
  );

  const { isDropTarget, ref: dropRef } = useDroppable({
    id: currentWorkingFolder.slice(0, -1).join("/"),
    data: {
      path: currentWorkingFolder.slice(0, -1),
    },
  });

  return (
    <div className="flex px-2">
      {currentWorkingFolder.length > 0 ? (
        <div className="flex w-full gap-1">
          <div
            ref={dropRef}
            role="button"
            tabIndex={0}
            title={currentWorkingFolder[currentWorkingFolder.length - 1]}
            className={cn(
              "group/button hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 focus-visible:border-ring focus-visible:ring-ring/50 flex h-9 w-full min-w-0 flex-1 grow items-center justify-start gap-2 rounded-md border border-transparent pl-2.5 text-sm font-medium transition-all outline-none select-none focus-visible:ring-[3px]",
              isDropTarget && "bg-primary/20 border-primary/50",
            )}
            onClick={() => {
              setCurrentWorkingFolder(currentWorkingFolder.slice(0, -1));
            }}
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
            <span className="overflow-hidden text-nowrap text-ellipsis">
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
