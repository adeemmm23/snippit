import {
  Cursor,
  DragDropManager,
  PointerActivationConstraints,
  PointerSensor,
} from "@dnd-kit/dom";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { FileEmpty01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import FolderHeader from "./folder-header";
import Node from "./node";
import type { FileSystemItem } from "./types";
import { isFile, isFolder } from "./types";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useEditor } from "@/context/editor/editor-context";
import { useFiles } from "@/context/files/files-context";

export default function Tree() {
  const { setTemplate } = useEditor();

  const {
    setActiveFilePath,
    activeFilePath,
    files: data,
    currentWorkingFolder,
    setCurrentWorkingFolder,
    moveItem,
  } = useFiles();

  // Navigate to the current working folder
  const getCurrentFolderItems = (): FileSystemItem[] => {
    let current = data;

    for (const folderName of currentWorkingFolder) {
      const found = current.find(
        (item) => isFolder(item) && item.name === folderName,
      );
      if (!found || !isFolder(found)) {
        return [];
      }
      current = found.files;
    }

    return current;
  };

  const currentItems = getCurrentFolderItems();

  // Separate folders and files
  const folders = currentItems
    .filter(isFolder)
    .sort((a, b) => a.name.localeCompare(b.name));
  const files = currentItems
    .filter(isFile)
    .sort((a, b) => a.name.localeCompare(b.name));

  const manager = new DragDropManager({
    plugins: (defaults) => [
      ...defaults,
      Cursor.configure({ cursor: "cursor" }),
    ],
    sensors: (defaults) => [
      ...defaults,
      PointerSensor.configure({
        activationConstraints: [
          new PointerActivationConstraints.Distance({ value: 5 }),
        ],
      }),
    ],
  });

  // TODO: look into this, and keep consitency with the right panel
  return (
    <DragDropProvider
      manager={manager}
      onDragEnd={(event) => {
        if (event.canceled) return;

        const { source, target } = event.operation;

        if (!target) return;

        // Don't allow dropping on itself
        if (source?.id === target?.id) {
          return;
        }

        moveItem(source?.data.path, [...target.data.path, source?.data.name]);
      }}
    >
      <div className="flex min-h-0 flex-1 grow flex-col gap-2">
        <FolderHeader />
        <ScrollArea className="size-full overflow-auto">
          <div className="flex h-full w-full flex-col gap-2">
            {folders.map(({ name }) => (
              <Node
                key={name}
                name={name}
                isFile={false}
                path={currentWorkingFolder.concat(name)}
                onClick={() => {
                  setCurrentWorkingFolder(currentWorkingFolder.concat(name));
                }}
              />
            ))}
            {files.map(({ name, content }) => (
              <Node
                key={name}
                name={name}
                isFile={true}
                path={currentWorkingFolder.concat(name)}
                isActive={
                  activeFilePath.join("/") ===
                  currentWorkingFolder.concat(name).join("/")
                }
                onClick={() => {
                  setTemplate(content);
                  setActiveFilePath(currentWorkingFolder.concat(name));
                }}
              />
            ))}
            {currentItems.length === 0 && (
              <div className="text-muted-foreground my-auto py-8 text-center">
                <div className="bg-muted mb-4 inline-flex items-center justify-center rounded-sm p-2">
                  <HugeiconsIcon icon={FileEmpty01Icon} className="size-5" />
                </div>
                <p className="text-sm">Folder is empty</p>
                <p className="mt-2 text-xs">Try adding some files</p>
              </div>
            )}
            <DragOverlay dropAnimation={null}>
              {(source) =>
                source && (
                  <div className="bg-foreground/80 text-background pointer-events-none flex w-fit max-w-40 rounded-sm px-2 py-1">
                    <p className="truncate text-sm font-medium text-nowrap">
                      {source.data.name}
                    </p>
                  </div>
                )
              }
            </DragOverlay>
          </div>
        </ScrollArea>
      </div>
    </DragDropProvider>
  );
}
