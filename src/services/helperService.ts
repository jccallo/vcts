import { useRoute } from 'vue-router'

class HelperService {

  getQueryParamValue(queryName: string, url: string = window.location.href) {
    const searchParams = new URLSearchParams(new URL(url).search)
    return searchParams.get(queryName)
  }

  setActiveClass(resource: string) {
    return useRoute().name?.toString().split('.')[0] === resource ? 'active' : ''
  }

  isAccountsRouteName() {
    return useRoute().name === import.meta.env.VITE_ACCOUNTS_ROUTE_NAME
  }

}

const helperService = new HelperService()
export default helperService
