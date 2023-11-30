import { Ref, ref } from 'vue'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ProgressFinisher, useProgress } from '@marcoschulte/vue3-progress'
import type { ApiResponse, Error, ErrorResponse, HttpResponse } from '@/interfaces'
import { $token, $redirect, $constant } from '@/services'

class ApiService {
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
      const token = $token.getToken()
      console.log('token', token)
      if (token) config.headers['Authorization'] = `Bearer ${token}`
      return config
   }

   private handleError(error: AxiosError<ErrorResponse>) {
      let modifiedError = {} as Error
      if (!error.response) {
         modifiedError.message = 'Error inesperado'
         modifiedError.code = 500,
         modifiedError.original = error
      } else if (typeof error.response.data.error === 'string') {
         modifiedError.message = error.response.data.error
         modifiedError.code = error.response.data.code
         if (error.response.data.error === $constant.UNAUTHENTICATED) $redirect.replaceWith($constant.LOGIN_ROUTE_NAME)
      } else if (typeof error.response.data.error === 'object') {
         modifiedError.message = 'Error de validacion'
         modifiedError.validations = error.response.data.error
         modifiedError.code = error.response.data.code
      } else {
         modifiedError.message = 'Hubo un error'
         modifiedError.code = 500
         modifiedError.original = error
      }
      return Promise.reject<Error>(modifiedError)
   }

   private setupInterceptors() {
      this.axiosInstance.interceptors.request.use(
         (config: AxiosRequestConfig) => {
            this.progressStart()
            return this.updateHeader(config)
         },
         (error: AxiosError<ErrorResponse>) => {
            this.progressFinish()
            return this.handleError(error)
         }
      )

      this.axiosInstance.interceptors.response.use(
         (response: AxiosResponse) => {
            this.progressFinish()
            return response
         },
         (error: AxiosError<ErrorResponse>) => {
            this.progressFinish()
            return this.handleError(error)
         }
      )
   }

   public getAxiosInstance(): AxiosInstance {
      // solo para prubas de desarrollo con axios
      return this.axiosInstance
   }

   public async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<HttpResponse<T>>> {
      let apiResponse = {} as ApiResponse<HttpResponse<T>>
      try {
         const response = await this.axiosInstance.get(url, config)
         apiResponse.data = response.data
      } catch (error: unknown) {
         apiResponse.error = error as Error
      }
      return apiResponse
   }

   public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<HttpResponse<T>>> {
      let apiResponse = {} as ApiResponse<HttpResponse<T>>
      try {
         const response = await this.axiosInstance.post(url, data, config)
         apiResponse.data = response.data
      } catch (error: unknown) {
         apiResponse.error = error as Error
      }
      return apiResponse
   }

   public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<HttpResponse<T>>> {
      let apiResponse = {} as ApiResponse<HttpResponse<T>>
      try {
         const response = await this.axiosInstance.put(url, data, config)
         apiResponse.data = response.data
      } catch (error: unknown) {
         apiResponse.error = error as Error
      }
      return apiResponse
   }

   public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<HttpResponse<T>>> {
      let apiResponse = {} as ApiResponse<HttpResponse<T>>
      try {
         const response = await this.axiosInstance.delete(url, config)
         apiResponse.data = response.data
      } catch (error: unknown) {
         apiResponse.error = error as Error
      }
      return apiResponse
   }
}

export const $api = new ApiService()
