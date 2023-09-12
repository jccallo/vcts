import { $http, $storage, $toast } from '@/services'

const useCreate = () => {
  const create = async (data: any) => {
    const response = await $http.post<any>('/sales', data)
    console.log('res', response)
    $toast.success('Venta creada satisfactoriamente')
    $storage.set('hola', 'siiiii')
    console.log('Venta creada satisfactoriamente')
  }

  return {
    create,
  }
}

export default useCreate
