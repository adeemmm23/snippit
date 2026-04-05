import { useEffect, useState, type ReactNode } from "react";
import { EditorContext } from "./editor-context";

type FileSystemItem = {
  [key: string]: string | FileSystemItem;
};

type EditorProviderProps = {
  children: ReactNode;
};

export function EditorProvider({ children }: EditorProviderProps) {
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [template, setTemplate] = useState("");
  const [activeFilePath, setActiveFilePath] = useState<string[]>([]);
  const [currentWorkingFolder, setCurrentWorkingFolder] = useState<string[]>(
    [],
  );

  const getFilesFromStorage = () => {
    const storedFiles = localStorage.getItem("files");
    if (storedFiles) {
      try {
        return JSON.parse(storedFiles);
      } catch (e) {
        console.error("Failed to parse stored files:", e);
      }
    }
    return {};
  };

  const saveFilesToStorage = (files: FileSystemItem) => {
    try {
      localStorage.setItem("files", JSON.stringify(files));
    } catch (e) {
      console.error("Failed to save files to storage:", e);
    }
  };

  const [files, setFiles] = useState<FileSystemItem>(() =>
    getFilesFromStorage(),
  );

  const getAvailableName = (
    current: FileSystemItem,
    baseName: string,
    isFile: boolean = false,
  ): string => {
    if (current[baseName] === undefined) {
      return baseName;
    }

    let counter = 1;
    let finalName = baseName;

    while (current[finalName] !== undefined) {
      if (isFile) {
        finalName = `${baseName} ${counter}`;
      }
      counter++;
    }

    return finalName;
  };

  const createFile = (path: string[], content: string) => {
    setFiles((prevFiles) => {
      const newFiles: FileSystemItem =
        typeof prevFiles === "string"
          ? {}
          : JSON.parse(JSON.stringify(prevFiles));
      let current: FileSystemItem = newFiles;

      for (let i = 0; i < path.length - 1; i++) {
        const segment = path[i];
        if (!current[segment] || typeof current[segment] === "string") {
          current[segment] = {};
        }
        current = current[segment] as FileSystemItem;
      }

      const fileName = path[path.length - 1];
      const finalName = getAvailableName(current, fileName, true);
      current[finalName] = content;
      saveFilesToStorage(newFiles);
      return newFiles;
    });
  };

  const createFolder = (path: string[]) => {
    setFiles((prevFiles) => {
      const newFiles: FileSystemItem =
        typeof prevFiles === "string"
          ? {}
          : JSON.parse(JSON.stringify(prevFiles));
      let current: FileSystemItem = newFiles;

      for (let i = 0; i < path.length - 1; i++) {
        const segment = path[i];
        if (!current[segment] || typeof current[segment] === "string") {
          current[segment] = {};
        }
        current = current[segment] as FileSystemItem;
      }

      const folderName = path[path.length - 1];
      const finalName = getAvailableName(current, folderName, false);
      current[finalName] = {};
      saveFilesToStorage(newFiles);
      return newFiles;
    });
  };

  const saveActiveFile = () => {
    if (activeFilePath.length === 0) return false;

    setFiles((prevFiles) => {
      const newFiles: FileSystemItem =
        typeof prevFiles === "string"
          ? {}
          : JSON.parse(JSON.stringify(prevFiles));
      let current: FileSystemItem = newFiles;

      for (let i = 0; i < activeFilePath.length - 1; i++) {
        const segment = activeFilePath[i];
        if (!current[segment] || typeof current[segment] === "string") {
          current[segment] = {};
        }
        current = current[segment] as FileSystemItem;
      }

      const fileName = activeFilePath[activeFilePath.length - 1];
      current[fileName] = template;
      saveFilesToStorage(newFiles);
      return newFiles;
    });
    return true;
  };

  const resetFileState = () => {
    setActiveFilePath([]);
    setTemplate("");
  };

  useEffect(() => {
    const regex = /\[([^\]]+)\]/g;
    const matches = template.matchAll(regex);
    const foundVars = new Set<string>();

    for (const match of matches) {
      foundVars.add(match[1]);
    }

    const newVariables: Record<string, string> = {};
    foundVars.forEach((varName) => {
      newVariables[varName] = variables[varName] || "";
    });

    setVariables(newVariables);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template]);

  const value = {
    variables,
    setVariables,
    template,
    setTemplate,
    activeFilePath,
    setActiveFilePath,
    resetFileState,
    files,
    setFiles,
    createFile,
    createFolder,
    currentWorkingFolder,
    saveActiveFile,
    setCurrentWorkingFolder,
  };

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
}
