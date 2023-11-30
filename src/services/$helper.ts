import { useRoute } from 'vue-router'

class HelperService {

  getQueryParamValue(queryName: string, url: string = window.location.href) {
    const searchParams = new URLSearchParams(new URL(url).search)
    return searchParams.get(queryName)
  }

  setActiveClass(resource: string) {
    return useRoute().name?.toString().split('.')[0] === resource ? 'active' : ''
  }

  getActiveName(resource?: string) {
    return resource === '1' ? 'Activo' : 'Inactivo'
  }

  // isAccountsRouteName() {
  //   return useRoute().name === import.meta.env.VITE_ACCOUNTS_ROUTE_NAME
  // }

}

export const $helper = new HelperService()
