import { reactive } from 'vue'
import { $api } from '@/services'
import type { Province, Error, Meta, State } from '@/interfaces'

const state = reactive<State<Province>>({})

const setList = (data?: Province[], meta?: Meta, error?: Error) => {
   state.list = data
   state.meta = meta
   state.error = error
}

export const useProvinces = () => {
   const resource: string = 'provinces'
   const getAll = async (page: string = '1', perpage: string = '10', query: string = '') => {
      const response = await $api.get<Province[]>(`/${resource}?page=${page}&perpage=${perpage}&query=${query}`)
      setList(response.data?.data, response.data?.meta, response.error)
   }
   
   const resource1: string = 'departments'
   const getAllByDepartment = async (id: number, page: string = '1', perpage: string = '10', query: string = '') => {
      const response = await $api.get<Province[]>(`/${resource1}/${id}/${resource}?page=${page}&perpage=${perpage}&query=${query}`)
      setList(response.data?.data, response.data?.meta, response.error)
   }

   return {
      provinces: state,
      getAllProvinces: getAll,
      getAllProvincesByDepartment: getAllByDepartment,
   }
}