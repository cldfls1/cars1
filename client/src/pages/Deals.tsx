import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { dealService, Deal } from '../services/deals'
import { formatDate } from '../lib/utils'
import { MessageSquare, Clock, CheckCircle, XCircle } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

const Deals = () => {
  const { t, i18n } = useTranslation()
  const { user } = useAuthStore()
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    loadDeals()
  }, [])

  const loadDeals = async () => {
    try {
      const data = await dealService.getDeals()
      // Filter deals based on user role
      // Buyers see deals where they are the buyer
      // Sellers see deals for their products
      const filteredData = data.filter(deal => {
        if (!user) return false
        // If user is buyer of this deal
        if (deal.buyer_id === user.id) return true
        // If user is seller of the product in this deal
        if (deal.product && deal.product.seller === user.username) return true
        return false
      })
      setDeals(filteredData)
    } catch (error) {
      console.error('Failed to load deals:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      accepted: 'bg-blue-100 text-blue-800 border-blue-300',
      payment_sent: 'bg-purple-100 text-purple-800 border-purple-300',
      completed: 'bg-green-100 text-green-800 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-300',
      cancelled: 'bg-gray-100 text-gray-800 border-gray-300',
    }
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={20} />
      case 'completed':
        return <CheckCircle size={20} />
      case 'rejected':
      case 'cancelled':
        return <XCircle size={20} />
      default:
        return <MessageSquare size={20} />
    }
  }

  const filteredDeals = deals.filter(deal => {
    if (filter === 'all') return true
    if (filter === 'active') return ['pending', 'accepted', 'payment_sent'].includes(deal.status)
    if (filter === 'completed') return deal.status === 'completed'
    return deal.status === filter
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('my_deals')}</h1>
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {['all', 'active', 'pending', 'accepted', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === status
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {i18n.language === 'ru' 
                ? {
                    all: 'Все',
                    active: 'Активные',
                    pending: 'Ожидание',
                    accepted: 'Принято',
                    completed: 'Завершено',
                  }[status]
                : {
                    all: 'All',
                    active: 'Active',
                    pending: 'Pending',
                    accepted: 'Accepted',
                    completed: 'Completed',
                  }[status]}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mx-auto"></div>
        </div>
      ) : filteredDeals.length === 0 ? (
        <div className="card text-center py-12">
          <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg">
            {i18n.language === 'ru' ? 'Нет сделок' : 'No deals found'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map((deal) => (
            <Link
              key={deal.id}
              to={`/deals/${deal.id}`}
              className="card hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Deal #{deal.id}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {formatDate(deal.created_at)}
                  </p>
                </div>
                <div className={`p-2 rounded-lg border ${getStatusColor(deal.status)}`}>
                  {getStatusIcon(deal.status)}
                </div>
              </div>

              <div className={`px-4 py-2 rounded-lg border font-medium text-center ${getStatusColor(deal.status)}`}>
                {t(deal.status)}
              </div>

              {deal.completed_at && (
                <p className="text-xs text-gray-500 mt-3">
                  {i18n.language === 'ru' ? 'Завершено: ' : 'Completed: '}
                  {formatDate(deal.completed_at)}
                </p>
              )}

              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {i18n.language === 'ru' ? 'Открыть чат' : 'Open chat'}
                </span>
                <MessageSquare size={20} className="text-primary-600" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Deals
