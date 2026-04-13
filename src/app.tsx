import Editor from "@/components/editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Variables from "@/components/variables";
import { EditorProvider } from "@/context/editor/editor-provider";

import { Files } from "@/components/files";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { usePanelRef } from "react-resizable-panels";
import { Appbar } from "./components/appbar";

export default function App() {
  const leftPanelRef = usePanelRef();
  const rightPanelRef = usePanelRef();

  return (
    <EditorProvider>
      <main className="bg-background flex h-screen flex-col">
        <Appbar leftPanelRef={leftPanelRef} rightPanelRef={rightPanelRef} />
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
            className="p-1" // inside there is an extra px-1 that result in an equal padding overall; I'll fix it
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
