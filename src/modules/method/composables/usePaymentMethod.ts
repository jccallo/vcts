import { reactive } from 'vue'
import { $http } from '@/services'
import type { Error, HttpResponse, Meta, State } from '@/interfaces'
import type { PaymentMethod } from '../interfaces'

const paymentMethodState = reactive<State<PaymentMethod>>({
  list: [],
  instance: {} as PaymentMethod,
  meta: {} as Meta,
  error: undefined,
})

const setList = (list: PaymentMethod[], meta: Meta) => {
  paymentMethodState.list = list
  paymentMethodState.meta = meta
  paymentMethodState.error = undefined
}

const setError = (error: Error) => {
  paymentMethodState.error = error
}

export const usePaymentMethod = () => {
  const resource = 'payment-methods'

  const getPaymentMethods = async (page: string = '1', perpage: string = '10', query: string = '') => {
    await $http
      .get<HttpResponse<PaymentMethod[]>>(`/${resource}?page=${page}&perpage=${perpage}&query=${query}`)
      .then((response) => {
        setList(response.data, response.meta)
      })
      .catch((error: Error) => {
        setError(error)
      })
  }

  return {
    paymentMethodState,
    getPaymentMethods,
  }
}