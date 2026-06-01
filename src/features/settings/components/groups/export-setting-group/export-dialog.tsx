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
import { useFilesStore } from "@/stores/files/files-store";

export default function ExportDialog() {
  const files = useFilesStore((state) => state.files);

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
