import { Outlet, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../store/authStore'

const Layout = () => {
  const { t, i18n } = useTranslation()
  const { user, isAuthenticated, logout } = useAuthStore()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru'
    i18n.changeLanguage(newLang)
    localStorage.setItem('language', newLang)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-8 text-xs">
            <span className="text-gray-400">
              {i18n.language === 'ru' ? 'Премиум моды для CarX Street' : 'Premium mods for CarX Street'}
            </span>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">
                {i18n.language === 'ru' ? 'Безопасные сделки' : 'Secure deals'}
              </span>
              <span className="text-gray-600">|</span>
              <span className="text-gray-400">
                {i18n.language === 'ru' ? 'Мгновенная доставка' : 'Instant delivery'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="text-base font-bold text-gray-900 hover:text-gray-600 transition tracking-tight relative group">
              CARXMODS
              <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-900 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {/* Center Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition text-xs uppercase tracking-wider relative group py-1">
                {i18n.language === 'ru' ? 'Главная' : 'Home'}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-900 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/products" className="text-gray-600 hover:text-gray-900 transition text-xs uppercase tracking-wider relative group py-1">
                {t('products')}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-900 group-hover:w-full transition-all duration-300"></span>
              </Link>
              {isAuthenticated && (
                <>
                  <Link to="/deals" className="text-gray-600 hover:text-gray-900 transition text-xs uppercase tracking-wider relative group py-1">
                    {t('my_deals')}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-900 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                  <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 transition text-xs uppercase tracking-wider relative group py-1">
                    {t('dashboard')}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-900 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                  {user?.role === 'admin' && (
                    <Link to="/admin" className="text-gray-600 hover:text-gray-900 transition text-xs uppercase tracking-wider relative group py-1">
                      {t('admin_panel')}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-900 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  )}
                </>
              )}
              <Link to="/about" className="text-gray-600 hover:text-gray-900 transition text-xs uppercase tracking-wider relative group py-1">
                {i18n.language === 'ru' ? 'О нас' : 'About'}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-900 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition text-xs uppercase tracking-wider relative group py-1">
                {i18n.language === 'ru' ? 'Контакты' : 'Contact'}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-900 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-6">
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="text-gray-600 hover:text-gray-900 transition text-xs uppercase tracking-wider relative group py-1"
              >
                {i18n.language === 'ru' ? 'EN' : 'RU'}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-900 group-hover:w-full transition-all duration-300"></span>
              </button>

              {isAuthenticated ? (
                <>
                  <span className="text-gray-900 text-xs uppercase tracking-wider px-3 py-1 border border-gray-300">
                    {user?.username || 'USER'}
                  </span>
                  <button
                    onClick={logout}
                    className="text-gray-600 hover:text-gray-900 transition text-xs uppercase tracking-wider relative group py-1"
                  >
                    {t('logout')}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-900 group-hover:w-full transition-all duration-300"></span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-600 hover:text-gray-900 transition text-xs uppercase tracking-wider relative group py-1">
                    {t('login')}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-900 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                  <Link to="/register" className="bg-gray-900 text-white px-5 py-2 text-xs uppercase tracking-wider hover:bg-gray-800 transition">
                    {t('register')}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-auto">
        <div className="container mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-6 uppercase tracking-wide">CarxMods</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {i18n.language === 'ru' 
                  ? 'Премиум моды для CarX Street'
                  : 'Premium mods for CarX Street'}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide text-gray-400">
                {i18n.language === 'ru' ? 'Навигация' : 'Navigation'}
              </h4>
              <div className="space-y-2">
                <Link to="/products" className="block text-sm text-gray-400 hover:text-white transition">
                  {t('products')}
                </Link>
                <Link to="/deals" className="block text-sm text-gray-400 hover:text-white transition">
                  {t('my_deals')}
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide text-gray-400">
                {i18n.language === 'ru' ? 'Информация' : 'Information'}
              </h4>
              <div className="space-y-2">
                <Link to="/about" className="block text-sm text-gray-400 hover:text-white transition">
                  {i18n.language === 'ru' ? 'О нас' : 'About'}
                </Link>
                <Link to="/docs" className="block text-sm text-gray-400 hover:text-white transition">
                  {i18n.language === 'ru' ? 'Документация' : 'Docs'}
                </Link>
                <Link to="/contact" className="block text-sm text-gray-400 hover:text-white transition">
                  {i18n.language === 'ru' ? 'Контакты' : 'Contact'}
                </Link>
                <Link to="/terms" className="block text-sm text-gray-400 hover:text-white transition">
                  {i18n.language === 'ru' ? 'Соглашение' : 'Terms'}
                </Link>
                <Link to="/privacy" className="block text-sm text-gray-400 hover:text-white transition">
                  {i18n.language === 'ru' ? 'Конфиденциальность' : 'Privacy'}
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide text-gray-400">
                {i18n.language === 'ru' ? 'Язык' : 'Language'}
              </h4>
              <button onClick={toggleLanguage} className="text-sm text-gray-400 hover:text-white transition">
                {i18n.language === 'ru' ? 'English' : 'Русский'}
              </button>
            </div>
          </div>
          <div className="pt-8 mt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                &copy; 2025 CarxMods. {i18n.language === 'ru' ? 'Все права защищены.' : 'All rights reserved.'}
              </p>
              <div className="flex gap-6 text-sm">
                <Link to="/privacy" className="text-gray-500 hover:text-white transition">
                  {i18n.language === 'ru' ? 'Конфиденциальность' : 'Privacy'}
                </Link>
                <Link to="/terms" className="text-gray-500 hover:text-white transition">
                  {i18n.language === 'ru' ? 'Условия' : 'Terms'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
