import { useTranslation } from 'react-i18next'
import { Mail, MessageCircle } from 'lucide-react'

const Contact = () => {
  const { i18n } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="flex justify-center mb-4 md:mb-6">
            <img src="/logo.png" alt="CarxMods" className="h-16 md:h-20" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            {i18n.language === 'ru' ? 'Контакты' : 'Contact Us'}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 px-4">
            {i18n.language === 'ru' 
              ? 'Свяжитесь со мной для вопросов о модах'
              : 'Contact me for questions about mods'}
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="group bg-white p-6 md:p-8 border-2 border-gray-200 hover:border-gray-900 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 border-2 border-gray-900 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-gray-900 transition-all duration-300 shadow-sm">
              <Mail className="w-7 h-7 text-gray-900 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 uppercase tracking-wide">Email</h3>
            <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 leading-relaxed">
              {i18n.language === 'ru'
                ? 'Напишите на почту для поддержки или вопросов о модах'
                : 'Email me for support or questions about mods'}
            </p>
            <a href="mailto:support@carxstreetmods.com" className="text-sm md:text-base text-gray-900 hover:text-gray-700 font-semibold break-all transition-colors">
              support@carxstreetmods.com
            </a>
          </div>

          <div className="group bg-white p-6 md:p-8 border-2 border-gray-200 hover:border-gray-900 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 border-2 border-gray-900 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-gray-900 transition-all duration-300 shadow-sm">
              <MessageCircle className="w-7 h-7 text-gray-900 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 uppercase tracking-wide">
              {i18n.language === 'ru' ? 'Социальные сети' : 'Social Media'}
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 leading-relaxed">
              {i18n.language === 'ru'
                ? 'Следите за новостями и новыми модами'
                : 'Follow for news and new mods'}
            </p>
            <div className="space-y-2">
              <a href="https://discord.gg/carxmods" target="_blank" rel="noopener noreferrer" className="block text-sm md:text-base text-gray-900 hover:text-gray-700 font-semibold transition-colors">
                Discord Community
              </a>
              <a href="https://t.me/carxmods" target="_blank" rel="noopener noreferrer" className="block text-sm md:text-base text-gray-900 hover:text-gray-700 font-semibold transition-colors">
                Telegram Channel
              </a>
            </div>
          </div>
        </div>

        {/* Support Info */}
        <div className="bg-gray-100 border-2 border-gray-200 p-6 md:p-8 shadow-md">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 uppercase tracking-wide">
            {i18n.language === 'ru' ? 'Поддержка' : 'Support'}
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">
            {i18n.language === 'ru'
              ? 'Я отвечаю на сообщения ежедневно. Среднее время ответа: 2-12 часов.'
              : 'I reply to messages daily. Average response time: 2-12 hours.'}
          </p>
          <div className="space-y-3 text-sm md:text-base text-gray-700">
            <p className="break-words bg-white p-3 border-l-4 border-gray-900"><strong>{i18n.language === 'ru' ? 'По вопросам модов:' : 'About mods:'}</strong> support@carxstreetmods.com</p>
            <p className="bg-white p-3 border-l-4 border-gray-900"><strong>{i18n.language === 'ru' ? 'Технические проблемы:' : 'Technical issues:'}</strong> {i18n.language === 'ru' ? 'Чат на сайте' : 'Site chat'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
