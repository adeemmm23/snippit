import { useState, type ReactNode } from "react";

import { FilesContext } from "./files-context";
import { useEditor } from "../editor/editor-context";

import type { FileSystemItem, FolderItem } from "@/components/files/types";
import { isFile, isFolder } from "@/components/files/types";

type FilesProviderProps = {
  children: ReactNode;
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

export function FilesProvider({ children }: FilesProviderProps) {
  const [activeFilePath, setActiveFilePath] = useState<string[]>([]);
  const [currentWorkingFolder, setCurrentWorkingFolder] = useState<string[]>(
    [],
  );
  const [files, setFiles] = useState<FileSystemItem[]>(() =>
    getFilesFromStorage(),
  );

  const { template } = useEditor();

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

  const createItem = (
    path: string[],
    type: "file" | "folder",
    content?: string,
  ) => {
    setFiles((prevFiles) => {
      const newFiles = JSON.parse(JSON.stringify(prevFiles));
      const parentPath = path.slice(0, -1);
      const itemName = path[path.length - 1];

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

      const finalName = getAvailableName(parentItems, itemName);
      let newItem: FileSystemItem;

      if (type === "file") {
        newItem = {
          type: "file",
          name: finalName,
          content: content || "",
        };
      } else {
        newItem = {
          type: "folder",
          name: finalName,
          files: [],
        };
      }

      parentItems.push(newItem);

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

  const value = {
    activeFilePath,
    setActiveFilePath,
    files,
    setFiles,
    createItem,
    currentWorkingFolder,
    saveActiveFile,
    setCurrentWorkingFolder,
    removeItem,
    renameItem,
  };

  return (
    <FilesContext.Provider value={value}>{children}</FilesContext.Provider>
  );
}
