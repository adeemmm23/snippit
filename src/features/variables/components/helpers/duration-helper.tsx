import { Clock01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";
import { InputGroupAddon, InputGroupButton } from "@/components/ui/input-group";
import { PopoverContent } from "@/components/ui/popover";
import { Popover, PopoverTrigger } from "@/components/ui/popover";

type DurationHelperProps = {
  onSelect: (formatedDuration: string) => void;
};

export default function DurationHelper({ onSelect }: DurationHelperProps) {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>();
  const [month, setMonth] = useState(new Date());

  return (
    <InputGroupAddon align="inline-end">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <InputGroupButton
              id="date-picker"
              variant="ghost"
              size="icon-xs"
              aria-label="Select date"
            >
              <HugeiconsIcon icon={Clock01Icon} className="size-4" />
              <span className="sr-only">Select date</span>
            </InputGroupButton>
          }
        />
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
