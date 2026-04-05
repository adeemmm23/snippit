import { HugeiconsIcon } from "@hugeicons/react";
import {
  File01Icon,
  Folder01Icon,
  ArrowLeft01Icon,
  Home02Icon,
  MoreVerticalIcon,
  InputCursorTextIcon,
  Delete02Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "../ui/button";
import { useState } from "react";
import { useEditor } from "@/context/editor/editor-context";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { ScrollArea } from "../ui/scroll-area";
import type { FileSystemItem } from "./types";

export default function Tree() {
  const {
    setTemplate,
    setFilePath,
    filePath,
    files: data,
    currentWorkingFolder: currentPath,
    setCurrentWorkingFolder: setCurrentPath,
  } = useEditor();

  const [currentData, setCurrentData] = useState<FileSystemItem>(data);

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
        {currentPath.length > 0 ? (
          <div className="flex w-full gap-1">
            <Button
              variant="ghost"
              className="min-w-0 flex-1 grow justify-start gap-1"
              onClick={() => {
                setCurrentPath(currentPath.slice(0, -1));
                setCurrentData(() => {
                  let newData = data;
                  for (const segment of currentPath.slice(0, -1)) {
                    newData = newData[segment] as FileSystemItem;
                  }
                  return newData;
                });
              }}
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
              <span className="overflow-hidden text-ellipsis">
                {currentPath[currentPath.length - 1]}
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setCurrentPath([]);
                setCurrentData(data);
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
          <Button
            key={name}
            title={name}
            variant="ghost"
            size="default"
            className="group/folder w-full justify-start gap-2 pr-0"
            onClick={() => {
              setCurrentPath((prev) => [...prev, name]);
              setCurrentData(currentData[name] as FileSystemItem);
            }}
          >
            <HugeiconsIcon icon={Folder01Icon} className="size-4 shrink-0" />
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {name}
            </span>
            <div className="ml-auto flex size-9 items-center justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="pointer-events-none shrink-0 opacity-0 group-hover/folder:pointer-events-auto group-hover/folder:opacity-100"
                  >
                    <HugeiconsIcon icon={MoreVerticalIcon} className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <HugeiconsIcon
                        icon={InputCursorTextIcon}
                        className="size-4"
                      />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                      <HugeiconsIcon icon={Delete02Icon} className="size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Button>
        ))}
        {files.map(({ name }) => (
          <Button
            key={name}
            title={name}
            data-path={currentPath.concat(name).join("/")}
            variant="ghost"
            size="default"
            className={cn(
              "group/file w-full justify-start gap-2 pr-0",
              filePath.join("/") === currentPath.concat(name).join("/") &&
                "bg-primary/10 hover:bg-primary/20! text-primary-foreground! focus-within:bg-primary/20 focus:bg-primary/20",
            )}
            onClick={() => {
              setTemplate(currentData[name] as string);
              setFilePath(currentPath.concat(name));
            }}
          >
            <HugeiconsIcon icon={File01Icon} className="size-4" />
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {name}
            </span>
            <div className="ml-auto flex size-9 items-center justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="pointer-events-none shrink-0 opacity-0 group-hover/file:pointer-events-auto group-hover/file:opacity-100"
                  >
                    <HugeiconsIcon icon={MoreVerticalIcon} className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <HugeiconsIcon
                        icon={InputCursorTextIcon}
                        className="size-4"
                      />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                      <HugeiconsIcon icon={Delete02Icon} className="size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}
