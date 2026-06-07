import { create } from "zustand";
import { persist } from "zustand/middleware";

import { deepClone, getAvailableName, isDeepEqual } from "./utils";
import { useEditorStore } from "../editor/editor-store";

import { isFile, isFolder, type NodeType } from "@/types/node.types";
import { getNodeContent } from "@/utils/files.utils";

type Collection = {
  name: string;
  files: NodeType[];
};

type FilesStore = {
  collections: Collection[];
  activeCollection: string;
  createCollection: (name: string) => void;
  setActiveCollection: (name: string) => void;
  activeFile: string[];
  currenFolder: string[];
  openedFiles: { path: string[]; count: number; openedAt: number }[];
  setFiles: (files: NodeType[]) => void;
  setActiveFile: (path: string[]) => void;
  setCurrentFolder: (path: string[]) => void;
  addFiles: (files: NodeType[], path: string[]) => void;
  saveActiveFile: () => boolean;
  createItem: (
    path: string[],
    type: "file" | "folder",
    content?: string,
  ) => void;
  removeItem: (path: string[]) => void;
  moveItem: (oldPath: string[], newPath: string[]) => void;
  renameItem: (path: string[], name: string) => void;
};

export const useFilesStore = create<FilesStore>()(
  persist(
    (set, get) => ({
      collections: [],
      activeCollection: "",
      setActiveCollection: (name) => {
        const { collections } = get();
        if (!collections.some((c) => c.name === name)) {
          return;
        }
        const setTemplate = useEditorStore.getState().setTemplate;
        setTemplate("");
        set({
          activeCollection: name,
          activeFile: [],
          currenFolder: [],
          openedFiles: [],
        });
      },
      createCollection: (name) => {
        const { collections } = get();

        if (collections.some((c) => c.name === name)) {
          return;
        }

        set({
          collections: [...collections, { name, files: [] }],
          activeCollection: name,
        });
      },
      activeFile: [],
      newFile: [],
      currenFolder: [],
      openedFiles: [],
      setFiles: (files) => {
        const { activeCollection, collections } = get();

        const updatedCollections = collections.map((collection) => {
          if (collection.name === activeCollection) {
            return { ...collection, files };
          }
          return collection;
        });

        set({ collections: updatedCollections });
      },
      setActiveFile: (activeFilePath) => {
        const { openedFiles } = get();

        const newOpenedFiles = deepClone(openedFiles);

        const existingFile = newOpenedFiles.find((file) =>
          isDeepEqual(file.path, activeFilePath),
        );

        if (existingFile) {
          existingFile.count += 1;
          existingFile.openedAt = Date.now();
        } else {
          newOpenedFiles.push({
            path: activeFilePath,
            count: 1,
            openedAt: Date.now(),
          });
        }

        set({
          activeFile: activeFilePath,
          openedFiles: newOpenedFiles,
        });

        set({
          activeFile: activeFilePath,
        });
      },
      setCurrentFolder: (currentWorkingFolder) => {
        set({ currenFolder: currentWorkingFolder });
      },
      addFiles: (newFiles, path) => {
        const { collections, activeCollection } = get();
        const files =
          collections.find((c) => c.name === activeCollection)?.files || [];
        const updatedFiles = deepClone(files);

        const node = getNodeContent(path, updatedFiles);

        if (node && isFolder(node)) {
          node.files.push(...newFiles);
        } else {
          updatedFiles.push(...newFiles);
        }

        const updatedCollections = collections.map((collection) => {
          if (collection.name === activeCollection) {
            return { ...collection, files: updatedFiles };
          }
          return collection;
        });

        set({ collections: updatedCollections });
      },
      saveActiveFile: () => {
        const { activeFile, collections, activeCollection } = get();

        const files =
          collections.find((c) => c.name === activeCollection)?.files || [];

        const template = useEditorStore.getState().template;

        if (activeFile.length === 0) return false;

        const newFiles = deepClone(files);

        const node = getNodeContent(activeFile, newFiles);

        if (!node || !isFile(node)) {
          return false;
        }

        node.content = template;

        const updatedCollections = collections.map((collection) => {
          if (collection.name === activeCollection) {
            return { ...collection, files: newFiles };
          }
          return collection;
        });

        set({ collections: updatedCollections });
        return true;
      },
      createItem: (path, type, content) => {
        const { collections, activeCollection } = get();
        const files =
          collections.find((c) => c.name === activeCollection)?.files || [];
        const newFiles = deepClone(files);
        const name = path[path.length - 1];

        const node = getNodeContent(path.slice(0, -1), newFiles);
        const parent = node && isFolder(node) ? node.files : newFiles;

        const finalName = getAvailableName(parent, name);

        let newNode: NodeType;

        if (type === "file") {
          newNode = {
            type: "file",
            name: finalName,
            content: content || "",
          };
        } else {
          newNode = {
            type: "folder",
            name: finalName,
            files: [],
          };
        }

        parent.push(newNode);

        const updatedCollections = collections.map((collection) => {
          if (collection.name === activeCollection) {
            return { ...collection, files: newFiles };
          }
          return collection;
        });

        set({ collections: updatedCollections });
      },
      removeItem: (path) => {
        const { activeCollection, collections, openedFiles } = get();
        const files =
          collections.find((c) => c.name === activeCollection)?.files || [];
        const newFiles = deepClone(files);
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

        const newOpenedFiles = openedFiles.filter((file) => {
          if (isDeepEqual(file.path, path)) {
            return false;
          }

          if (file.path.length < path.length) {
            return true;
          }

          for (let i = 0; i < path.length; i++) {
            if (file.path[i] !== path[i]) {
              return true;
            }
          }

          return false;
        });

        const updatedCollections = collections.map((collection) => {
          if (collection.name === activeCollection) {
            return { ...collection, files: newFiles };
          }
          return collection;
        });
        set({ collections: updatedCollections, openedFiles: newOpenedFiles });
      },
      moveItem: (oldPath, newPath) => {
        const { activeCollection, collections, activeFile, openedFiles } =
          get();
        const files =
          collections.find((c) => c.name === activeCollection)?.files || [];
        const newFiles = deepClone(files);
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

        if (activeFile.length > 0 && isDeepEqual(oldPath, activeFile)) {
          set({ activeFile: newPath.slice(0, -1).concat([finalName]) });
        }

        const newOpenedFiles = openedFiles.filter((file) => {
          if (isDeepEqual(file.path, oldPath)) {
            return false;
          }

          if (file.path.length < oldPath.length) {
            return true;
          }

          for (let i = 0; i < oldPath.length; i++) {
            if (file.path[i] !== oldPath[i]) {
              return true;
            }
          }

          return false;
        });

        const updatedCollections = collections.map((collection) => {
          if (collection.name === activeCollection) {
            return { ...collection, files: newFiles };
          }
          return collection;
        });

        set({ collections: updatedCollections, openedFiles: newOpenedFiles });
      },
      renameItem: (path, newName) => {
        const { moveItem } = get();
        moveItem(path, [...path.slice(0, -1), newName]);
      },
    }),
    {
      name: "files",
    },
  ),
);
