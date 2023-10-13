import { defineStore } from 'pinia'
import { AuthUser } from '../interfaces'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {} as AuthUser,
  }),
  actions: {
    setUser(user: AuthUser) {
      this.user = user
    },
    removeUser() {
      this.user = {} as AuthUser
    },
  },
  persist: true,
})