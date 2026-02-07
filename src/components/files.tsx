import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  File01Icon,
  Folder01Icon,
  Search01Icon,
  Refresh01Icon,
  ArrowLeft01Icon,
  Download01Icon,
  Upload01Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "./ui/button";
import { Kbd } from "./ui/kbd";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { useEditor } from "@/context/editor/editor-context";
import { ButtonGroup } from "./ui/button-group";

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
      <Separator className="mt-auto" />
      <ButtonGroup className="w-full">
        <ButtonGroup className="grow">
          <Button variant="outline" className="grow">
            <HugeiconsIcon icon={Download01Icon} className="size-4" />
            Export
          </Button>
          <Button variant="outline" className="grow">
            <HugeiconsIcon icon={Upload01Icon} className="size-4" />
            Import
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline" size="icon">
            <HugeiconsIcon icon={Settings01Icon} className="size-4" />
          </Button>
        </ButtonGroup>
      </ButtonGroup>
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
  return (
    <Button variant="outline" className="w-full cursor-text">
      <div className="flex gap-2">
        <HugeiconsIcon icon={Search01Icon} className="size-5" />
        <span className="text-sm text-muted-foreground">Find...</span>
      </div>
      <Kbd className="ml-auto">F</Kbd>
    </Button>
  );
}

function Tree({ data }: FilesProps) {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [currentData, setCurrentData] = useState<FileSystemItem>(data);
  const { setTemplate, setFilePath } = useEditor();

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
      {currentPath.length > 0 && (
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
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
          <span>{currentPath[currentPath.length - 1]}</span>
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
          variant="ghost"
          className="w-full justify-start gap-2"
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
