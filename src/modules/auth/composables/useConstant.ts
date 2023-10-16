export const useConstant = () => {
   const PUBLIC_STORAGE_URL = import.meta.env.VITE_BASE_PUBLIC_STORAGE_URL
   const LOGIN_ROUTE_NAME = import.meta.env.VITE_LOGIN_ROUTE_NAME
   const DASHBOARD_ROUTE_NAME = import.meta.env.VITE_DASHBOARD_ROUTE_NAME
   const DEFAULT_USER_IMAGE = import.meta.env.VITE_DEFAULT_USER_IMAGE
   const ACCOUNTS_ROUTE_NAME = import.meta.env.VITE_ACCOUNTS_ROUTE_NAME
   
   return {
      PUBLIC_STORAGE_URL,
      LOGIN_ROUTE_NAME,
      DASHBOARD_ROUTE_NAME,
      DEFAULT_USER_IMAGE,
      ACCOUNTS_ROUTE_NAME,
   }
}