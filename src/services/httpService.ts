import { Ref, ref } from 'vue'
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import type { Error, ErrorResponse, ValidationError } from '@/interfaces'
import { ProgressFinisher, useProgress } from '@marcoschulte/vue3-progress'
import { useAuth, useToken, useConstant, useRedirect } from '@/modules/auth/composables'

class HttpService {
  private axiosInstance: AxiosInstance
  private progresses: ProgressFinisher[]
  public validationErrors: Ref<ValidationError>
  public isLoading: Ref<boolean>

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
    })
    this.setupInterceptors()
    this.progresses = []
    this.validationErrors = ref({})
    this.isLoading = ref(false)
  }

  private progressStart(): void {
    this.isLoading.value = true
    this.progresses.push(useProgress().start())
  }

  private progressFinish(): void {
    this.isLoading.value = false
    this.progresses.pop()?.finish()
  }

  private updateHeader(config: any) {
    // falta tipear por tiempo
    // const token = $storage.get($storage.TOKEN)
    const token = useToken().getToken()
    console.log('token', token)
    if (token) config.headers['Authorization'] = `Bearer ${token}`
    return config
  }

  private handleError(error: AxiosError<ErrorResponse>) {
    if (!error.response) {
      return Promise.reject<Error>({ message: 'Error inesperado' })
    } else if (Array.isArray(error.response.data.error)) {
      return Promise.reject<Error>({ message: 'Error desconocido' })
    } else if (typeof error.response.data.error === 'string') {
      if (error.response.data.error === import.meta.env.VITE_UNAUTHENTICATED)
        useAuth().removeSession()
        useRedirect().redirectTo(useConstant().LOGIN_ROUTE_NAME)
      return Promise.reject<Error>({ message: error.response.data.error })
    } else if (typeof error.response.data.error === 'object') {
      return Promise.reject<Error>({
        message: 'Errores de validacion',
        validations: error.response.data.error,
      })
    } else {
      return Promise.reject<Error>({ message: 'Hubo un error' })
    }
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        this.progressStart()
        return this.updateHeader(config)
      },
      (error: AxiosError<ErrorResponse>) => {
        // console.error('Request AxiosError', error)
        this.progressFinish()
        return this.handleError(error)
      }
    )

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // console.log('Response AxiosResponse', response)
        this.progressFinish()
        return response
      },
      (error: AxiosError<ErrorResponse>) => {
        // console.error('Response AxiosError', error)
        this.progressFinish()
        return this.handleError(error)
      }
    )
  }

  public getAxiosInstance(): AxiosInstance {
    // solo para prubas de desarrollo con axios
    return this.axiosInstance
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get(url, config)
    return response.data
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.post(url, data, config)
    return response.data
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.put(url, data, config)
    return response.data
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete(url, config)
    return response.data
  }
}

const httpService = new HttpService()
export default httpService
