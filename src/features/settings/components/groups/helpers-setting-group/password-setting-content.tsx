import { useEffect } from "react";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import type { Helper } from "@/stores/settings/slices/helper-slice";

type PasswordSettingContentProps = {
  options?: {
    length?: number;
    lowerCase?: boolean;
    upperCase?: boolean;
    numbers?: boolean;
    specials?: boolean;
  };
  onChange?: (updated: { options: Helper["options"] }) => void;
};

export default function PasswordSettingContent({
  options,
  onChange,
}: PasswordSettingContentProps) {
  const defaultOptions = {
    length: 12,
    lowerCase: true,
    upperCase: true,
    numbers: true,
    specials: true,
  };

  useEffect(() => {
    if (!options) {
      onChange?.({ options: defaultOptions });
    }
  }, [options, onChange]);

  return (
    <DialogContent forceOverlayRender className="bg-popover">
      <DialogHeader>
        <DialogTitle>Configure Password</DialogTitle>
        <DialogDescription>
          Adjust the settings for this password generator helper.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Password length</label>
            <span className="text-muted-foreground text-xs">
              {options?.length ?? defaultOptions.length}
            </span>
          </div>
          <Slider
            defaultValue={defaultOptions.length}
            value={options?.length}
            min={1}
            max={64}
            step={1}
            onValueChange={(value) =>
              onChange?.({
                options: { ...options, length: value as number },
              })
            }
          />
        </div>
        <Separator />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex items-center justify-between rounded-md border p-2">
            <label className="text-sm">Lowercase</label>
            <Switch
              defaultChecked={defaultOptions.lowerCase}
              checked={options?.lowerCase}
              onCheckedChange={(checked) =>
                onChange?.({
                  options: { ...options, lowerCase: checked },
                })
              }
            />
          </div>
          <div className="flex items-center justify-between rounded-md border p-2">
            <label className="text-sm">Uppercase</label>
            <Switch
              defaultChecked={defaultOptions.upperCase}
              checked={options?.upperCase}
              onCheckedChange={(checked) =>
                onChange?.({
                  options: { ...options, upperCase: checked },
                })
              }
            />
          </div>
          <div className="flex items-center justify-between rounded-md border p-2">
            <label className="text-sm">Numbers</label>
            <Switch
              defaultChecked={defaultOptions.numbers}
              checked={options?.numbers}
              onCheckedChange={(checked) =>
                onChange?.({
                  options: { ...options, numbers: checked },
                })
              }
            />
          </div>
          <div className="flex items-center justify-between rounded-md border p-2">
            <label className="text-sm">Specials</label>
            <Switch
              defaultChecked={defaultOptions.specials}
              checked={options?.specials}
              onCheckedChange={(checked) =>
                onChange?.({
                  options: { ...options, specials: checked },
                })
              }
            />
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
