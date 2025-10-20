import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { dealService, Deal, DealMessage } from '../services/deals'
import { useAuthStore } from '../store/authStore'
import { ArrowLeft, Send, CheckCircle, XCircle, Package } from 'lucide-react'

const DealChat = () => {
  const { id } = useParams<{ id: string }>()
  const { t, i18n } = useTranslation()
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const [deal, setDeal] = useState<Deal | null>(null)
  const [messages, setMessages] = useState<DealMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [seller, setSeller] = useState<any>(null)
  const [buyer, setBuyer] = useState<any>(null)

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
      // Mock users based on product seller
      if (data.product) {
        setSeller({ id: 2, username: data.product.seller })
      }
      setBuyer({ id: data.buyer_id, username: 'Buyer' })
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
    try {
      await dealService.updateDealStatus(parseInt(id!), 'payment_sent')
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

  const isAdmin = user?.role === 'admin'
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
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Deal #{deal.id}</h1>
            <p className="text-gray-600 mt-2">
              {new Date(deal.created_at).toLocaleDateString()} {new Date(deal.created_at).toLocaleTimeString()}
            </p>
          </div>
          <div className={`px-6 py-3 rounded-lg font-bold uppercase text-sm ${
            deal.status === 'completed' ? 'bg-green-100 text-green-800' :
            deal.status === 'rejected' || deal.status === 'cancelled' ? 'bg-red-100 text-red-800' :
            deal.status === 'payment_sent' ? 'bg-yellow-100 text-yellow-800' :
            deal.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {deal.status === 'pending' && (i18n.language === 'ru' ? 'В ожидании' : 'Pending')}
            {deal.status === 'accepted' && (i18n.language === 'ru' ? 'Принято' : 'Accepted')}
            {deal.status === 'payment_sent' && (i18n.language === 'ru' ? 'Оплачено' : 'Paid')}
            {deal.status === 'completed' && (i18n.language === 'ru' ? 'Завершено' : 'Completed')}
            {deal.status === 'rejected' && (i18n.language === 'ru' ? 'Отклонено' : 'Rejected')}
          </div>
        </div>

        {deal.product && (
          <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            {deal.product.image_url ? (
              <img src={deal.product.image_url} alt={deal.product.title} className="w-24 h-24 object-cover rounded-lg" />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                <Package size={32} className="text-gray-400" />
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-bold text-xl text-gray-900 mb-1">{deal.product.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{deal.product.description}</p>
              <p className="text-3xl font-black text-gray-900">
                ${deal.product.price}
              </p>
            </div>
          </div>
        )}

        {/* Admin Actions */}
        {isAdmin && deal.status === 'pending' && (
          <div className="mt-6 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
            <p className="text-sm font-bold text-blue-900 mb-4 uppercase">
              {i18n.language === 'ru' ? 'Действия администратора' : 'Admin Actions'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleUpdateStatus('accepted')}
                className="btn btn-primary flex-1 flex items-center justify-center space-x-2 py-3"
              >
                <CheckCircle size={20} />
                <span>{i18n.language === 'ru' ? 'Принять' : 'Accept'}</span>
              </button>
              <button
                onClick={() => handleUpdateStatus('rejected')}
                className="btn btn-danger flex-1 flex items-center justify-center space-x-2 py-3"
              >
                <XCircle size={20} />
                <span>{i18n.language === 'ru' ? 'Отклонить' : 'Reject'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Buyer Payment */}
        {isBuyer && deal.status === 'accepted' && (
          <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">💳</span>
              <p className="text-lg font-bold text-green-900 uppercase">
                {i18n.language === 'ru' ? 'Способ оплаты' : 'Payment Method'}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                {i18n.language === 'ru' ? '🎮 Steam карта / Steam Gift Card' : '🎮 Steam Gift Card'}
              </p>
              <p className="text-xs text-gray-600">
                {i18n.language === 'ru'
                  ? 'Отправьте код Steam карты продавцу в чате. После отправки нажмите кнопку ниже.'
                  : 'Send the Steam gift card code to seller in chat. Click the button below after sending.'}
              </p>
            </div>
            <button
              onClick={handleSubmitPayment}
              className="btn btn-primary w-full py-3 text-lg font-bold shadow-md hover:shadow-xl transition"
            >
              ✓ {i18n.language === 'ru' ? 'Я отправил код Steam карты' : 'I Sent Steam Card Code'}
            </button>
          </div>
        )}

        {/* Admin Complete Deal */}
        {isAdmin && deal.status === 'payment_sent' && (
          <div className="mt-6 p-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
            <p className="text-sm font-bold text-yellow-900 mb-2 uppercase">
              {i18n.language === 'ru' ? 'Ожидает подтверждения' : 'Awaiting Confirmation'}
            </p>
            <p className="text-gray-600 text-sm mb-4">
              {i18n.language === 'ru' 
                ? 'Покупатель отправил оплату. Проверьте и завершите сделку.'
                : 'Buyer sent payment. Verify and complete the deal.'}
            </p>
            <button
              onClick={() => handleUpdateStatus('completed')}
              className="btn btn-primary w-full flex items-center justify-center space-x-2 py-3 text-lg font-bold"
            >
              <CheckCircle size={24} />
              <span>{i18n.language === 'ru' ? 'Завершить сделку' : 'Complete Deal'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Chat */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          💬 {i18n.language === 'ru' ? 'Чат со продавцом' : 'Chat with Seller'}
        </h2>

        <div className="border-2 border-gray-200 rounded-xl p-6 h-96 overflow-y-auto mb-4 bg-gradient-to-b from-gray-50 to-white">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <span className="text-6xl mb-4">💬</span>
              <p className="text-center text-gray-600">
                {i18n.language === 'ru' ? 'Нет сообщений. Начните общение!' : 'No messages. Start the conversation!'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => {
                const isMine = message.sender_id === user?.id
                const senderName = isMine ? user?.username : (message.sender_id === seller?.id ? seller?.username : buyer?.username)
                
                return (
                  <div
                    key={message.id}
                    className={`${
                      message.is_system
                        ? 'text-center'
                        : isMine
                        ? 'text-right'
                        : 'text-left'
                    }`}
                  >
                    {message.is_system ? (
                      <div className="inline-block px-6 py-3 bg-blue-100 text-blue-800 rounded-full text-sm font-medium shadow-sm">
                        ℹ️ {message.message}
                      </div>
                    ) : (
                      <div className="inline-block max-w-md">
                        {/* Sender name */}
                        <p className={`text-xs font-semibold mb-1 px-1 ${
                          isMine ? 'text-right text-primary-700' : 'text-left text-gray-600'
                        }`}>
                          {isMine ? '👤 ' + (user?.username || 'You') : '👥 ' + (senderName || 'Seller')}
                        </p>
                        {/* Message bubble */}
                        <div
                          className={`px-5 py-3 rounded-2xl shadow-md ${
                            isMine
                              ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-br-sm'
                              : 'bg-white border-2 border-gray-200 text-gray-900 rounded-bl-sm'
                          }`}
                        >
                          <p className="break-words">{message.message}</p>
                          <p className={`text-xs mt-2 ${
                            isMine ? 'text-primary-100' : 'text-gray-500'
                          }`}>
                            ⏰ {new Date(message.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
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
