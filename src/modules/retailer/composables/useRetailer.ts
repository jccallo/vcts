import { reactive } from 'vue'
import { $http } from '@/services'
import type { Error, HttpResponse, Meta, State } from '@/interfaces'
import type { Retailer } from '../interfaces'

const retailerState = reactive<State<Retailer>>({
  list: [],
  instance: {} as Retailer,
  meta: {} as Meta,
  error: undefined,
})

const setList = (list: Retailer[], meta: Meta) => {
  retailerState.list = list
  retailerState.meta = meta
  retailerState.error = undefined
}

const setError = (error: Error) => {
  retailerState.error = error
}

export const useRetailer = () => {
  const resource = 'retailers'

  const getRetailers = async (page: string = '1', perpage: string = '10', query: string = '') => {
    await $http
      .get<HttpResponse<Retailer[]>>(`/${resource}?page=${page}&perpage=${perpage}&query=${query}`)
      .then((response) => {
        setList(response.data, response.meta)
      })
      .catch((error: Error) => {
        setError(error)
      })
  }

  return {
    retailerState,
    getRetailers,
  }
}