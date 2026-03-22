export const dynamic = 'force-dynamic'
import { cookies } from 'next/headers'
import { ADMIN_COOKIE_NAME } from '@/lib/admin-auth'
import { supabase } from '@/lib/supabase'

export default async function AdminDashboardPage() {
  const cookieStore = await cookies()
  const hasToken = !!cookieStore.get(ADMIN_COOKIE_NAME)?.value
  
  let newsCount = 0
  try {
    const { count } = await supabase
      .from('news_articles')
      .select('id', { count: 'exact', head: true })
    newsCount = count ?? 0
  } catch(e) {
    console.error('supabase error:', e)
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Auth: {hasToken ? '✅' : '❌'}</p>
      <p>Новостей: {newsCount}</p>
    </div>
  )
}
