"use client";

import { DayPicker } from "react-day-picker";
import { useState } from "react";

type Props = {
  value?: string;
  onChange: (value: string) => void;
};

export default function DatePicker({ value, onChange }: Props) {
  const [selected, setSelected] = useState<Date | undefined>(
    value ? new Date(value) : undefined,
  );

  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={(date) => {
        setSelected(date);
        if (date) {
          const formatted = date.toISOString().split("T")[0]; // YYYY-MM-DD
          onChange(formatted);
        }
      }}
    />
  );
}
