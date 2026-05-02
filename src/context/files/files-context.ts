import { createContext, useContext } from "react";

import type { FileSystemItem } from "@/components/files/types";

type FilesContextType = {
  activeFilePath: string[];
  setActiveFilePath: (path: string[]) => void;
  currentWorkingFolder: string[];
  setCurrentWorkingFolder: React.Dispatch<React.SetStateAction<string[]>>;
  files: FileSystemItem[];
  setFiles: React.Dispatch<React.SetStateAction<FileSystemItem[]>>;
  saveActiveFile: () => boolean;
  createItem: (
    path: string[],
    type: "file" | "folder",
    content?: string,
  ) => void;
  removeItem: (path: string[]) => void;
  renameItem: (oldPath: string[], newPath: string[]) => void;
  moveItem: (oldPath: string[], newPath: string[]) => void;
};

export const FilesContext = createContext<FilesContextType | undefined>(
  undefined,
);

export function useFiles() {
  const context = useContext(FilesContext);
  if (!context) {
    throw new Error("useFiles must be used within an FilesProvider");
  }
  return context;
}
