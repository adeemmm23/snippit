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
import { Separator } from "@/components/ui/separator";
import { usePanelRef } from "react-resizable-panels";
import { Appbar } from "./components/appbar";
import { useEffect } from "react";
// import { useState } from "react";

export default function App() {
  const leftPanelRef = usePanelRef();
  const rightPanelRef = usePanelRef();

  useEffect(() => {
    // add transition to flex property to data-attribute resizable-panel for smooth collapsing
    const style = document.createElement("style");
    style.innerHTML = `
      [data-slot="resizable-panel"] {
        transition: flex 0.2s ease;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <EditorProvider>
      <main className="bg-background h-screen flex flex-col">
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
            <Files data={IT_SUPPORT_SNIPPETS} />
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
