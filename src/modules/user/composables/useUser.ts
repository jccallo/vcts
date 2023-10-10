import { reactive } from 'vue'
import { $http } from '@/services'
import { Error, HttpResponse, User } from '@/interfaces'

interface UserState {
  data: User
  isError: boolean
  error: Error
}

export const useUser = () => {
  const userState = reactive<UserState>({
    data: {} as User,
    isError: false,
    error: {} as Error,
  })

  const storeUser = async <T = any>(userForm: T) => {
    await $http
      .post<HttpResponse<User>>('/users', userForm)
      .then((response) => {
        userState.data = response.data
        userState.isError = false
        userState.error = {} as Error
      })
      .catch((error: Error) => {
        userState.data = {} as User,
        userState.isError = true
        userState.error = error
      })
  }

  const updateUser = async <T = any>(userId: number, userForm: T) => {
    await $http
      .put<HttpResponse<User>>(`/users/${userId}`, userForm)
      .then((response) => {
        userState.data = response.data
        userState.isError = false
        userState.error = {} as Error
      })
      .catch((error: Error) => {
        userState.data = {} as User
        userState.isError = true
        userState.error = error
      })
  }

  return {
    userState,
    storeUser,
    updateUser,
  }
}
