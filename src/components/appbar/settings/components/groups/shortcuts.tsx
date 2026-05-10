import React from "react";

import SettingGroup from "../ui/setting-group";

import { Kbd, KbdGroup } from "@/components/ui/kbd";

export default function ShortcutsGroup() {
  const shortcuts = [
    {
      keys: ["Ctrl", "K"],
      description: "Open the command palette for quick search",
    },
    {
      keys: ["Ctrl", "S"],
      description: "Save the current snippet content",
    },
    {
      keys: ["Ctrl", "Enter"],
      description: "Focus on the first variable",
    },
    {
      keys: ["Ctrl", "Space"],
      description: "Copy final content to clipboard",
    },
    {
      keys: ["Ctrl", "L"],
      description: "Reset all variables",
    },
    {
      keys: ["Enter"],
      description:
        "Within the variables, press Enter to move to the next variable",
    },
  ];
  return (
    <SettingGroup title="Shortcuts List">
      <p className="text-muted-foreground text-sm">
        Below is a list of all the shortcuts that can be used in Snippit.
      </p>
      <div className="flex flex-col gap-4">
        <ul className="flex flex-col gap-1">
          {shortcuts.map((shortcut, index) => (
            <li key={index} className="group flex items-center gap-2">
              <KbdGroup>
                {shortcut.keys.map((key, idx) => (
                  <React.Fragment key={idx}>
                    <Kbd className="group-hover:bg-primary group-hover:text-primary-foreground">
                      {key}
                    </Kbd>
                    {idx < shortcut.keys.length - 1 && (
                      <span className="select-none">+</span>
                    )}
                  </React.Fragment>
                ))}
              </KbdGroup>
              <span className="text-muted-foreground text-sm">
                {shortcut.description}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </SettingGroup>
  );
}
