import { ref } from 'vue';
import { $http } from '@/services';

export const useGetBranches = () => {
  const branchNames = ref<any[]>([])

  const getBranchNames = async () => {
    const response = await $http.get('/branches/names')
    branchNames.value = response.data
  }

  return {
    branchNames,
    getBranchNames,
  }
}