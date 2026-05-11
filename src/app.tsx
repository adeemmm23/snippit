import { useDefaultLayout } from "react-resizable-panels";

import Provider from "./context/provider";

import Appbar from "@/components/appbar";
import Editor from "@/components/editor";
import Files from "@/components/files";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Toaster } from "@/components/ui/sonner";
import Variables from "@/components/variables";

export default function App() {
  const { defaultLayout, onLayoutChanged } = useDefaultLayout({
    id: "main-layout",

    storage: localStorage,
  });
  return (
    <Provider>
      <main className="bg-background flex h-screen flex-col">
        <Appbar />
        <ResizablePanelGroup
          defaultLayout={defaultLayout}
          onLayoutChanged={onLayoutChanged}
          orientation="horizontal"
          className="mb-2"
        >
          <ResizablePanel
            id="left-sidebar"
            defaultSize={280}
            minSize={260}
            maxSize={300}
            collapsible
            dir="rtl"
          >
            <Files />
          </ResizablePanel>
          <ResizableHandle
            className="bg-transparent px-2"
            withHandle
            side="right"
          />
          <ResizablePanel id="editor" minSize="50%">
            <Editor />
          </ResizablePanel>
          <ResizableHandle
            className="bg-transparent px-2"
            withHandle
            side="left"
          />
          <ResizablePanel
            id="right-sidebar"
            defaultSize={280}
            minSize={260}
            maxSize={300}
            collapsible
          >
            <Variables />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
      <Toaster />
    </Provider>
  );
}
