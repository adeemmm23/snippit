import { Clock01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { InputGroupAddon, InputGroupButton } from "../ui/input-group";
import { PopoverContent } from "../ui/popover";
import { Popover, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

type DurationAddonProps = {
  onSelect: (formatedDuration: string) => void;
};

export default function DurationAddon({ onSelect }: DurationAddonProps) {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>();
  const [month, setMonth] = useState(new Date());

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
            <HugeiconsIcon icon={Clock01Icon} className="size-4" />
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
            mode="range"
            month={month}
            onMonthChange={(month) => setMonth(month)}
            selected={range}
            onSelect={(range) => {
              setRange(range);
              onSelect(formatDuration(range));
            }}
          />
        </PopoverContent>
      </Popover>
    </InputGroupAddon>
  );
}

function formatDuration(dateRange: DateRange | undefined) {
  if (!dateRange || !dateRange.from || !dateRange.to) {
    return "";
  }
  // Calculate the difference in days between the two dates
  const from = dateRange.from;
  const to = dateRange.to;
  const diffTime = Math.abs(to.getTime() - from.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return `${diffDays} day${diffDays == 1 ? "" : "s"}`;
}
