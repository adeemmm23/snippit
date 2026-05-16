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
import { useEditorStore } from "@/stores/editor/editor-store";

export default function VariableSettingGroup() {
  const variableFormat = useEditorStore((state) => state.variableFormat);
  const setVariableFormat = useEditorStore((state) => state.setVariableFormat);

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
