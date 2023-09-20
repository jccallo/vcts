import { reactive, ref } from 'vue'
import { AxiosResponse } from 'axios'
import { useRouter } from 'vue-router'
import { $http, $toast } from '@/services'
import { useSessionStore } from '../stores'
import { LoginForm, LoginModel, LoginResponse } from '../interfaces'

export const useLogin = () => {
  const router = useRouter()
  const sessionStore = useSessionStore()

  const LoginModel = ref<LoginModel[]>([
    { name: 'Profile', label: 'Colaborador' },
    { name: 'User', label: 'Administrador' },
  ])

  const loginForm = reactive<LoginForm>({
    model: 'User',
    email: '',
    password: '',
    remember_token: false,
  })

  const login = async () => {
    await $http
      .post<AxiosResponse<LoginResponse>>('/login', loginForm)
      .then(({ data }) => {
        sessionStore.set(data)
        $toast.success(data.message)
        router.push({ name: 'dashboard.index' })
      })
      .catch((error: string) => $toast.error(error))
  }

  return {
    LoginModel,
    isLoading: $http.isLoading,
    loginForm,
    login,
  }
}
