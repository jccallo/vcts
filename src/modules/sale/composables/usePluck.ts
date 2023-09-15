import { ref } from 'vue'
import { useCustomers, useCustomersCards } from "@/modules/customer/composables"
import {  useBeneficiary } from '@/modules/beneficiary/composables'

const { customers, customersIndex } = useCustomers()
const { cards, cardsIndex } = useCustomersCards()
const { beneficiaries, beneficiariesIndex } = useBeneficiary()

export const usePluck = () => {
  const customersPluck = ref<any[]>([])
  const cardsPluck = ref<any[]>([])
  const beneficiariesPluck = ref<any[]>([])

  const getCustomersPluck = async (): Promise<void> => {
    await customersIndex(1, 100000)
    customersPluck.value = customers.value.map((customer: any) => ({
      id: customer.id,
      fullname: `${customer.firstname} ${customer.lastname} / DNI: ${customer.document_number} / Celular: ${customer.phone}`,
    }))
  }

  const getCardsPluck = async (id: number | null): Promise<void> => {
    await cardsIndex(id, 1, 100000)
    cardsPluck.value = cards.value.map((card: any) => ({
      id: card.id,
      fullname: `${card.number} / Proces: ${card.processor} / Banco: ${card.bank_id}`,
    }))
  }

  const getBeneficiariesPluck = async (): Promise<void> => {
    await beneficiariesIndex(1, 100000)
    beneficiariesPluck.value = beneficiaries.value.map((customer: any) => ({
      id: customer.id,
      fullname: `${customer.fullname} / DNI: ${customer.document_number} / Celular: ${customer.phone}`,
    }))
  }

  return {
    customersPluck,
    cardsPluck,
    beneficiariesPluck,
    getCustomersPluck,
    getCardsPluck,
    getBeneficiariesPluck,
  }
}
