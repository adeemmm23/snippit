import {
  File02Icon,
  FloppyDiskIcon,
  LayoutAlignLeftIcon,
  LayoutAlignRightIcon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";
import { usePanelRef } from "react-resizable-panels";
import { toast } from "sonner";

import FilePath from "./file-path";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEditor } from "@/context/editor/editor-context";
import { useFiles } from "@/context/files/files-context";

type AppbarProps = {
  leftPanelRef: ReturnType<typeof usePanelRef>;
  rightPanelRef: ReturnType<typeof usePanelRef>;
};
export default function Appbar({ leftPanelRef, rightPanelRef }: AppbarProps) {
  const { saveActiveFile, setActiveFilePath } = useFiles();
  const { setTemplate } = useEditor();
  const [isWindowSmall, setIsWindowSmall] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsWindowSmall(true);
        leftPanelRef.current?.collapse();
      } else {
        setIsWindowSmall(false);
        leftPanelRef.current?.expand();
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [leftPanelRef]);

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
    <div className="flex gap-2 px-2 py-2">
      <Button
        variant="ghost"
        onClick={() => {
          if (leftPanelRef.current?.isCollapsed()) {
            if (isWindowSmall) {
              rightPanelRef.current?.collapse();
            }
            leftPanelRef.current?.expand();
          } else {
            leftPanelRef.current?.collapse();
          }
        }}
      >
        <HugeiconsIcon icon={LayoutAlignLeftIcon} className="size-4" />
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          setTemplate("");
          setActiveFilePath([]);
        }}
      >
        <HugeiconsIcon icon={File02Icon} className="size-4" />
      </Button>
      <Separator orientation="vertical" className="my-auto h-5" />
      <FilePath />
      <Separator orientation="vertical" className="my-auto ml-auto h-5" />
      <Button
        variant="ghost"
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
      <Button variant="ghost">
        <HugeiconsIcon icon={Settings01Icon} className="size-4" />
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          if (rightPanelRef.current?.isCollapsed()) {
            if (isWindowSmall) {
              leftPanelRef.current?.collapse();
            }
            rightPanelRef.current?.expand();
          } else {
            rightPanelRef.current?.collapse();
          }
        }}
      >
        <HugeiconsIcon icon={LayoutAlignRightIcon} className="size-4" />
      </Button>
    </div>
  );
}
