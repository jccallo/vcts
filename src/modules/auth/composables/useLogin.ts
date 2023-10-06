import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { $http, $toast } from '@/services'
import { useAuthSessionStore } from '../stores'
import { AuthResponse, LoginForm } from '../interfaces'
import { HttpResponse, ModifiedError } from '@/interfaces'

export const useLogin = () => {
  const router = useRouter()
  const authSession = useAuthSessionStore()

  const loginForm = reactive<LoginForm>({
    email: '',
    password: '',
    remember_token: false,
  })

  const login = async () => {
    await $http
      .post<HttpResponse<AuthResponse>>('/login', loginForm)
      .then((response) => {
        authSession.set(response.data)
        $toast.success(response.data.message)
        router.push({ name: 'dashboard.index' })
      })
      .catch((error: ModifiedError) => $toast.error(error.message))
  }

  return {
    isLoading: $http.isLoading,
    loginForm,
    login,
  }
}
