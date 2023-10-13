import { Error, Meta } from "../interfaces"

export interface State<T = any> {
  list: T[]
  data: T
  meta: Meta
  error?: Error
}