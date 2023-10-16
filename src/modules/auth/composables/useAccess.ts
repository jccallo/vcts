import { ref } from "vue"
import { useAuth } from '../composables'
import { Pluck } from "@/interfaces"

export const useAccess = () => {
  const { activeEmployee } = useAuth()
  const permissions = ref<any[]>([])

  const getPermissions = () => {
    // permissions.value = activeEmployee.value.permissions.map((permission: Pluck) => permission.name)
    permissions.value = []
  }

  const checkAccess = (routeName: string) => {
    getPermissions()
    console.log('permissions.value', permissions.value)
    return permissions.value.includes(routeName);
  }
  
  return {
    checkAccess,
  }
}

// permissions.value.map((permission: any) => {
//   const name = permission.name.split('.')[0]
//   if (name === resource) return true
//   else false
// })

// const allPermissions = ref<Pluck[]>([
//   { id: 1, name: 'users.index' },
//   { id: 2, name: 'users.create' }
// ])