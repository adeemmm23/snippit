import { useMemo, useState } from "react";

import SettingGroup from "../ui/setting-group";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFilesStore } from "@/stores/files/files-store";
import { getAvailableName } from "@/stores/files/utils";

export default function ExportGroup() {
  const files = useFilesStore((state) => state.files);
  const addFiles = useFilesStore((state) => state.addFiles);

  const [exportOpen, setExportOpen] = useState(false);
  const [exportFileName, setExportFileName] = useState("snippets.json");

  const [importOpen, setImportOpen] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importFolderName, setImportFolderName] = useState("New");

  const sanitizedExportFileName = useMemo(() => {
    const trimmed = exportFileName.trim();
    if (trimmed.length === 0) return "";
    return trimmed.endsWith(".json") ? trimmed : `${trimmed}.json`;
  }, [exportFileName]);

  const canConfirmExport = sanitizedExportFileName.length > 0;
  const canConfirmImport =
    importFile !== null && importFolderName.trim() !== "";

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
    if (!importFile || importFolderName.trim() === "") return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedFiles = JSON.parse(event.target?.result as string);
        const folderName = getAvailableName(files, importFolderName.trim());
        addFiles([
          {
            type: "folder",
            name: folderName,
            files: importedFiles,
          },
        ]);
        setImportOpen(false);
        setImportFile(null);
      } catch (error) {
        console.error("Failed to import snippets:", error);
      }
    };
    reader.readAsText(importFile);
  };

  return (
    <SettingGroup title="Import / Export">
      <p className="text-muted-foreground text-sm">
        Export or import all your snippets.
      </p>
      <div className="flex items-center space-x-2">
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
          <DialogContent forceOverlayRender className="bg-popover">
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
                <Label htmlFor="import-folder">Folder name</Label>
                <Input
                  id="import-folder"
                  value={importFolderName}
                  onChange={(e) => setImportFolderName(e.target.value)}
                  placeholder="New"
                />
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
      </div>
    </SettingGroup>
  );
}
