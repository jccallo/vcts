import { $http } from '@/services'
import { ref } from 'vue'

const useCards = () => {
  const cards = ref<any[]>([])
  const meta = ref<any>({})

  const cardsIndex = async (page: number = 1, perpage: number = 10) => {
    const response = await $http.get<any>(`/cards?page=${page}&perpage=${perpage}`)
    cards.value = response.data
    meta.value = response.meta
  }

  return {
    cards,
    meta,
    cardsIndex,
  }
}

export default useCards