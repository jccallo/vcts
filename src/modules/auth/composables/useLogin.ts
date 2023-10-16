import { reactive } from 'vue'
import type { AuthResponse, LoginForm } from '../interfaces'
import type { DataResponse, Error } from '@/interfaces'
import { $http, $toast } from '@/services'
import { useAuth, useConstant, useRedirect } from '../composables'

export const useLogin = () => {
   const { ACCOUNTS_ROUTE_NAME } = useConstant()
   const { replaceWith } = useRedirect()
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
            replaceWith(ACCOUNTS_ROUTE_NAME)
         })
         .catch((error: Error) => $toast.error(error.message))
   }

   return {
      isLoading: $http.isLoading,
      loginForm,
      login,
   }
}
