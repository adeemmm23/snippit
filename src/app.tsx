import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Variables from "@/components/variables";
import Editor from "@/components/editor";
import { Files, type FileSystemItem } from "@/components/files";
import { EditorProvider } from "@/context/editor/editor-provider";
import { IT_SUPPORT_SNIPPETS } from "@/lib/const";
import { Toaster } from "@/components/ui/sonner";
import { Separator } from "@/components/ui/separator";
import { usePanelRef } from "react-resizable-panels";
import { Appbar } from "./components/appbar";
import { useState } from "react";

export default function App() {
  const leftPanelRef = usePanelRef();
  const rightPanelRef = usePanelRef();

  const getFilesFromStorage = () => {
    const storedFiles = localStorage.getItem("files");
    if (storedFiles) {
      try {
        return JSON.parse(storedFiles);
      } catch (e) {
        console.error("Failed to parse stored files:", e);
      }
    }
    return IT_SUPPORT_SNIPPETS;
  };

  const [files, setFiles] = useState<FileSystemItem>(getFilesFromStorage());

  return (
    <EditorProvider>
      <main className="bg-background flex h-screen flex-col">
        <Appbar
          leftPanelRef={leftPanelRef}
          rightPanelRef={rightPanelRef}
          setFiles={setFiles}
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
            <Files data={files} />
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
