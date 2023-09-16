import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { $http, $storage, $toast } from '@/services'
import { LoginForm, LoginError, Model } from '../interfaces'
import { useSessionStore } from '../stores'

export const useLogin = () => {
  const router = useRouter()
  const session = useSessionStore()

  const isSubmitting = ref<boolean>(false)

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
    isSubmitting.value = true
    try {
      const { data } = await $http.post<any>('/login', loginForm)
      session.setSession(data.model, data.user)
      $storage.set($storage.TOKEN, data.token)
      $storage.set($storage.REMEMBER_TOKEN, data.remember_token)
      $toast.success(data.message)
      router.push({ name: 'dashboard.index' })
    } catch (error: any) {
      if (typeof error.response.data.error === 'object') {
        loginError.email = error.response.data.error.email || []
        loginError.password = error.response.data.error.password || []
        loginError.remember_token = error.response.data.error.remember_token || []
      }
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    models,
    isSubmitting,
    loginForm,
    loginError,
    login,
  }
}
