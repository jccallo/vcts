import { Ref, ref } from 'vue'
import { AxiosError } from 'axios'
import { useHttp, useError, useToast } from '@/composables'
import { HttpResponse, ErrorResponse, User } from '@/interfaces'
import { UserForm } from '../interfaces'
import { useUploadImage } from '../composables'

export const useCreateUser = () => {
    const { $success, $error } = useToast()
    const { $http, $isLoading } = useHttp()
    const { $validationErrors, $handleError, $cleanValidationErrors } =
        useError()
    const { imageState, uploadImage, onImageChange } = useUploadImage()

    const userId = ref<number>(0)

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

    const updateUser = async () => {
        await $http
            .put(`/users/${userId.value}`, { photo_path: imageState.path })
            .then((response: HttpResponse<User>) => {
                $success(`Imagen agregada correctamente`)
                console.log(`Usuario con imagen actualizado: userId=${response.data.id}`)
            })
            .catch((error: AxiosError<ErrorResponse>) => {
                $handleError(error)
            })
    }

    const storeUser = async () => {
        await $http
            .post('/users', userForm.value)
            .then((response: HttpResponse<User>) => {
                $cleanValidationErrors()
                userId.value = response.data.id
                $success(`Usuario agregado correctamnete`)
                console.log(`Usuario agregado: userId=${response.data.id}`);
            })
            .catch((error: AxiosError<ErrorResponse>) => {
                $handleError(error)
            })
    }

    const createUser = async () => {
        await storeUser()
        if (userId.value > 0) await uploadImage()
        if (imageState.path.length > 0) await updateUser()
        userId.value = 0
        imageState.path = ''
    }

    return {
        $isLoading,
        $validationErrors,
        userForm,
        imageState,
        onImageChange,
        createUser,
    }
}
