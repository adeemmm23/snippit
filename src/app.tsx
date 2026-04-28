import { usePanelRef } from "react-resizable-panels";

import { FilesProvider } from "./context/files/files-provider";

import Appbar from "@/components/appbar";
import Editor from "@/components/editor";
import Files from "@/components/files";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Variables from "@/components/variables";
import { EditorProvider } from "@/context/editor/editor-provider";

export default function App() {
  // Used to toggle panels visibility
  const leftPanelRef = usePanelRef();
  const rightPanelRef = usePanelRef();

  return (
    <EditorProvider>
      <FilesProvider>
        <TooltipProvider>
          <main className="bg-background flex h-screen flex-col">
            <Appbar leftPanelRef={leftPanelRef} rightPanelRef={rightPanelRef} />
            {/*<Separator />*/}
            <ResizablePanelGroup orientation="horizontal" className="mb-2">
              <ResizablePanel
                id="left-sidebar"
                defaultSize={280}
                minSize={260}
                maxSize={300}
                panelRef={leftPanelRef}
                collapsible
                className="mr-2"
                dir="rtl"
              >
                <Files />
              </ResizablePanel>
              <ResizableHandle
                className="bg-transparent"
                withHandle
                side="right"
              />
              <ResizablePanel id="editor" minSize="50%" className="mx-2">
                <Editor />
              </ResizablePanel>
              <ResizableHandle
                className="bg-transparent"
                withHandle
                side="left"
              />
              <ResizablePanel
                id="right-sidebar"
                defaultSize={280}
                minSize={260}
                maxSize={300}
                className="ml-2"
                panelRef={rightPanelRef}
                collapsible
              >
                <Variables />
              </ResizablePanel>
            </ResizablePanelGroup>
          </main>
          <Toaster />
        </TooltipProvider>
      </FilesProvider>
    </EditorProvider>
  );
}
