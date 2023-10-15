import { reactive } from 'vue'
import type { AuthResponse, LoginForm } from '../interfaces'
import type { DataResponse, Error } from '@/interfaces'
import { $http, $toast } from '@/services'
import { useAuth } from '../composables'

export const useLogin = () => {
  const { setSession, redirectToAccounts } = useAuth()

  const loginForm = reactive<LoginForm>({
    email: '',
    password: '',
    isRemember: false,
  })

  const login = async () => {
    await $http
      .post<DataResponse<AuthResponse>>('/login', loginForm)
      .then((response) => {
        $toast.success(response.data.message)
        setSession(response.data)
        redirectToAccounts()
      })
      .catch((error: Error) => $toast.error(error.message))
  }

  return {
    isLoading: $http.isLoading,
    loginForm,
    login,
  }
}
