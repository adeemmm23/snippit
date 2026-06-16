import { useState } from "react";

import SettingGroup from "../ui/setting-group";

import { ConfirmDialog } from "@/components/base/confirm-dialog";
import { Button } from "@/components/ui/button";

export default function ResetSettingGroup() {
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
      <ConfirmDialog
        title="Reset Snippit"
        description="This will remove all stored app data from your browser."
        trigger={
          <Button variant="destructive" className="w-fit">
            Reset Snippit
          </Button>
        }
        destructive
        onConfirm={handleConfirm}
        loading={loading}
      />
    </SettingGroup>
  );
}
