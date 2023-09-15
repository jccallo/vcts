class HelperService {
  getQueryParamValue(queryName: string, url: string = window.location.href) {
    const searchParams = new URLSearchParams(new URL(url).search)
    return searchParams.get(queryName)
  }
}

const helperService = new HelperService()
export default helperService
