import type { User } from '@/types/user'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('user', {
  state: (): { user: User | null } => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
  }),
  actions: {
    setUser(user: User) {
      if (!user) return
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    clearUser() {
      this.user = null
      localStorage.removeItem('user')
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
    isAdmin: (state) => state.user?.role === 'Admin',
    isUser: (state) => state.user?.role === 'User',
  },
})
