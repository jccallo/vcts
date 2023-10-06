import { ref } from 'vue'
import { $http, $toast } from '@/services'
import { HttpResponse, Pluck } from '@/interfaces'

export const useName = (resource: string) => {
  const names = ref<Pluck[]>()

  const getNames = async () => {
    await $http
      .get<HttpResponse<Pluck[]>>(`/${resource}/names`)
      .then((response) => {
        names.value = response.data
      })
      .catch((error: string) => $toast.error(error))
  }

  return {
    names,
    getNames,
  }
}
