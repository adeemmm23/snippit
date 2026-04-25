import { createContext, useContext } from "react";

import type { FileSystemItem } from "@/components/files/types";

type FilesContextType = {
  activeFilePath: string[];
  setActiveFilePath: React.Dispatch<React.SetStateAction<string[]>>;
  currentWorkingFolder: string[];
  setCurrentWorkingFolder: React.Dispatch<React.SetStateAction<string[]>>;
  files: FileSystemItem[];
  setFiles: React.Dispatch<React.SetStateAction<FileSystemItem[]>>;
  saveActiveFile: () => boolean;
  createFile: (path: string[], content: string) => void;
  createFolder: (path: string[]) => void;
  removeItem: (path: string[]) => void;
  renameItem: (oldPath: string[], newPath: string[]) => void;
};

export const FilesContext = createContext<FilesContextType | undefined>(
  undefined,
);

export function useFiles() {
  const context = useContext(FilesContext);
  if (!context) {
    throw new Error("useEditor must be used within an EditorProvider");
  }
  return context;
}
