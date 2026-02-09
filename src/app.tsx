import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Variables from "@/components/variables";
import Editor from "@/components/editor";
import { Files } from "@/components/files";
import { EditorProvider } from "@/context/editor/editor-provider";
import { IT_SUPPORT_SNIPPETS } from "@/lib/const";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import {
  FloppyDiskIcon,
  Settings01Icon,
  LayoutAlignLeftIcon,
  LayoutAlignRightIcon,
  File02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";
import { ButtonGroup } from "@/components/ui/button-group";
import { Separator } from "@/components/ui/separator";
import { FilePath } from "@/components/file-path";
import { usePanelRef } from "react-resizable-panels";
import { useEffect, useState } from "react";

export default function App() {
  const leftPanelRef = usePanelRef();
  const rightPanelRef = usePanelRef();
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
  return (
    <EditorProvider>
      <main className="bg-background h-screen flex flex-col">
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
            <ButtonGroup className="grow">
              <Button variant="outline" className="grow">
                <HugeiconsIcon icon={File02Icon} className="size-4" />
              </Button>
            </ButtonGroup>
          </ButtonGroup>
          <FilePath />
          <ButtonGroup className="ml-auto">
            <ButtonGroup className="grow">
              <Button
                variant="outline"
                className="grow"
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
              <Button variant="outline" className="grow">
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
        <Separator />
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel
            defaultSize={250}
            minSize={200}
            maxSize={300}
            className="p-2"
            panelRef={leftPanelRef}
            collapsible
          >
            <Files data={IT_SUPPORT_SNIPPETS} />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel minSize="50%" className="px-2 py-2">
            <Editor />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel
            defaultSize={250}
            minSize={200}
            maxSize={300}
            className="p-2"
            panelRef={rightPanelRef}
            collapsible
          >
            <Variables />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
      <Toaster />
    </EditorProvider>
  );
}
