export interface SaleForm {
  branch_id: string
  customer_id: string
  card_id: string
  beneficiary_id: string
  payment_method: string
  interest_free: string
  installments: string
  courtesy: string
  retailer: string
  certificates: Array<string>
  amount: string
  authorization: string
  observation: string
}
