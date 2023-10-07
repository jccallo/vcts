import { Ref, ref } from 'vue'
import { useHttp } from '@/composables'

export const useGetCards = () => {
  const { $http } = useHttp()
  const cards: Ref<any[]> = ref([])

  const getCards = async (clientId: string) => {
    try {
      const response = await $http.get(`/customers/${clientId}/cards?page=1&perpage=1000`)
      cards.value = response.data.map((card: any) => ({
        id: card.id,
        fullname: `${card.number} / Proces: ${card.processor} / Banco: ${card.bank_id}`,
      }))
    } catch (error) {
      console.error('Error getCards:', error)
    }
  }

  return {
    cards,
    getCards,
  }
}