import { useEditorStore } from "@/stores/editor/editor-store";
import { useFilesStore } from "@/stores/files/files-store";
import { isFile } from "@/types/node.types";
import { getNodeContent } from "@/utils/files.utils";

export default function SaveIndicator() {
  const activeFilePath = useFilesStore((state) => state.activeFile);
  const collections = useFilesStore((state) => state.collections);
  const activeCollection = useFilesStore((state) => state.activeCollection);
  const files =
    collections.find((c) => c.name === activeCollection)?.files || [];

  const node = getNodeContent(activeFilePath, files);
  const template = useEditorStore((state) => state.template);

  if (node && isFile(node) && node.content !== template) {
    return <span className="text-primary"> •</span>;
  }

  return null;
}
