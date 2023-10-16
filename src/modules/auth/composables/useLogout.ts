import type { DataResponse, Error } from '@/interfaces'
import { $http, $toast } from '@/services'
import { useAuth, useConstant, useRedirect } from '../composables'

export const useLogout = () => {
  const { LOGIN_ROUTE_NAME } = useConstant()
  const { replaceWith } = useRedirect()
  const { removeSession } = useAuth()

  const logout = async () => {
    await $http
      .delete<DataResponse<string>>('/logout')
      .then((response) => {
        $toast.success(response.data)
        removeSession()
        replaceWith(LOGIN_ROUTE_NAME)
      })
      .catch((error: Error) => {
        $toast.error(error.message)
        removeSession()
        replaceWith(LOGIN_ROUTE_NAME)
      })
  }

  return {
    isLoading: $http.isLoading,
    logout,
  }
}
