import { create } from "zustand";
import { persist } from "zustand/middleware";

import { findItemByPath, getAvailableName, getParentFolder } from "./utils";
import { useEditorStore } from "../editor/editor-store";

import {
  isFile,
  isFolder,
  type NodeType,
  type FolderType,
} from "@/types/node.types";

// TODO: Refactor into global import

type FilesStore = {
  activeFilePath: string[];
  setActiveFilePath: (path: string[]) => void;
  currentWorkingFolder: string[];
  setCurrentWorkingFolder: (path: string[]) => void;
  files: NodeType[];
  latestOpenedFiles: string[][];
  mostOpenedFiles: { path: string[]; count: number }[];
  newFilePath: string[];
  setFiles: (files: NodeType[]) => void;
  addFiles: (files: NodeType[]) => void;
  saveActiveFile: () => boolean;
  createItem: (
    path: string[],
    type: "file" | "folder",
    content?: string,
  ) => void;
  removeItem: (path: string[]) => void;
  renameItem: (oldPath: string[], newPath: string[]) => void;
  moveItem: (oldPath: string[], newPath: string[]) => void;
  resetNewFilePath: () => void;
};

export const useFilesStore = create<FilesStore>()(
  persist(
    (set, get) => ({
      activeFilePath: [],
      setActiveFilePath: (activeFilePath) => {
        const { latestOpenedFiles, mostOpenedFiles } = get();
        const newLatestOpenedFiles = [
          activeFilePath,
          ...latestOpenedFiles.filter(
            (path) => JSON.stringify(path) !== JSON.stringify(activeFilePath),
          ),
        ];

        // TODO: extract into sperate methode
        // TODO: stop using JSON.stringify for path comparison
        // TODO: implement decaying score for most opened files
        const now = Date.now();

        const existingMostOpened = mostOpenedFiles.find(
          (item) =>
            JSON.stringify(item.path) === JSON.stringify(activeFilePath),
        );

        let newMostOpenedFiles;

        if (existingMostOpened) {
          newMostOpenedFiles = mostOpenedFiles.map((item) =>
            JSON.stringify(item.path) === JSON.stringify(activeFilePath)
              ? {
                  ...item,
                  count: item.count + 1,
                  lastOpenedAt: now,
                }
              : item,
          );
        } else {
          newMostOpenedFiles = [
            ...mostOpenedFiles,
            {
              path: activeFilePath,
              count: 1,
              lastOpenedAt: now,
            },
          ];
        }

        set({
          activeFilePath,
          latestOpenedFiles: newLatestOpenedFiles,
          mostOpenedFiles: newMostOpenedFiles,
        });
      },
      currentWorkingFolder: [],
      setCurrentWorkingFolder: (currentWorkingFolder) =>
        set({ currentWorkingFolder }),
      files: [],
      newFilePath: [],
      latestOpenedFiles: [],
      mostOpenedFiles: [],
      setFiles: (files) => set({ files }),
      addFiles: (newFiles) => {
        const { files } = get();
        const mergedFiles = [...files, ...newFiles];
        set({ files: mergedFiles });
      },
      saveActiveFile: () => {
        const { activeFilePath, files } = get();
        const template = useEditorStore.getState().template;
        if (activeFilePath.length === 0) return false;

        const newFiles = JSON.parse(JSON.stringify(files));
        const item = findItemByPath(newFiles, activeFilePath);

        if (!item || !isFile(item)) {
          return false;
        }

        item.content = template;
        // saveFilesToStorage(newFiles);
        set({ files: newFiles });

        return true;
      },
      createItem: (path, type, content) => {
        const { files } = get();
        const newFiles = JSON.parse(JSON.stringify(files));
        const parentPath = path.slice(0, -1);
        const itemName = path[path.length - 1];

        let parentItems: NodeType[];

        if (parentPath.length === 0) {
          parentItems = newFiles;
        } else {
          const parentFolder = findItemByPath(newFiles, parentPath);
          if (!parentFolder || !isFolder(parentFolder)) {
            let current: NodeType[] = newFiles;
            for (const segment of parentPath) {
              let folder = current.find(
                (item) => item.name === segment && isFolder(item),
              );
              if (!folder) {
                folder = { type: "folder", name: segment, files: [] };
                current.push(folder);
              }
              current = (folder as FolderType).files;
            }
            parentItems = current;
          } else {
            parentItems = parentFolder.files;
          }
        }

        const finalName = getAvailableName(parentItems, itemName);
        let newItem: NodeType;

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

        const newPath = parentPath.concat([finalName]);

        // saveFilesToStorage(newFiles);
        set({ files: newFiles, newFilePath: newPath });
      },
      resetNewFilePath: () => set({ newFilePath: [] }),
      removeItem: (path) => {
        const { files } = get();
        const newFiles = JSON.parse(JSON.stringify(files));
        const parentPath = path.slice(0, -1);

        const parentItems =
          parentPath.length === 0
            ? newFiles
            : getParentFolder(newFiles, parentPath);

        if (!parentItems) {
          return;
        }

        const itemName = path[path.length - 1];
        const itemIndex = parentItems.findIndex(
          (item: NodeType) => item.name === itemName,
        );

        if (itemIndex === -1) {
          return;
        }

        parentItems.splice(itemIndex, 1);
        // saveFilesToStorage(newFiles);
        set({ files: newFiles });
      },
      renameItem: (oldPath, newPath) => {
        const { files } = get();
        const newFiles = JSON.parse(JSON.stringify(files));
        const item = findItemByPath(newFiles, oldPath);

        if (!item) {
          return;
        }

        const parentPath = oldPath.slice(0, -1);
        const parentItems =
          parentPath.length === 0
            ? newFiles
            : getParentFolder(newFiles, parentPath);

        if (!parentItems) {
          return;
        }

        const itemIndex = parentItems.findIndex(
          (i: NodeType) => i.name === oldPath[oldPath.length - 1],
        );
        if (itemIndex === -1) {
          return;
        }

        const newName = newPath[newPath.length - 1];
        const finalName = getAvailableName(
          parentItems.filter((_: NodeType, i: number) => i !== itemIndex),
          newName,
        );

        item.name = finalName;
        // saveFilesToStorage(newFiles);
        set({ files: newFiles });
      },
      moveItem: (oldPath, newPath) => {
        const { files, activeFilePath } = get();
        const newFiles = JSON.parse(JSON.stringify(files));
        const item = findItemByPath(newFiles, oldPath);

        if (!item) {
          return;
        }

        const oldParentPath = oldPath.slice(0, -1);
        const oldParentItems =
          oldParentPath.length === 0
            ? newFiles
            : getParentFolder(newFiles, oldParentPath);

        if (!oldParentItems) {
          return;
        }

        const itemIndex = oldParentItems.findIndex(
          (i: NodeType) => i.name === oldPath[oldPath.length - 1],
        );
        if (itemIndex === -1) {
          return;
        }

        const removedItem = oldParentItems.splice(itemIndex, 1)[0];

        const newParentPath = newPath.slice(0, -1);
        const newParentItems =
          newParentPath.length === 0
            ? newFiles
            : getParentFolder(newFiles, newParentPath);

        if (!newParentItems) {
          oldParentItems.splice(itemIndex, 0, removedItem);
          return;
        }

        const newName = newPath[newPath.length - 1];
        const finalName = getAvailableName(newParentItems, newName);
        removedItem.name = finalName;

        newParentItems.push(removedItem);

        if (
          activeFilePath.length > 0 &&
          JSON.stringify(activeFilePath) === JSON.stringify(oldPath)
        ) {
          set({ activeFilePath: newParentPath.concat([finalName]) });
        }

        // saveFilesToStorage(newFiles);
        set({ files: newFiles });
      },
    }),
    {
      name: "files",
    },
  ),
);
