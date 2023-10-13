import { Pluck } from "@/interfaces"

export interface AuthResponse {
  message: string
  token: string
  remember_token: string | null
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
  isRemember: boolean
  user?: AuthUser
}