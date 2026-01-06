import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type TimeFieldProps = {
  value?: string; // format "HH:mm"
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  step?: number; // intervalle en minutes (1, 5, 15…)
};

export function TimeField({ value = '', onChange, disabled = false, className, placeholder = 'Heure de naissance', step = 1 }: TimeFieldProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex h-8 lg:h-10 items-center gap-2">
        <Input
          type="time"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          step={step * 60} // `step` en minutes → converti en secondes
          className="flex-1"
        />

        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            disabled={disabled}>
            Effacer
          </Button>
        )}
      </div>
    </div>
  );
}
