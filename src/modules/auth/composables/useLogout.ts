import type { DataResponse, Error } from '@/interfaces'
import { $http, $toast } from '@/services'
import { useAuth } from '../composables'

export const useLogout = () => {
  const { user, redirectToLogin, removeSession } = useAuth()

  const logout = async () => {
    await $http
      .delete<DataResponse<string>>('/logout')
      .then((response) => {
        $toast.success(response.data)
        removeSession()
        redirectToLogin()
      })
      .catch((error: Error) => {
        $toast.error(error.message)
        removeSession()
        redirectToLogin()
      })
  }

  return {
    isLoading: $http.isLoading,
    user,
    logout,
  }
}
