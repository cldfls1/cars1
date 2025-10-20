import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { dealService, Deal, DealMessage } from '../services/deals'
import { useAuthStore } from '../store/authStore'
import { ArrowLeft, Send, CheckCircle, XCircle, Package, User, ShoppingBag, AlertCircle } from 'lucide-react'

const DealChat = () => {
  const { id } = useParams<{ id: string }>()
  const { i18n } = useTranslation()
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
      // Set seller and buyer info
      if (data.product) {
        setSeller({ id: 2, username: data.product.seller })
      }
      setBuyer({ id: data.buyer_id, username: data.buyer_username || 'Buyer' })
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
    if (!newMessage.trim() || !user?.id) return

    setSending(true)
    try {
      await dealService.sendMessage(parseInt(id!), newMessage, user.id)
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
  const isSeller = deal.product?.seller === user?.username

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

        {/* TEST BUTTON - ALWAYS VISIBLE */}
        <div className="mt-6 p-6 bg-yellow-100 border-4 border-yellow-500 rounded-xl text-sm">
          <p className="text-2xl font-bold mb-4">⚠️ DEBUG INFO</p>
          
          <div className="bg-white p-3 rounded mb-3">
            <p className="font-bold mb-2">COMPARISON:</p>
            <p>isSeller: {isSeller ? '✅ ДА' : '❌ НЕТ'}</p>
            <p>isBuyer: {isBuyer ? '✅ ДА' : '❌ НЕТ'}</p>
            <p>Status: {deal.status}</p>
          </div>
          
          <div className="bg-white p-3 rounded mb-3">
            <p className="font-bold mb-2">USER DATA:</p>
            <p>user?.username: "{user?.username}"</p>
            <p>user?.id: {user?.id}</p>
          </div>
          
          <div className="bg-white p-3 rounded">
            <p className="font-bold mb-2">DEAL DATA:</p>
            <p>deal.product?.seller: "{deal.product?.seller}"</p>
            <p>deal.buyer_id: {deal.buyer_id}</p>
          </div>
        </div>

        {/* Seller Actions - Accept/Reject Deal */}
        {isSeller && (deal.status === 'pending' || deal.status === 'accepted') && (
          <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Package size={24} className="text-blue-700" />
              <p className="text-lg font-bold text-blue-900 uppercase">
                {i18n.language === 'ru' ? 'Новая заявка на покупку' : 'New Purchase Request'}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
              <p className="text-sm text-gray-700">
                {i18n.language === 'ru' 
                  ? 'Покупатель хочет купить ваш товар. Примите заявку чтобы начать сделку.'
                  : 'Buyer wants to purchase your product. Accept the request to start the deal.'}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleUpdateStatus('accepted')}
                className="btn btn-primary flex-1 flex items-center justify-center space-x-2 py-3 shadow-md hover:shadow-xl transition"
              >
                <CheckCircle size={20} />
                <span>{i18n.language === 'ru' ? 'Принять заявку' : 'Accept Request'}</span>
              </button>
              <button
                onClick={() => handleUpdateStatus('rejected')}
                className="flex-1 flex items-center justify-center space-x-2 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold shadow-md hover:shadow-xl transition"
              >
                <XCircle size={20} />
                <span>{i18n.language === 'ru' ? 'Отклонить' : 'Reject'}</span>
              </button>
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
        {isBuyer && (deal.status === 'accepted' || deal.status === 'payment_sent') && (
          <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle size={24} className="text-green-700" />
              <p className="text-lg font-bold text-green-900 uppercase">
                {i18n.language === 'ru' ? 'Способ оплаты' : 'Payment Method'}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Package size={16} className="text-green-700" />
                <p className="text-sm font-semibold text-gray-700">
                  {i18n.language === 'ru' ? 'Steam Gift Card' : 'Steam Gift Card'}
                </p>
              </div>
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

        {/* Seller Complete Deal */}
        {isSeller && deal.status === 'payment_sent' && (
          <div className="mt-6 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-xl shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle size={24} className="text-yellow-700" />
              <p className="text-lg font-bold text-yellow-900 uppercase">
                {i18n.language === 'ru' ? 'Оплата получена?' : 'Payment Received?'}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-yellow-200 mb-4">
              <p className="text-sm text-gray-700 mb-2">
                {i18n.language === 'ru' 
                  ? '💳 Покупатель сообщил об отправке Steam карты'
                  : '💳 Buyer confirmed sending Steam card'}
              </p>
              <p className="text-xs text-gray-600">
                {i18n.language === 'ru'
                  ? 'Проверьте код Steam карты в чате выше. Если все верно - завершите сделку.'
                  : 'Check the Steam card code in chat above. If correct - complete the deal.'}
              </p>
            </div>
            <button
              onClick={() => handleUpdateStatus('completed')}
              className="btn btn-primary w-full flex items-center justify-center space-x-2 py-3 text-lg font-bold shadow-md hover:shadow-xl transition"
            >
              <CheckCircle size={24} />
              <span>{i18n.language === 'ru' ? 'Подтвердить и завершить сделку' : 'Confirm & Complete Deal'}</span>
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
        <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
            <ShoppingBag className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {i18n.language === 'ru' ? 'Чат сделки' : 'Deal Chat'}
            </h2>
            <p className="text-sm text-gray-500">
              {isBuyer ? (i18n.language === 'ru' ? 'Вы покупатель' : 'You are buyer') : (i18n.language === 'ru' ? 'Вы продавец' : 'You are seller')}
            </p>
          </div>
        </div>

        <div className="border rounded-xl h-96 overflow-y-auto mb-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <Send className="text-gray-400" size={32} />
              </div>
              <p className="text-gray-500 text-sm">
                {i18n.language === 'ru' ? 'Нет сообщений' : 'No messages yet'}
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {messages.map((message) => {
                const isMine = message.sender_id === user?.id
                
                return (
                  <div key={message.id}>
                    {message.is_system ? (
                      <div className="flex items-center justify-center my-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-xs text-blue-700">
                          <AlertCircle size={14} />
                          <span>{message.message}</span>
                        </div>
                      </div>
                    ) : (
                      <div className={`flex gap-2 ${
                        isMine ? 'flex-row-reverse' : 'flex-row'
                      }`}>
                        {/* Avatar */}
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          isMine ? 'bg-primary-600' : 'bg-gray-400'
                        }`}>
                          <User className="text-white" size={16} />
                        </div>
                        
                        {/* Message */}
                        <div className={`flex flex-col max-w-sm ${
                          isMine ? 'items-end' : 'items-start'
                        }`}>
                          <div className={`px-4 py-2 rounded-2xl ${
                            isMine
                              ? 'bg-primary-600 text-white rounded-br-md'
                              : 'bg-white text-gray-900 border border-gray-200 rounded-bl-md'
                          }`}>
                            <p className="text-sm break-words">{message.message}</p>
                          </div>
                          <div className={`flex items-center gap-1 mt-1 px-2 text-xs text-gray-500`}>
                            <span className="font-semibold">
                              {isMine ? (user?.username || 'You') : (isBuyer ? seller?.username || 'Seller' : buyer?.username || 'Buyer')}
                            </span>
                            <span>•</span>
                            <span>{new Date(message.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                          </div>
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

        <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={i18n.language === 'ru' ? 'Введите сообщение...' : 'Type a message...'}
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-primary-500 transition"
            disabled={['completed', 'rejected', 'cancelled'].includes(deal.status)}
          />
          <button
            type="submit"
            disabled={sending || !newMessage.trim() || ['completed', 'rejected', 'cancelled'].includes(deal.status)}
            className="w-12 h-12 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 rounded-full flex items-center justify-center transition shadow-lg hover:shadow-xl"
          >
            <Send size={20} className="text-white" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default DealChat
