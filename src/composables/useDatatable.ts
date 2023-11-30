import { ref, watch, Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Link } from '@/interfaces'
import { $helper, $toast, $api } from '@/services'

const getLinks = (links?: Link[]) => {
   return (
      links?.map((link: Link) => {
         link.label = link.label.replace(/Previous|Next|Siguiente|Anterior|\s/g, '')
         return link
      }) ?? []
   )
}

export const useDatatable = <T>(path: string, index: string) => {
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
   const direction = ref<string>('desc')
   const field = ref<string>('id')

   const getAllData = async () => {
      const response = await $api.get<T[]>(`${path}?page=${page.value}&perpage=${perpage.value}&query=${query.value}&field=${field.value}&direction=${direction.value}`)
      if (response.data) {
         data.value = response.data.data
         links.value = getLinks(response.data.meta?.links)
         from.value = response.data.meta?.from ?? 0
         to.value = response.data.meta?.to ?? 0
         total.value = response.data.meta?.total ?? 0
      }
      if (response.error) {
         $toast.error(response.error.message)
      }
   }

   const loadURL = async () => {
      page.value = $helper.getQueryParamValue('page') ?? '1'
      perpage.value = $helper.getQueryParamValue('perpage') ?? '10'
      query.value = $helper.getQueryParamValue('query') ?? ''
      direction.value = $helper.getQueryParamValue('direction') ?? 'desc'
      field.value = $helper.getQueryParamValue('field') ?? 'id'
      await getAllData()
   }

   const setSort = (sortField: string) => {
      if (field.value !== sortField) direction.value = 'asc'
      else if (direction.value === 'asc') direction.value = 'desc'
      else direction.value = 'asc'
      router.push({
         name: `${index}`,
         query: { page: '1', perpage: perpage.value, query: query.value, direction: direction.value, field: sortField },
      })
   }

   watch(
      () => perpage.value,
      async () => {
         router.push({
            name: `${index}`,
            query: { page: '1', perpage: perpage.value, query: query.value, direction: direction.value, field: field.value },
         })
      }
   )

   watch(
      () => query.value,
      async () => {
         router.push({
            name: `${index}`,
            query: { page: '1', perpage: '10', query: query.value, direction: direction.value, field: field.value },
         })
      }
   )

   watch(
      () => route.fullPath,
      async () => {
         if (route.name == `${index}`) await loadURL()
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
      direction,
      field,
      setSort,
      loadURL,
   }
}
