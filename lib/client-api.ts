/**
 * Client-side API functions for news filtering
 */

import type { NewsArticle } from "@/types";

export async function getNewsArticles(): Promise<NewsArticle[]> {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const response = await fetch('/api/news', {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}
