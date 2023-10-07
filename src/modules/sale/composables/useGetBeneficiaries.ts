import { $http } from '@/services'
import { ref, Ref } from 'vue'

export const useGetBeneficiaries = () => {
  const beneficiaries: Ref<any[]> = ref([])

  const getBeneficiaries = async () => {
    const response = await $http.get<any>(`/beneficiaries?page=1&perpage=1000`)
    beneficiaries.value = response.data.map((customer: any) => ({
      id: customer.id,
      fullname: `${customer.fullname} / DNI: ${customer.document_number} / Celular: ${customer.phone}`,
    }))
  }
  return {
    beneficiaries,
    getBeneficiaries,
  }
}
