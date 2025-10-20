import { useTranslation } from 'react-i18next'
import { Users, Shield, Zap, Heart } from 'lucide-react'

const About = () => {
  const { i18n } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {i18n.language === 'ru' ? 'О CarxMods' : 'About CarxMods'}
          </h1>
          <p className="text-xl text-gray-600">
            {i18n.language === 'ru' 
              ? 'Маркетплейс премиум модов для CarX Street с безопасными сделками'
              : 'Premium mod marketplace for CarX Street with secure transactions'}
          </p>
        </div>

        {/* Mission */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {i18n.language === 'ru' ? 'Наша миссия' : 'Our Mission'}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            {i18n.language === 'ru'
              ? 'CarxMods — это безопасная платформа для покупки и продажи качественных модов для CarX Street. Мы создали маркетплейс, где разработчики модов могут монетизировать свою работу, а игроки — получать лучший контент с гарантией качества.'
              : 'CarxMods is a secure platform for buying and selling quality mods for CarX Street. We created a marketplace where mod developers can monetize their work, and players can get the best content with quality guarantee.'}
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            {i18n.language === 'ru'
              ? 'Мы верим в прозрачность, безопасность и справедливость для всех участников сообщества.'
              : 'We believe in transparency, security and fairness for all community members.'}
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <Shield className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {i18n.language === 'ru' ? 'Безопасные сделки' : 'Secure Deals'}
            </h3>
            <p className="text-gray-600">
              {i18n.language === 'ru'
                ? 'Система защиты покупателя и escrow гарантируют безопасность каждой транзакции.'
                : 'Buyer protection system and escrow guarantee the security of every transaction.'}
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <Zap className="w-12 h-12 text-yellow-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {i18n.language === 'ru' ? 'Мгновенная доставка' : 'Instant Delivery'}
            </h3>
            <p className="text-gray-600">
              {i18n.language === 'ru'
                ? 'Получайте моды сразу после оплаты через встроенный чат.'
                : 'Get mods immediately after payment through built-in chat.'}
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <Users className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {i18n.language === 'ru' ? 'Сообщество' : 'Community'}
            </h3>
            <p className="text-gray-600">
              {i18n.language === 'ru'
                ? 'Присоединяйтесь к растущему сообществу создателей и игроков.'
                : 'Join the growing community of creators and players.'}
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <Heart className="w-12 h-12 text-red-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {i18n.language === 'ru' ? 'Качество' : 'Quality'}
            </h3>
            <p className="text-gray-600">
              {i18n.language === 'ru'
                ? 'Все моды проверяются, чтобы гарантировать высокое качество.'
                : 'All mods are verified to ensure high quality.'}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gray-900 text-white rounded-lg p-12 text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="text-4xl font-bold mb-2">500+</p>
              <p className="text-gray-400 uppercase tracking-wider text-sm">
                {i18n.language === 'ru' ? 'Пользователей' : 'Users'}
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">100+</p>
              <p className="text-gray-400 uppercase tracking-wider text-sm">
                {i18n.language === 'ru' ? 'Мод паков' : 'Mod Packs'}
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">4.9</p>
              <p className="text-gray-400 uppercase tracking-wider text-sm">
                {i18n.language === 'ru' ? 'Рейтинг' : 'Rating'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
