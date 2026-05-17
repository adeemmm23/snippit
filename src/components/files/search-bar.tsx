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
import { useEditorStore } from "@/stores/editor/editor-store";
import { useFilesStore } from "@/stores/files/files-store";

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const setActiveFilePath = useFilesStore((state) => state.setActiveFilePath);
  const latestOpenedFiles = useFilesStore((state) => state.latestOpenedFiles);
  const mostOpenedFiles = useFilesStore((state) => state.mostOpenedFiles);

  const files = useFilesStore((state) => state.files);

  const setTemplate = useEditorStore((state) => state.setTemplate);

  const indexedFiles = flattenFiles(files, "");

  const sortedMostOpenedFiles = [...mostOpenedFiles]
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  const generateMostOpened = () => {
    return sortedMostOpenedFiles.map((item, index) => {
      const file = indexedFiles.find((f) => f.path === item.path.join("/"));
      if (!file) return null;

      return (
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
            {file.path} ({item.count} opens)
          </span>
        </CommandItem>
      );
    });
  };

  const generateLatest = () => {
    return latestOpenedFiles.map((path, index) => {
      const file = indexedFiles.find((f) => f.path === path.join("/"));
      if (!file) return null;

      return (
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
      );
    });
  };

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

  // TODO: Implement actual search functionality instead of showing all files as results
  return (
    <div className="flex px-2">
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
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        onOpenChangeComplete={() => setQuery("")}
      >
        <Command>
          <CommandInput
            placeholder="Find..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>
              {query.length > 0 ? "No results found." : "Search for a file"}
            </CommandEmpty>
            {query.length == 0 && sortedMostOpenedFiles.length > 0 && (
              <CommandGroup heading="Most opened">
                {generateMostOpened()}
              </CommandGroup>
            )}
            {query.length == 0 && latestOpenedFiles.length > 0 && (
              <CommandGroup heading="Latest">{generateLatest()}</CommandGroup>
            )}
            {query.length > 0 && (
              <CommandGroup heading="Results">{generatePreview()}</CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}

const flattenFiles = (
  items: FileSystemItem[],
  prefix: string,
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
