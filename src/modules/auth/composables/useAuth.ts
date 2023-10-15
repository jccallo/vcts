import router from '@/router'
import { storeToRefs } from 'pinia'
import type { AuthEmployee, AuthResponse } from '../interfaces'
import { useAuthStore } from '../stores'
import { $storage } from '@/services'

const safeImageLoad = (path: string | null) => {
  return new Promise<string>((resolve, reject) => {
    if (path === null) {
      reject(new Error('El path es nulo'))
    } else {
      const img = new Image()
      const imgPath = `${import.meta.env.VITE_BASE_PUBLIC_STORAGE_URL}/${path}`
      img.src = imgPath

      img.onload = () => {
        resolve(imgPath)
      }

      img.onerror = () => {
        reject(new Error('Error al cargar la imagen'))
      }
    }
  })
}

const dashboardRouteName = import.meta.env.VITE_DASHBOARD_ROUTE_NAME

export const useAuth = () => {
  const auth = useAuthStore()
  const { user, isAdmin, imagePath, hasActiveEmployee, activeEmployee } = storeToRefs(auth)

  const getToken = () => $storage.get($storage.TOKEN)
  const getRememberToken = () => $storage.get($storage.REMEMBER_TOKEN)

  const setSession = (data: AuthResponse) => {
    auth.setUser(data.user)
    $storage.set($storage.TOKEN, data.token)
    $storage.set($storage.REMEMBER_TOKEN, data.remember_token ?? '')
  }

  const removeSession = () => {
    auth.removeUser()
    auth.removeImagePath()
    auth.removeActiveEmployee()
    $storage.remove($storage.TOKEN)
    $storage.remove($storage.REMEMBER_TOKEN)
  }

  const setActiveEmployee = (employee: AuthEmployee) => {
    if (employee.permissions.length) {
      auth.setActiveEmployee(employee)
      router.push({ name: dashboardRouteName })
    }
  }

  const loadImage = async () => {
    await safeImageLoad(user.value.photo_path).then((imgPath)=>{
      auth.setImagePath(imgPath)
    }).catch((error: Error) => {
      auth.removeImagePath()
      console.error('Error:', error)
    })
  }

  return {
    user,
    isAdmin,
    imagePath,
    hasActiveEmployee,
    activeEmployee,
    getToken,
    getRememberToken,
    setSession,
    removeSession,
    setActiveEmployee,
    loadImage,
  }
}
