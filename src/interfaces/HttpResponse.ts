import { Meta } from "../interfaces"

export interface HttpResponse<T = any> {
  data: T
  links: Links
  meta: Meta
}

export interface Links {
  first: string
  last: string
  prev: string | null
  next: string | null
}
