import { useDefaultLayout } from "react-resizable-panels";

import { Input } from "./input";
import { Output } from "./output";

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

export default function Editor() {
  const { defaultLayout, onLayoutChanged } = useDefaultLayout({
    id: "editor-layout",

    storage: localStorage,
  });
  return (
    <ResizablePanelGroup
      defaultLayout={defaultLayout}
      onLayoutChanged={onLayoutChanged}
      orientation="vertical"
    >
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
