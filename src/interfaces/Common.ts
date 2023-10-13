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

export interface Pluck {
  id: number
  name: string
}