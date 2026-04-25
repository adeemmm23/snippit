import { createContext, useContext } from "react";

import type { FileSystemItem } from "@/components/files/types";

export type TemplatePart = {
  text: string;
  isVariable: boolean;
  variableName?: string;
};

type EditorContextType = {
  variables: Record<string, string>;
  setVariables: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  template: string;
  setTemplate: React.Dispatch<React.SetStateAction<string>>;
  parts: TemplatePart[];
  activeFilePath: string[];
  setActiveFilePath: React.Dispatch<React.SetStateAction<string[]>>;
  currentWorkingFolder: string[];
  setCurrentWorkingFolder: React.Dispatch<React.SetStateAction<string[]>>;
  resetFileState: () => void;
  files: FileSystemItem[];
  setFiles: React.Dispatch<React.SetStateAction<FileSystemItem[]>>;
  saveActiveFile: () => boolean;
  createFile: (path: string[], content: string) => void;
  createFolder: (path: string[]) => void;
  removeItem: (path: string[]) => void;
  renameItem: (oldPath: string[], newPath: string[]) => void;
};

export const EditorContext = createContext<EditorContextType | undefined>(
  undefined,
);

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor must be used within an EditorProvider");
  }
  return context;
}
