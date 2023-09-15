import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router'
import { $http, $storage, $toast } from '@/services';
import { Login, LoginError } from '../interfaces';
import { useSessionStore } from '../stores';

export const useSession = () => {
  const router = useRouter()
  const session = useSessionStore()

  const sessionUser = ref<any>(null)
  const loginError = reactive<LoginError>({
    email: [],
    password: [],
    remember_token: [],
  })

  const sessionStore = async (data: Login) => {
    try {
      const response = await $http.post<any>('/login', data)
      session.setSession(response.data.model, response.data.user)
      $storage.set($storage.TOKEN, response.data.token)
      $storage.set($storage.REMEMBER_TOKEN, response.data.user.remember_token)
      $toast.success(response.data.message)
      router.push({ name: 'dashboard.index' })
    } catch (error: any) {
      if (typeof error.response.data.error === 'object') {
        loginError.email = error.response.data.error.email || []
        loginError.password = error.response.data.error.password || []
        loginError.remember_token = error.response.data.error.remember_token || []
      }
    }
  }

  const sessionDestroy = async () => {
    const response = await $http.delete<any>('/logout')
    session.removeSession()
    $storage.remove($storage.TOKEN)
    $storage.remove($storage.REMEMBER_TOKEN)
    $toast.success(response.data)
    router.push({ name: 'auth.login' })
  }

  const getSessionUser = () => {
    sessionUser.value = session.user
  }

  return {
    loginError,
    sessionUser,
    getSessionUser,
    sessionStore,
    sessionDestroy,
  }
}
