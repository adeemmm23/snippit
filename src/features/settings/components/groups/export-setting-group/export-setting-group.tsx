import {
  ArrowLeft,
  ArrowRight,
  Close,
  Folder01Icon,
  FolderAddIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMemo, useRef, useState } from "react";

import SettingGroup from "../../ui/setting-group";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useFilesStore } from "@/stores/files/files-store";
import { isFolder } from "@/types/node.types";
import { getNodeContent } from "@/utils/files.utils";

export default function ExportGroup() {
  const files = useFilesStore((state) => state.files);
  const addFiles = useFilesStore((state) => state.addFiles);

  const [exportOpen, setExportOpen] = useState(false);
  const [exportFileName, setExportFileName] = useState("snippets.json");

  const [importOpen, setImportOpen] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importFolderPath, setImportFolderPath] = useState<string[]>([]);

  const sanitizedExportFileName = useMemo(() => {
    const trimmed = exportFileName.trim();
    if (trimmed.length === 0) return "";
    return trimmed.endsWith(".json") ? trimmed : `${trimmed}.json`;
  }, [exportFileName]);

  const canConfirmExport = sanitizedExportFileName.length > 0;
  const canConfirmImport = importFile !== null;

  const importFolderLabel =
    importFolderPath.length === 0 ? "Root" : importFolderPath.join(" / ");

  const handleExport = () => {
    if (!canConfirmExport) return;

    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(files));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", sanitizedExportFileName);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    setExportOpen(false);
  };

  const handleImport = () => {
    if (!importFile) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedFiles = JSON.parse(event.target?.result as string);
        if (!Array.isArray(importedFiles)) return;

        addFiles(importedFiles, importFolderPath);
        setImportOpen(false);
        setImportFile(null);
      } catch (error) {
        return error;
      }
    };
    reader.readAsText(importFile);
  };

  return (
    <SettingGroup title="Import / Export">
      <p className="text-muted-foreground text-sm">
        Import or Export your snippets as a JSON file.
      </p>
      <div className="flex items-center space-x-2">
        <Dialog
          open={importOpen}
          onOpenChange={(open) => {
            setImportOpen(open);
            if (!open) {
              setImportFile(null);
            }
          }}
        >
          <DialogTrigger render={<Button variant="outline">Import</Button>} />
          <DialogContent
            forceOverlayRender
            className="bg-popover data-nested-dialog-open:scale-95"
          >
            <DialogHeader>
              <DialogTitle>Import snippets</DialogTitle>
              <DialogDescription>
                Select a file and choose where it should live.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="import-file">JSON file</Label>
                <Button
                  className="justify-start"
                  variant="outline"
                  onClick={() =>
                    document.getElementById("import-file")?.click()
                  }
                >
                  {importFile ? importFile.name : "Select file"}
                </Button>
                <input
                  id="import-file"
                  type="file"
                  accept="application/json"
                  className="hidden"
                  onChange={(e) => setImportFile(e.target.files?.[0] ?? null)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="import-folder">Folder location</Label>
                <Dialog>
                  <DialogTrigger
                    render={
                      <Button className="justify-start" variant="outline">
                        {importFolderLabel}
                      </Button>
                    }
                  />
                  <FolderSelector
                    onSelect={(folder) => {
                      setImportFolderPath(folder);
                    }}
                  />
                </Dialog>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setImportOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleImport} disabled={!canConfirmImport}>
                Import
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={exportOpen} onOpenChange={setExportOpen}>
          <DialogTrigger render={<Button variant="outline">Export</Button>} />
          <DialogContent forceOverlayRender className="bg-popover">
            <DialogHeader>
              <DialogTitle>Export snippets</DialogTitle>
              <DialogDescription>
                Choose a file name for your export.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              <Label htmlFor="export-file-name">File name</Label>
              <Input
                id="export-file-name"
                value={exportFileName}
                onChange={(e) => setExportFileName(e.target.value)}
                placeholder="snippets.json"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setExportOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleExport} disabled={!canConfirmExport}>
                Export
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </SettingGroup>
  );
}

type FolderSelectorProps = {
  onSelect: (folder: string[]) => void;
};

