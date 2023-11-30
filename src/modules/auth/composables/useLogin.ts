import { reactive } from 'vue'
import { $constant, $toast, $redirect, $api } from '@/services'
import type { AuthResponse, LoginForm } from '@/interfaces'
import { useAuth } from '../composables'

export const useLogin = () => {
   const { setSession } = useAuth()

   const loginForm = reactive<LoginForm>({
      email: '',
      password: '',
      isRemember: false,
   })

   const login = async () => {
      const response = await $api.post<AuthResponse>('/login', loginForm)
      if (response.data) {
         setSession(response.data.data)
         $toast.success(response.data.data.message)
         $redirect.replaceWith($constant.ACCOUNTS_ROUTE_NAME)
      }
      if (response.error) $toast.error(response.error.message)
   }

   return {
      isLoading: $api.isLoading,
      loginForm,
      login,
   }
}
