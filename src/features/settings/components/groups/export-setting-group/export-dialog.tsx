import { useMemo, useState } from "react";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilesStore } from "@/stores/files/files-store";
import useSettingsStore from "@/stores/settings/settings-store";

export default function ExportDialog() {
  const collections = useFilesStore((state) => state.collections);
  const collectionsList = collections.map((collection) => ({
    value: collection.name,
    label: collection.name,
  }));

  const activeCollection = useFilesStore((state) => state.activeCollection);

  const [selectedCollection, setSelectedCollection] =
    useState(activeCollection);

  const files =
    collections.find((c) => c.name === selectedCollection)?.files || [];

  const variableFormat = useSettingsStore((state) => state.variableFormat);

  const [exportOpen, setExportOpen] = useState(false);
  const [exportFileName, setExportFileName] = useState("snippets.json");

  const sanitizedExportFileName = useMemo(() => {
    const trimmed = exportFileName.trim();
    if (trimmed.length === 0) return "";
    return trimmed.endsWith(".json") ? trimmed : `${trimmed}.json`;
  }, [exportFileName]);

  const canConfirmExport = sanitizedExportFileName.length > 0;

  const handleExport = () => {
    if (!canConfirmExport) return;

    const data = {
      files,
      variableFormat,
    };
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", sanitizedExportFileName);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    setExportOpen(false);
  };

  return (
    <Dialog open={exportOpen} onOpenChange={setExportOpen}>
      <DialogTrigger render={<Button variant="outline">Export</Button>} />
      <DialogContent forceOverlayRender className="bg-popover">
        <DialogHeader>
          <DialogTitle>Export snippets</DialogTitle>
          <DialogDescription>
            Choose a file name for your export.
          </DialogDescription>
        </DialogHeader>
        <Select
          items={collectionsList}
          value={selectedCollection}
          onValueChange={(value) => {
            setSelectedCollection(value ?? activeCollection);
          }}
        >
          <SelectTrigger className="w-full">
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
  );
}
