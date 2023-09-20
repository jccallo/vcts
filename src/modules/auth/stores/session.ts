import { defineStore } from 'pinia'
import { LoginResponse } from '../interfaces'

export const useSessionStore = defineStore('session', {
  state: (): LoginResponse => ({
    message: '',
    token: '',
    remeber_token: false,
    model: '',
    user: null,
  }),
  getters: {
    
  },
  actions: {
    set(loginResponse: LoginResponse): void {
      this.message = loginResponse.message
      this.token = loginResponse.token
      this.remeber_token = loginResponse.remeber_token
      this.model = loginResponse.model
      this.user = loginResponse.user
    },
    remove(): void {
      this.message = ''
      this.token = ''
      this.remeber_token = false
      this.model = ''
      this.user = null
    },
    getToken(): string {
      return this.token
    },
    setToken(token: string): void {
      this.token = token
    },
    getRememberToken(): boolean {
      return this.remeber_token
    },
    setRememberToken(remeber_token: boolean): void {
      this.remeber_token = remeber_token
    }
  },
  persist: true
})
