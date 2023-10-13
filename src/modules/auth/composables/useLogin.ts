import { reactive } from 'vue'
import type { AuthResponse, LoginForm } from '../interfaces'
import type { DataResponse, Error } from '@/interfaces'
import { $http, $toast } from '@/services'
import { useAuth } from '../composables'

export const useLogin = () => {
  const { setUser, redirectToDashboard, setTokens } = useAuth()

  const loginForm = reactive<LoginForm>({
    email: '',
    password: '',
    isRemember: false,
  })

  const login = async () => {
    await $http
      .post<DataResponse<AuthResponse>>('/login', loginForm)
      .then((response) => {
        console.log('response', response)
        $toast.success(response.data.message)
        setUser(response.data.user)
        setTokens(response.data.token, response.data.remember_token)
        redirectToDashboard()
      })
      .catch((error: Error) => $toast.error(error.message))
  }

  return {
    isLoading: $http.isLoading,
    loginForm,
    login,
  }
}
