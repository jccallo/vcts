import { Ref, ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { $helper, $http } from '@/services'

export const useProfile = () => {
  const route = useRoute()
  const router = useRouter()

  const profiles: Ref<any[]> = ref([])
  const links: Ref<any[]> = ref([])
  const from: Ref<number> = ref(0)
  const to: Ref<number> = ref(0)
  const total: Ref<number> = ref(0)

  const page: Ref<string> = ref('1')
  const perpage: Ref<string> = ref('10')
  const query: Ref<string> = ref('')

  const getAllProfiles = async () => {
    const response = await $http.get<any>(`/profiles?page=${page.value}&perpage=${perpage.value}&query=${query.value}`)
    profiles.value = response.data
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
    await getAllProfiles()
  }

  const goTo = (url: string) => {
    router.push({ name: 'profiles.index', query: { 
      page: $helper.getQueryParamValue('page', url) || '1', 
      perpage: perpage.value,
      query: $helper.getQueryParamValue('query') || '' 
    }})
  }

  watch(() => perpage.value, async () => {
    router.push({ name: 'profiles.index', query: { page: 1, perpage: perpage.value } })
  })

  watch(() => query.value, async () => {
    router.push({ name: 'profiles.index', query: { page: 1, perpage: 10, query: query.value } })
  })

  watch(() => route.fullPath, async () => {
    await loadURL()
  })

  onMounted(async () => {
    await loadURL()
  })

  return {
    profiles,
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