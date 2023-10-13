import { reactive } from 'vue'
import { $http } from '@/services'
import type { DataResponse, Error, HttpResponse, Meta, State } from '@/interfaces'
import type { Sale } from '../interfaces'

const saleState = reactive<State<Sale>>({
  list: [],
  data: {} as Sale,
  meta: {} as Meta,
  error: undefined,
})

const setList = (list: Sale[], meta: Meta) => {
  saleState.list = list
  saleState.meta = meta
  saleState.error = undefined
}

const setData = (data: Sale) => {
  saleState.data = data
  saleState.error = undefined
}

const setError = (error: Error) => {
  saleState.error = error
}

export const useSale = () => {
  const resource = 'sales'

  const storeSale = async <T = any>(form: T) => {
    await $http
      .post<DataResponse<Sale>>(`/${resource}`, form)
      .then((response) => {
        setData(response.data)
      })
      .catch((error: Error) => {
        setError(error)
      })
  }

  const updateSale = async <T = any>(id: number, form: T) => {
    await $http
      .put<DataResponse<Sale>>(`/${resource}/${id}`, form)
      .then((response) => {
        setData(response.data)
      })
      .catch((error: Error) => {
        setError(error)
      })
  }

  const destroySale = async (id: number) => {
    await $http
      .delete<DataResponse<Sale>>(`/${resource}/${id}`)
      .then((response) => {
        setData(response.data)
      })
      .catch((error: Error) => {
        setError(error)
      })
  }

  const getSale = async (id: number) => {
    await $http
      .get<DataResponse<Sale>>(`/${resource}/${id}`)
      .then((response) => {
        setData(response.data)
      })
      .catch((error: Error) => {
        setError(error)
      })
  }

  const getSales = async () => {
    await $http
      .get<HttpResponse<Sale[]>>(`/${resource}`)
      .then((response) => {
        setList(response.data, response.meta)
      })
      .catch((error: Error) => {
        setError(error)
      })
  }

  return {
    saleState,
    storeSale,
    updateSale,
    destroySale,
    getSale,
    getSales
  }
}
