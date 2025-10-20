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
      <div className="hidden lg:flex lg:w-1/2 bg-gray-900 text-white p-20 flex-col justify-between">
        <div>
          <h2 className="text-4xl font-bold mb-4 uppercase tracking-tight">CarX Mods Club</h2>
          <p className="text-gray-400 text-lg">
            {t('login_description') || 'Premium mods for CarX Drift Racing'}
          </p>
        </div>
        <div className="space-y-6">
          <div className="border-l-2 border-gray-700 pl-6">
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">Secure</p>
            <p className="text-gray-300">Protected transactions with buyer guarantee</p>
          </div>
          <div className="border-l-2 border-gray-700 pl-6">
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">Fast</p>
            <p className="text-gray-300">Instant delivery after payment confirmation</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 uppercase tracking-tight">{t('login')}</h1>
            <p className="text-gray-500 text-sm uppercase tracking-wider">Access your account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-600 text-red-900 text-sm">
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

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-4 text-sm"
            >
              {loading ? t('loading') : t('login')}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              {t('no_account') || "Don't have an account?"}{' '}
              <Link to="/register" className="text-gray-900 font-semibold hover:underline uppercase tracking-wide">
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
