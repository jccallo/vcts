import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { AuthResponse, LoginForm } from '../interfaces'
import type { DataResponse, Error } from '@/interfaces'
import { $http, $toast } from '@/services'
import { useAuth } from '../composables'

const accountsRouteName = import.meta.env.VITE_ACCOUNTS_ROUTE_NAME

export const useLogin = () => {
  const router = useRouter()
  const { setSession } = useAuth()

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
        router.replace({ name: accountsRouteName })
      })
      .catch((error: Error) => $toast.error(error.message))
  }

  return {
    isLoading: $http.isLoading,
    loginForm,
    login,
  }
}
