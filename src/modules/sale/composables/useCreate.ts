import { useSessionStore } from '@/modules/auth/stores'
import { $http, $toast } from '@/services'
import { Ref, ref } from 'vue'

export const useCreate = () => {
  const session = useSessionStore()
  const profiles: Ref<any> = ref([])
  const validationError = ref<string>('')

  const create = async (data: any) => {
    try {
      const sendData = { ...data }
      sendData.branch_id = session.user.branch.id
      sendData.profile_id = session.user.id
      sendData.certificates = sendData.certificates.join(', ')
      const response = await $http.post<any>('/sales', sendData)
      $toast.success(`Venta #${response.data.id} agregada.`)
      validationError.value = ''
    } catch (error: any) {
      if (typeof error.response.data.error === 'object') {
        const arr: Array<any> = Object.values(error.response.data.error)
        validationError.value = arr[0][0]
      }
    }
    
  }

  const getProfiles = async () => {
    const response = await $http.get<any>('/profiles')
    profiles.value = response.data.map((profile: any) => ({
      id: profile.id,
      fullname: `${profile.firstname} ${profile.lastname}`,
    }))
    console.log('res', profiles.value)
  }

  return {
    validationError,
    create,
    getProfiles,
    profiles,
  }
}
