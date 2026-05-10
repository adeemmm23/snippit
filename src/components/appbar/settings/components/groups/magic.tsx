import {
  Add01Icon,
  Delete01Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";

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

type MagicType = "date" | "duration" | "password";

export default function MagicSettingGroup() {
  const [inputs, setInputs] = useState<
    {
      name: string;
      type: MagicType | null;
      settings?: Record<string, string | number | boolean>;
    }[]
  >([
    { name: "Date", type: "date" },
    { name: "Duration", type: "duration" },
    { name: "Password", type: "password" },
    { name: "Passcode", type: "password", settings: { length: 6 } },
  ]);

  useEffect(() => {
    console.log(inputs);
    // save to local storage
    localStorage.setItem("magicInputs", JSON.stringify(inputs));
  }, [inputs]);

  return (
    <SettingGroup title="Magic">
      <p className="text-muted-foreground text-sm">
        Define magic inputs that can be used in your snippets.
      </p>
      {inputs.map((input, index) => (
        <MagicInput
          key={index}
          name={input.name}
          type={input.type}
          settings={input.settings}
          onChange={(updated) => {
            const newInputs = [...inputs];
            newInputs[index] = { ...newInputs[index], ...updated };
            setInputs(newInputs);
          }}
          onDelete={() => {
            const newInputs = inputs.filter((_, i) => i !== index);
            setInputs(newInputs);
          }}
        />
      ))}
      <Button
        variant="default"
        className="mt-4 max-w-48"
        onClick={() => setInputs([...inputs, { name: "", type: null }])}
      >
        <HugeiconsIcon icon={Add01Icon} className="mr-2" />
        Add Magic Input
      </Button>
    </SettingGroup>
  );
}

type MagicInputProps = {
  name: string;
  type: MagicType | null;
  settings?: Record<string, string | number | boolean>;
  onChange?: ({
    name,
    type,
    settings,
  }: {
    name?: string;
    type?: MagicType | null;
    settings?: Record<string, string | number | boolean>;
  }) => void;
  onDelete?: () => void;
};
function MagicInput({
  name,
  type,
  settings,
  onChange,
  onDelete,
}: MagicInputProps) {
  const items = [
    { label: "Select magic input", value: null },
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
        onValueChange={(value) => onChange?.({ type: value as MagicType })}
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
            <Button variant="outline" size="icon">
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
                  value={[(settings?.length as number) || 6]}
                  min={1}
                  max={64}
                  step={1}
                  onValueChange={(value) =>
                    onChange?.({
                      settings: { ...settings, length: value as number },
                    })
                  }
                />
                <label className="shrink-0 text-sm">Password Length</label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={settings?.lowerCase == true}
                  onCheckedChange={(checked) =>
                    onChange?.({
                      settings: { ...settings, lowerCase: checked },
                    })
                  }
                />
                <label className="text-sm">LowerCase</label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={settings?.upperCase == true}
                  onCheckedChange={(checked) =>
                    onChange?.({
                      settings: { ...settings, upperCase: checked },
                    })
                  }
                />
                <label className="text-sm">upperCase</label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={settings?.numbers == true}
                  onCheckedChange={(checked) =>
                    onChange?.({
                      settings: { ...settings, numbers: checked },
                    })
                  }
                />
                <label className="text-sm">numbers</label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={settings?.special == true}
                  onCheckedChange={(checked) =>
                    onChange?.({
                      settings: { ...settings, special: checked },
                    })
                  }
                />
                <label className="text-sm">special</label>
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
