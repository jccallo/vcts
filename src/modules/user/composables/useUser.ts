import { reactive } from 'vue'
import { $http } from '@/services'
import type { Error, HttpResponse } from '@/interfaces'
import type { UserState, User } from '../interfaces'

const userState = reactive<UserState>({
  data: {} as User,
  error: undefined,
})

const setUser = (user: User) => {
  userState.data = user
  userState.error = undefined
}

const setError = (error: Error) => {
  userState.data = {} as User
  userState.error = error
}

export const useUser = () => {
  const storeUser = async <T = any>(userForm: T) => {
    await $http
      .post<HttpResponse<User>>('/users', userForm)
      .then((response) => {
        setUser(response.data)
      })
      .catch((error: Error) => {
        setError(error)
      })
  }

  const updateUser = async <T = any>(userId: number, userForm: T) => {
    await $http
      .put<HttpResponse<User>>(`/users/${userId}`, userForm)
      .then((response) => {
        setUser(response.data)
      })
      .catch((error: Error) => {
        setError(error)
      })
  }

  const getUser = async(userId: number) => {
    await $http
      .get<HttpResponse<User>>(`/users/${userId}`)
      .then((response) => {
        setUser(response.data)
      })
      .catch((error: Error) => {
        setError(error)
      })
  }

  return {
    userState,
    storeUser,
    updateUser,
    getUser,
  }
}
