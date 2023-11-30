import { reactive } from 'vue'
import { $api } from '@/services'
import type { District, Error, Meta, State } from '@/interfaces'

const state = reactive<State<District>>({})

const setList = (data?: District[], meta?: Meta, error?: Error) => {
   state.list = data
   state.meta = meta
   state.error = error
}

export const useDistricts = () => {
   const resource: string = 'districts'
   const getAll = async (page: string = '1', perpage: string = '10', query: string = '') => {
      const response = await $api.get<District[]>(`/${resource}?page=${page}&perpage=${perpage}&query=${query}`)
      setList(response.data?.data, response.data?.meta, response.error)
   }
   
   const resource1: string = 'provinces'
   const getAllByProvince = async (id: number, page: string = '1', perpage: string = '10', query: string = '') => {
      const response = await $api.get<District[]>(`/${resource1}/${id}/${resource}?page=${page}&perpage=${perpage}&query=${query}`)
      setList(response.data?.data, response.data?.meta, response.error)
   }

   return {
      districts: state,
      getAllDistricts: getAll,
      getAllDistrictsByProvince: getAllByProvince,
   }
}