import { createContext, useContext } from "react";

type FileSystemItem = {
  [key: string]: string | FileSystemItem;
};

type FilesContextType = {
  variables: Record<string, string>;
  setVariables: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  template: string;
  setTemplate: React.Dispatch<React.SetStateAction<string>>;
  filePath: string[];
  setFilePath: React.Dispatch<React.SetStateAction<string[]>>;
  resetFileState: () => void;
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
