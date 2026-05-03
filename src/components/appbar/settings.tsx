import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Settings() {
  return (
    <DialogContent className="flex h-11/12 w-full max-w-5xl! flex-col">
      <DialogHeader className="shrink">
        <DialogTitle className="text-2xl">Settings</DialogTitle>
        <DialogDescription>
          Here you can modify themes, editor behavior, and other options to make
          Snippit truly yours.
        </DialogDescription>
      </DialogHeader>
      <div className="flex h-full flex-1 grow gap-2 py-2">
        <aside className="flex w-1/6 flex-col gap-2">
          <Button variant="ghost" size="sm" className="justify-start">
            Appearance
          </Button>
          <Button variant="ghost" size="sm" className="justify-start">
            Editor
          </Button>
          <Button variant="ghost" size="sm" className="justify-start">
            Files
          </Button>
          <Button variant="ghost" size="sm" className="justify-start">
            Shortcuts
          </Button>
          <Button variant="ghost" size="sm" className="justify-start">
            About
          </Button>
          <Button variant="ghost" size="sm" className="justify-start">
            Danger
          </Button>
        </aside>
        <Separator orientation="vertical" className="mx-4" />
        <main className="flex flex-1 flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h2 className="mb-2 text-lg font-semibold">Appearance</h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm">Theme</h3>
                  <RadioGroup defaultValue="comfortable" className="w-fit">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="default" id="r1" />
                      <Label htmlFor="r1">System</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="comfortable" id="r2" />
                      <Label htmlFor="r2">Dark</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="compact" id="r3" />
                      <Label htmlFor="r3">Light</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm">Font Size</h3>
                  <RadioGroup defaultValue="comfortable" className="w-fit">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="default" id="r4" />
                      <Label htmlFor="r4">Small</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="comfortable" id="r5" />
                      <Label htmlFor="r5">Medium</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="compact" id="r6" />
                      <Label htmlFor="r6">Large</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="mb-2 text-lg font-semibold">Editor</h2>
          </div>
        </main>
      </div>
      <DialogFooter>
        <DialogClose render={<Button variant="outline">Cancel</Button>} />
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  );
}
