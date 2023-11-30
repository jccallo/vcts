import { reactive, watch, ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import type { Customer, CustomerForm, ValidationError } from '@/interfaces'
import { $toast, $api, useCustomers } from '@/services'
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
   status: '',
})

const setCustomerForm = (instance?: Customer) => {
   if (!instance) return
   customerForm.firstname = instance.firstname ?? ''
   customerForm.lastname = instance.lastname ?? ''
   customerForm.customer_code = instance.customer_code ?? ''
   customerForm.document_number = instance.document_number ?? ''
   customerForm.birthdate = instance.birthdate ?? ''
   customerForm.phone = instance.phone ?? ''
   customerForm.email = instance.email ?? ''
   customerForm.address = instance.address ?? ''
   customerForm.reference = instance.reference ?? ''
   customerForm.department_id = instance.department_id ?? ''
   customerForm.province_id = instance.province_id ?? ''
   customerForm.district_id = instance.district_id ?? ''
   customerForm.status = instance.status
}

const errors = ref<ValidationError>()

export const useEdit = () => {
   const route = useRoute()
   const { locations, getDepartments, getDistricts, getProvinces } = useLocations()
   const { customers, getCustomer, updateCustomer } = useCustomers()

   const save = async () => {
      await updateCustomer(+route.params.id, customerForm)
      if (customers.error) {
         console.log('customers', customers.error.original)
         $toast.error(customers.error.message)
         errors.value = customers.error.validations
         return
      }
      errors.value = undefined
      $toast.success('Cliente editado correctamente')
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
               console.log('+customerForm.province_id', +customerForm.province_id)
               await getDistricts(+customerForm.province_id)
            } else {
               customerForm.district_id = ''
               locations.districts = []
            }
         }
      )
   }

   onBeforeMount(async () => {
      await getCustomer(+route.params.id)
      setCustomerForm(customers.one)
      await getDepartments()
      if (customerForm.department_id) await getProvinces(+customerForm.department_id)
      else locations.provinces = []
      if (customerForm.province_id) await getDistricts(+customerForm.province_id)
      else locations.districts = []
   })

   return {
      isLoading: $api.isLoading,
      errors,
      locations,
      customerForm,
      initWatchers,
      save,
   }
}
