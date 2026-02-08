import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  File01Icon,
  Folder01Icon,
  Search01Icon,
  Refresh01Icon,
  ArrowLeft01Icon,
  Home02Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "./ui/button";
import { Kbd, KbdGroup } from "./ui/kbd";
import { Badge } from "./ui/badge";
import { useEffect, useState } from "react";
import { useEditor } from "@/context/editor/editor-context";
import { cn } from "@/lib/utils";

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

type FileSystemItem = {
  [key: string]: string | FileSystemItem;
};

interface FilesProps {
  data: FileSystemItem;
}

export function Files({ data }: FilesProps) {
  return (
    <div className="flex flex-col grow h-full gap-2">
      <Header />
      <SearchBar />
      <Tree data={data} />
    </div>
  );
}

function Header() {
  return (
    <div className="flex gap-2">
      <div className="flex gap-1 items-center select-none px-2 h-9 flex-1 min-w-0">
        <span className="text-ellipsis whitespace-nowrap overflow-hidden font-medium">
          IT Control Center
        </span>
        <Badge variant="secondary" className="ml-auto">
          saved
        </Badge>
      </div>
      <Button variant="ghost" className="size-9">
        <HugeiconsIcon icon={Refresh01Icon} className="size-4" />
      </Button>
    </div>
  );
}

function SearchBar() {
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
        <span className="text-ellipsis whitespace-nowrap overflow-hidden grow">
          {file.filename}
        </span>
        <span className="ml-auto text-xs text-muted-foreground text-ellipsis whitespace-nowrap overflow-hidden flex-1 text-right">
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
          <span className="text-sm text-muted-foreground">Find...</span>
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

function Tree({ data }: FilesProps) {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [currentData, setCurrentData] = useState<FileSystemItem>(data);
  const { setTemplate, setFilePath, filePath } = useEditor();

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
    <>
      {currentPath.length > 0 ? (
        <div className="flex gap-2 w-full">
          <Button
            variant="ghost"
            className="grow justify-start gap-1 flex-1 min-w-0"
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
            <span className="text-ellipsis overflow-hidden">
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
          className="w-full justify-start gap-2"
          onClick={() => {
            setCurrentPath((prev) => [...prev, name]);
            setCurrentData(currentData[name] as FileSystemItem);
          }}
        >
          <HugeiconsIcon icon={Folder01Icon} className="size-4" />
          <span className="text-ellipsis whitespace-nowrap overflow-hidden">
            {name}
          </span>
          <HugeiconsIcon icon={ArrowRight01Icon} className="size-4 ml-auto" />
        </Button>
      ))}
      {files.map(({ name }) => (
        <Button
          key={name}
          title={name}
          data-path={currentPath.concat(name).join("/")}
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2",
            filePath.join("/") === currentPath.concat(name).join("/") &&
              "bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30",
          )}
          onClick={() => {
            setTemplate(currentData[name] as string);
            setFilePath(currentPath.concat(name));
          }}
        >
          <HugeiconsIcon icon={File01Icon} className="size-4" />
          <span className="text-ellipsis whitespace-nowrap overflow-hidden">
            {name}
          </span>
        </Button>
      ))}
    </>
  );
}
