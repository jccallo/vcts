import { reactive } from 'vue'
import { $http } from '@/services'
import type { Error, HttpResponse, Meta, State } from '@/interfaces'
import type { Courtesy } from '../interfaces'

const courtesyState = reactive<State<Courtesy>>({
  list: [],
  instance: {} as Courtesy,
  meta: {} as Meta,
  error: undefined,
})

const setList = (list: Courtesy[], meta: Meta) => {
  courtesyState.list = list
  courtesyState.meta = meta
  courtesyState.error = undefined
}

const setError = (error: Error) => {
  courtesyState.error = error
}

export const useCourtesy = () => {
  const resource = 'courtesies'

  const getCourtesies = async (page: string = '1', perpage: string = '10', query: string = '') => {
    await $http
      .get<HttpResponse<Courtesy[]>>(`/${resource}?page=${page}&perpage=${perpage}&query=${query}`)
      .then((response) => {
        setList(response.data, response.meta)
      })
      .catch((error: Error) => {
        setError(error)
      })
  }

  return {
    courtesyState,
    getCourtesies,
  }
}