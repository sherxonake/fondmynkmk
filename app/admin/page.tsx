export const dynamic = 'force-dynamic'
import { cookies } from 'next/headers'
import { ADMIN_COOKIE_NAME } from '@/lib/admin-auth'
import { supabase } from '@/lib/supabase'
import { getTelegramStatus } from '@/lib/telegram-status'

export default async function AdminDashboardPage() {
  const cookieStore = await cookies()
  const hasToken = !!cookieStore.get(ADMIN_COOKIE_NAME)?.value

  let newsCount = 0
  try {
    const { count } = await supabase
      .from('news_articles')
      .select('id', { count: 'exact', head: true })
    newsCount = count ?? 0
  } catch(e) { console.error('supabase:', e) }

  let telegramOk = false
  let telegramLabel = 'не проверен'
  try {
    const tg = await getTelegramStatus()
    telegramOk = tg.ok
    telegramLabel = tg.label
  } catch(e) { 
    console.error('telegram:', e)
    telegramLabel = 'ошибка'
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold">Dashboard — ШАГ 2</h1>
      <p>Auth: {hasToken ? '✅' : '❌'}</p>
      <p>Новостей: {newsCount}</p>
      <p>Telegram: {telegramOk ? '✅' : '❌'} {telegramLabel}</p>
    </div>
  )
}
