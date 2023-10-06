import { Pluck } from "@/interfaces"

export interface AuthResponse {
  message: string
  token: string
  remeber_token: boolean
  user: AuthUser 
}

export interface AuthUser {
  id: number
  email: string
  name: string
  admin: string
  employees?: AuthEmployee[]
}

export interface AuthEmployee {
  branch: Pluck
  role: Pluck 
  permissions: Pluck[]
}

export interface AuthSession {
  message: string
  token: string
  remember_token: boolean
  user: AuthUser | null
}