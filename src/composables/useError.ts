import { Ref, ref } from 'vue'
import { AxiosError } from 'axios'
import { useRouter } from 'vue-router'
import { useToast } from '@/composables'
import { ErrorResponse, ValidationError } from '@/interfaces'

export const useError = () => {
  const router = useRouter()
  const { $error } = useToast()

  const validationErrors: Ref<ValidationError> = ref({})

  const cleanValidationErrors = () => {
    validationErrors.value = {}
  }

  const setValidationErrors = (errors: ValidationError) => {
    validationErrors.value = errors
  }

  const handleError = (error: AxiosError<ErrorResponse>) => {
    if (!error.response) {
      $error('Error inesperado!')
    } else if (Array.isArray(error.response.data.error)) {
      $error('Error desconocido!')
    } else if (typeof error.response.data.error === 'string') {
      $error(error.response.data.error)
      if (error.response.data.error === import.meta.env.VITE_UNAUTHENTICATED) {
        router.push({ name: 'auth.login' })
      }
    } else if (typeof error.response.data.error === 'object') {
      setValidationErrors(error.response.data.error)
    } else {
      $error('Hubo un error!')
    }
  }

  return {
    $validationErrors: validationErrors,
    $handleError: handleError,
    $cleanValidationErrors: cleanValidationErrors,
  }
}
