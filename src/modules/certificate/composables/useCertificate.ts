import { reactive } from 'vue'
import { $http } from '@/services'
import type { Error, HttpResponse, Meta, State } from '@/interfaces'
import type { Certificate } from '../interfaces'

const certificateState = reactive<State<Certificate>>({
  list: [],
  instance: {} as Certificate,
  meta: {} as Meta,
  error: undefined,
})

const setList = (list: Certificate[], meta: Meta) => {
  certificateState.list = list
  certificateState.meta = meta
  certificateState.error = undefined
}

const setError = (error: Error) => {
  certificateState.error = error
}

export const useCertificate = () => {
  // certificates
  const resource = 'certificates'

  const getCertificates = async (page: string = '1', perpage: string = '10', query: string = '') => {
    await $http
      .get<HttpResponse<Certificate[]>>(`/${resource}?page=${page}&perpage=${perpage}&query=${query}`)
      .then((response) => {
        setList(response.data, response.meta)
      })
      .catch((error: Error) => {
        setError(error)
      })
  }

  // sales.certificates
  const resource1 = 'sales'

  const getSaleCertificates = async (id: number, page: string = '1', perpage: string = '10', query: string = '') => {
    await $http
      .get<HttpResponse<Certificate[]>>(`/${resource1}/${id}/${resource}?page=${page}&perpage=${perpage}&query=${query}`)
      .then((response) => {
        setList(response.data, response.meta)
      })
      .catch((error: Error) => {
        setError(error)
      })
  }

  return {
    certificateState,
    getCertificates,
    getSaleCertificates,
  }
}