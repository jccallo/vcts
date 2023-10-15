import { reactive } from 'vue';
import type { Error, HttpResponse, ListState, Meta } from '@/interfaces';
import type { Card } from '@/modules/card/interfaces';
import { $http } from '@/services';

const cardState = reactive<ListState<Card>>({
  list: [],
  meta: {} as Meta,
  error: undefined,
})

const setList = (list: Card[], meta: Meta) => {
  cardState.list = list
  cardState.meta = meta
  cardState.error = undefined
}

const setError = (error: Error) => {
  cardState.error = error
}

export const useCards = () => {
  const mainResource = 'customers'
  const resource = 'cards'
  
  const getCards = async (id: number, page: string = '1', perpage: string = '10', query: string = '') => {
    await $http
      .get<HttpResponse<Card[]>>(`/${mainResource}/${id}/${resource}?page=${page}&perpage=${perpage}&query=${query}`)
      .then((response) => {
        setList(response.data, response.meta)
      })
      .catch((error: Error) => {
        setError(error)
      })
  }
  
  return {
    cardState,
    getCards,
  }
}