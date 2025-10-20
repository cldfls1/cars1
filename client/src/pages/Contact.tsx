import { useTranslation } from 'react-i18next'
import { Mail, MessageCircle, Send } from 'lucide-react'

const Contact = () => {
  const { i18n } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {i18n.language === 'ru' ? 'Контакты' : 'Contact Us'}
          </h1>
          <p className="text-xl text-gray-600">
            {i18n.language === 'ru' 
              ? 'Свяжитесь с нами любым удобным способом'
              : 'Get in touch with us through any convenient method'}
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <Mail className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Email</h3>
            <p className="text-gray-600 mb-4">
              {i18n.language === 'ru'
                ? 'Напишите нам на почту для поддержки или партнерства'
                : 'Email us for support or partnership inquiries'}
            </p>
            <a href="mailto:support@carxstreetmods.com" className="text-blue-600 hover:text-blue-700 font-medium">
              support@carxstreetmods.com
            </a>
          </div>

          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <MessageCircle className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {i18n.language === 'ru' ? 'Социальные сети' : 'Social Media'}
            </h3>
            <p className="text-gray-600 mb-4">
              {i18n.language === 'ru'
                ? 'Следите за новостями и обновлениями'
                : 'Follow us for news and updates'}
            </p>
            <div className="space-y-2">
              <a href="https://discord.gg/carxmods" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-700">
                Discord Community
              </a>
              <a href="https://t.me/carxmods" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-700">
                Telegram Channel
              </a>
            </div>
          </div>
        </div>

        {/* Support Info */}
        <div className="bg-blue-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {i18n.language === 'ru' ? 'Служба поддержки' : 'Customer Support'}
          </h2>
          <p className="text-gray-600 mb-4">
            {i18n.language === 'ru'
              ? 'Наша команда поддержки работает ежедневно с 10:00 до 22:00 (UTC+3). Среднее время ответа: 2-4 часа.'
              : 'Our support team works daily from 10:00 to 22:00 (UTC+3). Average response time: 2-4 hours.'}
          </p>
          <div className="space-y-2 text-gray-700">
            <p><strong>{i18n.language === 'ru' ? 'Технические вопросы:' : 'Technical issues:'}</strong> support@carxstreetmods.com</p>
            <p><strong>{i18n.language === 'ru' ? 'Партнерство:' : 'Partnership:'}</strong> partners@carxstreetmods.com</p>
            <p><strong>{i18n.language === 'ru' ? 'Жалобы:' : 'Complaints:'}</strong> abuse@carxstreetmods.com</p>
          </div>
        </div>

        {/* Quick Contact Form */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {i18n.language === 'ru' ? 'Быстрая связь' : 'Quick Contact'}
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {i18n.language === 'ru' ? 'Ваше имя' : 'Your Name'}
              </label>
              <input type="text" className="input" placeholder={i18n.language === 'ru' ? 'Иван Иванов' : 'John Doe'} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" className="input" placeholder="example@mail.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {i18n.language === 'ru' ? 'Сообщение' : 'Message'}
              </label>
              <textarea className="input" rows={5} placeholder={i18n.language === 'ru' ? 'Ваше сообщение...' : 'Your message...'}></textarea>
            </div>
            <button type="submit" className="btn btn-primary flex items-center gap-2">
              <Send size={18} />
              <span>{i18n.language === 'ru' ? 'Отправить' : 'Send'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
