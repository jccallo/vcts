import { Error, Meta } from "../interfaces"

export interface State<T = any> {
  list: T[]
  instance: T
  meta: Meta
  error?: Error
}

export interface InstanceState<T = any> {
  instance: T
  meta: Meta
  error?: Error
}

export interface ListState<T = any> {
  list: T[]
  meta: Meta
  error?: Error
}