import { reactive, watch, ref, onBeforeMount } from 'vue'
import type { CustomerForm, ValidationError } from '@/interfaces'
import { $api, $toast, useCustomers } from '@/services'
import { useLocations } from '../composables'

const customerForm = reactive<CustomerForm>({
   firstname: '',
   lastname: '',
   customer_code: '', // solo se usa para mostrar en la pagina de Show.vue
   document_number: '',
   birthdate: '',
   phone: '',
   email: '',
   address: '',
   reference: '',
   department_id: '',
   province_id: '',
   district_id: '',
   status: '1',
})

const errors = ref<ValidationError>()

export const useCreate = () => {
   const { locations, getDepartments, getDistricts, getProvinces } = useLocations()
   const { customers, createCustomer } = useCustomers()

   const save = async () => {
      await createCustomer(customerForm)
      if (customers.error) {
         $toast.error(customers.error.message)
         errors.value = customers.error.validations
         return
      }
      errors.value = undefined
      $toast.success('Cliente agregado correctamente')
   }

   const initWatchers = () => {
      watch(
         () => customerForm.department_id,
         async () => {
            if (customerForm.department_id) {
               await getProvinces(+customerForm.department_id)
            } else {
               customerForm.province_id = ''
               locations.provinces = []
            }
         }
      )

      watch(
         () => customerForm.province_id,
         async () => {
            if (customerForm.province_id) {
               await getDistricts(+customerForm.province_id)
            } else {
               customerForm.district_id = ''
               locations.districts = []
            }
         }
      )
   }

   onBeforeMount(async () => {
      await getDepartments()
      initWatchers()
   })

   return {
      locations,
      errors,
      customerForm,
      isLoading: $api.isLoading,
      save,
   }
}
