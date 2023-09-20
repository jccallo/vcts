import { Ref, ref } from 'vue'
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import { ProgressFinisher, useProgress } from '@marcoschulte/vue3-progress'
import { ValidationResponse } from '@/modules/auth/interfaces'
import { useSessionStore } from '@/modules/auth/stores'

class HttpService {
  private axiosInstance: AxiosInstance
  private progresses: ProgressFinisher[]
  public isLoading: Ref<boolean>

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
    })
    this.setupInterceptors()
    this.progresses = []
    this.isLoading = ref<boolean>(false)
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
    const token = useSessionStore().getToken()
    if (token) config.headers['Authorization'] = `Bearer ${token}`
    return config
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        this.progressStart()
        return this.updateHeader(config)
      },
      (error: AxiosError) => {
        this.progressFinish()
        return Promise.reject(error)
      }
    )

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        this.progressFinish()
        return response
      },
      (error: AxiosError<ValidationResponse>) => {
        this.progressFinish()
        if (!error.response) {
          return Promise.reject('Error inesperado, inténtelo mas tarde!') // error de axios
        } else if (typeof error.response.data.error === 'string') {
          return Promise.reject(error.response.data.error) // error general de la api
        } else {
          return Promise.reject(Object.values(error.response.data.error)[0][0]) // error de validacion (solo se envia uno a la vez como string)
        }
      }
    )
  }

  public getAxiosInstance(): AxiosInstance {
    // solo para prubas de desarrollo con axios
    return this.axiosInstance
  }

  public async get(url: string, config?: AxiosRequestConfig): Promise<any> {
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

  public async put(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<any> {
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
