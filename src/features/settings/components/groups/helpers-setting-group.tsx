import {
  Add01Icon,
  Delete01Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect } from "react";

import SettingGroup from "../ui/setting-group";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import useSettingsStore from "@/stores/settings/settings-store";
import type { Helper, HelperType } from "@/stores/settings/slices/helper-slice";

export default function HelpersSettingGroup() {
  const helpers = useSettingsStore((state) => state.helpers);
  const addHelper = useSettingsStore((state) => state.addHelper);
  const updateHelper = useSettingsStore((state) => state.updateHelper);
  const removeHelper = useSettingsStore((state) => state.removeHelper);

  return (
    <SettingGroup title="Helpers">
      <p className="text-muted-foreground text-sm">
        Define helpers that can ease input generation.
      </p>
      {helpers.map((input, index) => (
        <HelperSettingInput
          key={index}
          name={input.name}
          type={input.type}
          options={input.options}
          onChange={(updated) => updateHelper(index, updated)}
          onDelete={() => removeHelper(index)}
        />
      ))}
      <Button
        variant="default"
        className="mt-4 w-fit"
        onClick={() => addHelper()}
      >
        <HugeiconsIcon icon={Add01Icon} />
        Add Helper
      </Button>
    </SettingGroup>
  );
}

type HelperSettingInput = Helper & {
  onChange?: ({ name, type, options }: Partial<Helper>) => void;
  onDelete?: () => void;
};
function HelperSettingInput({
  name,
  type,
  options,
  onChange,
  onDelete,
}: HelperSettingInput) {
  const items = [
    { label: "Date", value: "date" },
    { label: "Duration", value: "duration" },
    { label: "Password", value: "password" },
  ];

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Variable name"
        className="max-w-60"
        value={name}
        onChange={(e) => onChange?.({ name: e.target.value })}
      />
      <Select
        items={items}
        value={type}
        onValueChange={(value) => onChange?.({ type: value as HelperType })}
        disabled={name == ""}
      >
        <SelectTrigger className="w-full max-w-48">
          <SelectValue placeholder="Select helper type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Variable Regex</SelectLabel>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Dialog>
        <DialogTrigger
          render={
            <Button
              variant="outline"
              size="icon"
              disabled={
                !type || name == "" || type == "date" || type == "duration"
              }
            >
              <HugeiconsIcon icon={Settings01Icon} />
            </Button>
          }
        />
        {type === "password" && (
          <PasswordSettingContent
            name={"Password"}
            options={options}
            onChange={(updated) => onChange?.({ options: updated.options })}
          />
        )}
      </Dialog>
      <Button variant="outline" size="icon" onClick={onDelete}>
        <HugeiconsIcon icon={Delete01Icon} />
      </Button>
    </div>
  );
}

function PasswordSettingContent({
  name,
  options,
  onChange,
}: {
  name: string;
  options?: {
    length?: number;
    lowerCase?: boolean;
    upperCase?: boolean;
    numbers?: boolean;
    specials?: boolean;
  };
  onChange?: (updated: { options: Helper["options"] }) => void;
}) {
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
        <DialogTitle>Configure {name}</DialogTitle>
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
