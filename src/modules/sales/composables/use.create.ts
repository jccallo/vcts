import { $http, $storage, $toast } from '@/services'
import { Ref, ref } from 'vue'

const useCreate = () => {
  const profiles: Ref<any> = ref([])

  const create = async (data: any) => {
    const response = await $http.post<any>('/sales', data)
    console.log('res', response)
    $toast.success('Venta creada satisfactoriamente')
    $storage.set('hola', 'siiiii')
    console.log('Venta creada satisfactoriamente')
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
    create,
    getProfiles,
    profiles,
  }
}

export default useCreate
