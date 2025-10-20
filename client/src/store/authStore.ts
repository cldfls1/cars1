import { create } from 'zustand'
import { authService, User } from '../services/auth'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  register: (username: string, password: string, email?: string, telegram_id?: string) => Promise<void>
  logout: () => void
  updateUser: (user: User) => void
  initAuth: () => void
}

// Helper functions
const saveUser = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user))
}

const getStoredUser = (): User | null => {
  const userData = localStorage.getItem('user')
  return userData ? JSON.parse(userData) : null
}

export const useAuthStore = create<AuthState>((set) => ({
  user: getStoredUser(),
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),

  login: async (username, password) => {
    const response = await authService.login({ username, password })
    localStorage.setItem('token', response.access_token)
    saveUser(response.user)
    set({ user: response.user, token: response.access_token, isAuthenticated: true })
  },

  register: async (username, password, email, telegram_id) => {
    const response = await authService.register({ username, password, email, telegram_id })
    localStorage.setItem('token', response.access_token)
    saveUser(response.user)
    set({ user: response.user, token: response.access_token, isAuthenticated: true })
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ user: null, token: null, isAuthenticated: false })
  },

  updateUser: (user) => {
    saveUser(user)
    set({ user })
  },

  initAuth: async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const user = await authService.getCurrentUser()
        saveUser(user)
        set({ user, isAuthenticated: true })
      } catch (error) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        set({ user: null, token: null, isAuthenticated: false })
      }
    }
  },
}))
