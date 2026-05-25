import { FloppyDiskIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { KbdGroup, Kbd } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFilesStore } from "@/stores/files/files-store";

export default function SaveButton() {
  const saveActiveFile = useFilesStore((state) => state.saveActiveFile);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        const isSaved = saveActiveFile();
        if (isSaved) {
          toast.success("File saved successfully!");
        } else {
          toast.error("No active file to save!");
        }
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const isSaved = saveActiveFile();
              if (isSaved) {
                toast.success("File saved successfully!");
              } else {
                toast.error("No active file to save!");
              }
            }}
          >
            <HugeiconsIcon icon={FloppyDiskIcon} className="size-4" />
          </Button>
        }
      />
      <TooltipContent side="bottom">
        <p>Save</p>
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <span>+</span>
          <Kbd>S</Kbd>
        </KbdGroup>
      </TooltipContent>
    </Tooltip>
  );
}
