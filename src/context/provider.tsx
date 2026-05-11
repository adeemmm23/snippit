import { EditorProvider } from "./editor/editor-provider";
import { FilesProvider } from "./files/files-provider";

import { TooltipProvider } from "@/components/ui/tooltip";

type Props = {
  children: React.ReactNode;
};

export default function Provider({ children }: Props) {
  return (
    <EditorProvider>
      <FilesProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </FilesProvider>
    </EditorProvider>
  );
}
