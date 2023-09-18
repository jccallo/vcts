import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { $http, $storage, $toast } from '@/services'
import { LoginForm, LoginError, Model } from '../interfaces'
import { useSessionStore } from '../stores'

export const useLogin = () => {
  const router = useRouter()
  const sessionStore = useSessionStore()

  const models = ref<Model[]>([
    { name: 'Profile', label: 'Colaborador' },
    { name: 'User', label: 'Administrador' },
  ])

  const loginForm = reactive<LoginForm>({
    model: 'Profile',
    email: '',
    password: '',
    remember_token: false,
  })

  const loginError = reactive<LoginError>({
    email: [],
    password: [],
    remember_token: [],
  })

  const login = async () => {
    try {
      const { data } = await $http.post<any>('/login', loginForm)
      sessionStore.setSession(data.model, data.user)
      $toast.success(data.message)

      $storage.set($storage.TOKEN, data.token)
      $storage.set($storage.REMEMBER_TOKEN, data.remember_token)

      router.push({ name: 'dashboard.index' })
    } catch (error: any) {
      if (error === 'object') {
        loginError.email = error.response.data.error.email || []
        loginError.password = error.response.data.error.password || []
        loginError.remember_token = error.response.data.error.remember_token || []
      } else $toast.error(error)
    }
  }

  return {
    models,
    isLoading: $http.isLoading,
    loginForm,
    loginError,
    login,
  }
}
