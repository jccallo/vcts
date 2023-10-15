import { Error, Meta } from "../interfaces"

export interface State<T = any> {
  list: T[]
  instance: T
  meta: Meta
  error?: Error
}

export interface SingleState<T = any> {
  instance: T
  meta: Meta
  error?: Error
}