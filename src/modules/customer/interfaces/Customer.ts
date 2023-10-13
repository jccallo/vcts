export interface Customer {
  id: number
  firstname: string
  lastname: string
  customer_code: string | null
  document_number: string | null
  birthdate: string | null
  phone: string | null
  email: string | null
  address: string | null
  reference: string | null
  department: string | null
  province: string | null
  district: string | null
  author_id: number
  status: string
}