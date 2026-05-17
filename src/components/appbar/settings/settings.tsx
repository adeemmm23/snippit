import SettingsNavigation from "./components/settings-navigation";
import SettingsSections from "./components/settings-sections";
import { SectionsProvider } from "./context/sections-provider";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  return (
    <DialogContent className="bg-popover flex h-full max-h-11/12 w-full max-w-5xl! flex-col data-nested-dialog-open:scale-95">
      <DialogHeader className="shrink-0">
        <DialogTitle className="text-2xl">Settings</DialogTitle>
        <DialogDescription>
          Here you can modify themes, editor behavior, and other options to make
          Snippit truly yours.
        </DialogDescription>
      </DialogHeader>
      <div className="flex min-h-0 flex-1 grow gap-2 py-2">
        <SectionsProvider>
          <SettingsNavigation />
          <Separator orientation="vertical" className="ml-4" />
          <SettingsSections />
        </SectionsProvider>
      </div>
    </DialogContent>
  );
}
