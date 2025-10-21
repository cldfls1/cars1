import { useTranslation } from 'react-i18next'
import { Users, Shield, Zap, Heart } from 'lucide-react'

const About = () => {
  const { i18n } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex justify-center mb-4 md:mb-6">
            <img src="/logo.png" alt="CarxMods" className="h-16 md:h-20" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            {i18n.language === 'ru' ? 'О нас' : 'About Us'}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 px-4">
            {i18n.language === 'ru' 
              ? 'Авторские премиум моды для CarX Street'
              : 'Custom premium mods for CarX Street'}
          </p>
        </div>

        {/* Mission */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
            {i18n.language === 'ru' ? 'Наша миссия' : 'Our Mission'}
          </h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
            {i18n.language === 'ru'
              ? 'Я создаю качественные моды для CarX Street и продаю их напрямую игрокам. Каждый мод разрабатывается с вниманием к деталям и тестируется перед публикацией.'
              : 'I create quality mods for CarX Street and sell them directly to players. Each mod is developed with attention to detail and tested before release.'}
          </p>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            {i18n.language === 'ru'
              ? 'Все моды — авторские, уникальные и работают на последней версии игры.'
              : 'All mods are original, unique and work on the latest game version.'}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          <div className="group bg-white p-6 md:p-8 border-2 border-gray-200 hover:border-gray-900 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 border-2 border-gray-900 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-gray-900 transition-all duration-300 shadow-sm">
              <Shield className="w-7 h-7 md:w-8 md:h-8 text-gray-900 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 uppercase tracking-wide">
              {i18n.language === 'ru' ? 'Прямые продажи' : 'Direct Sales'}
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {i18n.language === 'ru'
                ? 'Покупаете моды напрямую у автора без посредников. Безопасные платежи и гарантия качества.'
                : 'Buy mods directly from the author without intermediaries. Secure payments and quality guarantee.'}
            </p>
          </div>

          <div className="group bg-white p-6 md:p-8 border-2 border-gray-200 hover:border-gray-900 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 border-2 border-gray-900 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-gray-900 transition-all duration-300 shadow-sm">
              <Zap className="w-7 h-7 md:w-8 md:h-8 text-gray-900 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 uppercase tracking-wide">
              {i18n.language === 'ru' ? 'Мгновенная доставка' : 'Instant Delivery'}
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {i18n.language === 'ru'
                ? 'Получайте моды сразу после оплаты через встроенный чат.'
                : 'Get mods immediately after payment through built-in chat.'}
            </p>
          </div>

          <div className="group bg-white p-6 md:p-8 border-2 border-gray-200 hover:border-gray-900 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 border-2 border-gray-900 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-gray-900 transition-all duration-300 shadow-sm">
              <Users className="w-7 h-7 md:w-8 md:h-8 text-gray-900 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 uppercase tracking-wide">
              {i18n.language === 'ru' ? 'Поддержка' : 'Support'}
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {i18n.language === 'ru'
                ? 'Прямая связь с разработчиком. Помогу с установкой и отвечу на вопросы.'
                : 'Direct contact with developer. Help with installation and answer questions.'}
            </p>
          </div>

          <div className="group bg-white p-6 md:p-8 border-2 border-gray-200 hover:border-gray-900 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 border-2 border-gray-900 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-gray-900 transition-all duration-300 shadow-sm">
              <Heart className="w-7 h-7 md:w-8 md:h-8 text-gray-900 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 uppercase tracking-wide">
              {i18n.language === 'ru' ? 'Авторские моды' : 'Original Mods'}
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {i18n.language === 'ru'
                ? 'Все моды созданы мной лично. Никаких ворованных или перепродажных модов.'
                : 'All mods are created by me personally. No stolen or resold mods.'}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gray-900 text-white p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
          <div className="relative z-10 grid grid-cols-3 gap-4 md:gap-8">
            <div className="group transition-all hover:scale-105">
              <p className="text-2xl md:text-4xl font-bold mb-1 md:mb-2 group-hover:text-gray-300 transition-colors">500+</p>
              <p className="text-gray-400 uppercase tracking-wider text-xs md:text-sm font-semibold">
                {i18n.language === 'ru' ? 'Пользователей' : 'Users'}
              </p>
            </div>
            <div className="group transition-all hover:scale-105 border-x border-gray-700 px-2">
              <p className="text-2xl md:text-4xl font-bold mb-1 md:mb-2 group-hover:text-gray-300 transition-colors">100+</p>
              <p className="text-gray-400 uppercase tracking-wider text-xs md:text-sm font-semibold">
                {i18n.language === 'ru' ? 'Мод паков' : 'Mod Packs'}
              </p>
            </div>
            <div className="group transition-all hover:scale-105">
              <p className="text-2xl md:text-4xl font-bold mb-1 md:mb-2 group-hover:text-gray-300 transition-colors">4.9</p>
              <p className="text-gray-400 uppercase tracking-wider text-xs md:text-sm font-semibold">
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
