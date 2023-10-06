import { ref } from 'vue'
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import { ErrorResponse } from '@/interfaces'
import { useAuthSessionStore } from '@/modules/auth/stores'
import { ProgressFinisher, useProgress } from '@marcoschulte/vue3-progress'

export const useHttp = () => {
  const isLoading = ref<boolean>(false)
  const progresses: ProgressFinisher[] = []
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  })

  const progressStart = () => {
    isLoading.value = true
    progresses.push(useProgress().start())
  }

  const progressFinish = () => {
    isLoading.value = false
    progresses.pop()?.finish()
  }

  const updateHeader = (config: any) => {
    const token = useAuthSessionStore().getToken()
    if (token) config.headers['Authorization'] = `Bearer ${token}`
    return config
  }

  axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      progressStart()
      return updateHeader(config)
    },
    (error: AxiosError<ErrorResponse>) => {
      console.error('Request AxiosError', error)
      progressFinish()
      return Promise.reject(error)
    }
  )

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log('Response AxiosResponse', response)
      progressFinish()
      return response.data
    },
    (error: AxiosError) => {
      console.error('Response AxiosError', error)
      progressFinish()
      return Promise.reject(error)
    }
  )

  return {
    $http: axiosInstance,
    $isLoading: isLoading,
  }
}
