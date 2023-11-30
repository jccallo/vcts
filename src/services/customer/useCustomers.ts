import { reactive } from 'vue'
import { $api } from '@/services'
import type { Customer, Error, Meta, State } from '@/interfaces'
import { useCustomerStore } from '@/stores'
import { storeToRefs } from 'pinia'

const state = reactive<State<Customer>>({})

const setList = (data?: Customer[], meta?: Meta, error?: Error) => {
   state.list = data
   state.meta = meta
   state.error = error
}

const setOne = (data?: Customer, error?: Error) => {
   state.one = data
   state.error = error
}

export const useCustomers = () => {
   const resource: string = 'customers'

   const store = useCustomerStore()
   const { list, meta, error, lastQueryTime, cacheTime } = storeToRefs(store)

   const getAll = async (page: string = '1', perpage: string = '10', query: string = '') => {
      const response = await $api.get<Customer[]>(`/${resource}?page=${page}&perpage=${perpage}&query=${query}`)
      setList(response.data?.data, response.data?.meta, response.error)
   }

   const getOne = async (id: number) => {
      const response = await $api.get<Customer>(`/${resource}/${id}`)
      setOne(response.data?.data, response.error)
   }

   const create = async <T = any>(form: T) => {
      const response = await $api.post<Customer>(`/${resource}`, form)
      setOne(response.data?.data, response.error)
   }

   const update = async <T = any>(id: number, form: T) => {
      const response = await $api.put<Customer>(`/${resource}/${id}`, form)
      setOne(response.data?.data, response.error)
   }

   const destroy = async (id: number) => {
      const response = await $api.delete<Customer>(`/${resource}/${id}`)
      setOne(response.data?.data, response.error)
   }

   const getAllUsingCache = async (page: string = '1', perpage: string = '10', query: string = '') => {
      console.log('cache', lastQueryTime.value)
      if (!lastQueryTime.value || error.value) {
         // await getAll(page, perpage, query)
         // store.setList(state.list, state.meta, state.error)
         console.log('1.value', !lastQueryTime.value, !!error.value, !lastQueryTime.value || error.value)
      } else {
         console.log('2.value', !lastQueryTime.value, !!error.value, (lastQueryTime.value || error.value))
      }
      // if (!lastQueryTime.value || error.value) {
      //    await getAll(page, perpage, query)
      //    store.setList(state.list, state.meta, state.error)
      //    console.log('!lastQueryTimexxxxxxxxxxxx', lastQueryTime.value)
      // } else {
      //    console.log('lastQueryTimewwwwwww', lastQueryTime.value)
      //    const now: Date = new Date()
      //    const queryTime: Date = new Date(lastQueryTime.value)
      //    const timeDiff: number = now.getTime() - queryTime.getTime()
      //    console.log('timeDiff <= cacheTime.value', now.getTime(), queryTime.getTime())
      //    if (timeDiff <= cacheTime.value) {
      //       setList(list.value, meta.value, error.value)
      //       console.log('ssssssssssssssss')
      //    } else {
      //       await getAll(page, perpage, query)
      //       store.setList(state.list, state.meta, state.error)
      //       console.log('ggggggggggggg')
      //    }
      // }
   }

   return {
      customers: state,
      getAllCustomers: getAllUsingCache,
      getCustomer: getOne,
      createCustomer: create,
      updateCustomer: update,
      destroyCustomer: destroy,
      lastQueryTime,
   }
}
