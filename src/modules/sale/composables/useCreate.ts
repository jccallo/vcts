import { onMounted, reactive, watch } from "vue"
import type { Pluck } from "@/interfaces"
import type { Card } from "@/modules/card/interfaces"
import type { Customer } from "@/modules/customer/interfaces"
import type { SaleForm } from "../interfaces"
import type { Beneficiary } from '@/modules/beneficiary/interfaces'
import { useCustomer, useCards } from "@/modules/customer/composables"
import { useBeneficiary } from "@/modules/beneficiary/composables"

const createState = reactive({
  customerNames: [] as Pluck[],
  cardNames: [] as Pluck[],
  beneficiaryNames: [] as Pluck[],
})

const saleForm = reactive<SaleForm>({
  branch_id: '',
  customer_id: '',
  card_id: '',
  beneficiary_id: '',
  payment_method: '',
  interest_free: '',
  installments: '',
  courtesy: '',
  retailer: '',
  certificates: [],
  amount: '',
  authorization: '',
  observation: '',
})

export const useCreate = () => {
  const { customerState, getCustomers } = useCustomer()
  const { cardState, getCards } = useCards()
  const { beneficiaryState, getBeneficiaries } = useBeneficiary()

  const getCustomerNames = async () => {
    await getCustomers('1', '1000')
    createState.customerNames = customerState.list.map((customer: Customer) => ({
      id: customer.id,
      name: `${customer.firstname} ${customer.lastname} / DNI: ${customer.document_number} / Telefono: ${customer.phone}`,
    }))
  }

  const getCardNames = async (id: number) => {
    await getCards(id, '1', '1000')
    createState.cardNames = cardState.list.map((card: Card) => ({
      id: card.id,
      name: `${card.number} / Vencimiento: ${card.expiration_date}`,
    }))
  }

  const getBeneficiaryNames = async () => {
    await getBeneficiaries('1', '1000')
    createState.beneficiaryNames = beneficiaryState.list.map((beneficiary: Beneficiary) => ({
      id: beneficiary.id,
      name: `${beneficiary.name} / DNI: ${beneficiary.document_number} / Telefono: ${beneficiary.phone}`,
    }))
  }

  watch(
    () => saleForm.customer_id,
    async () => {
      saleForm.card_id = ''
      createState.cardNames = []
      if (saleForm.customer_id) {
        await getCardNames(+saleForm.customer_id)
      }
    }
  )

  onMounted(async() => {
    await getCustomerNames()
    await getBeneficiaryNames()
    if (saleForm.customer_id) await getCardNames(+saleForm.customer_id)
  })

  return {
    saleForm,
    createState,
  }
}
