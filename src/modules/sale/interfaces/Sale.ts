export interface Sale {
  branch_id: number
  profile_id: number
  customer_id: number
  card_id: number
  beneficiary_id: number
  payment_method: string
  interest_free: string
  installments: string
  courtesy: string
  retailer: string
  certificates: Array<string>
  amount: string | number
  authorization: string
  observation: string
}