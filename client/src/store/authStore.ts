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

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),

  login: async (username, password) => {
    const response = await authService.login({ username, password })
    localStorage.setItem('token', response.access_token)
    set({ user: response.user, token: response.access_token, isAuthenticated: true })
  },

  register: async (username, password, email, telegram_id) => {
    const response = await authService.register({ username, password, email, telegram_id })
    localStorage.setItem('token', response.access_token)
    set({ user: response.user, token: response.access_token, isAuthenticated: true })
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null, isAuthenticated: false })
  },

  updateUser: (user) => {
    set({ user })
  },

  initAuth: async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const user = await authService.getCurrentUser()
        set({ user, isAuthenticated: true })
      } catch (error) {
        localStorage.removeItem('token')
        set({ user: null, token: null, isAuthenticated: false })
      }
    }
  },
}))
