import MagicSettingGroup from "./groups/magic";
import ThemeSettingGroup from "./groups/theme";
import VariableSettingGroup from "./groups/variable";
import SettingSection from "./ui/setting-section";

import { ScrollArea } from "@/components/ui/scroll-area";

export default function SettingsSections() {
  return (
    <main className="h-full flex-1">
      <ScrollArea className="size-full overflow-auto">
        <div className="flex flex-col gap-10">
          <SettingSection title="Appearance">
            <ThemeSettingGroup />
          </SettingSection>
          <SettingSection title="Editor">
            <VariableSettingGroup />
            <MagicSettingGroup />
          </SettingSection>
        </div>
      </ScrollArea>
    </main>
  );
}
