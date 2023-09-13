import { $http } from "@/services"
import { ref } from 'vue';

const useBeneficiaries = () => {
  const beneficiaries = ref<any[]>([])
  const meta = ref<any>({})

  const beneficiariesIndex = async (page: number = 1, perpage: number = 10) => {
    const response = await $http.get<any>(`/beneficiaries?page=${page}&perpage=${perpage}`)
    beneficiaries.value = response.data
    meta.value = response.meta
  }
  return {
    beneficiaries,
    meta,
    beneficiariesIndex,
  }
}

export default useBeneficiaries