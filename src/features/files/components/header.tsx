import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilesStore } from "@/stores/files/files-store";

export default function Header() {
  const collections = useFilesStore((state) => state.collections);
  const activeCollection = useFilesStore((state) => state.activeCollection);
  const setActiveCollection = useFilesStore(
    (state) => state.setActiveCollection,
  );
  const items = collections.map((collection) => ({
    value: collection.name,
    label: collection.name,
  }));

  const handleCollectionChange = (value: string | null) => {
    if (value === null) return;
    setActiveCollection(value);
  };

  return (
    <div className="flex px-2">
      <div className="flex h-9 min-w-0 flex-1 items-center gap-1 select-none">
        <Select
          items={items}
          value={activeCollection}
          onValueChange={handleCollectionChange}
        >
          <SelectTrigger className="dark:bg-background w-full border-0 shadow-none">
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
