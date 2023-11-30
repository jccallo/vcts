import { $toast, $constant, $redirect, $api } from '@/services'
import { useAuth } from '../composables'

export const useLogout = () => {
   const { removeSession } = useAuth()

   const logout = async () => {
      const response = await $api.delete<string>('/logout')
      if (response.data) {
         removeSession()
         $toast.success(response.data.data)
         $redirect.replaceWith($constant.LOGIN_ROUTE_NAME)
      }
      if (response.error) {
         removeSession()
         $toast.error(response.error.message)
         $redirect.replaceWith($constant.LOGIN_ROUTE_NAME)
      }
   }

   return {
      isLoading: $api.isLoading,
      logout,
   }
}
