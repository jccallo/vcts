import { reactive } from 'vue'
import { $api } from '@/services'
import type { Department, Error, Meta, State } from '@/interfaces'

const state = reactive<State<Department>>({})

const setList = (data?: Department[], meta?: Meta, error?: Error) => {
   state.list = data
   state.meta = meta
   state.error = error
}

export const useDepartments = () => {
   const resource: string = 'departments'

   const getAll = async (page: string = '1', perpage: string = '10', query: string = '') => {
      const response = await $api.get<Department[]>(`/${resource}?page=${page}&perpage=${perpage}&query=${query}`)
      setList(response.data?.data, response.data?.meta, response.error)
   }

   return {
      departments: state,
      getAllDepartments: getAll,
   }
}

