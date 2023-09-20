import { onMounted, reactive, ref } from 'vue'
import { $http, $toast } from '@/services'
import { useGetBranches, useGetRoles } from '../composables'
import { useSessionStore } from '@/modules/auth/stores'

export const useCreateProfile = () => {
  const sessionStore = useSessionStore()
  const { branchNames, getBranchNames } = useGetBranches()
  const { roleNames, getRoleNames } = useGetRoles()

  const profileForm = reactive<any>({
    name: '', // OBLIGATORIO
    document_number: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    gender: 'M',
    birthdate: '',
    photo_path: '',
    branch_id: '', // OBLIGATORIO
    role_id: '', // OBLIGATORIO
    user_id: sessionStore.user.id, // OBLIGATORIO
    status: '1',
  })

  const imageUrl = ref<string | null>(null)

  const onImageChange = (e: Event) => {
    const inputElement = e.target as HTMLInputElement
    profileForm.photo_path = inputElement.files ? inputElement.files[0] : null

    if (profileForm.photo_path) {
      imageUrl.value = URL.createObjectURL(profileForm.photo_path);
    } else {
      profileForm.photo_path = ''
      imageUrl.value = null;
    }


  }

  const getFormData = () => {
    const formData = new FormData()
    for (const key in profileForm) {
      if (profileForm.hasOwnProperty(key)) {
        formData.append(key, profileForm[key])
      }
    }
    console.log('formData', formData)
    return formData
  }

  const createProfile = async () => {
    await $http.post('/profiles', getFormData()).then(({ data }) => {
      console.log('data', data)
      $toast.success('Empleado creado satisfactoriamente')
    })
  }

  onMounted(async () => {
    await getBranchNames()
    await getRoleNames()
  })

  return {
    imageUrl,
    branchNames,
    roleNames,
    profileForm,
    onImageChange,
    createProfile,
  }
}
