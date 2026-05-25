import { Settings01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Settings from "@/features/settings";

export default function SaveButton() {
  return (
    <Dialog>
      <Tooltip>
        <DialogTrigger
          render={
            <TooltipTrigger
              render={
                <Button variant="ghost" size="icon">
                  <HugeiconsIcon icon={Settings01Icon} className="size-4" />
                </Button>
              }
            />
          }
        />
        <Settings />
        <TooltipContent side="bottom">
          <p>Settings</p>
        </TooltipContent>
      </Tooltip>
    </Dialog>
  );
}
