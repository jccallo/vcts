export interface LoginForm {
  model: string
  email: string
  password: string
  remember_token: boolean
}

export interface LoginError {
  email: Array<string>
  password: Array<string>
  remember_token: Array<string>
}
