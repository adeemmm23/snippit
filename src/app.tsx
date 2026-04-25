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
import { Separator } from "@/components/ui/separator";
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
              <Appbar
                leftPanelRef={leftPanelRef}
                rightPanelRef={rightPanelRef}
              />
              <Separator />
              <ResizablePanelGroup orientation="horizontal">
                <ResizablePanel
                  id="left-sidebar"
                  defaultSize={250}
                  minSize={200}
                  maxSize={300}
                  className="p-2"
                  panelRef={leftPanelRef}
                  collapsible
                  dir="rtl"
                >
                  <Files />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel id="editor" minSize="50%" className="px-2 py-2">
                  <Editor />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel
                  id="right-sidebar"
                  defaultSize={250}
                  minSize={200}
                  maxSize={300}
                  className="p-1" // TODO: inside there is an extra px-1 that result in an equal padding overall; I'll fix it
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
