import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { dealService, Deal, DealMessage } from '../services/deals'
import { useAuthStore } from '../store/authStore'
import { formatDate, formatPrice } from '../lib/utils'
import { ArrowLeft, Send, CheckCircle, XCircle, CreditCard } from 'lucide-react'

const DealChat = () => {
  const { id } = useParams<{ id: string }>()
  const { t, i18n } = useTranslation()
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const [deal, setDeal] = useState<Deal | null>(null)
  const [messages, setMessages] = useState<DealMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [steamCard, setSteamCard] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (id) {
      loadDeal()
      loadMessages()
      const interval = setInterval(loadMessages, 5000) // Poll every 5 seconds
      return () => clearInterval(interval)
    }
  }, [id])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const loadDeal = async () => {
    try {
      const data = await dealService.getDeal(parseInt(id!))
      setDeal(data)
    } catch (error) {
      console.error('Failed to load deal:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadMessages = async () => {
    try {
      const data = await dealService.getMessages(parseInt(id!))
      setMessages(data)
    } catch (error) {
      console.error('Failed to load messages:', error)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    setSending(true)
    try {
      await dealService.sendMessage(parseInt(id!), newMessage)
      setNewMessage('')
      loadMessages()
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setSending(false)
    }
  }

  const handleSubmitPayment = async () => {
    if (!steamCard.trim()) {
      alert(i18n.language === 'ru' ? 'Введите код Steam карты' : 'Enter Steam card code')
      return
    }

    try {
      await dealService.updateDealStatus(parseInt(id!), 'payment_sent', steamCard)
      setSteamCard('')
      loadDeal()
      loadMessages()
    } catch (error) {
      console.error('Failed to submit payment:', error)
    }
  }

  const handleUpdateStatus = async (status: string) => {
    try {
      await dealService.updateDealStatus(parseInt(id!), status)
      loadDeal()
      loadMessages()
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mx-auto"></div>
      </div>
    )
  }

  if (!deal) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">{i18n.language === 'ru' ? 'Сделка не найдена' : 'Deal not found'}</p>
      </div>
    )
  }

  const isAdmin = user?.is_admin
  const isBuyer = deal.buyer_id === user?.id

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <button
        onClick={() => navigate('/deals')}
        className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition mb-6"
      >
        <ArrowLeft size={20} />
        <span>{i18n.language === 'ru' ? 'Назад к сделкам' : 'Back to deals'}</span>
      </button>

      {/* Deal Info */}
      <div className="card mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Deal #{deal.id}</h1>
            <p className="text-gray-600 mt-1">{formatDate(deal.created_at)}</p>
          </div>
          <div className={`px-4 py-2 rounded-lg font-medium ${
            deal.status === 'completed' ? 'bg-green-100 text-green-800' :
            deal.status === 'rejected' || deal.status === 'cancelled' ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {t(deal.status)}
          </div>
        </div>

        {deal.product && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900">{deal.product.title}</h3>
            <p className="text-2xl font-bold text-primary-600 mt-2">
              {formatPrice(deal.product.price, deal.product.currency)}
            </p>
          </div>
        )}

        {/* Admin Actions */}
        {isAdmin && deal.status === 'pending' && (
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => handleUpdateStatus('accepted')}
              className="btn btn-primary flex-1 flex items-center justify-center space-x-2"
            >
              <CheckCircle size={20} />
              <span>{t('accept_deal')}</span>
            </button>
            <button
              onClick={() => handleUpdateStatus('rejected')}
              className="btn btn-danger flex-1 flex items-center justify-center space-x-2"
            >
              <XCircle size={20} />
              <span>{t('reject_deal')}</span>
            </button>
          </div>
        )}

        {/* Buyer Payment */}
        {isBuyer && deal.status === 'accepted' && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center space-x-2">
              <CreditCard size={20} />
              <span>{t('steam_card_code')}</span>
            </h3>
            <input
              type="text"
              value={steamCard}
              onChange={(e) => setSteamCard(e.target.value)}
              placeholder={i18n.language === 'ru' ? 'Введите код...' : 'Enter code...'}
              className="input mb-3"
            />
            <button
              onClick={handleSubmitPayment}
              className="btn btn-primary w-full"
            >
              {t('submit_payment')}
            </button>
          </div>
        )}

        {/* Admin Complete Deal */}
        {isAdmin && deal.status === 'payment_sent' && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">
              Steam Card: <code className="bg-gray-100 px-2 py-1 rounded">{deal.steam_card_code}</code>
            </p>
            <button
              onClick={() => handleUpdateStatus('completed')}
              className="btn btn-primary w-full flex items-center justify-center space-x-2"
            >
              <CheckCircle size={20} />
              <span>{t('complete_deal')}</span>
            </button>
          </div>
        )}
      </div>

      {/* Chat */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {i18n.language === 'ru' ? 'Чат' : 'Chat'}
        </h2>

        <div className="border rounded-lg p-4 h-96 overflow-y-auto mb-4 bg-gray-50">
          {messages.length === 0 ? (
            <p className="text-center text-gray-600">
              {i18n.language === 'ru' ? 'Нет сообщений' : 'No messages'}
            </p>
          ) : (
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`${
                    message.is_system
                      ? 'text-center'
                      : message.sender_id === user?.id
                      ? 'text-right'
                      : 'text-left'
                  }`}
                >
                  {message.is_system ? (
                    <div className="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm">
                      {message.message}
                    </div>
                  ) : (
                    <div
                      className={`inline-block max-w-xs px-4 py-2 rounded-lg ${
                        message.sender_id === user?.id
                          ? 'bg-primary-600 text-white'
                          : 'bg-white border border-gray-300 text-gray-900'
                      }`}
                    >
                      <p>{message.message}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender_id === user?.id ? 'text-primary-100' : 'text-gray-500'
                      }`}>
                        {new Date(message.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={t('type_message')}
            className="input flex-1"
            disabled={['completed', 'rejected', 'cancelled'].includes(deal.status)}
          />
          <button
            type="submit"
            disabled={sending || !newMessage.trim() || ['completed', 'rejected', 'cancelled'].includes(deal.status)}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Send size={20} />
            <span>{t('send_message')}</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default DealChat
