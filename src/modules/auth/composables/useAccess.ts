import { ref } from "vue"
import { useAuth } from '../composables'

export const useAccess = () => {
  const allPermissions = ref<any[]>([
    { id: 1, name: 'users.index' },
    { id: 2, name: 'users.create' }
  ])

  const { user } = useAuth()
  const permissions = ref<any[]>([])

  const getPermissions = () => {
    permissions.value = user.value.employees?.map((permission: any) => permission.name) ?? []
  }

  const can = (routeName: string) => {
    getPermissions()
    console.log('permissions.value', permissions.value)
    return permissions.value.includes(routeName);
  }
  
  return {
    can,
  }
}

// permissions.value.map((permission: any) => {
//   const name = permission.name.split('.')[0]
//   if (name === resource) return true
//   else false
// })