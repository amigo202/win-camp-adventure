
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface DateSelectorProps {
  date: Date;
  setDate: (date: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ date, setDate }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white border-none"
        >
          <CalendarIcon className="h-4 w-4 ml-2" />
          {format(date, 'dd/MM/yyyy', { locale: he })}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => newDate && setDate(newDate)}
          disabled={(date) => date > new Date() || date < new Date('2023-01-01')}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateSelector;
