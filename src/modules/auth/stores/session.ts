import { defineStore } from 'pinia'
import { Session } from '../interfaces'

export const useSessionStore = defineStore('session', {
  state: (): Session<any> => ({
    model: '',
    user: null,
  }),
  getters: {
    
  },
  actions: {
    setSession(model: string, user: any): void {
      this.model = model
      this.user = user
    },
    removeSession(): void {
      this.model = ''
      this.user = null
    }
  },
  persist: true
})
