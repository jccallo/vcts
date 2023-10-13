import { reactive } from 'vue'
import { $http } from '@/services'
import type { DataResponse, Error, HttpResponse, Meta } from '@/interfaces'
import type { Customer } from '../interfaces'

const customerState = reactive({
  list: [] as Customer[],
  instance: {} as Customer,
  meta: {} as Meta,
  error: {} as Error | undefined,
})

const setList = (list: Customer[], meta: Meta) => {
  customerState.list = list
  customerState.meta = meta
  customerState.error = undefined
}

const setInstance = (instance: Customer) => {
  customerState.instance = instance
  customerState.error = undefined
}

const setError = (error: Error) => {
  customerState.error = error
}

export const useCustomer = () => {
  const resource = 'customers'

  const storeCustomer = async <T = any>(form: T) => {
    await $http
      .post<DataResponse<Customer>>(`/${resource}`, form)
      .then((response) => {
        setInstance(response.data)
      })
      .catch((error: Error) => {
        setError(error)
      })
  }

  const updateCustomer = async <T = any>(id: number, form: T) => {
    await $http
      .put<DataResponse<Customer>>(`/${resource}/${id}`, form)
      .then((response) => {
        setInstance(response.data)
      })
      .catch((error: Error) => {
        setError(error)
      })
  }

  const destroyCustomer = async (id: number) => {
    await $http
      .delete<DataResponse<Customer>>(`/${resource}/${id}`)
      .then((response) => {
        setInstance(response.data)
      })
      .catch((error: Error) => {
        setError(error)
      })
  }

  const getCustomer = async (id: number) => {
    await $http
      .get<DataResponse<Customer>>(`/${resource}/${id}`)
      .then((response) => {
        setInstance(response.data)
      })
      .catch((error: Error) => {
        setError(error)
      })
  }

  const getCustomers = async (page: string = '1', perpage: string = '10', query: string = '') => {
    await $http
      .get<HttpResponse<Customer[]>>(`/${resource}?page=${page}&perpage=${perpage}&query=${query}`)
      .then((response) => {
        setList(response.data, response.meta)
      })
      .catch((error: Error) => {
        setError(error)
      })
  }

  return {
    customerState,
    storeCustomer,
    updateCustomer,
    destroyCustomer,
    getCustomer,
    getCustomers,
  }
}