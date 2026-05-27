import { create } from "zustand";
import { persist } from "zustand/middleware";

import { findItemByPath, getAvailableName } from "./utils";
import { useEditorStore } from "../editor/editor-store";

import {
  isFile,
  isFolder,
  type NodeType,
  type FolderType,
} from "@/types/node.types";
import { getNodeContent } from "@/utils/files.utils";

// TODO: Refactor into global import
type FilesStore = {
  files: NodeType[];
  activeFile: string[];
  newFile: string[];
  currenFolder: string[];
  latestOpenedFiles: string[][];
  mostOpenedFiles: { path: string[]; count: number }[];
  setFiles: (files: NodeType[]) => void;
  setActiveFile: (path: string[]) => void;
  setCurrentFolder: (path: string[]) => void;
  addFiles: (files: NodeType[]) => void;
  saveActiveFile: () => boolean;
  createItem: (
    path: string[],
    type: "file" | "folder",
    content?: string,
  ) => void;
  removeItem: (path: string[]) => void;
  moveItem: (oldPath: string[], newPath: string[]) => void;
  renameItem: (path: string[], name: string) => void;
  resetNewFile: () => void;
};

export const useFilesStore = create<FilesStore>()(
  persist(
    (set, get) => ({
      files: [],
      activeFile: [],
      newFile: [],
      currenFolder: [],
      latestOpenedFiles: [],
      mostOpenedFiles: [],
      setActiveFile: (activeFilePath) => {
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
          activeFile: activeFilePath,
          latestOpenedFiles: newLatestOpenedFiles,
          mostOpenedFiles: newMostOpenedFiles,
        });
      },
      setCurrentFolder: (currentWorkingFolder) =>
        set({ currenFolder: currentWorkingFolder }),

      setFiles: (files) => set({ files }),
      addFiles: (newFiles) => {
        const { files } = get();
        const mergedFiles = [...files, ...newFiles];
        set({ files: mergedFiles });
      },
      saveActiveFile: () => {
        const { activeFile: activeFilePath, files } = get();
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
        const newFiles = JSON.parse(JSON.stringify(files)) as NodeType[];
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

        set({ files: newFiles, newFile: newPath });
      },
      removeItem: (path) => {
        const { files } = get();
        const newFiles = JSON.parse(JSON.stringify(files)) as NodeType[];
        const node = getNodeContent(path.slice(0, -1), newFiles);
        const parent = node && isFolder(node) ? node.files : newFiles;

        if (!parent) {
          return;
        }

        const itemName = path[path.length - 1];
        const itemIndex = parent.findIndex(
          (item: NodeType) => item.name === itemName,
        );

        if (itemIndex === -1) {
          return;
        }

        parent.splice(itemIndex, 1);
        set({ files: newFiles });
      },
      moveItem: (oldPath, newPath) => {
        const { files, activeFile } = get();
        const newFiles = JSON.parse(JSON.stringify(files)) as NodeType[];
        const node = getNodeContent(oldPath, newFiles);

        if (!node) {
          return;
        }

        const oldParentNode = getNodeContent(oldPath.slice(0, -1), newFiles);
        const oldParent =
          oldParentNode && isFolder(oldParentNode)
            ? oldParentNode.files
            : newFiles;

        if (!oldParent) {
          return;
        }

        const itemIndex = oldParent.findIndex(
          (i: NodeType) => i.name === oldPath[oldPath.length - 1],
        );

        if (itemIndex === -1) {
          return;
        }

        const removedItem = oldParent.splice(itemIndex, 1)[0];
        const newParentNode = getNodeContent(newPath.slice(0, -1), newFiles);
        const newParent =
          newParentNode && isFolder(newParentNode)
            ? newParentNode.files
            : newFiles;

        if (!newParent) {
          oldParent.splice(itemIndex, 0, removedItem);
          return;
        }

        const removedItemName = newPath[newPath.length - 1];
        const finalName = getAvailableName(newParent, removedItemName);
        removedItem.name = finalName;
        newParent.push(removedItem);

        if (
          activeFile.length > 0 &&
          JSON.stringify(activeFile) === JSON.stringify(oldPath)
        ) {
          set({ activeFile: newPath.slice(0, -1).concat([finalName]) });
        }

        set({ files: newFiles });
      },
      renameItem: (path, newName) => {
        const { moveItem } = get();
        moveItem(path, [...path.slice(0, -1), newName]);
      },
      resetNewFile: () => set({ newFile: [] }),
    }),
    {
      name: "files",
    },
  ),
);
