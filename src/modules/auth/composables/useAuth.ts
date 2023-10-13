import router from "@/router"
import { storeToRefs } from "pinia"
import { useAuthStore } from '../stores'
import { $storage } from "@/services"
import type { AuthUser } from "../interfaces"

export const useAuth = () => {
  const auth = useAuthStore()
  const { user } = storeToRefs(auth)
  const loginRouteName = import.meta.env.VITE_LOGIN_ROUTE_NAME
  const dashboardRouteName = import.meta.env.VITE_DASHBOARD_ROUTE_NAME

  const getToken = () => {
    return $storage.get($storage.TOKEN)
  }

  const setToken = (token: string) => {
    $storage.set($storage.TOKEN, token)
  }
  
  const getRememberToken = () => {
    return $storage.get($storage.REMEMBER_TOKEN)
  }

  const setRememberToken = (remember_token: string) => {
    $storage.set($storage.REMEMBER_TOKEN, remember_token)
  }

  const setUser = (user: AuthUser) => {
    auth.setUser(user)
  }

  const removeUser = () => {
    auth.removeUser()
  }

  const setTokens = (token: string, rememberToken: string | null) => {
    $storage.set($storage.TOKEN, token)
    $storage.set($storage.REMEMBER_TOKEN, rememberToken ?? '')
  }

  const removeTokens = () => {
    $storage.remove($storage.TOKEN)
    $storage.remove($storage.REMEMBER_TOKEN)
  }

  const redirectToLogin = () => {
    router.replace({ name: loginRouteName })
  }

  const redirectToDashboard = () => {
    router.replace({ name: dashboardRouteName })
  }

  return { 
    user,
    setUser,
    removeUser,
    setTokens,
    removeTokens,
    redirectToLogin,
    redirectToDashboard,
    getToken,
    getRememberToken,
    setToken,
    setRememberToken,
  }
}