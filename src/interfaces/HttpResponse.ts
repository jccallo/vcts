export interface HttpResponse<T = any> {
  data: T
  links?: Links
  meta?: Meta
}

export interface Links {
  first: string
  last: string
  prev: string | null
  next: string | null
}

export interface Meta {
  current_page: number
  from: number | null
  last_page: number
  links: Link[]
  path: string
  per_page: string
  to: number | null
  total: number
}

export interface Link {
  url: string | null
  label: string
  active: boolean
}


