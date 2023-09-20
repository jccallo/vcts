export interface LoginResponse {
  message: string
  token: string
  remeber_token: boolean
  model: string
  user: LoginUser | null
}

export interface LoginUser {
  id: number
  name: string | null
  username: string | null
  email: string
  admin: string
  status: string
}

export interface LoginForm {
  model: string
  email: string
  password: string
  remember_token: boolean
}

export interface LoginModel {
  name: string
  label: string
}
