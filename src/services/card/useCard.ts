import { reactive } from 'vue'
import { $api } from '@/services'
import type { Card, Error, Meta, State } from '@/interfaces'

const state = reactive<State<Card>>({})

const setList = (data?: Card[], meta?: Meta, error?: Error) => {
   state.list = data
   state.meta = meta
   state.error = error
}

export const useCards = () => {
   const resource = 'cards'
   const resource1 = 'customers'

   const getAllbyCustomer = async (id: number, page: string = '1', perpage: string = '10', query: string = '') => {
      const response = await $api.get<Card[]>(`/${resource1}/${id}/${resource}?page=${page}&perpage=${perpage}&query=${query}`)
      setList(response.data?.data, response.data?.meta, response.error)
   }

   return {
      state,
      getAllbyCustomer,
   }
}
