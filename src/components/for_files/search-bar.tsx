import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { Button } from "../ui/button";
import { Kbd, KbdGroup } from "../ui/kbd";
import { useEffect, useState } from "react";
import { useEditor } from "@/context/editor/editor-context";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { IT_SUPPORT_SNIPPETS } from "@/lib/const";
import type { FileSystemItem } from "../files";

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const { setTemplate, setFilePath } = useEditor();

  const flattenFiles = (
    data: FileSystemItem,
    prefix: string = "",
  ): { filename: string; path: string }[] => {
    const result: { filename: string; path: string }[] = [];

    for (const [name, content] of Object.entries(data)) {
      const fullPath = prefix ? `${prefix}/${name}` : name;

      if (typeof content === "string") {
        result.push({ filename: name, path: fullPath });
      } else {
        result.push(...flattenFiles(content, fullPath));
      }
    }

    return result;
  };

  const getFileContent = (path: string): string => {
    const segments = path.split("/");
    let current: string | FileSystemItem = IT_SUPPORT_SNIPPETS;

    for (const segment of segments) {
      current = (current as FileSystemItem)[segment];
    }

    return current as string;
  };

  const indexedFiles = flattenFiles(IT_SUPPORT_SNIPPETS);

  const generatePreview = () => {
    return indexedFiles.map((file, index) => (
      <CommandItem
        key={index}
        onSelect={() => {
          setTemplate(getFileContent(file.path));
          setFilePath(file.path.split("/"));
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
            <CommandGroup heading="Latest">
              {/* <CommandItem>
                <span>WiFi Troubleshooting</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  ./Security/WiFi Troubleshooting
                </span>
              </CommandItem>
              <CommandItem>
                <span>Password Reset</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  ./User Management/Password Reset
                </span>
              </CommandItem>
              <CommandItem>
                <span>Software Installation</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  ./Software/Software Installation
                </span>
              </CommandItem> */}
              {/* Dynamically generate CommandItems from indexedFiles */}
              {generatePreview()}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
