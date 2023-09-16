import { ProgressFinisher, useProgress } from '@marcoschulte/vue3-progress'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { $toast, $storage } from '@/services'

class HttpService {
  private axiosInstance: AxiosInstance
  private progresses = [] as ProgressFinisher[]

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
    })
    this.progresses = []
    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config: any) => {
        const token = $storage.get($storage.TOKEN)
        if (token) config.headers['Authorization'] = `Bearer ${token}`
        this.progresses.push(useProgress().start())
        return config
      },
      (error: any) => {
        this.progresses.pop()?.finish()
        return Promise.reject(error)
      }
    )

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        this.progresses.pop()?.finish()
        return response
      },
      (error: any) => {
        this.progresses.pop()?.finish()
        // error de axios
        if (!error.response)
          $toast.error('Error desconocido, inténtelo mas tarde!')
        // error general de la api
        else if (typeof error.response.data.error === 'string')
          $toast.error(error.response.data.error)
        // error de validacion
        else {
          console.log('Error de validacion')
        }

        return Promise.reject(error)
      }
    )
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
