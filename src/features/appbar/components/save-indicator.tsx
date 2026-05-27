import { useEditorStore } from "@/stores/editor/editor-store";
import { useFilesStore } from "@/stores/files/files-store";
import { isFile } from "@/types/node.types";
import { getNodeContent } from "@/utils/files.utils";

export default function SaveIndicator() {
  const activeFilePath = useFilesStore((state) => state.activeFile);
  const files = useFilesStore((state) => state.files);

  const node = getNodeContent(activeFilePath, files);
  const template = useEditorStore((state) => state.template);

  if (node && isFile(node) && node.content !== template) {
    return <span className="text-primary"> •</span>;
  }

  return null;
}
