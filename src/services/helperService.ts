import { useRoute } from 'vue-router'

class HelperService {

  getQueryParamValue(queryName: string, url: string = window.location.href) {
    const searchParams = new URLSearchParams(new URL(url).search)
    return searchParams.get(queryName)
  }

  setActiveClass(resource: string) {
    console.log('useRoute()sss', useRoute())
    return useRoute().name?.toString().split('.')[0] === resource ? 'active' : ''
  }
}

const helperService = new HelperService()
export default helperService
