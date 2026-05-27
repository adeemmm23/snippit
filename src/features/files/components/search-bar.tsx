import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";

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
import { isFile, isFolder, type NodeType } from "@/types/node.types";

export default function SearchBar() {
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  const latestOpenedFiles = useFilesStore((state) => state.latestOpenedFiles);
  const mostOpenedFiles = useFilesStore((state) => state.mostOpenedFiles);
  const files = useFilesStore((state) => state.files);

  const indexedFiles = flattenFiles(files, "");

  const generateMostOpened = () => {
    return mostOpenedFiles
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)
      .map((item, index) => {
        const file = indexedFiles.find((f) => f.path === item.path.join("/"));
        if (!file) return null;

        return (
          <FileItem
            key={index}
            file={file}
            onSelectEnd={() => setOpen(false)}
          />
        );
      });
  };

  const generateLatest = () => {
    return latestOpenedFiles.slice(0, 3).map((path, index) => {
      const file = indexedFiles.find((f) => f.path === path.join("/"));
      if (!file) return null;

      return (
        <FileItem key={index} file={file} onSelectEnd={() => setOpen(false)} />
      );
    });
  };

  const generatePreview = () => {
    return indexedFiles.map((file, index) => (
      <FileItem key={index} file={file} onSelectEnd={() => setOpen(false)} />
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
            {query.length == 0 && mostOpenedFiles.length > 0 && (
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

type FileItemProps = {
  file: { filename: string; path: string; content: string };
  onSelectEnd: () => void;
};

function FileItem({ file, onSelectEnd }: FileItemProps) {
  const setActiveFilePath = useFilesStore((state) => state.setActiveFile);
  const setTemplate = useEditorStore((state) => state.setTemplate);

  return (
    <CommandItem
      onSelect={() => {
        setTemplate(file.content);
        setActiveFilePath(file.path.split("/"));
        onSelectEnd();
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
}

// TODO: content shouldn't be shipped from here
const flattenFiles = (
  items: NodeType[],
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
