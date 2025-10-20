import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import api from '../services/api'
import { Users, Package, TrendingUp, Ban, ShieldCheck } from 'lucide-react'

interface User {
  id: number
  username: string
  is_admin: boolean
  is_banned: boolean
}

interface Stats {
  total_users: number
  total_products: number
  completed_deals: number
  total_revenue: number
}

const AdminPanel = () => {
  const { t, i18n } = useTranslation()
  const [activeTab, setActiveTab] = useState<'stats' | 'users'>('stats')
  const [stats, setStats] = useState<Stats | null>(null)
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    loadStats()
    loadUsers()
  }, [])

  const loadStats = async () => {
    try {
      const { data } = await api.get<Stats>('/admin/stats')
      setStats(data)
    } catch (error) {
      console.error('Failed to load stats:', error)
    }
  }

  const loadUsers = async () => {
    try {
      const { data } = await api.get<User[]>('/admin/users')
      setUsers(data)
    } catch (error) {
      console.error('Failed to load users:', error)
    }
  }

  const handleBanUser = async (userId: number, ban: boolean) => {
    try {
      await api.put(`/admin/users/${userId}/${ban ? 'ban' : 'unban'}`)
      loadUsers()
      alert(t('success'))
    } catch (error) {
      console.error('Failed to ban/unban user:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{t('admin_panel')}</h1>

      <div className="flex space-x-2 mb-8">
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-6 py-3 rounded-lg font-medium ${
            activeTab === 'stats' ? 'bg-primary-600 text-white' : 'bg-gray-100'
          }`}
        >
          {t('statistics')}
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-6 py-3 rounded-lg font-medium ${
            activeTab === 'users' ? 'bg-primary-600 text-white' : 'bg-gray-100'
          }`}
        >
          {t('users')}
        </button>
      </div>

      {activeTab === 'stats' && stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card bg-blue-50">
            <Users size={32} className="text-blue-600 mb-3" />
            <p className="text-gray-600">{i18n.language === 'ru' ? 'Пользователи' : 'Users'}</p>
            <p className="text-3xl font-bold">{stats.total_users}</p>
          </div>
          <div className="card bg-green-50">
            <Package size={32} className="text-green-600 mb-3" />
            <p className="text-gray-600">{i18n.language === 'ru' ? 'Товары' : 'Products'}</p>
            <p className="text-3xl font-bold">{stats.total_products}</p>
          </div>
          <div className="card bg-purple-50">
            <TrendingUp size={32} className="text-purple-600 mb-3" />
            <p className="text-gray-600">{i18n.language === 'ru' ? 'Сделок' : 'Deals'}</p>
            <p className="text-3xl font-bold">{stats.completed_deals}</p>
          </div>
          <div className="card bg-yellow-50">
            <span className="text-4xl mb-3">💰</span>
            <p className="text-gray-600">{i18n.language === 'ru' ? 'Доход' : 'Revenue'}</p>
            <p className="text-3xl font-bold">{stats.total_revenue.toFixed(0)} ₽</p>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="card">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3">ID</th>
                <th className="text-left px-4 py-3">{t('username')}</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="px-4 py-3">{user.id}</td>
                  <td className="px-4 py-3">{user.username}</td>
                  <td className="px-4 py-3">
                    {user.is_banned ? (
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">Banned</span>
                    ) : (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Active</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {!user.is_admin && (
                      <button
                        onClick={() => handleBanUser(user.id, !user.is_banned)}
                        className={`px-3 py-1 rounded text-sm ${
                          user.is_banned ? 'bg-green-100 hover:bg-green-200' : 'bg-red-100 hover:bg-red-200'
                        }`}
                      >
                        {user.is_banned ? <ShieldCheck size={16} /> : <Ban size={16} />}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminPanel
