import { useRouter } from 'vue-router'
import { $http, $toast } from '@/services'
import { useSessionStore } from '../stores'
import { AxiosResponse } from 'axios'

export const useLogout = () => {
  const router = useRouter()
  const sessionStore = useSessionStore()

  const logout = async () => {
    await $http
      .delete<AxiosResponse<string>>('/logout')
      .then(({ data }) => {
        sessionStore.remove()
        $toast.success(data)
        router.push({ name: 'auth.login' })
      })
      .catch((error: string) => {
        $toast.error(error)
      })
  }

  return {
    isLoading: $http.isLoading,
    logout,
  }
}
