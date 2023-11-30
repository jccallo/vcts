import { storeToRefs } from 'pinia'
import type { AuthEmployee, AuthResponse } from '@/interfaces'
import { useAuthStore } from '@/stores'
import { $token, $redirect, $constant } from '@/services';

export const useAuth = () => {
   const auth = useAuthStore()
   const { user, isAdmin, imagePath, hasActiveEmployee, activeEmployee } = storeToRefs(auth)

   const setSession = (data: AuthResponse) => {
      auth.setUser(data.user)
      $token.setTokens(data.token, data.remember_token ?? '')
   }

   const removeSession = () => {
      auth.removeUser()
      auth.removeImagePath()
      auth.removeActiveEmployee()
      $token.removeTokens()
   }

   const setActiveEmployee = (employee: AuthEmployee) => {
      if (employee.permissions.length) {
         auth.setActiveEmployee(employee)
         $redirect.goTo($constant.DASHBOARD_ROUTE_NAME)
      }
   }

   const safeImageLoad = (path: string | null) => {
      return new Promise<string>((resolve, reject) => {
         if (path === null) reject(new Error('El path de la imagen es nulo'))
         else {
            const img = new Image()
            const imgPath = `${$constant.PUBLIC_STORAGE_URL}/${path}`
            img.src = imgPath
            img.onload = () => {
               resolve(imgPath)
            }
            img.onerror = () => {
               reject(new Error('No se pudo cargar la imagen'))
            }
         }
      })
   }

   const loadImage = async () => {
      await safeImageLoad(user.value.photo_path)
         .then((imgPath) => {
            auth.setImagePath(imgPath)
         })
         .catch((error: Error) => {
            auth.setImagePath($constant.DEFAULT_USER_IMAGE)
            console.error(error)
         })
   }

   return {
      user,
      isAdmin,
      imagePath,
      hasActiveEmployee,
      activeEmployee,

      // metodos
      setSession,
      removeSession,
      setActiveEmployee,
      loadImage,
   }
}
