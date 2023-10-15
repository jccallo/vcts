import router from '@/router'
import { storeToRefs } from 'pinia'
import type { AuthResponse } from '../interfaces'
import { useAuthStore } from '../stores'
import { $storage } from '@/services'

const loginRouteName = import.meta.env.VITE_LOGIN_ROUTE_NAME
const dashboardRouteName = import.meta.env.VITE_DASHBOARD_ROUTE_NAME
const accountsRouteName = import.meta.env.VITE_ACCOUNTS_ROUTE_NAME

export const useAuth = () => {
  const auth = useAuthStore()
  const { user, isAdmin, hasActiveEmployee, activeEmployee } = storeToRefs(auth)

  const getToken = () => $storage.get($storage.TOKEN)
  const getRememberToken = () => $storage.get($storage.REMEMBER_TOKEN)

  const redirectToLogin = () => {
    router.replace({ name: loginRouteName })
  }
  const redirectToDashboard = () => {
    router.replace({ name: dashboardRouteName })
  }
  const redirectToAccounts = () => {
    router.replace({ name: accountsRouteName })
  }

  const setSession = (data: AuthResponse) => {
    auth.setUser(data.user)
    $storage.set($storage.TOKEN, data.token)
    $storage.set($storage.REMEMBER_TOKEN, data.remember_token ?? '')
  }

  const removeSession = () => {
    auth.removeUser()
    auth.removeActiveEmployee()
    $storage.remove($storage.TOKEN)
    $storage.remove($storage.REMEMBER_TOKEN)
  }

  const startAdminMode = () => {
    router.push({ name: dashboardRouteName })
  }

  const startEmployeeMode = () => {
    router.push({ name: dashboardRouteName })
  }

  return {
    user,
    isAdmin,
    hasActiveEmployee,
    activeEmployee,
    getToken,
    getRememberToken,
    redirectToLogin,
    redirectToDashboard,
    redirectToAccounts,
    setSession,
    removeSession,
    startAdminMode, 
    startEmployeeMode,
  }
}
