import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { AuthSession, AuthResponse } from '../interfaces'

export const useAuthSessionStore = defineStore('authSession', {
  state: (): AuthSession => ({
    message: '',
    token: '',
    remember_token: false,
    user: null,
  }),
  actions: {
    getToken(): string {
      return this.token
    },
    setToken(token: string): void {
      this.token = token
    },
    getRememberToken(): boolean {
      return this.remember_token
    },
    setRememberToken(remember_token: boolean): void {
      this.remember_token = remember_token
    },
    set(authResponse: AuthResponse): void {
      this.message = authResponse.message
      this.token = authResponse.token
      this.remember_token = authResponse.remeber_token
      this.user = authResponse.user
    },
    remove(): void {
      this.message = ''
      this.token = ''
      this.remember_token = false
      this.user = null
    },
    redirectToLogin(): void {
      this.remove
      useRouter().push({ name: 'auth.login' })
    },
  },
  persist: true,
})
