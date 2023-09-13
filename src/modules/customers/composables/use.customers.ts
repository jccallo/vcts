import { $http } from '@/services'
import { ref } from 'vue'

const useCustomers = () => {
  const customers = ref<any[]>([])
  const meta = ref<any>({})

  const customersIndex = async (page: number = 1, perpage: number = 10) => {
    const response = await $http.get<any>(`/customers?page=${page}&perpage=${perpage}`)
    customers.value = response.data
    meta.value = response.meta
  }

  return {
    customers,
    meta,
    customersIndex,
  }
}

export default useCustomers
