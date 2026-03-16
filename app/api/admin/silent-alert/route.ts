import { NextResponse } from 'next/server';
import { z } from 'zod';

import { requireAdminSession } from '@/lib/admin-session';
import { buildDiagnosticResponse } from '@/lib/diagnostics';
import { supabase } from '@/lib/supabase';

const TABLE_NAME = 'admin_alerts';

const payloadSchema = z.object({
  monitorId: z.string().min(1),
  selector: z.string().min(1),
  path: z.string().min(1),
  reason: z.string().min(1),
  userAgent: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const json = await request.json().catch(() => null);
    const parsed = payloadSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: 'Invalid silent alert payload' }, { status: 400 });
    }

    const payload = parsed.data;
    const { error } = await supabase.from(TABLE_NAME).insert([
      {
        type: 'ghost_tester',
        monitor_id: payload.monitorId,
        selector: payload.selector,
        path: payload.path,
        reason: payload.reason,
        user_agent: payload.userAgent ?? null,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      throw new Error(`Silent alert insert failed: ${error.message}`);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('/api/admin/silent-alert', error);
    return buildDiagnosticResponse(error);
  }
}
