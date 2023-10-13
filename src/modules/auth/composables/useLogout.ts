import type { DataResponse, Error } from '@/interfaces'
import { $http, $toast } from '@/services'
import { useAuth } from '../composables'

export const useLogout = () => {
  const { user, redirectToLogin, removeUser, removeTokens } = useAuth()

  const logout = async () => {
    await $http
      .delete<DataResponse<string>>('/logout')
      .then((response) => {
        $toast.success(response.data)
        removeUser()
        removeTokens()
        redirectToLogin()
      })
      .catch((error: Error) => {
        $toast.error(error.message)
        removeUser()
        removeTokens()
        redirectToLogin()
      })
  }

  return {
    user,
    isLoading: $http.isLoading,
    logout,
  }
}
