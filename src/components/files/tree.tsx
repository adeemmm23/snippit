import {
  ArrowLeft01Icon,
  FileEmpty01Icon,
  Home02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";



import Node from "./node";
import type { FileSystemItem } from "./types";
import { isFile, isFolder } from "./types";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEditor } from "@/context/editor/editor-context";

export default function Tree() {
  const {
    setTemplate,
    setActiveFilePath,
    activeFilePath,
    files: data,
    currentWorkingFolder,
    setCurrentWorkingFolder,
  } = useEditor();

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

  return (
    <ScrollArea className="grow overflow-auto">
      <div className="flex h-full flex-col gap-2 py-1">
        {currentWorkingFolder.length > 0 ? (
          <div className="flex w-full gap-1">
            <Button
              variant="ghost"
              className="min-w-0 flex-1 grow justify-start gap-1"
              onClick={() => {
                setCurrentWorkingFolder(currentWorkingFolder.slice(0, -1));
              }}
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
              <span className="overflow-hidden text-ellipsis">
                {currentWorkingFolder[currentWorkingFolder.length - 1]}
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setCurrentWorkingFolder([]);
              }}
            >
              <HugeiconsIcon icon={Home02Icon} className="size-4" />
            </Button>
          </div>
        ) : (
          <Button variant="ghost" className="w-full justify-start gap-2">
            <HugeiconsIcon icon={Home02Icon} className="size-4" />
            <span>Root</span>
          </Button>
        )}
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
      </div>
    </ScrollArea>
  );
}
