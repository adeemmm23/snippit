import type { NodeType } from "@/types/node.types";

export const getNodeContent = (
  path: string[],
  files: NodeType[],
): NodeType | null => {
  if (path.length === 0) return null;

  let current = files;

  for (let i = 0; i < path.length - 1; i++) {
    const next = current.find((item) => item.name === path[i]);
    if (!next) return null;
    if (next.type === "file") return next;
    current = next.files;
  }

  return current.find((item) => item.name === path[path.length - 1]) ?? null;
};
