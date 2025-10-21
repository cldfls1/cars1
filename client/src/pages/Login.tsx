import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../store/authStore'

const Login = () => {
  const { t } = useTranslation()
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(username, password)
      navigate('/')
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed')
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
          <h2 className="text-3xl xl:text-4xl font-bold mb-4 uppercase tracking-tight hover:scale-105 transition-transform inline-block cursor-default">CarxMods</h2>
          <p className="text-gray-400 text-base xl:text-lg leading-relaxed">
            {t('login_description') || 'Premium mods for CarX Street'}
          </p>
        </div>
        <div className="space-y-6 relative z-10">
          <div className="border-l-4 border-gray-700 pl-6 hover:border-white transition-all duration-300 group">
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-2 font-bold group-hover:text-gray-300 transition-colors">Secure</p>
            <p className="text-gray-300 group-hover:text-white transition-colors">Protected transactions with buyer guarantee</p>
          </div>
          <div className="border-l-4 border-gray-700 pl-6 hover:border-white transition-all duration-300 group">
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-2 font-bold group-hover:text-gray-300 transition-colors">Fast</p>
            <p className="text-gray-300 group-hover:text-white transition-colors">Instant delivery after payment confirmation</p>
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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 uppercase tracking-tight">{t('login')}</h1>
            <p className="text-gray-500 text-sm uppercase tracking-wider font-semibold">Access your account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-600 text-red-900 text-sm shadow-md animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 shadow-xl border-2 border-gray-200 hover:border-gray-300 transition-all">
            <div className="group">
              <label className="block text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider group-hover:text-gray-700 transition-colors">
                {t('username')}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input focus:ring-2 focus:ring-gray-900 focus:ring-opacity-20"
                required
                placeholder="Enter your username"
              />
            </div>

            <div className="group">
              <label className="block text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider group-hover:text-gray-700 transition-colors">
                {t('password')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input focus:ring-2 focus:ring-gray-900 focus:ring-opacity-20"
                required
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-4 text-sm font-bold relative overflow-hidden group"
            >
              <span className="relative z-10">{loading ? t('loading') : t('login')}</span>
              {loading && (
                <div className="absolute inset-0 bg-gray-800 animate-pulse"></div>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t-2 border-gray-200 text-center bg-white p-6 shadow-md">
            <p className="text-sm text-gray-600">
              {t('no_account') || "Don't have an account?"}{' '}
              <Link to="/register" className="text-gray-900 font-bold hover:underline uppercase tracking-wide hover:text-gray-700 transition-colors">
                {t('register')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
