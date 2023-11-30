import { defineStore } from 'pinia'
import type { Customer, Error, Meta } from '@/interfaces'

interface CustomerStore {
   list: Customer[] | undefined
   meta: Meta | undefined
   error: Error | undefined
   lastQueryTime: string
   cacheTime: number // 1seg = 1000ms, 1min = 60000ms
}

export const useCustomerStore = defineStore('customer', {
   state: () =>
      <CustomerStore>{
         list: undefined,
         meta: undefined,
         error: undefined,
         lastQueryTime: '',
         cacheTime: 60000,
      },
   actions: {
      setList(list?: Customer[], meta?: Meta, error?: Error) {
         this.list = list
         this.meta = meta
         this.error = error
         this.lastQueryTime = new Date().toLocaleString()
      },
   },
   persist: true,
})
