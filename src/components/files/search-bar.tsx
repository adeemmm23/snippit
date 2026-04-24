import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";

import type { FileSystemItem } from "./types";
import { isFile, isFolder } from "./types";


import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { useEditor } from "@/context/editor/editor-context";



export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const { setTemplate, setActiveFilePath, files } = useEditor();

  const flattenFiles = (
    items: FileSystemItem[] = files,
    prefix: string = "",
  ): { filename: string; path: string; content: string }[] => {
    const result: { filename: string; path: string; content: string }[] = [];

    for (const item of items) {
      const fullPath = prefix ? `${prefix}/${item.name}` : item.name;

      if (isFile(item)) {
        result.push({
          filename: item.name,
          path: fullPath,
          content: item.content,
        });
      } else if (isFolder(item)) {
        result.push(...flattenFiles(item.files, fullPath));
      }
    }

    return result;
  };

  const indexedFiles = flattenFiles();

  const generatePreview = () => {
    return indexedFiles.map((file, index) => (
      <CommandItem
        key={index}
        onSelect={() => {
          setTemplate(file.content);
          setActiveFilePath(file.path.split("/"));
          setOpen(false);
        }}
      >
        <span className="grow overflow-hidden text-ellipsis whitespace-nowrap">
          {file.filename}
        </span>
        <span className="text-muted-foreground ml-auto flex-1 overflow-hidden text-right text-xs text-ellipsis whitespace-nowrap">
          {file.path}
        </span>
      </CommandItem>
    ));
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className="w-full cursor-text"
        onClick={() => setOpen(true)}
      >
        <div className="flex gap-2">
          <HugeiconsIcon icon={Search01Icon} className="size-5" />
          <span className="text-muted-foreground text-sm">Find...</span>
        </div>
        <KbdGroup className="ml-auto">
          <Kbd>Ctrl</Kbd>
          <span>+</span>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Find..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Latest">{generatePreview()}</CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
