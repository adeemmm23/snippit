import { Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
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
import { cn } from "@/utils/cn";

export default function ResetSettingGroup() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    localStorage.clear();
    location.reload();
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
            <Button
              className="relative"
              variant="destructive"
              onClick={handleConfirm}
              disabled={loading}
            >
              {/* Bro all of that for a spinner? */}
              <span
                className={cn(
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin",
                  loading ? "visible" : "invisible",
                )}
              >
                <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} />
              </span>
              <span className={loading ? "invisible" : "visible"}>Reset</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SettingGroup>
  );
}
