import { useCookies } from 'vue3-cookies'

class TokenService {
   private token: string
   private rememberToken: string
   private cookies: any

   constructor() {
      this.token = import.meta.env.VITE_TOKEN
      this.rememberToken = import.meta.env.VITE_REMEMBER_TOKEN
      this.cookies = useCookies().cookies
   }

   public getToken() {
      return this.cookies.get(this.token)
   }

   public setToken(value: string) {
      this.cookies.set(this.token, value)
   }

   public getRememberToken() {
      return this.cookies.get(this.rememberToken)
   }

   public setRememberToken(value: string) {
      this.cookies.set(this.rememberToken, value)
   }

   public setTokens(token: string, rememberToken: string) {
      this.cookies.set(this.token, token)
      this.cookies.set(this.rememberToken, rememberToken)
   }

   public removeTokens() {
      this.cookies.remove(this.token)
      this.cookies.remove(this.rememberToken)
   }
}

export const $token = new TokenService()
