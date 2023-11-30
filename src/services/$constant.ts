class ConstantService {
   public PUBLIC_STORAGE_URL: string
   public LOGIN_ROUTE_NAME: string
   public DASHBOARD_ROUTE_NAME: string
   public DEFAULT_USER_IMAGE: string
   public ACCOUNTS_ROUTE_NAME: string
   public UNAUTHENTICATED: string

   constructor() {
      this.PUBLIC_STORAGE_URL = import.meta.env.VITE_BASE_PUBLIC_STORAGE_URL
      this.LOGIN_ROUTE_NAME = import.meta.env.VITE_LOGIN_ROUTE_NAME
      this.DASHBOARD_ROUTE_NAME = import.meta.env.VITE_DASHBOARD_ROUTE_NAME
      this.DEFAULT_USER_IMAGE = import.meta.env.VITE_DEFAULT_USER_IMAGE
      this.ACCOUNTS_ROUTE_NAME = import.meta.env.VITE_ACCOUNTS_ROUTE_NAME
      this.UNAUTHENTICATED = import.meta.env.VITE_UNAUTHENTICATED
   }
}

export const $constant = new ConstantService()
