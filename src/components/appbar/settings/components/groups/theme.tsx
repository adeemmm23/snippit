import { useState } from "react";

import SettingGroup from "../ui/setting-group";

import { Label } from "@/components/ui/label";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";

type Theme = "system" | "dark" | "light";

export default function ThemeSettingGroup() {
  const [theme, setTheme] = useState(
    (localStorage.getItem("theme") as Theme) || "system",
  );

  const handleThemeChange = (value: Theme) => {
    setTheme(value);
    localStorage.setItem("theme", value);

    document.documentElement.classList.add("remove-transition");
    document.documentElement.classList.remove("dark", "light");

    if (value !== "system") {
      document.documentElement.classList.add(value);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.add("light");
      }
    }

    setTimeout(() => {
      document.documentElement.classList.remove("remove-transition");
    }, 250);
  };

  return (
    <SettingGroup title="Theme">
      <RadioGroup
        defaultValue={theme}
        value={theme}
        className="w-fit"
        onValueChange={handleThemeChange}
      >
        <div className="flex items-center gap-3">
          <RadioGroupItem value="system" id="r1" />
          <Label htmlFor="r1">System</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="dark" id="r2" />
          <Label htmlFor="r2">Dark</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="light" id="r3" />
          <Label htmlFor="r3">Light</Label>
        </div>
      </RadioGroup>
    </SettingGroup>
  );
}
