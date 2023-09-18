import { useRouter } from "vue-router"
import { useSessionStore } from "../stores"
import { $http, $storage, $toast } from "@/services"

export const useLogout = () => {
  const router = useRouter()
  const session = useSessionStore()

  const logout = async () => {
    try {
      const { data } = await $http.delete<any>('/logout')
      session.removeSession()
      $toast.success(data)
  
      $storage.remove($storage.TOKEN)
      $storage.remove($storage.REMEMBER_TOKEN)
      
      router.push({ name: 'auth.login' })
    } catch (error: any) {
      $toast.error(error)
    }
  }
  
  return {
    isLoading: $http.isLoading,
    logout,
  }
}
