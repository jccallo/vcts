import { storeToRefs } from 'pinia'
import type { AuthEmployee, AuthResponse } from '../interfaces'
import { useConstant, useRedirect, useToken } from '../composables';
import { useAuthStore } from '../stores'

export const useAuth = () => {
   const auth = useAuthStore()
   const { redirectTo } = useRedirect()
   const { setTokens, removeTokens } = useToken()
   const { DEFAULT_USER_IMAGE, DASHBOARD_ROUTE_NAME, PUBLIC_STORAGE_URL } = useConstant()
   const { user, isAdmin, imagePath, hasActiveEmployee, activeEmployee } = storeToRefs(auth)

   const setSession = (data: AuthResponse) => {
      auth.setUser(data.user)
      setTokens(data.token, data.remember_token)
   }

   const removeSession = () => {
      auth.removeUser()
      auth.removeImagePath()
      auth.removeActiveEmployee()
      removeTokens()
   }

   const setActiveEmployee = (employee: AuthEmployee) => {
      if (employee.permissions.length) {
         auth.setActiveEmployee(employee)
         redirectTo(DASHBOARD_ROUTE_NAME)
      }
   }

   const safeImageLoad = (path: string | null) => {
      return new Promise<string>((resolve, reject) => {
         if (path === null) reject(new Error('El path de la imagen es nulo'))
         else {
            const img = new Image()
            const imgPath = `${PUBLIC_STORAGE_URL}/${path}`
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
            auth.setImagePath(DEFAULT_USER_IMAGE)
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
