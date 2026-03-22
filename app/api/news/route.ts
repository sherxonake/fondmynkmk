import { NextResponse } from 'next/server';
import { getNewsArticles } from '@/lib/api';

export async function GET() {
  try {
    const news = await getNewsArticles();
    return NextResponse.json(news);
  } catch (error) {
    console.error('News API error:', error);
    return NextResponse.json([], { status: 500 });
  }
}
