export interface User {
  id: number
  email: string
  name: string
  admin: string
  document_number: string
  phone: string
  address: string | null
  birthdate: string | null
  photo_path: string | null
  author_id: number
  status: string
}