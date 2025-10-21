import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../store/authStore'
import { Globe, ShoppingBag, Package, Shield, Info, Mail, Home, LayoutDashboard, Menu, X } from 'lucide-react'

const Layout = () => {
  const { t, i18n } = useTranslation()
  const { user, isAuthenticated, logout } = useAuthStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru'
    i18n.changeLanguage(newLang)
    localStorage.setItem('language', newLang)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white hidden md:block">
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
      <header className="bg-white border-b-2 border-gray-200 sticky top-0 z-50 shadow-md backdrop-blur-sm bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" onClick={closeMobileMenu} className="flex items-center hover:opacity-80 transition-all transform hover:scale-105 duration-300">
              <img src="/logo.png" alt="CarxMods" className="h-16 md:h-20 drop-shadow-lg" />
            </Link>

            {/* Center Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-all text-xs uppercase tracking-wider relative group py-1 flex items-center gap-1.5 font-semibold">
                <Home size={14} className="group-hover:scale-110 transition-transform" />
                {i18n.language === 'ru' ? 'Главная' : 'Home'}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/products" className="text-gray-600 hover:text-gray-900 transition-all text-xs uppercase tracking-wider relative group py-1 flex items-center gap-1.5 font-semibold">
                <ShoppingBag size={14} className="group-hover:scale-110 transition-transform" />
                {t('products')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
              </Link>
              {isAuthenticated && (
                <>
                  <Link to="/deals" className="text-gray-600 hover:text-gray-900 transition-all text-xs uppercase tracking-wider relative group py-1 flex items-center gap-1.5 font-semibold">
                    <Package size={14} className="group-hover:scale-110 transition-transform" />
                    {t('my_deals')}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                  <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 transition-all text-xs uppercase tracking-wider relative group py-1 flex items-center gap-1.5 font-semibold">
                    <LayoutDashboard size={14} className="group-hover:scale-110 transition-transform" />
                    {t('dashboard')}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                  {user?.role === 'admin' && (
                    <Link to="/admin" className="text-gray-600 hover:text-gray-900 transition-all text-xs uppercase tracking-wider relative group py-1 flex items-center gap-1.5 font-semibold">
                      <Shield size={14} className="group-hover:scale-110 transition-transform" />
                      {t('admin_panel')}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  )}
                </>
              )}
              <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-all text-xs uppercase tracking-wider relative group py-1 flex items-center gap-1.5 font-semibold">
                <Info size={14} className="group-hover:scale-110 transition-transform" />
                {i18n.language === 'ru' ? 'О нас' : 'About'}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-all text-xs uppercase tracking-wider relative group py-1 flex items-center gap-1.5 font-semibold">
                <Mail size={14} className="group-hover:scale-110 transition-transform" />
                {i18n.language === 'ru' ? 'Контакты' : 'Contact'}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Right side - Desktop */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="text-gray-600 hover:text-gray-900 transition-all text-xs uppercase tracking-wider relative group py-1 font-semibold"
              >
                <Globe size={14} className="inline mr-1 group-hover:rotate-12 transition-transform" />
                {i18n.language === 'ru' ? 'EN' : 'RU'}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
              </button>

              {isAuthenticated ? (
                <>
                  <span className="text-gray-900 text-xs uppercase tracking-wider px-3 py-1 border-2 border-gray-300 font-semibold hover:border-gray-900 transition-all">
                    {user?.username || 'USER'}
                  </span>
                  <button
                    onClick={logout}
                    className="text-gray-600 hover:text-gray-900 transition-all text-xs uppercase tracking-wider relative group py-1 font-semibold"
                  >
                    {t('logout')}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-600 hover:text-gray-900 transition-all text-xs uppercase tracking-wider relative group py-1 font-semibold">
                    {t('login')}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                  <Link to="/register" className="bg-gray-900 text-white px-5 py-2 text-xs uppercase tracking-wider hover:bg-gray-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-semibold">
                    {t('register')}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-40 transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={closeMobileMenu}
        >
          <div
            className={`fixed right-0 top-0 bottom-0 w-80 bg-white shadow-xl transform transition-transform duration-300 ${
              mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <span className="text-lg font-bold text-gray-900">{t('menu')}</span>
              <button
                onClick={closeMobileMenu}
                className="p-2 text-gray-600 hover:text-gray-900 transition"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="p-4 space-y-2">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <Home size={20} />
                <span className="font-medium">{i18n.language === 'ru' ? 'Главная' : 'Home'}</span>
              </Link>
              <Link
                to="/products"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <ShoppingBag size={20} />
                <span className="font-medium">{t('products')}</span>
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/deals"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                  >
                    <Package size={20} />
                    <span className="font-medium">{t('my_deals')}</span>
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                  >
                    <LayoutDashboard size={20} />
                    <span className="font-medium">{t('dashboard')}</span>
                  </Link>
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                    >
                      <Shield size={20} />
                      <span className="font-medium">{t('admin_panel')}</span>
                    </Link>
                  )}
                </>
              )}
              <Link
                to="/about"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <Info size={20} />
                <span className="font-medium">{i18n.language === 'ru' ? 'О нас' : 'About'}</span>
              </Link>
              <Link
                to="/contact"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <Mail size={20} />
                <span className="font-medium">{i18n.language === 'ru' ? 'Контакты' : 'Contact'}</span>
              </Link>
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition w-full mb-2"
              >
                <Globe size={20} />
                <span className="font-medium">{i18n.language === 'ru' ? 'EN' : 'RU'}</span>
              </button>

              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 text-sm text-gray-600 mb-2">
                    {user?.username || 'USER'}
                  </div>
                  <button
                    onClick={() => {
                      logout()
                      closeMobileMenu()
                    }}
                    className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-medium"
                  >
                    {t('logout')}
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="block w-full px-4 py-3 text-center border border-gray-300 text-gray-900 rounded-lg hover:border-gray-900 transition font-medium"
                  >
                    {t('login')}
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="block w-full px-4 py-3 text-center bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-medium"
                  >
                    {t('register')}
                  </Link>
                </div>
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
      <footer className="bg-gray-900 text-white mt-auto shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 opacity-50"></div>
        <div className="container mx-auto px-4 md:px-8 py-8 md:py-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <img src="/logo.png" alt="CarxMods" className="h-12 md:h-16 mb-3 brightness-0 invert" />
              <p className="text-gray-400 text-sm mb-4">
                {i18n.language === 'ru' 
                  ? 'Премиум моды для CarX Street'
                  : 'Premium mods for CarX Street'}
              </p>
              <button onClick={toggleLanguage} className="text-sm text-gray-400 hover:text-white transition flex items-center gap-2">
                <Globe size={16} />
                {i18n.language === 'ru' ? 'English' : 'Русский'}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div>
                <h4 className="text-sm font-semibold mb-3 text-gray-400">
                  {i18n.language === 'ru' ? 'Сайт' : 'Site'}
                </h4>
                <div className="space-y-2 text-sm">
                  <Link to="/products" className="block text-gray-400 hover:text-white transition">
                    {i18n.language === 'ru' ? 'Мод паки' : 'Mod Packs'}
                  </Link>
                  <Link to="/about" className="block text-gray-400 hover:text-white transition">
                    {i18n.language === 'ru' ? 'О нас' : 'About'}
                  </Link>
                  <Link to="/contact" className="block text-gray-400 hover:text-white transition">
                    {i18n.language === 'ru' ? 'Контакты' : 'Contact'}
                  </Link>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-3 text-gray-400">
                  {i18n.language === 'ru' ? 'Помощь' : 'Help'}
                </h4>
                <div className="space-y-2 text-sm">
                  <Link to="/docs" className="block text-gray-400 hover:text-white transition">
                    {i18n.language === 'ru' ? 'Как купить' : 'How to Buy'}
                  </Link>
                  <Link to="/terms" className="block text-gray-400 hover:text-white transition">
                    {i18n.language === 'ru' ? 'Условия' : 'Terms'}
                  </Link>
                  <Link to="/privacy" className="block text-gray-400 hover:text-white transition">
                    {i18n.language === 'ru' ? 'Конфиденциальность' : 'Privacy'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-gray-800 text-center md:text-left">
            <p className="text-gray-500 text-sm">
              &copy; 2025 CarxMods. {i18n.language === 'ru' ? 'Все права защищены.' : 'All rights reserved.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
