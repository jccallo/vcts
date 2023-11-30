import { Error } from '../interfaces'

export interface ApiResponse<T = any> {
   data?: T
   error?: Error
}
