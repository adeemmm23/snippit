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
import { VARIABLE_FORMATS } from "@/constants/files.constants";
import useSettingsStore from "@/stores/settings/settings-store";

export default function VariableSettingGroup() {
  const variableFormat = useSettingsStore((state) => state.variableFormat);
  const setVariableFormat = useSettingsStore(
    (state) => state.setVariableFormat,
  );

  const items = VARIABLE_FORMATS.map((format) => ({
    label: format.label,
    value: format.value,
  }));

  const handleChange = (value: string | null) => {
    if (value) {
      setVariableFormat(value);
    }
  };

  return (
    <SettingGroup title="Variable">
      <p className="text-muted-foreground text-sm">
        Choose the format for your variables. Default is{" "}
        <code>{`{variable}`}</code>.
      </p>
      <Select items={items} value={variableFormat} onValueChange={handleChange}>
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
