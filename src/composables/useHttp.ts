import { Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import { ErrorResponse, ValidationError } from '@/interfaces'
import { useAuthSessionStore } from '@/modules/auth/stores'
import { ProgressFinisher, useProgress } from '@marcoschulte/vue3-progress'

export const useHttp = () => {
  const authSession = useAuthSessionStore()
  const router = useRouter()

  const isLoading = ref<boolean>(false)
  const validationErrors: Ref<ValidationError> = ref({})
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
    const token = authSession.getToken()
    if (token) config.headers['Authorization'] = `Bearer ${token}`
    return config
  }

  const cleanValidationErrors = () => {
    validationErrors.value = {}
  }

  const setValidationErrors = (errors: ValidationError) => {
    validationErrors.value = errors
  }

  const handleError = (error: AxiosError<ErrorResponse>) => {
    if (!error.response) {
      return Promise.reject('Error inesperado!')
    } else if (Array.isArray(error.response.data.error)) {
      return Promise.reject('Error desconocido!')
    } else if (typeof error.response.data.error === 'string') {
      if (error.response.data.error === import.meta.env.VITE_UNAUTHENTICATED) {
        authSession.remove()
        router.push({ name: 'auth.login' })
      }
      return Promise.reject(error.response.data.error)
    } else if (typeof error.response.data.error === 'object') {
      setValidationErrors(error.response.data.error)
      return Promise.reject('Errores de validacion!')
    } else {
      return Promise.reject('Hubo un error!')
    }
  }

  axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      progressStart()
      return updateHeader(config)
    },
    (error: AxiosError<ErrorResponse>) => {
      console.error('Request AxiosError', error)
      progressFinish()
      return handleError(error)
    }
  )

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log('Response AxiosResponse', response)
      progressFinish()
      cleanValidationErrors()
      return response.data
    },
    (error: AxiosError<ErrorResponse>) => {
      console.error('Response AxiosError', error)
      progressFinish()
      return handleError(error)
    }
  )

  return {
    $http: axiosInstance,
    $isLoading: isLoading,
    $errors: validationErrors,
  }
}

