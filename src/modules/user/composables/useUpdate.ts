import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { $toast, $http } from '@/services'
import { ValidationError } from '@/interfaces'
import { useImage, useUser } from '../composables'
import { User, UserForm } from '../interfaces'

const userForm = reactive<UserForm>({
  email: '',
  password: '',
  name: '',
  admin: 'false',
  document_number: '',
  phone: '',
  address: '',
  birthdate: '',
  status: '1',
})

const setUserForm = (user: User) => {
  userForm.email = user.email
  userForm.name = user.name
  userForm.admin = user.admin
  userForm.document_number = user.document_number
  userForm.phone = user.phone
  userForm.address = user.address ?? ''
  userForm.birthdate = user.birthdate ?? ''
  userForm.status = user.status
}

export const useUpdate = () => {
  const route = useRoute()
  const { userState, getUser, updateUser } = useUser()
  const { imageState, uploadImage, onImageChange, safeImageLoad } = useImage()

  const validationErrors = ref<ValidationError>()

  const saveUser = async () => {
    const { password, ...withoutPassword } = userForm
    if (!password.trim()) await updateUser(+route.params.id, withoutPassword)
    else await updateUser(+route.params.id, userForm)
    if (userState.error) {
      $toast.warning(userState.error.message)
      validationErrors.value = userState.error.validations
      return
    }
    validationErrors.value = undefined
    $toast.success('Usuario actualizado correctamente')
  }

  const saveImage = async () => {
    if (!imageState.input?.value) return
    await uploadImage()
    if (imageState.error) {
      $toast.warning('No se pudo subir la imagen')
      return
    }
    await updateUser(userState.data.id, { photo_path: imageState.path })
    if (userState.error) {
      $toast.warning('Imagen no vinculada')
      return
    }
    $toast.success('Imagen actualizada correctamente')
  }

  onMounted(async () => {
    await getUser(+route.params.id)
    setUserForm(userState.data)
    safeImageLoad(userState.data.photo_path)
  })

  return {
    isLoading: $http.isLoading,
    userState,
    imageState,
    userForm,
    validationErrors,
    saveUser,
    saveImage,
    uploadImage,
    onImageChange,
  }
}
