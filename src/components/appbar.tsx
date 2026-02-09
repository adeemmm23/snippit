import {
  LayoutAlignLeftIcon,
  File02Icon,
  FloppyDiskIcon,
  Settings01Icon,
  LayoutAlignRightIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";
import { FilePath } from "./file-path";
import { ButtonGroup } from "./ui/button-group";
import { Button } from "./ui/button";
import { usePanelRef } from "react-resizable-panels";
import { useEditor } from "@/context/editor/editor-context";

type AppbarProps = {
  leftPanelRef: ReturnType<typeof usePanelRef>;
  rightPanelRef: ReturnType<typeof usePanelRef>;
  isWindowSmall: boolean;
};
export function Appbar({
  leftPanelRef,
  rightPanelRef,
  isWindowSmall,
}: AppbarProps) {
  const { resetFileState } = useEditor();
  return (
    <div className="flex gap-2 px-2 py-2">
      <ButtonGroup>
        <ButtonGroup>
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
        </ButtonGroup>
        <ButtonGroup>
          <Button
            variant="outline"
            onClick={() => {
              resetFileState();
            }}
          >
            <HugeiconsIcon icon={File02Icon} className="size-4" />
          </Button>
        </ButtonGroup>
      </ButtonGroup>
      <FilePath />
      <ButtonGroup className="ml-auto">
        <ButtonGroup>
          <Button
            variant="outline"
            onClick={() => {
              toast("Saved successfully", {
                icon: (
                  <HugeiconsIcon icon={FloppyDiskIcon} className="size-4" />
                ),
                position: "bottom-center",
              });
            }}
          >
            <HugeiconsIcon icon={FloppyDiskIcon} className="size-4" />
          </Button>
          <Button variant="outline">
            <HugeiconsIcon icon={Settings01Icon} className="size-4" />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
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
        </ButtonGroup>
      </ButtonGroup>
    </div>
  );
}
