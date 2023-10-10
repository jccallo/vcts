import { reactive, watch } from 'vue'
import { Error, HttpResponse, Image } from '@/interfaces'
import { $http } from '@/services'

interface ImageState {
  url: string
  path: string
  file?: File
  isError: boolean
  error: Error
}

export const useImage = () => {
  const imageState = reactive<ImageState>({
    url: '',
    path: '',
    file: undefined,
    isError: false,
    error: {} as Error,
  })

  const getFormData = () => {
    if(imageState.file) {
      const formData = new FormData()
      formData.append('path', imageState.file)
      return formData
    }
  }

  const onImageChange = (e: Event) => {
    const inputElement = e.target as HTMLInputElement
    imageState.file = inputElement.files ? inputElement.files[0] : undefined
  }

  watch(
    () => imageState.file,
    async () => {
      if (imageState.file) imageState.url = URL.createObjectURL(imageState.file)
      else imageState.url = ''
    }
  )

  const uploadImage = async () => {
    await $http
      .post<HttpResponse<Image>>('/images', getFormData())
      .then((response) => {
        imageState.path = response.data.path
        imageState.isError = false
        imageState.error = {} as Error
      })
      .catch((error: Error) => {
        imageState.path = ''
        imageState.isError = true
        imageState.error = error
      })
  }

  return {
    imageState,
    onImageChange,
    uploadImage,
  }
}
