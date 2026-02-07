import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Variables from "./components/variables";
import Editor from "./components/editor";
import { Files } from "./components/files";
import { EditorProvider } from "./context/editor/editor-provider";
import { IT_SUPPORT_SNIPPETS } from "./lib/const";

export default function App() {
  return (
    <EditorProvider>
      <div className="min-h-screen bg-background h-screen">
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel
            defaultSize={300}
            minSize={200}
            className="p-4 rounded-md"
          >
            <Files data={IT_SUPPORT_SNIPPETS} />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel minSize="50%" className="px-8 py-4 rounded-md">
            <Editor />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel
            defaultSize={300}
            minSize={200}
            className="p-4 rounded-md"
          >
            <Variables />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </EditorProvider>
  );
}
