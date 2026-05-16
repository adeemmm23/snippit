import SettingGroup from "../ui/setting-group";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useSettingsStore from "@/stores/settings/settings-store";

export default function TooltipsGroup() {
  const tooltipsEnabled = useSettingsStore((state) => state.tooltipsEnabled);
  const setTooltipsEnabled = useSettingsStore(
    (state) => state.setTooltipsEnabled,
  );

  return (
    <SettingGroup title="Tooltips">
      <p className="text-muted-foreground text-sm">
        Tooltips provide quick infor for shortcuts that can be used.
      </p>
      <div className="flex items-center space-x-2">
        <Switch
          id="tooltips-toggle"
          checked={tooltipsEnabled}
          onCheckedChange={setTooltipsEnabled}
        />
        <Label htmlFor="tooltips-toggle">Show Tooltips</Label>
      </div>
    </SettingGroup>
  );
}
