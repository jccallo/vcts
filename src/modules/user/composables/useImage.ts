import { reactive } from 'vue'
import { $http } from '@/services'
import type { Error, HttpResponse } from '@/interfaces'
import type { Image } from '../interfaces'

interface ImageState {
  input?: HTMLInputElement // input de donde viene la imagen
  url: string // url para la imagen
  path: string // url relativa con el q se guardó la imagen
  file?: File // objeto de la imagen que se carga
  error?: Error // error
}

export const useImage = () => {
  const imageState = reactive<ImageState>({
    input: undefined,
    url: '',
    path: '',
    file: undefined,
    error: undefined,
  })

  const getFormData = () => {
    if (imageState.file) {
      const formData = new FormData()
      formData.append('path', imageState.file)
      return formData
    }
  }

  const onImageChange = (e: Event) => {
    if (!imageState.input) imageState.input = e.target as HTMLInputElement
    imageState.file = imageState.input.files
      ? imageState.input.files[0]
      : undefined
    if (imageState.file) imageState.url = URL.createObjectURL(imageState.file)
    else imageState.url = ''
  }

  const safeImageLoad = (path: string | null) => {
    if (!path) return;
    const img = new Image()
    const imgPath = `${import.meta.env.VITE_BASE_PUBLIC_STORAGE_URL}/${path}`
    img.src = imgPath
    img.onload = () => {
      imageState.url = imgPath
    }
    img.onerror = () => {
      imageState.url = ''
    }
  }

  const cleanInput = () => {
    if (imageState.input) imageState.input.value = ''
  }

  const setResponse = (path: string) => {
    imageState.path = path
    imageState.error = undefined
  }

  const setError = (error: Error) => {
    imageState.path = ''
    imageState.error = error
  }

  const uploadImage = async () => {
    await $http
      .post<HttpResponse<Image>>('/images', getFormData())
      .then((response) => {
        cleanInput()
        setResponse(response.data.path)
      })
      .catch((error: Error) => {
        setError(error)
      })
  }

  return {
    imageState,
    onImageChange,
    uploadImage,
    safeImageLoad,
  }
}
