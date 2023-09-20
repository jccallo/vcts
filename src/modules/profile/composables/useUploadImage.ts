// import { $http } from '@/services'

import { ref } from "vue"

export const useUploadImage = () => {
  const image = ref<File | null>(null)

  const onImageChange = (e: Event) => {
    const inputElement = e.target as HTMLInputElement
    image.value = inputElement.files? inputElement.files[0]: null
  }

  const uploadImage = async (data: any) => {
    // const { data } = await $http.post('/files', data)
    console.log('response.data:', data)
  }

  return {
    image,
    onImageChange,
    uploadImage,
  }
}