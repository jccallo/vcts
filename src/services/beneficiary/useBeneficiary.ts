import { reactive } from 'vue'
import { $api } from '@/services'
import type { Beneficiary, Error, Meta, State } from '@/interfaces'

const state = reactive<State<Beneficiary>>({})

const setList = (data?: Beneficiary[], meta?: Meta, error?: Error) => {
   state.list = data
   state.meta = meta
   state.error = error
}

const setOne = (data?: Beneficiary, error?: Error) => {
   state.one = data
   state.error = error
}

export const useBeneficiary = () => {
   const resource: string = 'beneficiaries'

   const getAll = async (page: string = '1', perpage: string = '10', query: string = '') => {
      const response = await $api.get<Beneficiary[]>(`/${resource}?page=${page}&perpage=${perpage}&query=${query}`)
      setList(response.data?.data, response.data?.meta, response.error)
   }

   const getOne = async (id: number) => {
      const response = await $api.get<Beneficiary>(`/${resource}/${id}`)
      setOne(response.data?.data, response.error)
   }

   const store = async <T = any>(form: T) => {
      const response = await $api.post<Beneficiary>(`/${resource}`, form)
      setOne(response.data?.data, response.error)
   }

   const update = async <T = any>(id: number, form: T) => {
      const response = await $api.put<Beneficiary>(`/${resource}/${id}`, form)
      setOne(response.data?.data, response.error)
   }

   const destroy = async (id: number) => {
      const response = await $api.delete<Beneficiary>(`/${resource}/${id}`)
      setOne(response.data?.data, response.error)
   }

   return {
      state,
      getAll,
      getOne,
      store,
      update,
      destroy,
   }
}