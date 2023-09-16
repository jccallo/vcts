import { ref } from "vue"
import { useRouter } from "vue-router"
import { useSessionStore } from "../stores"
import { $http, $storage, $toast } from "@/services"

export const useLogout = () => {
  const router = useRouter()
  const session = useSessionStore()

  const isSubmitting = ref<boolean>(false)

  const logout = async () => {
    isSubmitting.value = true
    const { data } = await $http.delete<any>('/logout')
    session.removeSession()
    $storage.remove($storage.TOKEN)
    $storage.remove($storage.REMEMBER_TOKEN)
    $toast.success(data)
    router.push({ name: 'auth.login' })
    isSubmitting.value = false
  }
  
  return {
    isSubmitting,
    logout,
  }
}
