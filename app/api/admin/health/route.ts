import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Проверяем подключение к Supabase
    const { error } = await supabase.from('site_settings').select('id').limit(1);
    
    return NextResponse.json({ 
      healthy: !error,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ 
      healthy: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
}
