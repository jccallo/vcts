import { useCookies } from 'vue3-cookies'

class StorageService {
  public TOKEN: string = import.meta.env.VITE_TOKEN
  public REMEMBER_TOKEN: string = import.meta.env.VITE_REMEMBER_TOKEN
  public SESSION_USER: string = import.meta.env.VITE_SESSION_USER
  
  private cookies: any

  constructor() {
    this.cookies = useCookies().cookies
  }

  set(key: string, value: string): void {
    this.cookies.set(key, value)
  }

  get(key: string): string {
    return this.cookies.get(key)
  }

  remove(key: string): boolean {
    return this.cookies.remove(key)
  }

  isKey(key: string) {
    return this.cookies.isKey(key)
  }

  keys(): string[] {
    return this.cookies.keys()
  }
}

const storageService = new StorageService()
export default storageService
