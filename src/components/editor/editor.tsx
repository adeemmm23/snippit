import { Input } from "./input";
import { Output } from "./output";

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

export default function Editor() {
  return (
    <ResizablePanelGroup orientation="vertical">
      <ResizablePanel
        minSize="25%"
        defaultSize="50%"
        collapsible
        className="mb-2"
      >
        <Input />
      </ResizablePanel>
      <ResizableHandle className="bg-transparent" withHandle />
      <ResizablePanel
        minSize="25%"
        defaultSize="50%"
        collapsible
        className="mt-2"
      >
        <Output />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
