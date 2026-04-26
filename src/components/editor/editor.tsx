import { Input } from "./input";
import { Output } from "./output";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "../ui/resizable";

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
      <ResizableHandle />
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
