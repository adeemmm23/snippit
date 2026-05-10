import SettingGroup from "../ui/setting-group";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function TooltipsGroup() {
  return (
    <SettingGroup title="Tooltips">
      <p className="text-muted-foreground text-sm">
        Tooltips provide quick infor for shortcuts that can be used.
      </p>
      <div className="flex items-center space-x-2">
        <Switch id="tooltips-toggle" />
        <Label htmlFor="tooltips-toggle">Show Tooltips</Label>
      </div>
    </SettingGroup>
  );
}
