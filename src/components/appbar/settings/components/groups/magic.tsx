import {
  Add01Icon,
  Delete01Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

import SettingGroup from "../ui/setting-group";

import { Button } from "@/components/ui/button";
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

export default function MagicSettingGroup() {
  const [inputs, setInputs] = useState<{ name: string; type: string | null }[]>(
    [
      { name: "Date", type: "date" },
      { name: "Duration", type: "duration" },
      { name: "Password", type: "password" },
      { name: "Passcode", type: "password" },
    ],
  );

  const items = [
    { label: "Select magic input", value: null },
    { label: "Date", value: "date" },
    { label: "Duration", value: "duration" },
    { label: "Password", value: "password" },
  ];

  return (
    <SettingGroup title="Magic">
      <p className="text-muted-foreground text-sm">
        Define magic inputs that can be used in your snippets.
      </p>
      {inputs.map((input, index) => (
        <div key={index} className="flex gap-2">
          <Input
            placeholder="Variable name"
            className="max-w-60"
            value={input.name}
          />
          <Select items={items} defaultValue={input.type}>
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
          <Button variant="outline" size="icon">
            <HugeiconsIcon icon={Settings01Icon} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const newInputs = [...inputs];
              newInputs.splice(index, 1);
              setInputs(newInputs);
            }}
          >
            <HugeiconsIcon icon={Delete01Icon} />
          </Button>
        </div>
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
