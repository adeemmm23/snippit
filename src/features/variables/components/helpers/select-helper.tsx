import { CarouselVerticalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InputGroupAddon, InputGroupButton } from "@/components/ui/input-group";

type SelectHelperProps = {
  onGenerate: (selectedValue: string) => void;
  options?: {
    list?: string[];
  };
};

export default function SelectHelper({
  onGenerate,
  options,
}: SelectHelperProps) {
  const optionsList = options?.list || [];

  if (!optionsList || optionsList.length === 0) {
    return null;
  }

  return (
    <InputGroupAddon align="inline-end">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <InputGroupButton
              variant="ghost"
              size="icon-xs"
              aria-label="Select option"
            >
              <HugeiconsIcon icon={CarouselVerticalIcon} className="size-4" />
            </InputGroupButton>
          }
        />
        <DropdownMenuContent align="end">
          {optionsList.map((option) => (
            <DropdownMenuItem
              key={option}
              onClick={() => onGenerate(option)}
              className="cursor-pointer"
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </InputGroupAddon>
  );
}
