export interface Beneficiary {
  id: number
  name: string
  email: string | null
  document_number: string | null
  phone: string | null
  author_id: number
  status: string
}