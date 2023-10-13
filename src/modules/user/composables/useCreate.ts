import { Ref, ref } from 'vue'
import { UserForm } from '../interfaces'
import { useImage, useUser } from '../composables'
import { $toast } from '@/services';
import { ValidationError } from '@/interfaces';

export const useCreate = () => {
  const { userState, storeUser, updateUser } = useUser()
  const { imageState, uploadImage, onImageChange } = useImage()

  const validationErrors = ref<ValidationError>()

  const userForm: Ref<UserForm> = ref({
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

  const createUser = async () => {
    await storeUser(userForm.value)
    if (userState.error) {
      $toast.error(userState.error.message)
      validationErrors.value = userState.error.validations
      return;
    }
    validationErrors.value = undefined
    if(!imageState.input?.value) {
      $toast.success('Usuario agregado correctamente')
      return;
    }
    await uploadImage()
    if (imageState.error) {
      $toast.warning('Usuario agregado pero imagen no subida')
      return;
    }
    await updateUser(userState.data.id, { photo_path: imageState.path })
    if (userState.error) {
      $toast.warning('Usuario agregado pero imagen no vinculada')
      imageState.input.value = ''
      return;
    }
    $toast.success('Usuario agregado correctamente')
  }

  return {
    userForm,
    imageState,
    validationErrors,
    onImageChange,
    createUser,
  }
}
