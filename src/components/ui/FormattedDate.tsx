'use client';

import { useEffect, useState } from 'react';

interface FormattedDateProps {
  date: string;
  className?: string;
}

export function FormattedDate({ date, className }: FormattedDateProps) {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    if (!date) return;
    
    const formatted = new Date(date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    setFormattedDate(formatted);
  }, [date]);

  if (!formattedDate) return null;

  return (
    <time dateTime={date} className={className} suppressHydrationWarning>
      {formattedDate}
    </time>
  );
} 