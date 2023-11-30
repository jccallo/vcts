import { reactive } from 'vue'

import type { Pluck } from "@/interfaces"
import type { Beneficiary } from '@/modules/beneficiary/interfaces'
import type { PaymentMethod } from '@/modules/method/interfaces'
import type { Retailer } from "@/modules/retailer/interfaces"
import type { Courtesy } from "@/modules/courtesy/interfaces"
import type { Certificate } from "@/modules/certificate/interfaces"

import { useBeneficiary } from '@/modules/beneficiary/composables'
import { usePaymentMethod } from '@/modules/method/composables'
import { useRetailer } from '@/modules/retailer/composables'
import { useCourtesy } from '@/modules/courtesy/composables'
import { useCertificate } from '@/modules/certificate/composables'

const comboboxState = reactive({
   customerNames: [] as Pluck[] | undefined,
   cardNames: [] as Pluck[] | undefined,
   beneficiaryNames: [] as Pluck[] | undefined,
   paymentMethodNames: [] as Pluck[] | undefined,
   retailerNames: [] as Pluck[] | undefined,
   courtesyNames: [] as Pluck[] | undefined,
   certificateNames: [] as Pluck[] | undefined,
})

export const useCombobox = () => {
   const { customerState, getCustomers } = useCustomers()
   const { cardState, getCards } = useCards()
   const { beneficiaryState, getBeneficiaries } = useBeneficiary()
   const { paymentMethodState, getPaymentMethods } = usePaymentMethod()
   const { retailerState, getRetailers } = useRetailer()
   const { courtesyState, getCourtesies } = useCourtesy()
   const { certificateState, getCertificates } = useCertificate()

   const getCustomerNames = async () => {
      await getCustomers('1', '1000')
      comboboxState.customerNames = customerState.list.map(
         (customer: Customer) => ({
            id: customer.id,
            name: `${customer.firstname} ${customer.lastname} / DNI: ${customer.document_number} / Telefono: ${customer.phone}`,
         })
      )
   }

   const getCardNames = async (id: number) => {
      await getCards(id, '1', '1000')
      comboboxState.cardNames = cardState.list.map((card: Card) => ({
         id: card.id,
         name: `${card.number} / Vencimiento: ${card.expiration_date}`,
      }))
   }

   const getBeneficiaryNames = async () => {
      await getBeneficiaries('1', '1000')
      comboboxState.beneficiaryNames = beneficiaryState.list?.map(
         (beneficiary: Beneficiary) => ({
            id: beneficiary.id,
            name: `${beneficiary.name} / DNI: ${beneficiary.document_number} / Telefono: ${beneficiary.phone}`,
         })
      )
   }

   const getPaymentMethodNames = async () => {
      await getPaymentMethods('1', '1000')
      comboboxState.paymentMethodNames = paymentMethodState.list?.map(
         (paymentMethod: PaymentMethod) => ({
            id: paymentMethod.id,
            name: paymentMethod.name,
         })
      )
   }

   const getRetailerNames = async () => {
      await getRetailers('1', '1000')
      comboboxState.retailerNames = retailerState.list?.map(
         (retailer: Retailer) => ({
            id: retailer.id,
            name: retailer.name,
         })
      )
   }

   const getCourtesyNames = async () => {
      await getCourtesies('1', '1000')
      comboboxState.courtesyNames = courtesyState.list?.map(
         (courtesy: Courtesy) => ({
            id: courtesy.id,
            name: courtesy.name,
         })
      )
   }

   const getCertificateNames = async () => {
      await getCertificates('1', '1000')
      comboboxState.certificateNames = certificateState.list?.map(
         (certificate: Certificate) => ({
            id: certificate.id,
            name: certificate.name,
         })
      )
   }

   return {
      comboboxState,
      getPaymentMethodNames,
      getRetailerNames,
      getCourtesyNames,
      getCertificateNames,
      getCustomerNames,
      getBeneficiaryNames,
      getCardNames,
   }
}
