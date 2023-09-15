import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { $toast, $storage } from '@/services'

class HttpService {
  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config: any) => {
        const token = $storage.get($storage.TOKEN)
        if (token) config.headers['Authorization'] = `Bearer ${token}`
        return config
      },
      (error: any) => {
        return Promise.reject(error)
      }
    )

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (error: any) => {
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
