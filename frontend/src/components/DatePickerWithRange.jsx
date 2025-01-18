import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";

export function DatePickerWithRange({
  className,
  onDateRangeChange,
}) {
  const [date, setDate] = useState({
    from: new Date(new Date().getFullYear(), 0, 1), // Start of the year
    to: new Date(), // Today's date
  });

  useEffect(() => {
    if (onDateRangeChange) {
      onDateRangeChange(date); // Notify parent component of date range changes
    }
  }, [date, onDateRangeChange]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range" // Enables date range selection
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate} // Updates state when the user selects a range
            numberOfMonths={2} // Shows 2 months side by side
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
