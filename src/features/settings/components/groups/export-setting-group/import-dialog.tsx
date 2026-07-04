import { useState } from "react";

import FolderSelector from "./folder-selector";
import ImportFileDropzone from "./import-file-dropzone";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VARIABLE_FORMATS } from "@/constants/files.constants";
import { useFilesStore } from "@/stores/files/files-store";
import useSettingsStore from "@/stores/settings/settings-store";
import type { NodeType } from "@/types/node.types";

export default function ImportDialog() {
  const addFiles = useFilesStore((state) => state.addFiles);
  const variableFormat = useSettingsStore((state) => state.variableFormat);

  const collections = useFilesStore((state) => state.collections);
  const collectionsList = collections.map((collection) => ({
    value: collection.name,
    label: collection.name,
  }));
  const activeCollection = useFilesStore((state) => state.activeCollection);
  const [selectedCollection, setSelectedCollection] =
    useState(activeCollection);

  const [importOpen, setImportOpen] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importFolderPath, setImportFolderPath] = useState<string[]>([]);

  const canConfirmImport = importFile !== null;
  const importFolderLabel =
    importFolderPath.length === 0 ? "Root" : importFolderPath.join(" / ");

  const handleImport = () => {
    if (!importFile) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target?.result as string);
        const { files, variableFormat: newVariableFormat } = importedData;

        if (!newVariableFormat) return;
        if (!Array.isArray(files)) return;

        let fixedFiles = files;

        if (newVariableFormat !== variableFormat) {
          fixedFiles = changeVariableFormat(
            files,
            newVariableFormat,
            variableFormat,
          );
        }
        addFiles(fixedFiles, importFolderPath, selectedCollection);
        setImportOpen(false);
        setImportFile(null);
      } catch (error) {
        return error;
      }
    };
    reader.readAsText(importFile);
  };

  return (
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
            <Label htmlFor="import-file">Select File</Label>
            <ImportFileDropzone
              file={importFile}
              onFileChange={setImportFile}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="import-folder">Collection</Label>
            <Select
              items={collectionsList}
              value={selectedCollection}
              onValueChange={(value) => {
                setSelectedCollection(value ?? activeCollection);
              }}
            >
              <SelectTrigger className="dark:bg-background w-full border-0 shadow-none">
                <SelectValue placeholder="Select Collection" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Collections</SelectLabel>
                  {collections.map((item) => (
                    <SelectItem key={item.name} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
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
                onSelect={setImportFolderPath}
                selectedCollection={selectedCollection}
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
  );
}

const formatVariable = (name: string, format: string) => {
  return format.replace("variable", name);
};

const changeVariableFormat = (
  items: NodeType[],
  fromFormat: string,
  toFormat: string,
): NodeType[] => {
  const fromRegex = VARIABLE_FORMATS.find((f) => f.label === fromFormat)?.value;

  if (!fromRegex) return items;

  return items.map((item) => {
    if (item.type === "folder") {
      return {
        ...item,
        files: changeVariableFormat(item.files, fromFormat, toFormat),
      };
    }

    return {
      ...item,
      content: item.content.replace(fromRegex, (_, variableName) =>
        formatVariable(variableName, toFormat),
      ),
    };
  });
};
