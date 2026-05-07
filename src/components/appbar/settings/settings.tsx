import SettingsNavigation from "./components/settings-navigation";
import SettingsSections from "./components/settings-sections";
import { SectionsProvider } from "./context/sections-provider";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  return (
    <DialogContent
      className="bg-popover flex h-full max-h-11/12 w-full max-w-5xl! flex-col"
      showCloseButton={false}
    >
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
          <Separator orientation="vertical" className="mx-4" />
          <SettingsSections />
        </SectionsProvider>
      </div>
      <DialogFooter className="shrink-0">
        <DialogClose render={<Button variant="outline">Cancel</Button>} />
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  );
}
