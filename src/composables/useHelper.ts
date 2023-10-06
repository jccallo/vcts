import { useRoute } from 'vue-router'

export const useHelper = () => {
  const getQueryParamValue = (queryName: string, url: string = window.location.href) => {
    const searchParams = new URLSearchParams(new URL(url).search)
    return searchParams.get(queryName)
  }

  const setActiveClass = (resource: string) => { //! revisar
    return useRoute().name?.toString().split('.')[0] === resource ? 'active' : ''
  }
  return {
    $getQueryParamValue: getQueryParamValue,
    $setActiveClass: setActiveClass,
  }
}