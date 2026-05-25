import { File02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditorStore } from "@/stores/editor/editor-store";
import { useFilesStore } from "@/stores/files/files-store";

export default function TemporaryFileButton() {
  const setActiveFilePath = useFilesStore((state) => state.setActiveFilePath);
  const setTemplate = useEditorStore((state) => state.setTemplate);

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setTemplate("");
              setActiveFilePath([]);
            }}
          >
            <HugeiconsIcon icon={File02Icon} className="size-4" />
          </Button>
        }
      />
      <TooltipContent side="bottom">
        <p>Open temporary file</p>
      </TooltipContent>
    </Tooltip>
  );
}
