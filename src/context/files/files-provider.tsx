import { useState, type ReactNode } from "react";

import { FilesContext } from "./files-context";
import { findItemByPath, getAvailableName, getParentFolder } from "./utils";

import type { FileSystemItem, FolderItem } from "@/components/files/types";
import { isFile, isFolder } from "@/components/files/types";
import { useEditorStore } from "@/stores/editor/editor-store";

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

  const template = useEditorStore((state) => state.template);

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

  const moveItem = (oldPath: string[], newPath: string[]) => {
    setFiles((prevFiles) => {
      const newFiles = JSON.parse(JSON.stringify(prevFiles));
      const item = findItemByPath(newFiles, oldPath);

      if (!item) {
        return prevFiles;
      }

      const oldParentPath = oldPath.slice(0, -1);
      const oldParentItems =
        oldParentPath.length === 0
          ? newFiles
          : getParentFolder(newFiles, oldParentPath);

      if (!oldParentItems) {
        return prevFiles;
      }

      const itemIndex = oldParentItems.findIndex(
        (i: FileSystemItem) => i.name === oldPath[oldPath.length - 1],
      );
      if (itemIndex === -1) {
        return prevFiles;
      }

      const removedItem = oldParentItems.splice(itemIndex, 1)[0];

      const newParentPath = newPath.slice(0, -1);
      const newParentItems =
        newParentPath.length === 0
          ? newFiles
          : getParentFolder(newFiles, newParentPath);

      if (!newParentItems) {
        oldParentItems.splice(itemIndex, 0, removedItem);
        return prevFiles;
      }

      const newName = newPath[newPath.length - 1];
      const finalName = getAvailableName(newParentItems, newName);
      removedItem.name = finalName;

      newParentItems.push(removedItem);

      if (
        activeFilePath.length > 0 &&
        JSON.stringify(activeFilePath) === JSON.stringify(oldPath)
      ) {
        setActiveFilePath(newParentPath.concat([finalName]));
      }

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
    moveItem,
  };

  return (
    <FilesContext.Provider value={value}>{children}</FilesContext.Provider>
  );
}
