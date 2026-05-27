export type FileType = {
  type: "file";
  name: string;
  content: string;
};

export type FolderType = {
  type: "folder";
  name: string;
  files: NodeType[];
};

export type NodeType = FileType | FolderType;

export function isFile(item: NodeType): item is FileType {
  return item.type === "file";
}

export function isFolder(item: NodeType): item is FolderType {
  return item.type === "folder";
}
