import { reactive } from 'vue'
import { $api } from '@/services'
import type { User, Error, Meta, State } from '@/interfaces'

const state = reactive<State<User>>({})

const setList = (data?: User[], meta?: Meta, error?: Error) => {
   state.list = data
   state.meta = meta
   state.error = error
}

const setOne = (data?: User, error?: Error) => {
   state.one = data
   state.error = error
}

export const useUser = () => {
   const resource: string = 'users'

   const getAll = async (page: string = '1', perpage: string = '10', query: string = '') => {
      const response = await $api.get<User[]>(`/${resource}?page=${page}&perpage=${perpage}&query=${query}`)
      setList(response.data?.data, response.data?.meta, response.error)
   }

   const getOne = async (id: number) => {
      const response = await $api.get<User>(`/${resource}/${id}`)
      setOne(response.data?.data, response.error)
   }

   const store = async <T = any>(form: T) => {
      const response = await $api.post<User>(`/${resource}`, form)
      setOne(response.data?.data, response.error)
   }

   const update = async <T = any>(id: number, form: T) => {
      const response = await $api.put<User>(`/${resource}/${id}`, form)
      setOne(response.data?.data, response.error)
   }

   const destroy = async (id: number) => {
      const response = await $api.delete<User>(`/${resource}/${id}`)
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
