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
      <ResizablePanel minSize="25%" defaultSize="50%" collapsible>
        <Input />
      </ResizablePanel>
      <ResizableHandle className="bg-transparent py-2" withHandle />
      <ResizablePanel minSize="25%" defaultSize="50%" collapsible>
        <Output />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
