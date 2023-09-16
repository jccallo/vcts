// import { $http } from '@/services'

import { reactive } from "vue"

export const useUpload = () => {
  const image = reactive<any>({
    file: null
  })

  const onImageChange = (e: any) => {
    image.file = e.target.files[0]
  }
  const uploadImage = async (data: any) => {
    // const { data } = await $http.post('/files', data)
    console.log('response.data:', data)
  }

  return {
    uploadImage,
    onImageChange,
  }
}