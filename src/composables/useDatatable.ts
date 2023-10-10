import { ref, watch, Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Error, HttpResponse, Link } from '@/interfaces'
import { $http, $helper, $toast } from '@/services'

const getLinks = (links?: Link[]) => {
  return (
    links?.map((link: Link) => {
      link.label = link.label.replace(
        /Previous|Next|Siguiente|Anterior|\s/g,
        ''
      )
      return link
    }) ?? []
  )
}

export const useDatatable = <T>(resource: string) => {
  const route = useRoute()
  const router = useRouter()

  const data: Ref<T[]> = ref([])
  const links = ref<Link[]>([])
  const from = ref<number>(0)
  const to = ref<number>(0)
  const total = ref<number>(0)

  const page = ref<string>('1')
  const perpage = ref<string>('10')
  const query = ref<string>('')

  const getAllData = async () => {
    await $http
      .get<HttpResponse<T[]>>(
        `/${resource}?page=${page.value}&perpage=${perpage.value}&query=${query.value}`
      )
      .then((response) => {
        console.log('response', response)
        data.value = response.data
        links.value = getLinks(response.meta?.links)
        from.value = response.meta?.from ?? 0
        to.value = response.meta?.to ?? 0
        total.value = response.meta?.total ?? 0
      })
      .catch((error: Error) => {
        $toast.error(error.message)
      })
  }

  const loadURL = async () => {
    page.value = $helper.getQueryParamValue('page') ?? '1'
    perpage.value = $helper.getQueryParamValue('perpage') ?? '10'
    query.value = $helper.getQueryParamValue('query') ?? ''
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
