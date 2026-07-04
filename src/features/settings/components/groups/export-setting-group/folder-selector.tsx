import { ArrowLeft, Folder01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

import FilePath from "./file-path";
import ImportDialogFooter from "./import-dialog-footer";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useFilesStore } from "@/stores/files/files-store";
import { isFolder } from "@/types/node.types";
import { getNodeContent } from "@/utils/files.utils";

type FolderSelectorProps = {
  onSelect: (folder: string[]) => void;
  selectedCollection: string;
};

export default function FolderSelector({
  onSelect,
  selectedCollection,
}: FolderSelectorProps) {
  const collections = useFilesStore((state) => state.collections);
  const files =
    collections.find((c) => c.name === selectedCollection)?.files || [];

  const [path, setPath] = useState<string[]>([]);
  const [selectedPath, setSelectedPath] = useState<string[]>([]);

  const node = getNodeContent(path, files);
  const currentItems = node && isFolder(node) ? node.files : files;

  const currentFolders = currentItems
    .filter(isFolder)
    .sort((a, b) => a.name.localeCompare(b.name));

  const handlePathChange = (nextPath: string[]) => {
    setPath(nextPath);
    setSelectedPath(nextPath);
  };

  return (
    <DialogContent
      forceOverlayRender
      className="bg-popover flex h-7/12 flex-col gap-2"
    >
      <DialogHeader>
        <DialogTitle>Choose a folder</DialogTitle>
        <DialogDescription>
          Select a folder to import your snippets into.
        </DialogDescription>
      </DialogHeader>
      <div className="mt-2 flex items-center gap-2">
        <Button
          size="icon-sm"
          variant="ghost"
          disabled={path.length === 0}
          onClick={() => handlePathChange(path.slice(0, -1))}
        >
          <HugeiconsIcon icon={ArrowLeft} className="size-4 shrink-0" />
        </Button>
        <Separator orientation="vertical" className="my-auto h-4" />
        <FilePath path={path} onPathChange={handlePathChange} />
      </div>
      <Separator />
      <ScrollArea className="min-h-0 flex-1 grow">
        <div className="flex h-full flex-col gap-1">
          {currentFolders.length === 0 ? (
            <div className="text-muted-foreground flex h-full flex-col items-center justify-center text-sm">
              <HugeiconsIcon icon={Folder01Icon} className="size-6 shrink-0" />
              <p className="px-2 py-3 text-sm select-none">
                No folders in this location
              </p>
            </div>
          ) : (
            currentFolders.map((folder) => {
              const nextPath = [...path, folder.name];
              const isSelected = selectedPath.join("/") === nextPath.join("/");

              return (
                <Button
                  key={folder.name}
                  variant={isSelected ? "secondary" : "ghost"}
                  className="justify-start gap-2"
                  onClick={() => setSelectedPath(nextPath)}
                  onDoubleClick={() => handlePathChange(nextPath)}
                >
                  <HugeiconsIcon
                    icon={Folder01Icon}
                    className="size-4 shrink-0"
                  />
                  {folder.name}
                </Button>
              );
            })
          )}
        </div>
      </ScrollArea>
      <ImportDialogFooter
        path={path}
        onSelect={() => {
          onSelect(selectedPath);
        }}
        selectedCollection={selectedCollection}
      />
    </DialogContent>
  );
}
