import { Error } from "@/interfaces"
import { User } from "../interfaces"

export interface UserState {
  data: User
  error?: Error
}

export interface UserListState {
  data: User[]
  isError: boolean
  error: Error
}