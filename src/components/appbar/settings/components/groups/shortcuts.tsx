import SettingGroup from "../ui/setting-group";

import { Kbd, KbdGroup } from "@/components/ui/kbd";

export default function ShortcutsGroup() {
  return (
    <SettingGroup title="List">
      <p className="text-muted-foreground text-sm">
        Below is a list of all the shortcuts that can be used in Snippit.
      </p>
      <div className="flex flex-col gap-4">
        <ul className="flex flex-col gap-1">
          <li className="flex items-center gap-2">
            <KbdGroup>
              <Kbd className="hover:bg-primary">Ctrl</Kbd>
              <span>+</span>
              <Kbd>K</Kbd>
            </KbdGroup>
            <span className="text-muted-foreground text-sm">
              Create a new snippet.
            </span>
          </li>
          <li className="flex items-center gap-2">
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <span>+</span>
              <Kbd>F</Kbd>
            </KbdGroup>
            <span className="text-muted-foreground text-sm">
              Search for a snippet.
            </span>
          </li>
          <li className="flex items-center gap-2">
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <span>+</span>
              <Kbd>E</Kbd>
            </KbdGroup>
            <span className="text-muted-foreground text-sm">
              Edit the selected snippet.
            </span>
          </li>
        </ul>
      </div>
    </SettingGroup>
  );
}
