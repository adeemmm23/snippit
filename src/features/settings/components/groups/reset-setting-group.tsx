import { useState } from "react";

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

export default function ResetSettingGroup() {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    localStorage.clear();
    setOpen(false);
  };

  return (
    <SettingGroup title="Reset">
      <p className="text-muted-foreground text-sm">
        Clear all app data stored in your browser. This action cannot be undone.
      </p>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <Button variant="destructive" className="w-fit">
              Reset Snippit
            </Button>
          }
        />
        <DialogContent forceOverlayRender className="bg-popover">
          <DialogHeader>
            <DialogTitle>Reset Snippit?</DialogTitle>
            <DialogDescription>
              This will remove all stored app data from your browser.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirm}>
              Clear
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SettingGroup>
  );
}
