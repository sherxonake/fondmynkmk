import { cookies } from 'next/headers'
import { ADMIN_COOKIE_NAME } from '@/lib/admin-auth'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  // Минимальная проверка без throw
  const cookieStore = await cookies()
  const hasToken = !!cookieStore.get(ADMIN_COOKIE_NAME)?.value
  
  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-slate-400 mt-2">
        Auth status: {hasToken ? '✅ Авторизован' : '❌ Нет токена'}
      </p>
    </div>
  )
}
