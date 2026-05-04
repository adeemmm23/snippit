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

export default function VariableSettingGroup() {
  const items = [
    { label: "Select variable", value: null },
    { label: "{{variable}}", value: "{{variable}}" },
    { label: "${variable}", value: "${variable}" },
    { label: "%variable%", value: "%variable%" },
    { label: "{variable}", value: "{variable}" },
    { label: "<variable>", value: "<variable>" },
    { label: "[variable]", value: "[variable]" },
    { label: "((variable))", value: "((variable))" },
    { label: "%%variable%%", value: "%%variable%%" },
  ];

  return (
    <SettingGroup title="Variable">
      <Select items={items}>
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
    </SettingGroup>
  );
}
