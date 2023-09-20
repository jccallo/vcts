export interface ProfileForm<T = any> {
  name: string // OBLIGATORIO 
  document_number: string
  email: string
  password: string
  phone: string
  address: string
  gender: string
  birthdate: string
  photo_path: T
  branch_id: number | string // OBLIGATORIO 
  role_id: number | string // OBLIGATORIO 
  user_id: number | string // OBLIGATORIO 
  status: string
}
