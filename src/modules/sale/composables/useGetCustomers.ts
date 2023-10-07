import { Ref, ref } from 'vue'
import { useHttp } from '@/composables'

export const useGetCustomers = () => {
  const { $http } = useHttp()
  const customers: Ref<any[]> = ref([])

  const getCustomers = async () => {
    try {
      const response = await $http.get(`/customers?page=1&perpage=1000`)
      customers.value = response.data.map((customer: any) => ({
        id: customer.id,
        fullname: `${customer.firstname} ${customer.lastname} / DNI: ${customer.document_number} / Celular: ${customer.phone}`,
      }))
    } catch (error) {
      console.error('Error getCustomers:', error)
    }
  }

  return {
    customers,
    getCustomers,
  }
}
