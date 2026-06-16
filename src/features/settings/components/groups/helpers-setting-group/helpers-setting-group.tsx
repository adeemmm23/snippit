import {
  Add01Icon,
  Delete02Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import PasswordSettingContent from "./password-setting-content";
import SelectSettingContent from "./select-setting-content";
import SettingGroup from "../../ui/setting-group";

import { ConfirmDialog } from "@/components/base/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
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
  onDelete: () => void;
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
    { label: "Range", value: "range" },
    { label: "Password", value: "password" },
    { label: "Select", value: "select" },
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
          <SelectValue placeholder="Select helper" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Helpers</SelectLabel>
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
                !type || name == "" || type == "date" || type == "range"
              }
            >
              <HugeiconsIcon icon={Settings01Icon} />
            </Button>
          }
        />
        {type === "password" && (
          <PasswordSettingContent
            options={options}
            onChange={(updated) => onChange?.({ options: updated.options })}
          />
        )}
        {type === "select" && (
          <SelectSettingContent
            options={options}
            onChange={(updated) => onChange?.({ options: updated.options })}
          />
        )}
      </Dialog>
      <ConfirmDialog
        title="Delete Helper"
        description="Are you sure you want to delete this helper?"
        trigger={
          <Button variant="destructive" size="icon">
            <HugeiconsIcon icon={Delete02Icon} />
          </Button>
        }
        onConfirm={onDelete}
        confirmClose
        destructive
      />
    </div>
  );
}
