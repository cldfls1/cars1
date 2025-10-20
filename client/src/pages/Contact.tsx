import { useTranslation } from 'react-i18next'
import { Mail, MessageCircle } from 'lucide-react'

const Contact = () => {
  const { i18n } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="CarxMods" className="h-20" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {i18n.language === 'ru' ? 'Контакты' : 'Contact Us'}
          </h1>
          <p className="text-xl text-gray-600">
            {i18n.language === 'ru' 
              ? 'Свяжитесь со мной для вопросов о модах'
              : 'Contact me for questions about mods'}
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <Mail className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Email</h3>
            <p className="text-gray-600 mb-4">
              {i18n.language === 'ru'
                ? 'Напишите на почту для поддержки или вопросов о модах'
                : 'Email me for support or questions about mods'}
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
                ? 'Следите за новостями и новыми модами'
                : 'Follow for news and new mods'}
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
        <div className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {i18n.language === 'ru' ? 'Поддержка' : 'Support'}
          </h2>
          <p className="text-gray-600 mb-4">
            {i18n.language === 'ru'
              ? 'Я отвечаю на сообщения ежедневно. Среднее время ответа: 2-12 часов.'
              : 'I reply to messages daily. Average response time: 2-12 hours.'}
          </p>
          <div className="space-y-2 text-gray-700">
            <p><strong>{i18n.language === 'ru' ? 'По вопросам модов:' : 'About mods:'}</strong> support@carxstreetmods.com</p>
            <p><strong>{i18n.language === 'ru' ? 'Технические проблемы:' : 'Technical issues:'}</strong> {i18n.language === 'ru' ? 'Чат на сайте' : 'Site chat'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
