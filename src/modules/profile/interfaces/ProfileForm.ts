export interface ProfileForm {
  name: string // OBLIGATORIO 
  document_number: string
  email: string
  password: string
  remember_token: string
  phone: string
  address: string
  gender: string
  birthdate: string
  photo_path: string
  branch_id: number | string // OBLIGATORIO 
  role_id: number | string // OBLIGATORIO 
  user_id: number | string // OBLIGATORIO 
  status: string
}