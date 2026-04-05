import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, Home02Icon } from "@hugeicons/core-free-icons";
import { Button } from "../ui/button";
import { useEditor } from "@/context/editor/editor-context";

import Node from "./node";

import { ScrollArea } from "../ui/scroll-area";
import type { FileSystemItem } from "./types";

export default function Tree() {
  const {
    setTemplate,
    setActiveFilePath,
    activeFilePath,
    files: data,
    currentWorkingFolder,
    setCurrentWorkingFolder,
  } = useEditor();

  const currentData = currentWorkingFolder.reduce((acc, folder) => {
    const next = acc[folder];
    if (typeof next === "string") {
      throw new Error(`Path ${currentWorkingFolder.join("/")} is not a folder`);
    }
    return next;
  }, data);

  const { folders, files } = Object.entries(currentData).reduce(
    (acc, [name, content]) => {
      if (typeof content === "string") {
        acc.files.push({ name, content });
      } else {
        acc.folders.push({ name, content });
      }
      return acc;
    },
    {
      folders: [] as { name: string; content: FileSystemItem }[],
      files: [] as { name: string; content: string }[],
    },
  );

  return (
    <ScrollArea className="grow overflow-auto">
      <div className="flex flex-col gap-2 py-1">
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
        {files.map(({ name }) => (
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
              setTemplate(currentData[name] as string);
              setActiveFilePath(currentWorkingFolder.concat(name));
            }}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
