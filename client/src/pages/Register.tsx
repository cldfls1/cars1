import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../store/authStore'

const Register = () => {
  const { t } = useTranslation()
  const { register } = useAuthStore()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [telegramId, setTelegramId] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await register(username, password, email || undefined, telegramId || undefined)
      navigate('/')
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image/Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-900 text-white p-12 xl:p-20 flex-col justify-between relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gray-800 rounded-full blur-3xl opacity-30 -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-800 rounded-full blur-3xl opacity-30 -ml-48 -mb-48"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl xl:text-4xl font-bold mb-4 uppercase tracking-tight hover:scale-105 transition-transform inline-block cursor-default">Join CarxMods</h2>
          <p className="text-gray-400 text-base xl:text-lg leading-relaxed">
            {t('register_description') || 'Get access to premium mods and secure deals'}
          </p>
        </div>
        <div className="space-y-6 relative z-10">
          <div className="border-l-4 border-gray-700 pl-6 hover:border-white transition-all duration-300 group">
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-2 font-bold group-hover:text-gray-300 transition-colors">500+ Users</p>
            <p className="text-gray-300 group-hover:text-white transition-colors">Join our growing community</p>
          </div>
          <div className="border-l-4 border-gray-700 pl-6 hover:border-white transition-all duration-300 group">
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-2 font-bold group-hover:text-gray-300 transition-colors">24/7 Support</p>
            <p className="text-gray-300 group-hover:text-white transition-colors">Always here to help you</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="mb-8 md:mb-12 text-center">
            <div className="inline-block mb-4">
              <div className="w-20 h-20 mb-4 hover:scale-110 transition-transform">
                <img src="/logo.png" alt="CarxMods" className="w-full h-full object-contain drop-shadow-lg" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 uppercase tracking-tight">{t('register')}</h1>
            <p className="text-gray-500 text-sm uppercase tracking-wider font-semibold">Create your account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-600 text-red-900 text-sm shadow-md animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray-900 mb-3 uppercase tracking-wider">
                {t('username')}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-900 mb-3 uppercase tracking-wider">
                {t('password')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-900 mb-3 uppercase tracking-wider">
                {t('email')} <span className="text-gray-400 normal-case">(optional)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-900 mb-3 uppercase tracking-wider">
                {t('telegram_id')} <span className="text-gray-400 normal-case">(optional)</span>
              </label>
              <input
                type="text"
                value={telegramId}
                onChange={(e) => setTelegramId(e.target.value)}
                className="input"
                placeholder="@username"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-4 text-sm"
            >
              {loading ? t('loading') : (t('create_account') || 'CREATE ACCOUNT')}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              {t('have_account') || 'Already have an account?'}{' '}
              <Link to="/login" className="text-gray-900 font-semibold hover:underline uppercase tracking-wide">
                {t('login')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
