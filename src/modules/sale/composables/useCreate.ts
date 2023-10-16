import { onMounted, reactive, watch } from 'vue'
import type { SaleForm } from '../interfaces'
import { useCombobox, useSale } from '../composables'
import { useAuth } from '@/modules/auth/composables'
import { $http, $toast } from '@/services'

const saleForm = reactive<SaleForm>({
   branch_id: '',
   customer_id: '',
   card_id: '',
   beneficiary_id: '',
   interest_free: '',
   installments: '',
   payment_method_id: '',
   courtesy_id: '',
   retailer_id: '',
   certificates: [],
   amount: '',
   authorization: '',
   observation: '',
})

export const useCreate = () => {
   const {
      comboboxState,
      getPaymentMethodNames,
      getRetailerNames,
      getCourtesyNames,
      getCertificateNames,
      getCustomerNames,
      getBeneficiaryNames,
      getCardNames,
   } = useCombobox()

   const { saleState, storeSale } = useSale()
   const { hasActiveEmployee, activeEmployee } = useAuth()

   const setBranchId = async () => {
      if (hasActiveEmployee.value)
         saleForm.branch_id = activeEmployee.value.branch.id.toString()
      else saleForm.branch_id = ''
   }

   const saveSale = async () => {
      await storeSale(saleForm)
      if (saleState.error) {
         $toast.error(saleState.error.message)
         return
      }
      $toast.success('Venta agregada correctamente')
   }

   watch(
      () => saleForm.customer_id,
      async () => {
         saleForm.card_id = ''
         comboboxState.cardNames = []
         if (saleForm.customer_id) {
            await getCardNames(+saleForm.customer_id)
         }
      }
   )

   onMounted(async () => {
      setBranchId()
      await getPaymentMethodNames()
      await getRetailerNames()
      await getCourtesyNames()
      await getCertificateNames()

      await getCustomerNames()
      await getBeneficiaryNames()
      if (saleForm.customer_id) await getCardNames(+saleForm.customer_id)
   })

   return {
      isLoading: $http.isLoading,
      saveSale,
      saleForm,
      comboboxState,
      saleState,
   }
}
