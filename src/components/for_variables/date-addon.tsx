import { Calendar01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { InputGroupAddon, InputGroupButton } from "../ui/input-group";
import { PopoverContent } from "../ui/popover";
import { Popover, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { useState } from "react";

type DateAddonProps = {
  onSelect: (formatedDate: string) => void;
};

export default function DateAddon({ onSelect }: DateAddonProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date | undefined>(date);
  return (
    <InputGroupAddon align="inline-end">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <InputGroupButton
            id="date-picker"
            variant="ghost"
            size="icon-xs"
            aria-label="Select date"
          >
            <HugeiconsIcon icon={Calendar01Icon} className="size-4" />
            <span className="sr-only">Select date</span>
          </InputGroupButton>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="end"
          alignOffset={-8}
          sideOffset={10}
        >
          <Calendar
            mode="single"
            selected={date}
            month={month}
            onMonthChange={setMonth}
            onSelect={(date) => {
              setDate(date);
              onSelect(formatDate(date));
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </InputGroupAddon>
  );
}

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
