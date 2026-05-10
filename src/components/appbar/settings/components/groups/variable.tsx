import SettingGroup from "../ui/setting-group";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VARIABLE_FORMATS } from "@/lib/const";

export default function VariableSettingGroup() {
  const items = VARIABLE_FORMATS.map((format) => ({
    label: format.label,
    value: format.value,
  }));

  const handleChange = (value: string | null) => {
    // TODO: Move the local key as a global constant
    if (!value) return;
    const selected = items.find((item) => item.label === value);
    if (selected) {
      localStorage.setItem("variableFormat", selected.label);
      window.dispatchEvent(new Event("variableFormatChange"));
    }
  };

  return (
    <SettingGroup title="Variable">
      <p className="text-muted-foreground text-sm">
        Choose the format for your variables. Default is{" "}
        <code>{`{variable}`}</code>.
      </p>
      <Select
        items={items}
        defaultValue={
          items.find(
            (item) => item.label === localStorage.getItem("variableFormat"),
          )?.label || items[0].label
        }
        onValueChange={handleChange}
      >
        <SelectTrigger className="w-full max-w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Variable Regex</SelectLabel>
            {items.map((item) => (
              <SelectItem key={item.label} value={item.label}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </SettingGroup>
  );
}
