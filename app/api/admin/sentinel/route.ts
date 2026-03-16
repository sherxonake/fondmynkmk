'use server';

import { NextResponse } from 'next/server';

import { requireAdminSession } from '@/lib/admin-session';
import { buildDiagnosticResponse } from '@/lib/diagnostics';
import { supabase } from '@/lib/supabase';

const LATENCY_WARNING_MS = 500;
const SENTINEL_TARGET_TABLE = 'site_settings';
const SENTINEL_FALLBACK_ID = 'singleton';

type SentinelStatus = 'ok' | 'warning';

export async function GET() {
  try {
    await requireAdminSession();

    const start = typeof performance !== 'undefined' ? performance.now() : Date.now();

    const { data, error } = await supabase
      .from(SENTINEL_TARGET_TABLE)
      .select('id, hero_title')
      .limit(1)
      .maybeSingle();

    if (error) {
      throw new Error(`Sentinel read failed: ${error.message}`);
    }

    const recordId = data?.id ?? SENTINEL_FALLBACK_ID;
    const echoValue = data?.hero_title ?? 'NKMK Sentinel';

    const { error: writeError } = await supabase
      .from(SENTINEL_TARGET_TABLE)
      .update({ hero_title: echoValue })
      .eq('id', recordId);

    if (writeError) {
      throw new Error(`Sentinel echo write failed: ${writeError.message}`);
    }

    const { data: verifyData, error: verifyError } = await supabase
      .from(SENTINEL_TARGET_TABLE)
      .select('hero_title')
      .eq('id', recordId)
      .maybeSingle();

    if (verifyError) {
      throw new Error(`Sentinel verification failed: ${verifyError.message}`);
    }

    const latencyRaw = (typeof performance !== 'undefined' ? performance.now() : Date.now()) - start;
    const latencyMs = Math.round(latencyRaw);
    const status: SentinelStatus = latencyMs > LATENCY_WARNING_MS ? 'warning' : 'ok';

    return NextResponse.json({
      ok: true,
      status,
      latencyMs,
      warning: status === 'warning' ? 'Latency above 500ms threshold' : undefined,
      recordId,
      verified: verifyData?.hero_title === echoValue,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('/api/admin/sentinel', error);
    return buildDiagnosticResponse(error);
  }
}
