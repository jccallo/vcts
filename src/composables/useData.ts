import { Ref, ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { $helper, $http } from '@/services'

export const useData = (resource: string) => {
  const route = useRoute()
  const router = useRouter()

  const data: Ref<any[]> = ref([])
  const links: Ref<any[]> = ref([])
  const from: Ref<number> = ref(0)
  const to: Ref<number> = ref(0)
  const total: Ref<number> = ref(0)

  const page: Ref<string> = ref('1')
  const perpage: Ref<string> = ref('10')
  const query: Ref<string> = ref('')

  const getAllData = async () => {
    const response = await $http.get(`/${resource}?page=${page.value}&perpage=${perpage.value}&query=${query.value}`)
    data.value = response.data
    links.value = response.meta.links.map((link: any) => {
      if (link.label === '&laquo; Previous') link.label = '‹'
      else if (link.label === 'Next &raquo;') link.label = '›'
      return link
    })
    from.value = response.meta.from
    to.value = response.meta.to
    total.value = response.meta.total
  }

  const loadURL = async () => {
    page.value = $helper.getQueryParamValue('page') || '1'
    perpage.value = $helper.getQueryParamValue('perpage') || '10'
    query.value = $helper.getQueryParamValue('query') || ''
    await getAllData()
  }

  const goTo = (url: string) => {
    router.push({ name: `${resource}.index`, query: { 
      page: $helper.getQueryParamValue('page', url) || '1', 
      perpage: perpage.value,
      query: query.value, 
    }})
  }

  watch(() => perpage.value, async () => {
    router.push({ name: `${resource}.index`, query: { page: '1', perpage: perpage.value, query: query.value } })
  })

  watch(() => query.value, async () => {
    router.push({ name: `${resource}.index`, query: { page: '1', perpage: '10', query: query.value } })
  })

  watch(() => route.fullPath, async () => {
    console.log('route', route)
    console.log('route.fullPath', route.fullPath)
    if (route.name == `${resource}.index`) await loadURL()
  })

  onMounted(async () => {
    await loadURL()
  })

  return {
    data,
    links,
    from,
    to,
    total,
    page,
    perpage,
    query,
    goTo,
  }
}