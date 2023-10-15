import { defineStore } from 'pinia'
import type { AuthEmployee, AuthState, AuthUser } from '../interfaces'

export const useAuthStore = defineStore('auth', {
  state: () => <AuthState>({
    user: {} as AuthUser,
    isAdmin: false,
    hasActiveEmployee: false,
    activeEmployee: {} as AuthEmployee
  }),
  actions: {
    setUser(user: AuthUser) {
      this.user = user
      this.isAdmin = (user.admin === 'true')
    },
    removeUser() {
      this.user = {} as AuthUser
      this.isAdmin = false
    },
    setActiveEmployee(employee: AuthEmployee) {
      this.activeEmployee = employee
      this.hasActiveEmployee = true
    },
    removeActiveEmployee() {
      this.activeEmployee = {} as AuthEmployee
      this.hasActiveEmployee = false
    },
  },
  persist: true,
})