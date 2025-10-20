import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../store/authStore'
import { authService } from '../services/auth'
import { dealService, Deal } from '../services/deals'
import { Link } from 'react-router-dom'
import { User, Mail, Send, Bell, ShoppingBag } from 'lucide-react'
import { formatDate } from '../lib/utils'

const Dashboard = () => {
  const { t, i18n } = useTranslation()
  const { user, updateUser } = useAuthStore()
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  
  const [email, setEmail] = useState(user?.email || '')
  const [telegramId, setTelegramId] = useState(user?.telegram_id || '')
  const [notifyEmail, setNotifyEmail] = useState(user?.notify_email || false)
  const [notifyTelegram, setNotifyTelegram] = useState(user?.notify_telegram || false)
  const [notifyPush, setNotifyPush] = useState(user?.notify_push || false)

  useEffect(() => {
    loadDeals()
  }, [])

  const loadDeals = async () => {
    try {
      const data = await dealService.getDeals()
      setDeals(data.slice(0, 5)) // Show only last 5 deals
    } catch (error) {
      console.error('Failed to load deals:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    try {
      const updated = await authService.updateProfile({
        email: email || undefined,
        telegram_id: telegramId || undefined,
        notify_email: notifyEmail,
        notify_telegram: notifyTelegram,
        notify_push: notifyPush,
      })
      updateUser(updated)
      alert(t('success'))
    } catch (error) {
      console.error('Failed to update profile:', error)
      alert(t('error'))
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-blue-100 text-blue-800',
      payment_sent: 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('dashboard')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Info Card */}
          <div className="card">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
                <User size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{user?.username}</h2>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`w-2 h-2 rounded-full ${user?.is_online ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                  <span className="text-sm text-gray-600">
                    {user?.is_online 
                      ? (i18n.language === 'ru' ? 'В сети' : 'Online')
                      : (i18n.language === 'ru' ? 'Не в сети' : 'Offline')}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                  <Mail size={16} />
                  <span>{t('email')}</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                  <Send size={16} />
                  <span>{t('telegram_id')}</span>
                </label>
                <input
                  type="text"
                  value={telegramId}
                  onChange={(e) => setTelegramId(e.target.value)}
                  className="input"
                  placeholder="@username or chat_id"
                />
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2">
                  <Bell size={16} />
                  <span>
                    {i18n.language === 'ru' ? 'Уведомления' : 'Notifications'}
                  </span>
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.checked)}
                      className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Email</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={notifyTelegram}
                      onChange={(e) => setNotifyTelegram(e.target.checked)}
                      className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Telegram</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={notifyPush}
                      onChange={(e) => setNotifyPush(e.target.checked)}
                      className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">
                      {i18n.language === 'ru' ? 'Браузер' : 'Browser Push'}
                    </span>
                  </label>
                </div>
              </div>

              <button onClick={handleSaveProfile} className="btn btn-primary w-full">
                {t('save')}
              </button>
            </div>
          </div>

          {/* Recent Deals */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <ShoppingBag size={24} />
              <span>
                {i18n.language === 'ru' ? 'Последние сделки' : 'Recent Deals'}
              </span>
            </h2>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full mx-auto"></div>
              </div>
            ) : deals.length === 0 ? (
              <p className="text-gray-600 text-center py-8">
                {i18n.language === 'ru' ? 'У вас пока нет сделок' : 'You have no deals yet'}
              </p>
            ) : (
              <div className="space-y-3">
                {deals.map((deal) => (
                  <Link
                    key={deal.id}
                    to={`/deals/${deal.id}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Deal #{deal.id}</p>
                        <p className="text-sm text-gray-600">{formatDate(deal.created_at)}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(deal.status)}`}>
                        {t(deal.status)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <Link to="/deals" className="block mt-4 text-center text-primary-600 hover:underline">
              {i18n.language === 'ru' ? 'Смотреть все сделки' : 'View all deals'}
            </Link>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          <div className="card bg-primary-50 border-primary-200">
            <h3 className="text-lg font-semibold text-primary-900 mb-4">
              {i18n.language === 'ru' ? 'Статистика' : 'Statistics'}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">{i18n.language === 'ru' ? 'Всего сделок:' : 'Total Deals:'}</span>
                <span className="font-bold text-primary-900">{deals.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">{i18n.language === 'ru' ? 'Завершено:' : 'Completed:'}</span>
                <span className="font-bold text-green-600">
                  {deals.filter(d => d.status === 'completed').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">{i18n.language === 'ru' ? 'В процессе:' : 'In Progress:'}</span>
                <span className="font-bold text-blue-600">
                  {deals.filter(d => ['pending', 'accepted', 'payment_sent'].includes(d.status)).length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
