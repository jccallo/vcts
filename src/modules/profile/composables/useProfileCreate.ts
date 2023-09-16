import { reactive } from 'vue'
import { ProfileForm } from '../interfaces'
import { $http, $toast } from '@/services'

export const useProfileCreate = () => {
  const profileForm = reactive<ProfileForm>({
    name: '', // OBLIGATORIO 
    document_number: '',
    email: '',
    password: '',
    remember_token: '',
    phone: '',
    address: '',
    gender: 'M',
    birthdate: '',
    photo_path: '',
    branch_id: '', // OBLIGATORIO 
    role_id: '', // OBLIGATORIO 
    user_id: '', // OBLIGATORIO 
    status: '1',
  })

  const createProfile = async () => {
    const { data } = await $http.post<any>('/profiles', profileForm)
    console.log('data', data)
    $toast.success('Empleado creado satisfactoriamente')
  }

  return {
    profileForm,
    createProfile,
  }
}