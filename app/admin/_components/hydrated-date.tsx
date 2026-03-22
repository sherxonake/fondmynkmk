'use client';

import { useEffect, useState } from 'react';

interface HydratedDateProps {
  value: string | null;
  formatter: (date: Date) => string;
  fallback?: string;
}

export function HydratedDate({ value, formatter, fallback = "—" }: HydratedDateProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !value) {
    return <span>{fallback}</span>;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return <span>{fallback}</span>;
  }

  return <span suppressHydrationWarning>{formatter(date)}</span>;
}
