'use client';

import * as React from 'react';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { parseISO } from 'date-fns/parseISO';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia(query);

    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    setMatches(mediaQuery.matches);

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

type DatePickerProps = {
  date?: Date;
  onSelect: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
  placeholder?: string;
  fromYear?: number;
  toYear?: number;
};

const MONTHS = Array.from({ length: 12 }, (_, monthIndex) => format(new Date(2020, monthIndex, 1), 'LLLL').replace(/^\w/u, (c) => c.toUpperCase()));

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));

const formatDateFr = (date: Date) => format(date, 'd MMMM yyyy');
const formatForInput = (date: Date) => format(date, 'yyyy-MM-dd');

const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

export function DatePicker({ date, onSelect, disabled, placeholder = 'Choisir une date', fromYear, toYear }: DatePickerProps) {
  const today = React.useMemo(() => new Date(), []);
  const currentYear = today.getFullYear();

  const minYear = fromYear ?? currentYear - 120;
  const maxYear = toYear ?? currentYear;

  const minDate = React.useMemo(() => new Date(minYear, 0, 1), [minYear]);
  const maxDate = React.useMemo(() => {
    const limit = new Date(maxYear, 11, 31);
    return limit > today ? today : limit;
  }, [maxYear, today]);

  const isMobile = useMediaQuery('(pointer:coarse)');

  const [open, setOpen] = React.useState(false);
  const [viewDate, setViewDate] = React.useState<Date>(() => date ?? new Date(Math.min(maxYear, currentYear) - 18, 0, 1));

  React.useEffect(() => {
    if (date) {
      setViewDate(date);
    }
  }, [date]);

  const handleDayChange = (value: string) => {
    const day = Number(value);
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth(), day));
  };

  const handleMonthChange = (value: string) => {
    const month = Number(value);
    setViewDate((prev) => {
      const year = prev.getFullYear();
      const day = Math.min(prev.getDate(), daysInMonth(year, month));
      return new Date(year, month, day);
    });
  };

  const handleYearChange = (value: string) => {
    const year = Number(value);
    setViewDate((prev) => {
      const month = prev.getMonth();
      const day = Math.min(prev.getDate(), daysInMonth(year, month));
      return new Date(year, month, day);
    });
  };

  const handleDesktopSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) {
      onSelect(undefined);
      return;
    }

    if (selectedDate < minDate || selectedDate > maxDate) return;
    if (disabled?.(selectedDate)) return;

    setViewDate(selectedDate);
    onSelect(selectedDate);
    setOpen(false);
  };

  const handleMobileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const rawValue = event.target.value;
    if (!rawValue) {
      onSelect(undefined);
      return;
    }

    const next = parseISO(rawValue);
    if (Number.isNaN(next.getTime())) return;
    if (next < minDate || next > maxDate) return;
    if (disabled?.(next)) return;

    onSelect(next);
  };

  if (isMobile) {
    return (
      <Input
        type="date"
        value={date ? formatForInput(date) : ''}
        min={formatForInput(minDate)}
        max={formatForInput(maxDate)}
        onChange={handleMobileChange}
        placeholder={placeholder}
      />
    );
  }

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (nextOpen) {
          setViewDate(date ?? new Date(Math.min(maxYear, currentYear) - 18, 0, 1));
        }
      }}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="astra"
          className={cn('w-full cursor-pointer justify-start text-left font-normal', !date && 'text-muted-foreground')}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? formatDateFr(date) : placeholder}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto p-0"
        align="start">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          fromYear={minYear}
          toYear={maxYear}
          month={viewDate}
          onMonthChange={setViewDate}
          selected={date}
          onSelect={handleDesktopSelect}
          locale={fr}
          disabled={disabled}
          defaultMonth={viewDate}
        />
      </PopoverContent>
    </Popover>
  );
}
