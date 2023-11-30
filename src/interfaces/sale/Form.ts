export interface SaleForm {
  branch_id: string
  customer_id: string
  card_id: string
  beneficiary_id: string
  interest_free: string
  installments: string
  payment_method_id: string
  courtesy_id: string
  retailer_id: string
  certificates: Array<string>
  amount: string
  authorization: string
  observation: string
}
