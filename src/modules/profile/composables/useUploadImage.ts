import { reactive } from 'vue'
import { AxiosError } from 'axios'
import { useError, useHttp } from '@/composables'
import { ErrorResponse, HttpResponse, Image } from '@/interfaces'

export const useUploadImage = () => {
  const imageState = reactive({
    url: '',
    path: '',
    file: {} as File,
  })

  const getFormData = () => {
    const formData = new FormData()
    formData.append('path', imageState.file)
    return formData
  }

  const onImageChange = (e: Event) => {
    const inputElement = e.target as HTMLInputElement
    imageState.file = inputElement.files ? inputElement.files[0] : ({} as File)

    if (imageState.file) {
      imageState.url = URL.createObjectURL(imageState.file)
    } else {
      imageState.url = ''
    }
  }

  const uploadImage = async () => {
    if (imageState.url.length > 0)
      await useHttp()
        .$http.post('/images', getFormData())
        .then((response: HttpResponse<Image>) => {
          imageState.path = response.data.path
          console.log(`Imagen agregada: imageId=${response.data.id}`)
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          useError().$handleError(error)
        })
  }

  return {
    imageState,
    onImageChange,
    uploadImage,
  }
}
