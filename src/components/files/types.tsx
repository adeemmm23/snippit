export type FileItem = {
  type: "file";
  name: string;
  content: string;
};

export type FolderItem = {
  type: "folder";
  name: string;
  files: FileSystemItem[];
};

export type FileSystemItem = FileItem | FolderItem;

export function isFile(item: FileSystemItem): item is FileItem {
  return item.type === "file";
}

export function isFolder(item: FileSystemItem): item is FolderItem {
  return item.type === "folder";
}
