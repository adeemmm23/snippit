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
import { useFilesStore } from "@/stores/files/files-store";

export default function ImportDialog() {
  const addFiles = useFilesStore((state) => state.addFiles);

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
            <Label htmlFor="import-folder">Folder location</Label>
            <Dialog>
              <DialogTrigger
                render={
                  <Button className="justify-start" variant="outline">
                    {importFolderLabel}
                  </Button>
                }
              />
              <FolderSelector onSelect={setImportFolderPath} />
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