function FolderSelector({ onSelect }: FolderSelectorProps) {
  const files = useFilesStore((state) => state.files);

  const [path, setPath] = useState<string[]>([]);
  const [selectedPath, setSelectedPath] = useState<string[]>([]);

  const node = getNodeContent(path, files);
  const currentItems = node && isFolder(node) ? node.files : files;

  const currentFolders = currentItems
    .filter(isFolder)
    .sort((a, b) => a.name.localeCompare(b.name));

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
          onClick={() => {
            const nextPath = path.slice(0, -1);
            setPath(nextPath);
            setSelectedPath(nextPath);
          }}
        >
          <HugeiconsIcon icon={ArrowLeft} className="size-4 shrink-0" />
        </Button>
        <Separator orientation="vertical" className="my-auto h-4" />
        <FilePath path={path} setPath={setPath} />
      </div>
      <Separator />
      <ScrollArea className="min-h-0 flex-1 grow">
        <div className="flex flex-col gap-1">
          {currentFolders.length === 0 ? (
            <p className="text-muted-foreground px-2 py-3 text-sm">
              No folders in this location.
            </p>
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
                  onDoubleClick={() => {
                    setPath(nextPath);
                    setSelectedPath(nextPath);
                  }}
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
      <ImportDialogFooter onSelect={onSelect} path={path} />
    </DialogContent>
  );
}

type FilePathProps = {
  path: string[];
  setPath: (path: string[]) => void;
};
function FilePath({ path, setPath }: FilePathProps) {
  const { parenFolder, rest } = path.reduce(
    (acc, segment, index) => {
      if (index === path.length - 1) {
        acc.parenFolder = segment;
      } else {
        acc.rest.push(segment);
      }
      return acc;
    },
    {
      parenFolder: null as string | null,
      rest: [] as string[],
    },
  );

  return (
    <Breadcrumb className="flex h-8 items-center px-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink onClick={() => setPath([])} className="select-none">
            Root
          </BreadcrumbLink>
        </BreadcrumbItem>
        {rest.length > 0 && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button size="icon-sm" variant="ghost">
                      <BreadcrumbEllipsis />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  }
                />
                <DropdownMenuContent align="start" className="w-50">
                  <DropdownMenuGroup>
                    {rest.map((segment, index) => (
                      <DropdownMenuItem key={index}>
                        <BreadcrumbLink
                          title={segment}
                          className="truncate"
                          onClick={() => {
                            setPath(path.slice(0, index + 1));
                          }}
                        >
                          {segment}
                        </BreadcrumbLink>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}
        {parenFolder && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => setPath(path.slice(0, -1))}
                className="select-none"
              >
                {parenFolder}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

type ImportDialogFooterProps = {
  onSelect: (folder: string[]) => void;
  path: string[];
};

function ImportDialogFooter({ onSelect, path }: ImportDialogFooterProps) {
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  // TODO: rename item to node
  const createItem = useFilesStore((state) => state.createItem);

  if (isCreatingFolder) {
    return (
      <DialogFooter>
        <InputGroup>
          <InputGroupInput
            autoFocus
            ref={inputRef}
            placeholder="New folder name"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                createItem(
                  [...path, inputRef.current?.value ?? "New folder"],
                  "folder",
                );
                setIsCreatingFolder(false);
              }
            }}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              variant="ghost"
              size="icon-xs"
              onClick={() => {
                createItem(
                  [...path, inputRef.current?.value ?? "New folder"],
                  "folder",
                );
                setIsCreatingFolder(false);
              }}
            >
              <HugeiconsIcon icon={ArrowRight} className="size-4 shrink-0" />
            </InputGroupButton>
          </InputGroupAddon>
          <InputGroupAddon align="inline-start">
            <InputGroupButton
              variant="ghost"
              size="icon-xs"
              onClick={() => {
                setIsCreatingFolder(false);
              }}
            >
              <HugeiconsIcon icon={Close} className="size-4 shrink-0" />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </DialogFooter>
    );
  }
  return (
    <DialogFooter>
      <Button
        variant="outline"
        className="mr-auto"
        onClick={() => {
          setIsCreatingFolder(true);
        }}
      >
        <HugeiconsIcon icon={FolderAddIcon} className="size-4 shrink-0" />
      </Button>
      <DialogClose render={<Button variant="outline">Cancel</Button>} />
      <DialogClose
        render={<Button>Use this folder</Button>}
        onClick={() => onSelect(path.length > 0 ? path : [])}
      />
    </DialogFooter>
  );
}
