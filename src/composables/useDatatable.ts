import { ref, watch, Ref } from 'vue'
import { AxiosError } from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { useHttp, useError, useHelper } from '@/composables'
import { ErrorResponse, HttpResponse, Link } from '@/interfaces'

export const useDatatable = <T>(resource: string) => {
  const route = useRoute()
  const router = useRouter()
  const { $http } = useHttp()
  const { $getQueryParamValue } = useHelper()
  const { $handleError } = useError()

  const data: Ref<T[]> = ref([])
  const links: Ref<Link[]> = ref([])
  const from = ref<number>(0)
  const to = ref<number>(0)
  const total = ref<number>(0)

  const page = ref<string>('1')
  const perpage = ref<string>('10')
  const query = ref<string>('')

  const getAllData = async () => {
    await $http
      .get(
        `/${resource}?page=${page.value}&perpage=${perpage.value}&query=${query.value}`
      )
      .then((response: HttpResponse<T[]>) => {
        data.value = response.data
        links.value =
          response.meta?.links.map((link: Link) => {
            link.label = link.label.replace(
              /Previous|Next|Siguiente|Anterior|\s/g,
              ''
            )
            return link
          }) ?? []
        from.value = response.meta?.from ?? 0
        to.value = response.meta?.to ?? 0
        total.value = response.meta?.total ?? 0
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        $handleError(error)
      })
  }

  const loadURL = async () => {
    page.value = $getQueryParamValue('page') ?? '1'
    perpage.value = $getQueryParamValue('perpage') ?? '10'
    query.value = $getQueryParamValue('query') ?? ''
    await getAllData()
  }

  watch(
    () => perpage.value,
    async () => {
      router.push({
        name: `${resource}.index`,
        query: { page: '1', perpage: perpage.value, query: query.value },
      })
    }
  )

  watch(
    () => query.value,
    async () => {
      router.push({
        name: `${resource}.index`,
        query: { page: '1', perpage: '10', query: query.value },
      })
    }
  )

  watch(
    () => route.fullPath,
    async () => {
      if (route.name == `${resource}.index`) await loadURL()
    }
  )

  return {
    data,
    links,
    from,
    to,
    total,
    page,
    perpage,
    query,
    loadURL,
  }
}
