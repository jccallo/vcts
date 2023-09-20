import { ref } from 'vue';
import { $http } from '@/services';

export const useGetRoles = () => {
  const roleNames = ref<any[]>([])

  const getRoleNames = async () => {
    const response = await $http.get('/roles/names')
    roleNames.value = response.data
  }

  return {
    roleNames,
    getRoleNames,
  }
}