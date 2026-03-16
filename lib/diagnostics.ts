import { NextResponse } from 'next/server';

export type DiagnosticCategory = 'network' | 'quota' | 'auth' | 'code' | 'unknown';

export interface DiagnosticReport {
  title: string;
  category: DiagnosticCategory;
  message: string;
  timestamp: string;
}

function normalizeMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'Unknown error';
}

export function buildDiagnosticReport(error: unknown): DiagnosticReport {
  const message = normalizeMessage(error);
  const normalized = message.toLowerCase();

  let category: DiagnosticCategory = 'code';
  if (normalized.includes('network') || normalized.includes('fetch') || normalized.includes('timeout')) {
    category = 'network';
  } else if (normalized.includes('quota') || normalized.includes('rate limit')) {
    category = 'quota';
  } else if (normalized.includes('auth') || normalized.includes('unauthorized')) {
    category = 'auth';
  } else if (normalized.includes('unknown')) {
    category = 'unknown';
  }

  return {
    title: 'AI Diagnostic Report',
    category,
    message,
    timestamp: new Date().toISOString(),
  };
}

export function buildDiagnosticResponse(error: unknown, status = 500): NextResponse {
  const report = buildDiagnosticReport(error);
  return NextResponse.json({ ok: false, report }, { status });
}
