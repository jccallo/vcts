import { Ref, ref } from 'vue'
import { useHttp, useToast } from '@/composables'
import { HttpResponse, Pluck } from '@/interfaces'

export const useName = (resource: string) => {
  const { $http } = useHttp()
  const { $error } = useToast()

  const names: Ref<Pluck[]> = ref([])

  const getNames = async () => {
    await $http
      .get<HttpResponse<Pluck[]>>(`/${resource}/names`)
      .then((response) => {
        console.log(response)
      })
      .catch((error: string) => $error(error))
  }

  return {
    names,
    getNames,
  }
}
