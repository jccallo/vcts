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
  photo_path: string | null
  admin: string
  employees: AuthEmployee[]
}

export interface AuthEmployee {
  id: number
  branch: Pluck
  role: Pluck 
  permissions: Pluck[]
}

export interface AuthState {
  user: AuthUser
  isAdmin: boolean
  imagePath: string,
  hasActiveEmployee: boolean
  activeEmployee: AuthEmployee
}