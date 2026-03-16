'use client';

import { useEffect } from 'react';

import { toast } from '@/hooks/use-toast';

const TEST_INTERVAL_MS = 60_000;

export function SelfTestExecutor() {
  useEffect(() => {
    let canceled = false;

    async function runSelfTest() {
      try {
        const response = await fetch('/api/admin/self-test', {
          cache: 'no-store',
        });

        if (!response.ok) {
          const data = (await response.json().catch(() => null)) as { message?: string } | null;
          const message = data?.message ?? 'Unknown self-test error';
          throw new Error(message);
        }
      } catch (error) {
        if (canceled) return;
        const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
        toast({
          title: 'Bug Hunter предупредил',
          description: message,
          variant: 'destructive',
        });
      }
    }

    void runSelfTest();
    const timer = setInterval(runSelfTest, TEST_INTERVAL_MS);

    return () => {
      canceled = true;
      clearInterval(timer);
    };
  }, []);

  return null;
}
