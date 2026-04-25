import { useEffect, useState, type ReactNode } from "react";

import { EditorContext, type TemplatePart } from "./editor-context";

import type {
  FileSystemItem,
  FolderItem,
  FileItem,
} from "@/components/files/types";
import { isFile, isFolder } from "@/components/files/types";

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
  const [parts, setParts] = useState<TemplatePart[]>([]);

  const resetFileState = () => {
    setActiveFilePath([]);
    setTemplate("");
  };

  const getFilesFromStorage = () => {
    const storedFiles = localStorage.getItem("files");
    if (storedFiles) {
      try {
        return JSON.parse(storedFiles);
      } catch (e) {
        console.error("Failed to parse stored files:", e);
      }
    }
    return [];
  };

  const saveFilesToStorage = (files: FileSystemItem[]) => {
    try {
      localStorage.setItem("files", JSON.stringify(files));
    } catch (e) {
      console.error("Failed to save files to storage:", e);
    }
  };

  const [files, setFiles] = useState<FileSystemItem[]>(() =>
    getFilesFromStorage(),
  );

  // Helper function to find an item by path
  const findItemByPath = (
    items: FileSystemItem[],
    path: string[],
  ): FileSystemItem | null => {
    if (path.length === 0) return null;

    let current: FileSystemItem[] = items;

    for (let i = 0; i < path.length - 1; i++) {
      const segment = path[i];
      const found = current.find((item) => item.name === segment);

      if (!found || !isFolder(found)) {
        return null;
      }

      current = found.files;
    }

    const lastSegment = path[path.length - 1];
    return current.find((item) => item.name === lastSegment) || null;
  };

  // Helper function to get parent folder by path
  const getParentFolder = (
    items: FileSystemItem[],
    path: string[],
  ): FileSystemItem[] | null => {
    if (path.length === 0) return items;
    if (path.length === 1) return items;

    let current: FileSystemItem[] = items;

    for (let i = 0; i < path.length - 1; i++) {
      const segment = path[i];
      const found = current.find((item) => item.name === segment);

      if (!found || !isFolder(found)) {
        return null;
      }

      current = found.files;
    }

    return current;
  };

  const getAvailableName = (
    items: FileSystemItem[],
    baseName: string,
  ): string => {
    if (!items.find((item) => item.name === baseName)) {
      return baseName;
    }

    let counter = 1;
    let finalName = baseName;

    while (items.find((item) => item.name === finalName)) {
      finalName = `${baseName} ${counter}`;
      counter++;
    }

    return finalName;
  };

  const createFile = (path: string[], content: string) => {
    setFiles((prevFiles) => {
      const newFiles = JSON.parse(JSON.stringify(prevFiles));
      const parentPath = path.slice(0, -1);
      const fileName = path[path.length - 1];

      let parentItems: FileSystemItem[];

      if (parentPath.length === 0) {
        parentItems = newFiles;
      } else {
        const parentFolder = findItemByPath(newFiles, parentPath);
        if (!parentFolder || !isFolder(parentFolder)) {
          // Create parent folders if they don't exist
          let current: FileSystemItem[] = newFiles;
          for (const segment of parentPath) {
            let folder = current.find(
              (item) => item.name === segment && isFolder(item),
            );
            if (!folder) {
              folder = { type: "folder", name: segment, files: [] };
              current.push(folder);
            }
            current = (folder as FolderItem).files;
          }
          parentItems = current;
        } else {
          parentItems = parentFolder.files;
        }
      }

      const finalName = getAvailableName(parentItems, fileName);
      const newFile: FileItem = {
        type: "file",
        name: finalName,
        content,
      };
      parentItems.push(newFile);

      saveFilesToStorage(newFiles);
      return newFiles;
    });
  };

  const createFolder = (path: string[]) => {
    setFiles((prevFiles) => {
      const newFiles = JSON.parse(JSON.stringify(prevFiles));
      const parentPath = path.slice(0, -1);
      const folderName = path[path.length - 1];

      let parentItems: FileSystemItem[];

      if (parentPath.length === 0) {
        parentItems = newFiles;
      } else {
        const parentFolder = findItemByPath(newFiles, parentPath);
        if (!parentFolder || !isFolder(parentFolder)) {
          // Create parent folders if they don't exist
          let current: FileSystemItem[] = newFiles;
          for (const segment of parentPath) {
            let folder = current.find(
              (item) => item.name === segment && isFolder(item),
            );
            if (!folder) {
              folder = { type: "folder", name: segment, files: [] };
              current.push(folder);
            }
            current = (folder as FolderItem).files;
          }
          parentItems = current;
        } else {
          parentItems = parentFolder.files;
        }
      }

      const finalName = getAvailableName(parentItems, folderName);
      const newFolder: FolderItem = {
        type: "folder",
        name: finalName,
        files: [],
      };
      parentItems.push(newFolder);

      saveFilesToStorage(newFiles);
      return newFiles;
    });
  };

  const saveActiveFile = () => {
    if (activeFilePath.length === 0) return false;

    setFiles((prevFiles) => {
      const newFiles = JSON.parse(JSON.stringify(prevFiles));
      const item = findItemByPath(newFiles, activeFilePath);

      if (!item || !isFile(item)) {
        return prevFiles;
      }

      item.content = template;
      saveFilesToStorage(newFiles);
      return newFiles;
    });
    return true;
  };

  const renameItem = (oldPath: string[], newPath: string[]) => {
    setFiles((prevFiles) => {
      const newFiles = JSON.parse(JSON.stringify(prevFiles));
      const item = findItemByPath(newFiles, oldPath);

      if (!item) {
        return prevFiles;
      }

      const parentPath = oldPath.slice(0, -1);
      const parentItems =
        parentPath.length === 0
          ? newFiles
          : getParentFolder(newFiles, parentPath);

      if (!parentItems) {
        return prevFiles;
      }

      const itemIndex = parentItems.findIndex(
        (i: FileSystemItem) => i.name === oldPath[oldPath.length - 1],
      );
      if (itemIndex === -1) {
        return prevFiles;
      }

      const newName = newPath[newPath.length - 1];
      const finalName = getAvailableName(
        parentItems.filter((_: FileSystemItem, i: number) => i !== itemIndex),
        newName,
      );

      item.name = finalName;
      saveFilesToStorage(newFiles);
      return newFiles;
    });
  };

  const removeItem = (path: string[]) => {
    setFiles((prevFiles) => {
      const newFiles = JSON.parse(JSON.stringify(prevFiles));
      const parentPath = path.slice(0, -1);

      const parentItems =
        parentPath.length === 0
          ? newFiles
          : getParentFolder(newFiles, parentPath);

      if (!parentItems) {
        return prevFiles;
      }

      const itemName = path[path.length - 1];
      const itemIndex = parentItems.findIndex(
        (item: FileSystemItem) => item.name === itemName,
      );

      if (itemIndex === -1) {
        return prevFiles;
      }

      parentItems.splice(itemIndex, 1);
      saveFilesToStorage(newFiles);
      return newFiles;
    });
  };

  const regex = /\{([a-zA-Z0-9_]+)\}/g;

  useEffect(() => {
    const foundVars = new Set<string>();

    let match: RegExpExecArray | null;

    while ((match = regex.exec(template)) !== null) {
      foundVars.add(match[1]);
    }

    const newVariables: Record<string, string> = {};
    foundVars.forEach((varName) => {
      newVariables[varName] = variables[varName] || "";
    });

    setVariables(newVariables);
  }, [template]);

  useEffect(() => {
    const newParts: TemplatePart[] = [];

    let lastIndex = 0;
    let match: RegExpExecArray | null;

    // Use exec in a loop instead of matchAll - slightly faster
    while ((match = regex.exec(template)) !== null) {
      // Add text before the variable
      if (match.index > lastIndex) {
        newParts.push({
          text: template.slice(lastIndex, match.index),
          isVariable: false,
        });
      }

      const varName = match[1];

      // Add the variable with its value
      newParts.push({
        text: match[0],
        isVariable: true,
        variableName: varName,
        value: variables[varName] || "",
      });

      lastIndex = regex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < template.length) {
      newParts.push({
        text: template.slice(lastIndex),
        isVariable: false,
      });
    } else if (newParts.length === 0 && template) {
      newParts.push({
        text: template,
        isVariable: false,
      });
    }

    setParts(newParts);
  }, [template, variables]);

  const value = {
    variables,
    setVariables,
    template,
    setTemplate,
    parts,
    setParts,
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
    removeItem,
    renameItem,
  };

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
}
