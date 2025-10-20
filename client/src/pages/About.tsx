import { useTranslation } from 'react-i18next'
import { Users, Shield, Zap, Heart } from 'lucide-react'

const About = () => {
  const { i18n } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="CarxMods" className="h-20" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {i18n.language === 'ru' ? 'О нас' : 'About Us'}
          </h1>
          <p className="text-xl text-gray-600">
            {i18n.language === 'ru' 
              ? 'Авторские премиум моды для CarX Street'
              : 'Custom premium mods for CarX Street'}
          </p>
        </div>

        {/* Mission */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {i18n.language === 'ru' ? 'Наша миссия' : 'Our Mission'}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            {i18n.language === 'ru'
              ? 'Я создаю качественные моды для CarX Street и продаю их напрямую игрокам. Каждый мод разрабатывается с вниманием к деталям и тестируется перед публикацией.'
              : 'I create quality mods for CarX Street and sell them directly to players. Each mod is developed with attention to detail and tested before release.'}
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            {i18n.language === 'ru'
              ? 'Все моды — авторские, уникальные и работают на последней версии игры.'
              : 'All mods are original, unique and work on the latest game version.'}
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <Shield className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {i18n.language === 'ru' ? 'Прямые продажи' : 'Direct Sales'}
            </h3>
            <p className="text-gray-600">
              {i18n.language === 'ru'
                ? 'Покупаете моды напрямую у автора без посредников. Безопасные платежи и гарантия качества.'
                : 'Buy mods directly from the author without intermediaries. Secure payments and quality guarantee.'}
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
              {i18n.language === 'ru' ? 'Поддержка' : 'Support'}
            </h3>
            <p className="text-gray-600">
              {i18n.language === 'ru'
                ? 'Прямая связь с разработчиком. Помогу с установкой и отвечу на вопросы.'
                : 'Direct contact with developer. Help with installation and answer questions.'}
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <Heart className="w-12 h-12 text-red-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {i18n.language === 'ru' ? 'Авторские моды' : 'Original Mods'}
            </h3>
            <p className="text-gray-600">
              {i18n.language === 'ru'
                ? 'Все моды созданы мной лично. Никаких ворованных или перепродажных модов.'
                : 'All mods are created by me personally. No stolen or resold mods.'}
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
