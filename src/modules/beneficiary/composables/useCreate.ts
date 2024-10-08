import { reactive } from 'vue'
import { $http } from '@/services'
import type { Error, HttpResponse, Meta, State } from '@/interfaces'
import type { Beneficiary } from '../interfaces'

const beneficiaryState = reactive<State<Beneficiary>>({
  list: [],
  one: {} as Beneficiary,
  meta: {} as Meta,
  error: undefined,
})

const setList = (list: Beneficiary[], meta?: Meta) => {
  beneficiaryState.list = list
  beneficiaryState.meta = meta
  beneficiaryState.error = undefined
}

const setInstance = (one: Beneficiary) => {
  beneficiaryState.one = one
  beneficiaryState.error = undefined
}

const setError = (error: Error) => {
  beneficiaryState.error = error
}

export const useBeneficiary = () => {
  const resource = 'beneficiaries'

  const storeBeneficiary = async <T = any>(form: T) => {
    await $http
      .post<HttpResponse<Beneficiary>>(`/${resource}`, form)
      .then((response) => {
        setInstance(response.data)
      })
      .catch((error: Error) => {
        setError(error)
      })
  }

  const updateBeneficiary = async <T = any>(id: number, form: T) => {
    await $http
      .put<HttpResponse<Beneficiary>>(`/${resource}/${id}`, form)
      .then((response) => {
        setInstance(response.data)
      })
      .catch((error: Error) => {
        setError(error)
      })
  }

  const destroyBeneficiary = async (id: number) => {
    await $http
      .delete<HttpResponse<Beneficiary>>(`/${resource}/${id}`)
      .then((response) => {
        setInstance(response.data)
      })
      .catch((error: Error) => {
        setError(error)
      })
  }

  const getBeneficiary = async (id: number) => {
    await $http
      .get<HttpResponse<Beneficiary>>(`/${resource}/${id}`)
      .then((response) => {
        setInstance(response.data)
      })
      .catch((error: Error) => {
        setError(error)
      })
  }

  const getBeneficiaries = async (page: string = '1', perpage: string = '10', query: string = '') => {
    await $http
      .get<HttpResponse<Beneficiary[]>>(`/${resource}?page=${page}&perpage=${perpage}&query=${query}`)
      .then((response) => {
        setList(response.data, response.meta)
      })
      .catch((error: Error) => {
        setError(error)
      })
  }

  return {
    beneficiaryState,
    storeBeneficiary,
    updateBeneficiary,
    destroyBeneficiary,
    getBeneficiary,
    getBeneficiaries,
  }
}