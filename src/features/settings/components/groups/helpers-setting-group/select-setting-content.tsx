import { Add01Icon, Delete02Icon, Warning } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { Helper } from "@/stores/settings/slices/helper-slice";

type SelectSettingContentProps = {
  options?: {
    list?: string[];
  };
  onChange?: (updated: { options: Helper["options"] }) => void;
};

export default function SelectSettingContent({
  options,
  onChange,
}: SelectSettingContentProps) {
  const defaultOptions = {
    list: [] as string[],
  };

  useEffect(() => {
    if (!options) {
      onChange?.({ options: defaultOptions });
    }
  }, [options, onChange]);

  const listItems = (options?.list as string[]) || [];

  const handleAddItem = () => {
    if (listItems.length >= 6) return;
    const newList = [...listItems, ""];
    onChange?.({ options: { ...options, list: newList } });
  };

  const handleUpdateItem = (index: number, value: string) => {
    const newList = [...listItems];
    newList[index] = value;
    onChange?.({ options: { ...options, list: newList } });
  };

  const handleRemoveItem = (index: number) => {
    const newList = listItems.filter((_, i) => i !== index);
    onChange?.({ options: { ...options, list: newList } });
  };

  return (
    <DialogContent forceOverlayRender className="bg-popover">
      <DialogHeader>
        <DialogTitle>Configure Select</DialogTitle>
        <DialogDescription>
          Add options that will be available in the dropdown menu.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          {listItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                placeholder={`Option ${index + 1}`}
                value={item}
                onChange={(e) => handleUpdateItem(index, e.target.value)}
              />
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleRemoveItem(index)}
              >
                <HugeiconsIcon icon={Delete02Icon} />
              </Button>
            </div>
          ))}
        </div>
        {listItems.length >= 6 && (
          <Alert>
            <HugeiconsIcon icon={Warning} />
            <AlertTitle>Maximum options reached</AlertTitle>
            <AlertDescription>
              If you need more than 6 options, the select helper is not suitable
              for you. Consider using the text input directly.
            </AlertDescription>
          </Alert>
        )}
        <Button
          variant="outline"
          onClick={handleAddItem}
          className="w-full"
          disabled={listItems.length >= 6}
        >
          <HugeiconsIcon icon={Add01Icon} className="mr-2" />
          Add Option
        </Button>
      </div>
    </DialogContent>
  );
}
