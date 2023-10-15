import { useRouter } from 'vue-router'
import type { DataResponse, Error } from '@/interfaces'
import { $http, $toast } from '@/services'
import { useAuth } from '../composables'

const loginRouteName = import.meta.env.VITE_LOGIN_ROUTE_NAME

export const useLogout = () => {
  const router = useRouter()
  const { removeSession } = useAuth()

  const logout = async () => {
    await $http
      .delete<DataResponse<string>>('/logout')
      .then((response) => {
        $toast.success(response.data)
        removeSession()
        router.replace({ name: loginRouteName })
      })
      .catch((error: Error) => {
        $toast.error(error.message)
        removeSession()
        router.replace({ name: loginRouteName })
      })
  }

  return {
    isLoading: $http.isLoading,
    logout,
  }
}
