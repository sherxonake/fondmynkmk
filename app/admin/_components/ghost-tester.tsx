'use client';

import { useEffect } from 'react';

const CRITICAL_SELECTORS = ['[data-admin-news-table]', '[data-admin-settings-form]'];
const REPORT_ENDPOINT = '/api/admin/silent-alert';
const CHECK_INTERVAL_MS = 15_000;

const randomId = (): string => crypto.randomUUID();

export function GhostTester() {
  useEffect(() => {
    let canceled = false;
    let monitorId = randomId();

    async function sendSilentAlert(selector: string, reason: string) {
      try {
        await fetch(REPORT_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            monitorId,
            selector,
            path: window.location.pathname,
            reason,
            userAgent: navigator.userAgent,
          }),
        });
      } catch (error) {
        console.error('GhostTester alert failed', error);
      }
    }

    function checkDomIntegrity() {
      if (canceled) return;
      const missing = CRITICAL_SELECTORS.filter((selector) => !document.querySelector(selector));
      if (missing.length > 0) {
        missing.forEach((selector) => {
          void sendSilentAlert(selector, 'Missing critical admin element');
        });
        monitorId = randomId();
      }
    }

    const timer = setInterval(checkDomIntegrity, CHECK_INTERVAL_MS);
    checkDomIntegrity();

    return () => {
      canceled = true;
      clearInterval(timer);
    };
  }, []);

  return null;
}
