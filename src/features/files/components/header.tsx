import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Header() {
  const items = [
    { label: "IT Control Center", value: "it-control-center" },
    { label: "User Management", value: "user-management" },
    { label: "Network Settings", value: "network-settings" },
  ];
  return (
    <div className="flex px-2">
      <div className="flex h-9 min-w-0 flex-1 items-center gap-1 select-none">
        <Select items={items}>
          <SelectTrigger className="dark:bg-background w-full border-0">
            <SelectValue placeholder="Select Collection" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
