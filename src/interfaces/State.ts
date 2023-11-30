import { Error, Links, Meta } from "../interfaces"

export interface State<T = any> {
  list?: T[]
  one?: T,
  links?: Links
  meta?: Meta
  error?: Error
}
