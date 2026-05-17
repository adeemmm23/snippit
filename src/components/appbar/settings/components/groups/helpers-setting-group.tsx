import {
  Add01Icon,
  Delete01Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import SettingGroup from "../ui/setting-group";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
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
    { label: "Select helper type", value: null },
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
        defaultValue={type}
        onValueChange={(value) => onChange?.({ type: value as HelperType })}
        disabled={name == ""}
      >
        <SelectTrigger className="w-full max-w-48">
          <SelectValue />
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
        <DialogContent forceRender className="bg-popover">
          <DialogHeader>
            <p className="text-lg font-semibold">
              Configure {name || "magic input"}
            </p>
          </DialogHeader>
          {type == "password" && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Slider
                  value={[(options?.length as number) || 6]}
                  min={1}
                  max={64}
                  step={1}
                  onValueChange={(value) =>
                    onChange?.({
                      options: { ...options, length: value as number },
                    })
                  }
                />
                <label className="shrink-0 text-sm">Password Length</label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={options?.lowerCase == true}
                  onCheckedChange={(checked) =>
                    onChange?.({
                      options: { ...options, lowerCase: checked },
                    })
                  }
                />
                <label className="text-sm">LowerCase</label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={options?.upperCase == true}
                  onCheckedChange={(checked) =>
                    onChange?.({
                      options: { ...options, upperCase: checked },
                    })
                  }
                />
                <label className="text-sm">upperCase</label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={options?.numbers == true}
                  onCheckedChange={(checked) =>
                    onChange?.({
                      options: { ...options, numbers: checked },
                    })
                  }
                />
                <label className="text-sm">numbers</label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={options?.specials == true}
                  onCheckedChange={(checked) =>
                    onChange?.({
                      options: { ...options, specials: checked },
                    })
                  }
                />
                <label className="text-sm">Specials</label>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Button variant="outline" size="icon" onClick={onDelete}>
        <HugeiconsIcon icon={Delete01Icon} />
      </Button>
    </div>
  );
}
