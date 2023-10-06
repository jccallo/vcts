import { useRouter } from 'vue-router'
import { $http, $toast } from '@/services'
import { useAuthSessionStore } from '../stores'
import { HttpResponse, ModifiedError } from '@/interfaces'

export const useLogout = () => {
  const router = useRouter()
  const authSession = useAuthSessionStore()

  const logout = async () => {
    await $http
      .delete<HttpResponse<string>>('/logout')
      .then((response) => {
        console.log('response', response)
        authSession.remove()
        $toast.success(response.data)
        router.push({ name: 'auth.login' })
      })
      .catch((error: ModifiedError) => {
        console.log('errorfffff', error)
        $toast.error(error.message)
        authSession.remove()
        router.push({ name: 'auth.login' })
      })
  }

  return {
    isLoading: $http.isLoading,
    logout,
  }
}
