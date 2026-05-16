import {
  File02Icon,
  FloppyDiskIcon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect } from "react";
import { toast } from "sonner";

import FilePath from "./file-path";
import Settings from "./settings/settings";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditorStore } from "@/stores/editor/editor-store";
import { useFilesStore } from "@/stores/files/files-store";

export default function Appbar() {
  const saveActiveFile = useFilesStore((state) => state.saveActiveFile);
  const setActiveFilePath = useFilesStore((state) => state.setActiveFilePath);

  const setTemplate = useEditorStore((state) => state.setTemplate);

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
  }, [saveActiveFile]);

  return (
    <div className="flex gap-2 p-2">
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
      <Separator orientation="vertical" className="my-auto h-5" />
      <FilePath />
      <Separator orientation="vertical" className="my-auto ml-auto h-5" />
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
      <Tooltip>
        <TooltipTrigger
          render={
            <Dialog>
              <DialogTrigger
                render={
                  <Button variant="ghost" size="icon">
                    <HugeiconsIcon icon={Settings01Icon} className="size-4" />
                  </Button>
                }
              />
              <Settings />
            </Dialog>
          }
        />
        <TooltipContent side="bottom">
          <p>Settings</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
